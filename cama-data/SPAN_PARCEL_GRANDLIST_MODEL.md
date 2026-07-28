# Vermont SPAN, Grand List & Parcel GIS Architecture — Current State and Proposed Future State

*Companion to [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md), which documents NEMRC MicroSolve CAMA specifically. This document is about the layer above CAMA: how SPAN is issued and governed, how the statewide Grand List table is structured, how it joins to parcel geometry today, and a concrete proposed redesign (as of a July 27, 2026 VCGI/NEMRC prep workgroup) to meet Act 164 (H.933) and Act 170 (H.955).*

*Sources: the [Vermont GIS Parcel Data Standard v2.3](https://vcgitimterway.github.io/claude-code-demo-day-2/examples/parcel/parcel-standard.html) (Oct. 20, 2016, VCGI); [VCGI/documentation's stacked-polygons workflow doc](https://github.com/VCGI/documentation/blob/b37f3ee7c91fbcade5f7918e1cfdbb6c8726776f/parceldata/parcel_data_stacked_polygons.md), which includes the actual production `JoinGL2Parcels` SQL and the real statewide `GRANDLIST` table's field list; the two published statewide parcel FeatureServer endpoints (Active/Inactive, linked below); and `20260727_Parcel_Definition_Workgroup_NEMRC_Prep_Diagrams.pdf` (in this folder) laying out a proposed data model change. Corrections to this document's own prior assumptions are called out explicitly where they occur.*

---

## 1. Three distinct systems — don't conflate them

Getting from "a piece of land in Vermont" to "a row in VCGI's published statewide parcel dataset" passes through three separately-governed systems, each maintained by a different party:

1. **CAMA (valuation/assessment record-keeping)** — town-level, vendor-specific (NEMRC MicroSolve for ~77% of towns; Aumentum/ProVal, Vision, Catalis/AssessPro elsewhere). This is what [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) documents. CAMA's job is appraisal detail (building characteristics, land lines, valuation math) — it does **not** issue SPAN.
2. **Grand List (billing & SPAN issuance)** — a separate NEMRC product ("Grand List module") that, per VCGI's understanding, is used essentially **statewide regardless of which CAMA vendor a town uses**. This is the system that actually generates and maintains SPAN, produces the annual lodged Grand List, and is the record a town submits to the state. **Even towns running Aumentum/Vision/Catalis for CAMA still rely on NEMRC's Grand List module for SPAN.** This is a materially important correction to how MSOL_AS_BUILT.md should be read: NEMRC's role in Vermont property administration is broader than "CAMA vendor for 77% of towns" — they are also the de facto statewide SPAN-issuing authority, independent of CAMA market share.
3. **VCGI's statewide parcel GIS pipeline** — aggregates every town's submitted parcel geometry + Grand List extract, joins them by SPAN via an intersection table and a SQL stored procedure (`JoinGL2Parcels`), and publishes the result as the standardized statewide parcel FeatureServer layers.

MSOL's `parc_span` field (documented in MSOL_AS_BUILT.md §3) is simply **whatever SPAN the town's Grand List module assigned** — CAMA stores it, but doesn't generate or govern it.

## 2. SPAN: structure and authority

**SPAN = School Property Account Number.** Per the Parcel Data Standard's own definition: *"a unique, state-assigned identification number for each parcel/unlanded building. SPAN number information is critical to database synergy between Vermont GIS parcel data and Grand List data."*

Format: `XXX-YYY-ZZZZZ` (13 characters including dashes) —

- **XXX** — 3-digit town code
- **YYY** — 3-digit **school district code** (explaining the name "School Property Account Number" — the SPAN literally encodes school-district affiliation, which matters for education-property-tax apportionment)
- **ZZZZZ** — 5-digit unique sequence number, generated and maintained by **NEMRC's Grand List module**

*(Correction from an earlier draft of this documentation, which speculated the middle 3 digits were a map/parcel-group reference. This corrected reading — town code / school district code / NEMRC sequence — comes directly from VCGI staff working the parcel-definition workgroup and should be treated as authoritative over the earlier guess.)*

SPAN join comparisons in production are done **with dashes stripped** (`REPLACE(span,'-','')`) — worth remembering if building any SPAN-matching logic, since formatting isn't perfectly consistent source to source.

## 3. The statewide `GRANDLIST` table

This is the real join partner for GIS work — **not** any individual CAMA vendor's export. Per the production `JoinGL2Parcels` stored procedure, `PARCEL_Admin.GRANDLIST` carries (field names as used in the SQL; plain-English gloss is this document's inference from naming convention, not an official field dictionary — worth confirming with the Tax Department if precision matters):

| Field | Likely meaning |
|---|---|
| `span` | The join key — SPAN as lodged in the Grand List |
| `glyear` | Grand List year |
| `tname` | Town name |
| `parcid` | Town-internal parcel/account ID |
| `owner1`, `owner2` | Owner name(s) |
| `addrgl1`, `addrgl2`, `citygl`, `stgl`, `zipgl` | Owner mailing address |
| `descprop` | Property description |
| `locaprop` | Property location/situs |
| `cat` | Property category/class code |
| `rescode` | Residential type code |
| `acresgl` | Listed acreage |
| `real_flv` | Real estate full listed value (total) |
| `hsted_flv` | Homestead full listed value |
| `nres_flv` | **Non**homestead full listed value — the field that Act 170's 3-way classification would split into `NRES_RES_FLV` / `NRES_NONRES_FLV` (see §6) |
| `land_lv`, `imprv_lv` | Land / improvement listed value |
| `equipval`, `equipcode`, `invenval` | Business personal property / equipment / inventory value |
| `hsdecl` | Homestead declaration flag |
| `hsiteval` | Housesite value |
| `vetexamt`, `expdesc`, `enddate`, `statute` | Veteran's/other exemption amount, description, end date, statutory basis |
| `examt_hs`, `examt_nr` | Exemption amount, homestead / nonhomestead |
| `uvreduc_hs`, `uvreduc_nr` | Use-value (Current Use) reduction, homestead / nonhomestead |
| `glval_hs`, `glval_nr` | Grand list value (post-exemption), homestead / nonhomestead |
| `crhouspct` | Current-use housesite percent |
| `mungl1pct` | Municipal grand list allocation percent |
| `aoegl_hs`, `aoegl_nr` | Allocation of education grand list, homestead / nonhomestead |
| `e911addr` | **An E911-linked address field already exists on the statewide Grand List table** |

**Correction to MSOL_AS_BUILT.md §7.2:** that document flags "no key between CAMA situs address and E911 address points" as a gap — true at the **CAMA** level (MSOL's `prop_locat`/`prop_addr` fields have no E911 tie). But the statewide `GRANDLIST` table already carries an `e911addr` column. Whether it's reliably populated with a validated E911-standard address (versus just a copied string) is unconfirmed and worth asking the Tax Department directly — but the field's existence means the E911 linkage problem may already be partially addressed upstream of CAMA, in the Grand List reporting pipeline, rather than needing a net-new field.

`cat`/`rescode` are also very likely the actual source fields behind the "Type of Use"/"Type of Residence" lookup badges in the original `readme.md`'s Property Details Contents table — worth checking whether those are populated from the Tax Dept `PCCODE` list directly or via NEMRC's own crosswalk.

## 4. Current GIS parcel data model (Vermont GIS Parcel Data Standard v2.3, Oct. 2016)

Full standard: [html](https://vcgitimterway.github.io/claude-code-demo-day-2/examples/parcel/parcel-standard.html) / [raw](https://github.com/VCGITimTerway/claude-code-demo-day-2/blob/main/examples/parcel/parcel-standard.html). Two compliance levels — Level 1 (minimum) and Level 2 (adds easements). Each town delivers a `.gdb` or shapefile set named `VTPARCELS_<town>_<YYYY>.gdb`.

**Feature classes / tables required at Level 1:**

| Name | Geometry | Purpose | Key fields |
|---|---|---|---|
| `poly_parcels` | Polygon | **Active** parcels (excludes unlanded structures), ROWs, water boundaries | `SPAN`, `MAPID`, `PROPTYPE`, `MATCHSTAT`, + edit/source metadata |
| `poly_inactive` | Polygon | Inactive parcels + their related active parcel | `STATUS` (ACTIVE/INACTIVE), `PARENTSPAN`, `SPAN`, `MAPID`, `PROPTYPE`, `MATCHSTAT` |
| `line_parcels` | Line | Boundary lines backing `poly_parcels` | `PLTYPE`, `PARCBOUND` |
| Intersection table | Table | Relates Grand List records to `poly_parcels` | `GIS_SPAN`, `GLIST_SPAN`, `YEAR`, `TOWN` |
| `poly_easements` (Level 2 only) | Polygon | Access/utility/etc. easements | `ESMTTYPE` |

**Note the important field-name distinction the standard itself makes explicit:** the note-worthy fields are on the *intersection table*, not directly on `poly_parcels` — `GIS_SPAN` ("the SPAN exactly as attributed in the SPAN field of `poly_parcels`") and `GLIST_SPAN` ("SPAN exactly as listed in the municipality's Grand List... corresponding to GIS_SPAN"). **Duplicate `GIS_SPAN` entries are explicitly valid** — that's the mechanism that produces "stacked polygons" (one physical footprint, many Grand List records), most commonly for condominiums.

**Active vs. Inactive, as currently defined (this is the definition Act 164/H.933 is superseding — see §5):** *"when two or more abutting parcels have the same owner, one of those parcels is considered the main parcel, or active parcel, to which a single collective tax bill is associated for all of the parcels. The other parcels are inactive... Both active and inactive parcels have SPAN numbers."* `poly_inactive` already carries a `PARENTSPAN` field — the SPAN of the related Active parcel — which is functionally a **precursor to the proposed `ADMINSPAN` field** (§6), just scoped only to the inactive-parcel case rather than being a general-purpose linking field.

**Condominium common land convention (existing today):** when common land has no SPAN of its own, `poly_parcels.SPAN` is populated with a synthetic filler: `C-<FIPS6 town code>-<sequence>` (e.g. `C-7085-1` for Williston). This is an existing, narrower analog to what the proposed `GROUNDSPAN` field (§6) would generalize.

**Published statewide layers** (the aggregate product VCGI actually serves, one level up from the raw per-town delivery — this is what the demo CAMA viewer queries):

- Active: `https://services1.arcgis.com/BkFxaEFNwHqX3tAw/ArcGIS/rest/services/FS_VCGI_OPENDATA_Cadastral_VTPARCELS_poly_standardized_parcels_SP_v1/FeatureServer/0`
- Inactive: `https://services1.arcgis.com/BkFxaEFNwHqX3tAw/ArcGIS/rest/services/FS_VCGI_OPENDATA_Cadastral_VTPARCELS_poly_standardized_inactive_SP_v1/FeatureServer/0`

These are produced by the `JoinGL2Parcels` stored procedure: an intersection-table join (`GLIST_SPAN` → Grand List `span`) followed by a join back to `poly_parcels` geometry (`GIS_SPAN` → `SPAN`, with dashes stripped on both sides), duplicating geometry wherever `GIS_SPAN` appears more than once — that's the actual mechanism producing the stacked-polygon effect referenced throughout this documentation and in `MSOL_AS_BUILT.md`.

## 5. Limits of the current model (pre-redesign)

1. **The "Active parcel" is the *old* legal parcel definition** (contiguous land, common ownership — 32 V.S.A. §4152(a)(3) *before* Act 164) — not a "separate and sellable lot," which is what Act 164 now legally requires for mapping purposes starting April 1, 2028. Today's Active/Inactive split already gestures at this distinction (`PARENTSPAN` links an inactive sub-lot to its billing-active parent) but the *primary, published* layer is the aggregated/billing view, not the disaggregated/sellable-lot view.
2. **No dwelling-unit count anywhere in this pipeline** — not on `poly_parcels`, not on the intersection table, and not in the `GRANDLIST` field list in §3. This independently confirms the same gap flagged from the CAMA side in MSOL_AS_BUILT.md §7.1: Act 170's CY2027 "number of dwelling units" grand-list column requirement has **no existing source field anywhere in the current pipeline** — CAMA, Grand List, or GIS.
3. **No 3-way classification or floor-space proration** — `hsted_flv`/`nres_flv` on `GRANDLIST` is a binary homestead/nonhomestead split, matching MSOL CAMA's own binary `homestead` field. Act 170's 3-way classification (homestead / nonhomestead residential / nonhomestead nonresidential) with floor-area proration for mixed use has no analog today at any layer.
4. **`PARENTSPAN` and the condo-common-land SPAN convention are narrower, single-purpose precursors** to what a general `ADMINSPAN`/`GROUNDSPAN` pair would need to do (§6) — they each solve one shape of the multi-record problem (horizontal aggregation, or condo common land specifically) rather than a unified structural model covering both horizontal and vertical multi-record conditions consistently.

## 6. Proposed future-state model (VCGI/Tax Dept/NEMRC workgroup, July 27, 2026)

*From an internal workgroup PDF ("Parcel Definition Workgroup — NEMRC Prep Diagrams"). This is a proposal under active discussion, not an adopted standard — treat field names/domains below as a working draft.*

### 6.1 Core idea: split "Parcel" from "Administrative Parcel"

- **Parcel** ("formerly Inactives") — an index of documented areas in land records; represents a **separate, sellable lot**, matching Act 164's new mapping-purpose parcel definition. VCGI's own read (independent of the workgroup PDF, per direct conversation) is that **elevating the existing "Inactive" layer to become the new primary/active mapping layer** is the most logical path to satisfying this definition, since `poly_inactive` already models sub-lot boundaries today — just not as the *primary* published layer.
- **Administrative Parcel** — contiguous ownership, used for tax billing, Current Use administration, etc. This is essentially today's "Active parcel" concept, renamed and formalized as explicitly *not* the mapping/sellable-lot entity anymore.

### 6.2 Worked examples

**Basic condition (1 lot, 1 owner, 1 dwelling):**

| KIND | TYPE | ADMINSPAN | SPAN | LOCALID | LISTED_AC | PARCLCOUNT | DWELLINGS | OWNER1 | TAXBILL |
|---|---|---|---|---|---|---|---|---|---|
| PARCEL | FULL | 036-011-11979 | 036-011-11979 | A | 5.00 | 1 | 1 | A | NO |
| ADMINPARCL | SINGLE | 036-011-11979 | *(null)* | A | 5.00 | 1 | 1 | A | YES |

Same condition, but a 6-unit apartment building on the one lot — identical structure, `DWELLINGS` carries the count:

| KIND | TYPE | ADMINSPAN | SPAN | LOCALID | LISTED_AC | PARCLCOUNT | DWELLINGS | OWNER1 | TAXBILL |
|---|---|---|---|---|---|---|---|---|---|
| PARCEL | FULL | 036-011-11979 | 036-011-11979 | A | 5.00 | 1 | 6 | A | NO |
| ADMINPARCL | SINGLE | 036-011-11979 | *(null)* | A | 5.00 | 1 | 6 | A | YES |

**"Horizontal"/surface condition** (two physically distinct, documented lots, combined under one ownership for one tax bill — the classic "contiguous parcels combined" case):

| KIND | TYPE | ADMINSPAN | SPAN | GROUNDSPAN | LOCALID | LISTED_AC | PARCLCOUNT | DWELLINGS | OWNER1 | TAXBILL |
|---|---|---|---|---|---|---|---|---|---|---|
| PARCEL | PARTSURFCE | 036-011-11979 | 036-011-11979 | *(null)* | A | 2.00 | 1 | 1 | A | NO |
| PARCEL | PARTSURFCE | 036-011-11979 | 036-011-11980 | *(null)* | A.2 | 3.00 | 1 | 0 | A | NO |
| ADMINPARCL | COMBINED | 036-011-11979 | *(null)* | *(null)* | A | 5.00 | 2 | 1 | A | YES |

Each physical lot keeps its **own distinct SPAN**, but shares one `ADMINSPAN` (the billing entity). The billing record (`COMBINED`) shows `PARCLCOUNT=2`.

**"Vertical"/stacked condition** (one physical footprint, multiple ownership units — a 2-unit condo example):

| KIND | TYPE | ADMINSPAN | SPAN | GROUNDSPAN | LOCALID | LISTED_AC | PARCLCOUNT | DWELLINGS | OWNER1 | TAXBILL |
|---|---|---|---|---|---|---|---|---|---|---|
| ADMINPARCL | PARTSTACKD | 405-126-10169 | 405-126-10169 | 405-126-13918 | A.1 | 2.50 (or 0)* | 1 | 1 | A | YES |
| ADMINPARCL | PARTSTACKD | 405-126-13917 | 405-126-13917 | 405-126-13918 | A.2 | 2.50 (or 0)* | 1 | 1 | B | YES |
| PARCEL | COMMON | 405-126-13918 | 405-126-13918 | 405-126-13918 | A | 5.00 | 2 | 2 | C (varies)* | NO |

Each unit gets its own billing (`ADMINPARCL`) record with its own SPAN, but shares a common `GROUNDSPAN` pointing at the underlying ground/common-element `PARCEL` record (`TYPE=COMMON`). Generalizes cleanly to any number of units (the PDF also shows a 6-unit version: 6 `ADMINPARCL`/`PARTSTACKD` rows sharing one `GROUNDSPAN`, plus one `PARCEL`/`COMMON` row with `PARCLCOUNT=6`, `DWELLINGS=6`).

*The `(or 0)*` and `(varies)*` annotations appear in the source diagrams without an accompanying footnote — this document's inference is that they flag open questions about whether stacked units should each carry a fractional share of total acreage or zero (since they don't have distinct land area), and that common-element ownership is held collectively/variably rather than by one party. Worth confirming directly with the workgroup rather than assuming.*

### 6.3 New field definitions (per the workgroup PDF)

**Structural/relational fields — addressing H.933:**

| Field | Purpose | Domain |
|---|---|---|
| `KIND` | Differentiates physical mapping entities from tax billing entities | `PARCEL`, `ADMINPARCL` |
| `TYPE` | Sub-type of the multi-record condition | `FULL`, `SINGLE`, `PARTSURFCE`, `PARTSTACKD`, `COMBINED`, `COMMON` (full domain as observed across the worked examples) |
| `ADMINSPAN` | Parent key for **horizontal** conditions — links contiguous sub-lots (`TAXBILL=NO`) to their aggregated billing record (`TAXBILL=YES`) | Valid SPAN |
| `GROUNDSPAN` | Foreign key for **vertical** conditions — links unlanded units (`TAXBILL=YES`) to their underlying common ground polygon (`TAXBILL=NO`) | Valid SPAN |
| `TAXBILL` | Boolean flag: does this record generate an actual tax bill (prevents double-billing) | `YES`, `NO` |
| `PARCLCOUNT` | Integer count of "separate and sellable" lots, for State funding calculations | Integer |

**Valuation & classification fields — addressing H.955** (extending the binary homestead split toward the 3-tier proportional system):

| Field | Purpose |
|---|---|
| `NRES_RES_FLV` | Splits out the Nonhomestead **Residential** Full Listed Value (from today's single `nres_flv`) |
| `NRES_NONRES_FLV` | Splits out the Nonhomestead **Nonresidential** Full Listed Value |
| `FLR_PCT_HS` | % of finished floor space allocated to Homestead |
| `FLR_PCT_NR` | % of finished floor space allocated to Nonhomestead Residential |
| `FLR_PCT_NN` | % of finished floor space allocated to Nonhomestead Nonresidential |

**Open question this document flags:** `DWELLINGS` appears in every worked example above, but is **not** listed in either of the two "new attribute" summary tables (neither the H.933 structural table nor the H.955 valuation table). Given §5 confirms no dwelling-count field exists anywhere in the current pipeline, and Act 170 requires one starting with grand lists lodged in CY2027, this looks like either (a) an intentional omission because it's being tracked elsewhere, or (b) a gap in the two summary tables as presented. Worth a direct, explicit confirmation with the workgroup on where `DWELLINGS` is formally specified and who's responsible for populating it (see §7). Likewise, `LOCALID` appears in every worked example's table but isn't in either new-field table and isn't a field in the current Parcel Data Standard (which has `MAPID`, not `LOCALID`) — the diagrams' own annotations show a real `MAPID` value alongside a separately-formatted "PARCEL ID," suggesting `LOCALID` in these tables may be a simplified illustrative stand-in rather than a literal proposed field name; worth the same direct confirmation. `SPAN` and `OWNER1`/`LISTED_AC` (≈ `acresgl`) are not new — they already exist today on the GIS layer and `GRANDLIST` table respectively, and are simply carried through into the new model.

### 6.4 GIS implementation changes (as stated in the workgroup PDF)

- **Elevating "Inactives":** the legacy inactive-parcel geometry layer becomes the active, primary mapping layer representing all "sellable lots" per Act 164/H.933.
- **Retiring complex SQL joins:** embedding `ADMINSPAN`/`GROUNDSPAN` directly in the Grand List means the multi-join `JoinGL2Parcels` stored procedure (§4) "can be drastically simplified or retired."
- **Update of the Parcel Data Standard, guidance, and templates** — v2.3 (§4) would need a substantial revision; possible new tooling, developed jointly with vendors.
- **CAMA data integration:** improved record identification/management is expected to permit a more reliable relationship with detailed CAMA property info — explicitly tied to **32 V.S.A. § 5404**, the existing statutory reporting requirement that is *also* the reason VCGI has been collecting the NEMRC/Aumentum/Vision/Catalis CAMA samples documented in `readme.md` and `MSOL_AS_BUILT.md` in the first place. **This connects the two initiatives:** the CAMA-schema documentation effort and this parcel/SPAN redesign aren't separate tracks — §5404 compliance is the throughline linking both.

## 7. Open questions for the ongoing workgroup

*VCGI, the Tax Department, and NEMRC are already meeting on this — these are gaps identified while reconciling the workgroup's proposal against the actual current-state pipeline documented in §§3–4, not a suggestion that discussion hasn't started.*

1. **Who populates `DWELLINGS`, and from what source?** Neither MSOL CAMA (per MSOL_AS_BUILT.md §7.1 — only has `EXP_SECTION.no_of_unit` per building/section, no parcel-level rollup) nor the current `GRANDLIST` table (§3) nor the current GIS pipeline (§5) has a dwelling-count field today. Does NEMRC's Grand List module compute it (and from where), does it need a new CAMA export field, or is it entered manually per parcel by listers?
2. **Same question for `FLR_PCT_HS`/`FLR_PCT_NR`/`FLR_PCT_NN`.** The percentage-of-building-by-use mechanics already exist in MSOL CAMA's *commercial* silo (`EXP_OCCUPNCY.occ_perc`, per MSOL_AS_BUILT.md §7.3) but not the residential silo, and nothing today maps any CAMA percentage breakdown onto these three specific classification buckets. Where is this computed, and does it require new CAMA export fields from all four VT CAMA vendors, not just NEMRC?
3. **Confirm `DWELLINGS` and `LOCALID`'s status** as flagged in §6.3 — are they formally specified new fields that were simply omitted from the two summary tables shown, or is `LOCALID` an illustrative stand-in for `MAPID`?
4. **Timing sequencing:** Act 164's parcel-definition change is effective 2028; Act 170's classification fields are effective 2029 (contingent) and regional districts 2031. Does elevating the Inactive layer to primary (§6.4) happen on the 2028 timeline independent of the classification-field work, or are they being implemented as one bundled release?
5. **Does the `e911addr` field on the current `GRANDLIST` table (§3) already solve — or partially solve — the CAMA-to-E911 address gap** flagged in MSOL_AS_BUILT.md §7.2, or is it unreliably populated in practice?
6. **Is NEMRC's Grand List module (not just MSOL CAMA) prepared to originate/expose `ADMINSPAN`, `GROUNDSPAN`, `KIND`, and `TYPE`** — given NEMRC is the SPAN-issuing authority for essentially all VT towns regardless of CAMA vendor (§1), this is arguably a bigger ask of NEMRC's Grand List product than anything asked of MSOL CAMA specifically.
7. Per §6.4's connection to **32 V.S.A. § 5404**: is there a formal deliverable/timeline tying the CAMA-vendor documentation effort (this repo) to this parcel/SPAN redesign, or are they being tracked as informally-related but separately-timed efforts?

See also `MSOL_AS_BUILT.md` §8's CAMA-specific vendor questions (EXP_DATADICT variability, PCCODE crosswalk confirmation, etc.), which remain relevant independent of this document.
