# NEMRC MicroSolve (MSOL) CAMA — As-Built Data Model

*Compiled from: `NEMRC_MSOL_EXTRACT_CONTENTS.csv`, the three `NEMRC_MSOL_CAMA_*_Data_Dictionary.csv` files, `NEMRC_MSOL_CAMA_Data_Dictionary_V5.pdf` (vendor tutorial, 12-11-2023), `EXP_LOOKUP.json`, `vt_tax_property_class_codes.csv`, the South Burlington sample extract on S3 (`sample-microsolve-sburl/`), and the source of the [demo viewer](https://files.vcgi.vermont.gov/other/demo/cama-sample-microsolve-sburl/index.html). No direct access to the live MSOL application was available — this is a reconstruction, and every inference that isn't directly sourced is flagged as such.*

This document is meant to give VCGI/Tax Dept staff enough of a mental model of MicroSolve's internal structure to have an informed schema/reporting conversation with NEMRC (Chris Miele / Ernie Saunders), independent of the [Act 164 / Act 170 gap analysis](#gap-analysis-against-act-164--act-170) at the end.

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

**Practical consequence:** there is no single "all parcels" table. Any statewide aggregation (what VCGI's demo viewer does) has to fetch all three `EXP_MAIN` files and normalize field names in application code, because the same concept has different column names per silo — e.g. situs address is `prop_locat` in `res`/`condo` but `prop_addr` in `comm`; land size sits in `factorj` in `res` but `land_size` in `comm`. See the demo viewer's `normalize()` function (`cama-data`'s mockup `index.html`, "DATA PIPELINE" section) for the exact mapping VCGI already reverse-engineered.

## 3. The parcel-level parent table: `EXP_MAIN`

One row per taxable record. Field-for-field detail is in the three `NEMRC_MSOL_CAMA_*_Data_Dictionary.csv` files; the load-bearing fields for GIS/statewide work are:

| Concept | `res` / `condo` field | `comm` field | Notes |
|---|---|---|---|
| Record key (CAMA ID / LRSN) | `parcel_id` (C,25) | `parcel_id` | Town-internal ID, e.g. `"0003-00005"`. Not the SPAN. |
| **SPAN** | `parc_span` (C,13) | `parc_span` | e.g. `"600-188-13271"` — 3-3-5 digit town/map/sequence, matches the statewide SPAN format. **This is the field that must join to the parcel GIS layer.** |
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

**Why this matters for schema conversations with NEMRC:** MSOL's "Factor A–K" / `fac_209`–`fac_238` slots that appear generic in the raw column names are **not actually arbitrary per town** — `EXP_DATADICT` is what pins down what they mean in a given install. In the one sample town we have, they map consistently to specific concepts (Description, Land Size, Prop Class, Cost Update date, etc.), matching the vendor tutorial's own PG1/PG2 annotations. But because this is a per-installation configuration table rather than a fixed schema, **it should not be assumed constant across all ~200 NEMRC towns** without checking each town's own `EXP_DATADICT` — this is a direct, concrete question to put to NEMRC (see [§8](#8-recommended-questions-for-nemrc)).

## 6. Property classification: two parallel systems

- **Statewide (Tax Dept):** `vt_tax_property_class_codes.csv` / `.json` — the 3-digit `PCCODE` hierarchy (e.g. `100` Primary Year-Round Residence → `101` Single Family; `300` Commercial → `381` Sm Retail Shop; full list in that file).
- **MSOL internal:** `factori` (res/condo) or `prop_class` (comm) numeric field on `EXP_MAIN`.

The sample data shows these **are the same codes** in practice — `factori = "101"` on a residential parcel matches PCCODE 101 exactly. That's a useful confirmation, but it was **observed, not documented** anywhere in the vendor materials — there's no explicit crosswalk table shipped in the extract confirming NEMRC always uses the Tax Dept's PCCODE list verbatim in this field, town-to-town. Worth getting NEMRC to state this in writing, since any statewide reporting keyed on property class (which both Act 164 and Act 170 -style requirements are likely to need — see gap analysis) depends on it.

## 7. Known structural gaps for GIS/statewide reporting

These are gaps identified while building the demo viewer (documented in `readme.md`'s "Summary of Interoperability Modeling") plus a few confirmed while writing this document:

1. **No explicit "dwelling units" field at the parcel level.** Unit counts live on `EXP_SECTION.no_of_unit` per building/section and have to be summed/derived; a parcel's overall residential type (single-family vs. duplex vs. 5–8 unit, etc.) isn't a single stored value — it's inferred from property class + section count + unit counts.
2. **Situs address ≠ E911 physical address.** `prop_locat`/`prop_addr` are assessor-entered, often mailing-style, addresses with no key back to E911 site/address points — the only linkage currently possible is a spatial intersect (parcel polygon ∩ E911 points), which the demo viewer does live against `FS_VCGI_OPENDATA_Emergency_ESITE_point_SP_v1`.
3. **SPAN is 1 field per record, not a parent/child structure.** MSOL stores exactly one `parc_span` per `EXP_MAIN` row. When multiple CAMA records share one physical footprint (condos, mixed-use buildings), MSOL has no native "these N units share one lot" grouping — that relationship only exists on the **GIS side** (see §9), where the parcel polygon layer carries both `SPAN` (the physical/mapped footprint's own identifier) and `GLIST_SPAN` (matches `parc_span` for each stacked unit's tax record). Whether this SPAN-assignment convention (shared 6-digit town/map prefix, distinct 5-digit sequence per unit) is a hard rule enforced by state SPAN-assignment procedure or just an assessor convention is worth confirming with the Tax Dept / listers, not just NEMRC.
4. **Admin/valuation-engine tables should probably never appear in an open-data extract** — `EXP_MSAUDIT` carries user IDs (`cuserid`), and the cost/comparable tables are software config, not facts about the property.
5. **Photos/sketches are not in the tabular extract** — `EXP_PHOTOS`/`MSKETCH`/`SKETCHBMP` are references to binary assets on a separate (vendor-hosted, "inaccessible" per the manifest) image server. Any reporting requirement that expects an actual image (e.g. a sketch or photo delivery requirement) is not satisfiable from the tabular export alone.

## 8. Recommended questions for NEMRC

Concrete, answerable asks for the Chris Miele/Ernie Saunders conversation, derived directly from the ambiguities above:

1. Is `EXP_DATADICT`'s field-to-label mapping (§5) consistent across all ~200 NEMRC-hosted VT towns, or does it vary by installation/version? If it varies, can VCGI receive each town's own `EXP_DATADICT`/`EXP_CATEG` alongside any future extract, rather than assuming the South Burlington/Lincoln mapping is universal?
2. Can NEMRC confirm `factori`/`prop_class` is always populated using the Tax Department's `PCCODE` list verbatim (§6), and is there a versioned or maintained crosswalk on their end if it ever diverges?
3. Is there a documented, enforced rule for how SPAN values are assigned to "stacked" records sharing one footprint (condo units, mixed-use buildings) — e.g. is the town/map prefix guaranteed to match across all units on one lot (§7.3)? Is this NEMRC's logic, or purely a lister/Tax-Dept SPAN-assignment convention that NEMRC just stores?
4. Does MSOL have *any* native concept of a parent parcel / unit grouping (e.g. for condos), even if not exposed in the current export, that could be added to an extract instead of requiring a spatial workaround?
5. What is the full code list for `parcstatus` (only `"A"` observed) — does it include an inactive/retired-parcel status that would let VCGI align it with the GIS "inactive parcels" layer without a spatial join?
6. Can the export add/expose a genuine "dwelling units" or "residential type" rollup field at the parcel level (§7.1), or is deriving it from `EXP_SECTION` expected to remain the standard?
7. Given both Act 164 and Act 170 (see below) may require new categories of reporting, does NEMRC have a change-request process for adding fields/tables to the standard `EXP_*` export set, and what's the typical lead time?

## Gap analysis against Act 164 & Act 170

*Based on the official "As Enacted" statutory text for both acts (signed June 18, 2026), not secondary summaries. Full text: [Act 164](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT164/ACT164%20As%20Enacted.pdf) (68 pp.) / [Act 170](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf) (152 pp.). Neither act names "SPAN," "GIS," or "MicroSolve" — the mapping below is this document's own inference from statutory parcel/data-collection/classification language onto the MSOL schema described above, not something the legislature specified.*

### Timeline of what's coming

| Provision | Statute | Effective | Schema relevance |
|---|---|---|---|
| New required grand list column: **"number of dwelling units"** | Act 170, 32 V.S.A. §4152(a)(10) | Grand lists lodged beginning **CY2027** (earliest deadline) | Directly hits the gap in [§7.1](#7-known-structural-gaps-for-gisstatewide-reporting) — no atomic dwelling-unit-count field today |
| Split "parcel" definition: ownership/grand-list parcel **vs.** mapping/sellable-lot parcel | Act 164, 32 V.S.A. §4152(a)(3) | April 1, **2028** | Codifies exactly the SPAN vs. GLIST_SPAN distinction already reverse-engineered in [§7.3](#7-known-structural-gaps-for-gisstatewide-reporting) |
| Property tax classification (homestead / nonhomestead residential / nonhomestead nonresidential) + proportional mixed-use rules + dwelling-use attestation | Act 170, 32 V.S.A. §4152a, §5410 | July 1, **2029** — *contingent; auto-repealed if the legislature doesn't enact a tax-rate-multiplier statute by that date* | Extends today's binary `homestead` field into a 3-way classification with floor-space-percentage proration for mixed use |
| Assessment/lien date: April 1 → January 1 (dozens of statutes) | Act 164, Secs. 24–48 | July 1, **2031** | Business-process/date-field change, not a new data element |
| Regional Assessment Districts; **PVR directed to set statewide standards for parcel data collection/recordation and CAMA software/IT contracts** | Act 170, 32 V.S.A. §§3415–3419, esp. §3417(a)(2)-(3) | Districts operate Jan 1, **2031** (rulemaking can start earlier) | The actual regulatory lever that could standardize everything in this document statewide |

### 1. "Number of dwelling units" (CY2027) — the nearest, most concrete requirement

> Act 170, 32 V.S.A. §4152(a)(10): *"A separate column listing the number of dwelling units, as defined pursuant to subdivision 4152a(c)(2) of this title."*

This is the clearest, nearest-term item, and it lands squarely on a gap already identified in §7.1: **MSOL has no single "dwelling units" field on `EXP_MAIN`.** The only source data today is `EXP_SECTION.no_of_unit` (res/condo silos) — a per-building/per-section count that has to be summed across every section on a parcel to get a parcel-level total. The commercial silo doesn't carry `no_of_unit` on `EXP_SECTION` at all; the closest analog is `EXP_SECTION.inc_units` (income-approach unit count) or the occupancy-percentage breakdown in `EXP_OCCUPNCY`, neither of which is guaranteed to equal a literal dwelling-unit count for a mixed-use commercial building with apartments above retail.

**Practical implication:** this is probably a **grand-list software** problem more than a CAMA-export problem — VT municipalities' grand-list software (separate from MSOL, though also often NEMRC's) is what actually produces the lodged grand list. But if that grand-list software is expected to source the count from CAMA, NEMRC needs to either (a) confirm the grand-list module already derives this from `EXP_SECTION`, or (b) add a rolled-up `dwelling_units` field to `EXP_MAIN` so it's exported at the parcel level rather than requiring every consumer to re-derive it from section-level records. Worth asking directly and soon, given the 2027 deadline is the nearest of any of these.

### 2. Split parcel definition (2028) — validates the existing SPAN/GLIST_SPAN model, but exposes its limits

> Act 164, 32 V.S.A. §4152(a)(3): *"'Parcel' means all contiguous land in the same ownership... except for purposes of mapping and per parcel payments... for which 'parcel' means a separate and sellable lot or piece of real estate."*

This is the single most validating piece of legislative language for VCGI's existing interoperability work: the statute is now formally distinguishing exactly the two concepts the demo viewer already models — a **grand-list/ownership parcel** (aggregate of contiguous commonly-owned land, matching how a `parc_span`/`GLIST_SPAN` CAMA record works today) versus a **mapping parcel** (a separate, sellable lot — matching a GIS polygon's own `SPAN`). The readme's existing goal ("moves from the current 'contiguous, aggregate on common ownership' definition to one that maps properties based on the smallest sellable real estate unit") is *literally* what this statute now requires, on a fixed 2028 timeline, not a hypothetical future direction.

**Gap:** MSOL's schema, per §3/§7.3 above, stores exactly one `parc_span` per `EXP_MAIN` record with no native concept of "this record covers N mapping-parcels" or vice versa. Right now that gap is bridged entirely on the **GIS side** (the parcel polygon layer's `SPAN` vs. `GLIST_SPAN` fields) — CAMA itself has no data element for it. Since the statute makes this a matter of *record* (not just a mapping convenience) starting 2028, it's worth asking NEMRC whether MSOL will (or even can, given it's a per-parcel-record desktop schema) natively represent a mapping-parcel identifier distinct from the ownership/grand-list SPAN, or whether Vermont will continue to rely on the GIS layer alone to carry that distinction, as it does today.

### 3. Property tax classification + mixed-use proration (2029, contingent)

> Act 170, 32 V.S.A. §4152a(b): parcels classified as (1) homestead, (2) nonhomestead nonresidential, or (3) nonhomestead residential, with proportional/mixed-use rules "by finished floor space percentage" (§4152a(d)).

Today's `EXP_MAIN.homestead` field is a simple flag (`homestead`/`homestd_va` — observed as binary Yes/No plus a dollar value in the sample). The new law requires a **3-way classification**, plus **proportional splitting of a single parcel across classifications** based on finished floor area — e.g., a building that's part owner-occupied residence, part rental unit. Interestingly, the underlying *mechanics* for percentage-based, floor-area-driven splits already exist in the **commercial silo** — `EXP_OCCUPNCY.occ_perc`, `EXP_BSMTOCCU`, `EXP_COMPONNT` all express type-by-percentage-of-building breakdowns for income-approach valuation — but that machinery doesn't exist in the residential silo, and nothing today maps *any* silo's percentage breakdowns onto the new three-way tax classification.

Also worth flagging: the new **dwelling-use attestation** (replacing/supplementing the homestead declaration under revised §5410) is a taxpayer-filed *declaration*, which in current practice is typically administered through the state's own homestead-declaration system (HS-122 filings to the Tax Department), not entered directly in CAMA — worth confirming with the Tax Department (not just NEMRC) how/whether attestation outcomes are expected to flow back into the CAMA record at all. Since this whole provision is contingent on a 2029 legislative trigger and could be auto-repealed, it's reasonable to flag it as "on the radar" without treating it as a firm requirement yet.

### 4. April 1 → January 1 assessment date (2031)

Mechanical, not structural — no new fields, but every CAMA field/report/workflow implicitly keyed to an "April 1" assessment date (`assess_yea`, inspection cutoffs, sale/validity windows relative to lien date, etc.) will need reconfiguring around a January 1 date on this timeline. Lowest priority of the four given the long runway, but worth a single line item on NEMRC's roadmap ask.

### 5. The real lever: PVR-mandated CAMA/parcel-data standards (regional districts, 2031)

> Act 170, 32 V.S.A. §3417: *"The Director of Property Valuation and Review shall establish standard guidelines and procedures, and may adopt rules, for regional assessment districts, including: ...(2) standards for the collection and recordation of parcel data; (3) requirements relating to information technology, including standards for data software contracts and computer-assisted mass appraisal systems..."*

This is the one place either act names CAMA systems directly, and it's a **direct statutory mandate for PVR to set statewide parcel-data and CAMA/IT standards** — not a suggestion. Regional Assessment Districts (≥10,000 parcels each, joint 6-year reappraisal cycles) don't formally commence until January 1, 2031, but PVR's rulemaking authority under §3417 isn't itself gated to that date, and 2031 will arrive with towns needing a common CAMA data standard to actually operate jointly across a multi-town district.

**This is arguably the most important single fact in this section**: this document (and the underlying interoperability work VCGI has already been doing across NEMRC/Aumentum/Vision/Catalis) is directly relevant *input* to a rulemaking PVR is now statutorily required to do. The practical recommendation is to make sure PVR's Director is aware of this documentation effort and treats it as a resource for drafting the §3417 standards, rather than VCGI working the NEMRC schema question in isolation from that process.

### Updated questions — add to §8's list

8. Given the CY2027 "number of dwelling units" grand-list requirement, does NEMRC's grand-list product already derive that count from MSOL's `EXP_SECTION.no_of_unit`, or would a parcel-level rollup field need to be added to the CAMA export itself?
9. Does NEMRC have a roadmap for supporting the 2029-contingent three-way property tax classification and floor-area-based mixed-use proration, given the commercial silo already has percentage-of-building occupancy tracking that the residential silo lacks?
10. Is NEMRC aware of Act 170 §3417's directive for PVR to set statewide CAMA/IT and parcel-data standards, and would they participate in that process if asked?
