# NEMRC MicroSolve (MSOL) CAMA — As-Built Data Model

*Compiled from: `NEMRC_MSOL_EXTRACT_CONTENTS.csv`, the three `NEMRC_MSOL_CAMA_*_Data_Dictionary.csv` files, `NEMRC_MSOL_CAMA_Data_Dictionary_V5.pdf` (vendor tutorial, 12-11-2023), `EXP_LOOKUP.json`, `vt_tax_property_class_codes.csv`, the South Burlington sample extract on S3 (`sample-microsolve-sburl/`), and the source of the [demo viewer](https://files.vcgi.vermont.gov/other/demo/cama-sample-microsolve-sburl/index.html). No direct access to the live MSOL application was available — this is a reconstruction, and every inference that isn't directly sourced is flagged as such.*

This document is meant to give VCGI/Tax Dept staff enough of a mental model of MicroSolve's internal structure to have an informed schema/reporting conversation with NEMRC (Chris Miele / Ernie Saunders), independent of the [Act 164 / Act 170 gap analysis](#gap-analysis-against-act-164--act-170) at the end.

**This document covers MSOL CAMA specifically — the appraisal/valuation record-keeping tool.** SPAN issuance, the statewide Grand List table schema, the parcel-geometry GIS pipeline, and a proposed future-state redesign to meet Act 164/170 are a separate, larger system covered in the companion document **[SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md)**. In short: **MSOL CAMA does not generate or govern SPAN** — it simply stores whatever SPAN value NEMRC's separate Grand List module (used statewide as the SPAN-issuing system, independent of which CAMA vendor a given town runs) has assigned to that record. Read that companion document for anything involving SPAN structure/authority, the statewide Grand List table, or the current/proposed GIS parcel model — this document's own earlier treatment of those topics (§7.3, [§9](#9-the-lincoln-sample-a-second-earlier-simpler-nemrc-extract)) has been superseded by it. That companion document's §1.1 also notes that the relationship between the CAMA databases described here and NEMRC's own Grand List database is drawn as **bidirectional** in VCGI's working pipeline diagram, not simply CAMA reading a SPAN NEMRC handed it — the exact mechanics of anything flowing back from MSOL into the Grand List module are unconfirmed and worth asking NEMRC directly.

**This is also the first of several per-vendor as-built documents.** [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) documents Aumentum ProVal (the second CAMA product examined) and includes a direct MSOL-vs-ProVal comparison table — notably, ProVal has a native parent/child parcel pointer (`parent_lrsn`) that MSOL has no equivalent for (§7.3 below), and a native dwelling-count field (`ResLivingUnits`) that MSOL also lacks.

**Why this document exists right now:** this MSOL reverse-engineering effort is one input to VCGI's current, active initiative to formalize CAMA data transfer from all four VT CAMA vendors *as-is*, ahead of the Act 164/170-driven schema changes that are expected to follow. That initiative traces back to VCGI's own [Act 68 of 2024 parcels report](https://github.com/VCGI/publications/blob/main/Act68_2024/Act68-2024-Parcels-VCGI_As_Submitted_20241212.md), which first recommended creating a statewide CAMA data standard and a formal, regular vendor-submittal requirement — and to **32 V.S.A. § 5404(b)**, the actual statutory reporting requirement behind all of this (full text and the real transfer mechanism — a Globalscape FTP arrangement — in [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §1.4). One explicit purpose of documenting the as-is state first (this document) is to see exactly how — or whether — dwelling units are currently handled across vendors' existing data management (see §7.1), before deciding where a new `DWELLINGS` field should live.

---

## 1. High-level architecture

MicroSolve is a **desktop, per-town CAMA application** (screens in the vendor PDF are classic Windows forms/grids, not a web app). Each town runs its own local database; there is no evidence of a shared statewide MSOL database. Data reaches VCGI/the state only through **batch exports** — the vendor's "EXP_*" export routine dumps each internal table to a flat file (`.CSV` per the extract-contents manifest; the sample bucket has these converted to `.json`, one array-of-objects per table).

Because it's a desktop record-management tool built around a forms/grid UI, the data model looks like a classic **parent/child relational schema**, not a modern normalized warehouse:

- One **parcel-level parent table** per property type (`EXP_MAIN`) — one row per taxable "parcel" (NEMRC's `parcel_id`, elsewhere called **CAMA ID / LRSN**).
- A large number of **child tables keyed by `parcel_id`** (and, for building-level detail, also by `secid`/`section_id`) holding one-to-many detail: land lines, buildings/sections, outbuildings, site improvements, features, sales history, inspections, photos, prior-year valuations.
- A set of **valuation-engine/config tables** (comparables, cost tables, cost equations) that describe *how the software calculates value*, not facts about a specific property. These are effectively software configuration, exported alongside the data.
- A pair of **self-describing schema tables** (`EXP_DATADICT`, `EXP_CATEG`) that let the software (and us) know what its own generic/configurable fields mean in a given installation — see [§5](#5-the-self-describing-schema-datadict--categ-and-why-it-matters).
- Administrative/audit tables (`EXP_MSAUDIT`, `EXP_MSCONFIG`, `EXP_IASETUP*`) that are software-internal and were **not** included as `.json` in the sample bucket (per `NEMRC_MSOL_EXTRACT_CONTENTS.csv`, likely intentionally withheld — some carry user IDs).

## 2. Three parallel schemas ("silos"), not one

MSOL splits property records into **three separate table families** based on property type, each with its own `EXP_MAIN` and its own dialect of child tables:

| Silo | Directory | Scope | Distinctive tables |
|---|---|---|---|
| `res` (Residential) | `res/` | Single-family, mobile home, camp, small multi-family | `EXP_SECTION`, `EXP_GARAGE`, `EXP_PORCH`, `EXP_FEATURES` |
| `comm` (Commercial) | `comm/` | Commercial, industrial, income-producing property | `EXP_OCCUPNCY`, `EXP_BSMTCOMP`, `EXP_BSMTOCCU`, `EXP_COMPONNT`, `EXP_ADDITION` |
| `condo` (Condominium) | `condo/` | Condo units, co-ops | `EXP_AMENITY`, lock-off/level fields on `EXP_SECTION` |

This is a real structural fact confirmed by both the tutorial PDF (separate data-entry screen sets per type, PG8–PG11) and the sample data (three distinct `EXP_MAIN_*.json` files with non-identical field lists). It is **not** a superficial export artifact — the underlying desktop application literally has different data-entry screens per property type, and a given parcel physically lives in exactly one silo's tables.

**Practical consequence:** there is no single "all parcels" table. Any statewide aggregation (what VCGI's demo viewer does) has to fetch all three `EXP_MAIN` files and normalize field names in application code, because the same concept has different column names per silo — e.g. situs address is `prop_locat` in `res`/`condo` but `prop_addr` in `comm`; land size sits in `factorj` in `res` but `land_size` in `comm`. See the [demo viewer's](https://files.vcgi.vermont.gov/other/demo/cama-sample-microsolve-sburl/index.html) `normalize()` function ("DATA PIPELINE" section of its source — not stored in this repo, only live at that URL) for the exact mapping VCGI already reverse-engineered.

## 3. The parcel-level parent table: `EXP_MAIN`

One row per taxable record. Field-for-field detail is in the three `NEMRC_MSOL_CAMA_*_Data_Dictionary.csv` files; the load-bearing fields for GIS/statewide work are:

| Concept | `res` / `condo` field | `comm` field | Notes |
|---|---|---|---|
| Record key (CAMA ID / LRSN) | `parcel_id` (C,25) | `parcel_id` | Town-internal ID, e.g. `"0003-00005"`. Not the SPAN. |
| **SPAN** | `parc_span` (C,13) | `parc_span` | e.g. `"600-188-13271"` (South Burlington) — format `XXX-YYY-ZZZZZ`: 3-digit town code, 3-digit school district code, 5-digit sequence number issued and maintained by NEMRC's separate Grand List module (not by MSOL CAMA itself — see [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §2). **This is the field that must join to the parcel GIS layer.** The Lincoln sample ([§9](#9-the-lincoln-sample-a-second-earlier-simpler-nemrc-extract)) independently confirms the town-code segment convention — its own documentation hardcodes the township display as "Lincoln (354)". |
| Owner | `owner_name`, `owner_nam2`, `owner_addr`, `city`/`owner_city`, `state`/`owner_stat`, `zip_code`/`owner_zip` | same, differently named | |
| Situs address | `prop_locat` | `prop_addr`, `prop_city`, `prop_state`, `prop_zip` | Often a road-name/mailing style address, **not** an E911-formatted physical address (see [§7](#7-known-structural-gaps-for-gisstatewide-reporting)). |
| Tax map # | `tax_map_nu` | `tax_map_nu` | Legacy paper tax map reference, independent of SPAN. |
| Property class | `factori` (confirmed via sample data = `101`, matching Tax Dept PCCODE 101 "Single Family") | `prop_class` | See [§6](#6-property-classification-two-parallel-systems) — this is the join point to `vt_tax_property_class_codes.csv`. |
| Sale/transfer | `sale_price`, `sale_date`, `book`, `page`, `validity` | same | Most-recent sale only; full history is in `EXP_TRANHIST`. |
| Valuation totals | `cama_dwell`, `cama_land`, `cama_outb`, `cama_sitei`, `cama_total` | `cama_imp` (not `cama_dwell`), `cama_land`, `cama_total` | Naming diverges between silos again. |
| Homestead | `homestead`, `homestd_va`, `cama_site2` | `homestead`, `homestd_va` | Housesite/homestead value split relevant to VT education property tax. |
| Status | `parcstatus` (C,1, e.g. `"A"`=active) | `parcstatus` | Likely the analog of the GIS layer's active/inactive parcel distinction — **needs vendor confirmation on the full code list** (only `"A"` observed in sample). |
| Generic/"Factor" slots | `factora`–`factorj`, `fac_209`–`fac_238` | `p_misc9`, similar factor slots | **Configurable fields** — see §5. In the sample data these consistently mean specific things (e.g. `factorh`=Description, `factorj`=Land Size, `factori`=Prop Class), but that mapping is *installation-defined*, not hardcoded in the schema itself. |

## 4. Child tables (one-to-many, keyed by `parcel_id` [+ `secid`])

The fullest inventory is `NEMRC_MSOL_EXTRACT_CONTENTS.csv`; grouping it conceptually:

**Physical building detail** (keyed by `parcel_id`, then `secid`/`section_id` for a specific building/section on that parcel):
- `EXP_SECTION` — the building/unit "shell" record: type, design, style, stories, year built, effective age, condition, room/bed/bath counts, `no_of_unit` (dwelling units in that section), square footage, depreciation factors, RCN/RCNLD.
- `EXP_EXTWALL`/`EXP_EXT_WALL`, `EXP_ROOF`, `EXP_FLOOR`, `EXP_HEAT`/`EXP_HEATCOOL` — percent-of-exterior/percent-of-area breakdowns by construction type (a section can be e.g. 60% vinyl siding / 40% wood siding).
- `EXP_GARAGE`, `EXP_PORCH` — attached structure detail.
- `EXP_FEATURES` (res/condo only) — itemized extras (fireplace, dishwasher, etc.).
- `EXP_OUTBUILD` — detached structures (barns, sheds — includes Current Use fields `cu_enroll`/`cu_value`).
- `EXP_ADDITION`, `EXP_BSMTCOMP`, `EXP_BSMTOCCU`, `EXP_OCCUPNCY`, `EXP_COMPONNT` (comm only) — commercial-specific basement/occupancy/component-cost breakdowns for income-approach valuation.
- `EXP_AMENITY` (condo only).

**Land & site:**
- `EXP_LAND` — one row per land "line" (type, acreage/frontage-depth, grade, rate; includes Current Use `cu_enroll`/`cu_value`).
- `EXP_SITEIMP` — site improvements (water, sewer, landscaping, pond — also carries `cu_*` fields).

**History / lifecycle:**
- `EXP_TRANHIST` — full sales/transfer history (grantor/grantee/price/date/book-page), vs. `EXP_MAIN`'s single most-recent sale.
- `EXP_OYVAL` — prior-year valuation snapshots (`nperiod` + the same `cama_*` totals as `EXP_MAIN`), i.e. the town's own assessment history for that parcel.
- `EXP_INSPECT` — inspection appointment/result log.
- `EXP_PHOTOS` — photo index (binary/memo image data lives on the vendor's own image server per the manifest note "located on inaccessible server" — the JSON export is just filenames/IDs, not the images).

**Comparables/valuation-engine configuration** (not property facts — describes the software's cost/comp model): `EXP_COMPSET`, `EXP_COMPFACT`, `EXP_COMPCLUD`, `EXP_COSTABLS`, `EXP_COSTEQU`, `EXP_COSTFACT`, `EXP_COSTSET`, `EXP_CT_LIST`, `EXP_REPLIST`. These are large (the commercial `EXP_COSTABLS` alone is ~7.5MB in the sample) and carry no per-parcel geographic or classification value — **candidates to exclude** from any standardized statewide extract.

## 5. The self-describing schema: `DATADICT` / `CATEG`, and why it matters

`EXP_DATADICT` is MSOL's own internal metadata table — literally a row per field, per table, per installation, giving `fac_id`, `field_name`, `clabel` (the UI label the assessor sees), `field_type`/`field_len`, `table_id`, and `cframe_nam` (which data-entry tab it appears on: "Parcel", "Land/OB", "Valuation", etc.). Example from the sample (`fac_id 7`): `field_name="PROP_LOCAT"`, `clabel="St/Road"`, `table_id="MAIN"`, `cframe_nam="Parcel"`.

`EXP_CATEG` is the accompanying **value lookup table** — `fac_id` + `lev_no` (code) → `lev_name` (label) — the mechanism behind every coded field (siding type, roof style, condition, etc.). `EXP_LOOKUP.json` in this repo is a **hand-curated subset** of what `EXP_CATEG` would show for construction-attribute fields (siding, roof, heating, foundation, condition, quality, land type, outbuilding type, garage type/finish, porch/basement detail) — it is **not sourced from a raw `EXP_CATEG` export** and does **not** cover property-class or land-use category codes.

**Why this matters for schema conversations with NEMRC:** MSOL's "Factor A–K" / `fac_209`–`fac_238` slots that appear generic in the raw column names are **not actually arbitrary per town** — `EXP_DATADICT` is what pins down what they mean in a given install. In the South Burlington sample, they map consistently to specific concepts (Description, Land Size, Prop Class, Cost Update date, etc.), matching the vendor tutorial's own PG1/PG2 annotations. But because this is a per-installation configuration table rather than a fixed schema, **it should not be assumed constant across all ~200 NEMRC towns** without checking each town's own `EXP_DATADICT` — this is a direct, concrete question to put to NEMRC (see [§8](#8-recommended-questions-for-nemrc)).

**Confirmed, not hypothetical, per the Lincoln sample ([§9](#9-the-lincoln-sample-a-second-earlier-simpler-nemrc-extract)):** NEMRC's *first* extract VCGI received (Lincoln, December 2025 — before the South Burlington request) **did not include `EXP_DATADICT` or `EXP_CATEG` at all.** VCGI had to hand-build two substitute files — `EXP_LABELS.json` (field-name → human label) and `EXP_LOOKUP.json` (code → decoded value) — by referencing the vendor tutorial PDF, not by extracting NEMRC's own per-town schema metadata. This is worth stating precisely: the fact that Lincoln's hand-built labels/lookups turned out consistent with South Burlington's real `EXP_DATADICT`/`EXP_CATEG` content ([§9](#9-the-lincoln-sample-a-second-earlier-simpler-nemrc-extract)) is evidence that **VCGI's interpretation of the vendor tutorial is internally consistent**, not independent confirmation that NEMRC's own schema metadata is stable town-to-town — Lincoln never shipped that metadata to compare against in the first place. The concrete, confirmed fact is narrower but still useful: **`EXP_DATADICT`/`EXP_CATEG` are not reliably included in every NEMRC extract**, which should be an explicit ask of NEMRC for any future town request.

## 6. Property classification: two parallel systems

- **Statewide (Tax Dept):** `vt_tax_property_class_codes.csv` / `.json` — the 3-digit `PCCODE` hierarchy (e.g. `100` Primary Year-Round Residence → `101` Single Family; `300` Commercial → `381` Sm Retail Shop; full list in that file).
- **MSOL internal:** `factori` (res/condo) or `prop_class` (comm) numeric field on `EXP_MAIN`.

The sample data shows these **are the same codes** in practice — `factori = "101"` on a residential parcel matches PCCODE 101 exactly. That's a useful confirmation, but it was **observed, not documented** anywhere in the vendor materials — there's no explicit crosswalk table shipped in the extract confirming NEMRC always uses the Tax Dept's PCCODE list verbatim in this field, town-to-town. Worth getting NEMRC to state this in writing, since any statewide reporting keyed on property class (which both Act 164 and Act 170 -style requirements are likely to need — see gap analysis) depends on it.

## 7. Known structural gaps for GIS/statewide reporting

These are gaps identified while building the demo viewer (documented in [readme.md](readme.md)'s "Summary of Interoperability Modeling") plus a few confirmed while writing this document:

1. **No explicit "dwelling units" field at the parcel level.** Unit counts live on `EXP_SECTION.no_of_unit` per building/section and have to be summed/derived; a parcel's overall residential type (single-family vs. duplex vs. 5–8 unit, etc.) isn't a single stored value — it's inferred from property class + section count + unit counts. **Confirmed directly by VCGI:** a genuine `DWELLINGS` field does not exist today at either the CAMA or Grand List level, statewide — it will need to be created at one or both levels to satisfy Act 170's new grand-list column, and the underlying definition of what counts as a "dwelling unit" is itself still being worked out (not just a missing field, but an unsettled business rule). See [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §6.3/§7 for the full state of this question.
2. **Situs address ≠ E911 physical address.** `prop_locat`/`prop_addr` are assessor-entered, often mailing-style, addresses with no key back to E911 site/address points — the only linkage currently possible is a spatial intersect (parcel polygon ∩ E911 points), which the demo viewer does live against `FS_VCGI_OPENDATA_Emergency_ESITE_point_SP_v1`.
3. **SPAN is 1 field per record, not a parent/child structure.** MSOL stores exactly one `parc_span` per `EXP_MAIN` row. When multiple CAMA records share one physical footprint (condos, mixed-use buildings), MSOL has no native "these N units share one lot" grouping — that relationship exists only on the **Grand List / GIS side**, via a separate intersection table that carries both `GIS_SPAN` (the physical/mapped footprint's own identifier) and `GLIST_SPAN` (matches `parc_span` for each stacked unit's tax record). Full detail — including a concrete proposed redesign (`ADMINSPAN`/`GROUNDSPAN`) intended to formalize this relationship — is in [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §§4–6.
4. **Admin/valuation-engine tables should probably never appear in an open-data extract** — `EXP_MSAUDIT` carries user IDs (`cuserid`), and the cost/comparable tables are software config, not facts about the property.
5. **Photos/sketches are not in the tabular extract** — `EXP_PHOTOS`/`MSKETCH`/`SKETCHBMP` are references to binary assets on a separate (vendor-hosted, "inaccessible" per the manifest) image server. Any reporting requirement that expects an actual image (e.g. a sketch or photo delivery requirement) is not satisfiable from the tabular export alone.

## 8. Recommended questions for NEMRC

Concrete, answerable asks for the Chris Miele/Ernie Saunders conversation, derived directly from the ambiguities above:

1. **Confirmed, not just a risk:** `EXP_DATADICT`/`EXP_CATEG` were entirely absent from the Lincoln extract ([§9](#9-the-lincoln-sample-a-second-earlier-simpler-nemrc-extract)) and present in South Burlington's. Can NEMRC commit to including both files in every future town extract as standard practice, and can VCGI receive each town's own copy alongside any future request rather than assuming South Burlington's mapping is universal?
2. Can NEMRC confirm `factori`/`prop_class` is always populated using the Tax Department's `PCCODE` list verbatim (§6), and is there a versioned or maintained crosswalk on their end if it ever diverges?
3. Is there a documented, enforced rule for how SPAN values are assigned to "stacked" records sharing one footprint (condo units, mixed-use buildings) — e.g. is the town/map prefix guaranteed to match across all units on one lot (§7.3)? Is this NEMRC's logic, or purely a lister/Tax-Dept SPAN-assignment convention that NEMRC just stores?
4. Does MSOL have *any* native concept of a parent parcel / unit grouping (e.g. for condos), even if not exposed in the current export, that could be added to an extract instead of requiring a spatial workaround?
5. What is the full code list for `parcstatus` (only `"A"` observed) — does it include an inactive/retired-parcel status that would let VCGI align it with the GIS "inactive parcels" layer without a spatial join?
6. Can the export add/expose a genuine "dwelling units" or "residential type" rollup field at the parcel level (§7.1), or is deriving it from `EXP_SECTION` expected to remain the standard?
7. Given both Act 164 and Act 170 (see below) may require new categories of reporting, does NEMRC have a change-request process for adding fields/tables to the standard `EXP_*` export set, and what's the typical lead time?

## 9. The Lincoln sample: a second, earlier, simpler NEMRC extract

*Source: [`cama-explorer-demo-msolve`](../cama-explorer-demo-msolve) (this repo), its own thorough self-documentation in [that folder's `readme.md`](../cama-explorer-demo-msolve/readme.md), and direct S3 sample records fetched from `vtopendata-dev.s3.us-east-2.amazonaws.com/_Other/CAMA/sample-microsolve/` (19 files).*

This was the **first** NEMRC extract VCGI received (December 2025), before the South Burlington request that produced everything documented in §§1–8 above. It's a useful structural cross-check, but with real limits on what it can tell us:

**It's NEMRC's own generic demo data, not real Lincoln property records.** [The sample's own `readme.md`](../cama-explorer-demo-msolve/readme.md) calls it "a dummy cut from NEMRC Microsolve." Confirmed directly: the sample's `EXP_MAIN` records use the *exact same fictitious owner and address* (`parcel_id "01030153000"`, owner `"DOE SAME AND SALLY"`, address `"38 WOOD DR"`, city `"ANYTOWN"`, zip `"05555"`) that appear in NEMRC's own tutorial PDF screenshots (`NEMRC_MSOL_CAMA_Data_Dictionary_V5.pdf`, PG8). This is NEMRC's canned training/demo database, exported and relabeled as "Lincoln" — not town-specific data. It has no multi-family or condo conditions, which is exactly why the more complex South Burlington extract was requested. **Treat this sample as informative about MSOL's schema, not about Lincoln, VT as a place.**

**Table count corroborates the earlier "config vs. property-fact" split (§4).** The Lincoln extract ships only **17 native NEMRC tables** (`EXP_MAIN`, `EXP_SECTION`, `EXP_OUTBUILD`, `EXP_SITEIMP`, `EXP_OYVAL`, `EXP_TRANHIST`, `EXP_PHOTOS`, `EXP_EXTWALL`, `EXP_FEATURES`, `EXP_FLOOR`, `EXP_GARAGE`, `EXP_HEAT`, `EXP_IMPROVE`, `EXP_INSPECT`, `EXP_LAND`, `EXP_PORCH`, `EXP_ROOF`) plus the two VCGI-created substitutes (`EXP_LABELS.json`, `EXP_LOOKUP.json` — see §5's update above), versus 32 tables in South Burlington's residential folder. Every table missing from Lincoln's set — `EXP_CATEG`, `EXP_COMPCLUD`, `EXP_COMPFACT`, `EXP_COMPSET`, `EXP_COSTABLS`, `EXP_COSTEQU`, `EXP_COSTFACT`, `EXP_COSTSET`, `EXP_CT_LIST`, `EXP_DATADICT`, `EXP_ERRPROC`, `EXP_FACEQUIV`, `EXP_MSAUDIT`, `EXP_MSCONFIG`, `EXP_REPLIST`, `EXP_UTILS` — is exactly the set of comparables/cost-engine/admin/config tables already flagged in §4 as software configuration rather than property facts. That NEMRC's own minimal/first-pass extract naturally excluded almost exactly this set is a small but real corroboration that those tables are reasonable candidates to exclude from any standardized statewide CAMA extract.

**Field-level content otherwise matches §3 exactly** — `factori`=101 (Prop Class), `factorh` (Description), `factorj` (Land Size/Acres), `homestead`, `parc_span` in the same `XXX-YYY-ZZZZZ` format, etc. — with Lincoln's own documentation hardcoding its town code as `354` (a second, explicitly-named concrete SPAN example alongside South Burlington's `600`, cited in §3's table above).

## Gap analysis against Act 164 & Act 170

*Based on the official "As Enacted" statutory text for both acts (signed June 18, 2026), not secondary summaries. Full text: [Act 164](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT164/ACT164%20As%20Enacted.pdf) (68 pp.) / [Act 170](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf) (152 pp.).*

**The full legislative gap analysis — including a concrete proposed schema redesign already under discussion between VCGI, the Tax Department, and NEMRC — now lives in [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §§6–7.** That document covers the split parcel/mapping-lot definition (Act 164), the proposed `KIND`/`TYPE`/`ADMINSPAN`/`GROUNDSPAN`/`TAXBILL`/`PARCLCOUNT` fields, the Act 170 classification fields (`NRES_RES_FLV`/`NRES_NONRES_FLV`/`FLR_PCT_HS`/`FLR_PCT_NR`/`FLR_PCT_NN`), and the PVR standards-setting mandate (Act 170 §3417) — all of which are properly Grand-List/GIS-layer concerns, not MSOL CAMA schema concerns per se.

What's specifically **CAMA-relevant** from that broader analysis:

- **"Number of dwelling units"** (Act 170, effective grand lists lodged beginning CY2027) has no source field in MSOL today — only `EXP_SECTION.no_of_unit`, a per-building/section count that would need summing to the parcel level, and which doesn't exist at all on the commercial silo's `EXP_SECTION` (see §7.1 above). This is the nearest deadline of anything in either act.
- **Three-way property tax classification with floor-area proration** (Act 170, 2029, contingent) has no analog in MSOL's binary `homestead` field, though the *mechanics* for percentage-of-building-by-use already exist in the commercial silo (`EXP_OCCUPNCY.occ_perc`, `EXP_BSMTOCCU`) — just not the residential silo, and not mapped to the new three-way classification.
- **Act 170 §3417 directs PVR to set statewide standards for parcel data collection and CAMA/IT software contracts** — the one place either act names CAMA systems directly, and arguably the biggest lever in either act: this documentation effort is now relevant *input* to a rulemaking PVR is statutorily required to do, not just a bilateral NEMRC conversation.

See [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §7 for the consolidated, cross-referenced question list covering both documents.
