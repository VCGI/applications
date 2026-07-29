# Vermont SPAN, Grand List & Parcel GIS Architecture — Current State and Proposed Future State

*Companion to [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md), which documents NEMRC MicroSolve CAMA specifically. This document is about the layer above CAMA: how SPAN is issued and governed, how the statewide Grand List table is structured, how it joins to parcel geometry today, and a concrete proposed redesign (as of a July 27, 2026 VCGI/NEMRC prep workgroup) to meet Act 164 (H.933) and Act 170 (H.955).*

*Sources: the [Vermont GIS Parcel Data Standard v2.3](https://vcgitimterway.github.io/claude-code-demo-day-2/examples/parcel/parcel-standard.html) (Oct. 20, 2016, VCGI); [VCGI/documentation's stacked-polygons workflow doc](https://github.com/VCGI/documentation/blob/b37f3ee7c91fbcade5f7918e1cfdbb6c8726776f/parceldata/parcel_data_stacked_polygons.md), which includes the actual production `JoinGL2Parcels` SQL and the real statewide `GRANDLIST` table's field list; the two published statewide parcel FeatureServer endpoints (Active/Inactive, linked below); [VCGI's Act 68 of 2024 parcels report](https://github.com/VCGI/publications/blob/main/Act68_2024/Act68-2024-Parcels-VCGI_As_Submitted_20241212.md) (submitted Dec. 12, 2024 — the report that first recommended a statewide CAMA data standard and formal vendor submittal requirement, and that flagged unlanded-structure/acreage attribution as an open item); `20260727_Parcel_Definition_Workgroup_NEMRC_Prep_Diagrams.pdf` and `20260518_Parcel_Definition_Workgroup_Source_of_SPAN_Diagram.pdf` (both in this folder); and direct clarification from VCGI staff and Vermont Tax Department colleagues (2026-07-28 and 2026-07-29 conversations) correcting/confirming several points below. Corrections to this document's own prior assumptions are called out explicitly where they occur.*

---

## 1. The end-to-end pipeline — more systems than a first pass suggests

Getting from "a piece of land in Vermont" to "a row in VCGI's published statewide parcel dataset" passes through more separately-governed systems than a first pass suggests. At minimum:

1. **CAMA (valuation/assessment record-keeping)** — town-level, vendor-specific (NEMRC MicroSolve for ~77% of towns; Aumentum/ProVal, Vision, Catalis/AssessPro elsewhere). This is what [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) documents. CAMA's job is appraisal detail (building characteristics, land lines, valuation math) — it does **not** issue SPAN.
2. **Grand List (billing & SPAN issuance)** — a separate NEMRC product ("Grand List module") that, per VCGI's understanding, is used essentially **statewide regardless of which CAMA vendor a town uses**. This is the system that actually generates and maintains SPAN, produces the annual lodged Grand List, and is the record a town submits to the state. **Even towns running Aumentum/Vision/Catalis for CAMA still rely on NEMRC's Grand List module for SPAN.** This is a materially important correction to how MSOL_AS_BUILT.md should be read: NEMRC's role in Vermont property administration is broader than "CAMA vendor for 77% of towns" — they are also the de facto statewide SPAN-issuing authority, independent of CAMA market share.
3. **VCGI's statewide parcel GIS pipeline** — aggregates every town's submitted parcel geometry + Grand List extract, joins them by SPAN via an intersection table and a SQL stored procedure (`JoinGL2Parcels`), and publishes the result as the standardized statewide parcel FeatureServer layers.

Two more systems belong in this picture — **VTPIE** (§1.2) and **NEMRC's much broader municipal-software footprint beyond CAMA/Grand List** (§1.3) — plus a more precise account of how data actually routes between all of these (§1.1).

MSOL's `parc_span` field (documented in MSOL_AS_BUILT.md §3) is simply **whatever SPAN the town's Grand List module assigned** — CAMA stores it, but doesn't generate or govern it.

### 1.1 The full pipeline, town-to-public

*Source: `20260518_Parcel_Definition_Workgroup_Source_of_SPAN_Diagram.pdf` (in this folder) — titled, verbatim, **"AS BUILT?"** by its own authors, with an explicit "?" also placed over the VTPIE box. Treat this as VCGI's own current-best-understanding working model of the existing pipeline, flagged by the workgroup itself as provisional, not a fully confirmed ground truth beyond what's independently corroborated elsewhere in this document (e.g. the real `JoinGL2Parcels` SQL in §4).*

The diagram lays out three tiers — **Town & Vendors → State → Public** — with SPAN originating at the leftmost point ("SOURCE OF SPAN"):

- **NEMRC dB** (the Grand List module's own database) has a **bidirectional** relationship with the **CAMA dB's** (the four vendor CAMA databases — NEMRC MicroSolve, Aumentum/ProVal, Vision, Catalis/AssessPro). The diagram draws this as a two-way arrow, not a one-way "CAMA just reads SPAN from NEMRC" relationship. The exact mechanics of what flows back from CAMA to NEMRC's Grand List database (e.g. valuation totals feeding grand-list value fields, or new-parcel/SPAN requests originating in CAMA) aren't specified in the diagram and are worth confirming directly (§7). Each **CAMA (Vendors)** front-end application separately reads/writes its own **CAMA dB** — the ordinary app-to-its-own-database relationship, not otherwise notable.
- Two **separate extract channels** leave the Town & Vendors tier, and they do **not** travel the same path to the State:
  - **Map Layers (Vendors)** — parcel geometry (Active *and* Inactive layers) produced by GIS/mapping vendors hired by towns (a *different* vendor relationship than the CAMA vendor relationship) — sent to the State on a rolling, per-town basis, not synced to the annual Grand List cycle.
  - **Grand List, other files** — CSV reports generated by NEMRC's Grand List module (fed directly from **NEMRC dB**, per the diagram's own arrow), one of which is the annual Grand List — sent to the **Vermont Department of Taxes**, not directly to VCGI.
- At the **State** tier: the Map Layers extract becomes "Active" Parcels + "Inactive" Parcels + the Intersection Table, all governed by the **GIS Data Standard** (§4). Separately, the Grand List extract becomes the Tax Department's own **"Active" GL** table.
- **VCGI obtains the annual Grand List extract *from the Tax Department*** (not directly from NEMRC or towns) and joins it with **the best available parcel geometry received from each town on a rolling basis** — meaning the Grand List year and the geometry vintage being joined for any given town are not guaranteed to match. This join (formally, the `JoinGL2Parcels` stored procedure documented in §4) combines the GIS-side artifacts with the Tax-Dept-sourced Grand List into the final product: **Statewide Standardized Parcels**, published from the **VCGI dB** to the public.

### 1.2 VTPIE — a third mandatory town platform

Towns are required to use at least three separate software platforms, per VCGI's understanding: **CAMA** (item 1 above), **NEMRC's Grand List module** (item 2 above), and **VTPIE**. VTPIE is used specifically for:

- Sales Ratio and Equalization Study
- Current Use Processing and Grievances
- Collecting Utility Inventories
- Homestead and Lister Response
- Exemption Management

VTPIE **likely also depends on NEMRC for SPAN** — consistent with NEMRC's role as statewide SPAN authority (item 2 above) — but this is **explicitly unconfirmed**: the source diagram itself marks VTPIE with a "?" rather than asserting the relationship. Worth direct confirmation (§7).

### 1.3 NEMRC's broader municipal software footprint

Beyond MSOL CAMA and the Grand List/SPAN-issuing module, NEMRC's product suite also covers, per VCGI's understanding:

- TIF (Tax Increment Financing) Management
- Tax Billing and Municipal Tax Rates
- Grand List Management and Grievances
- Municipal Tax Rate Collections

Worth keeping in view for the redesign conversation: NEMRC's centrality to Vermont municipal tax administration isn't just "CAMA vendor for 77% of towns, and separately the SPAN-issuing authority" — it's infrastructural across most of the municipal finance stack. That's a materially different negotiating position than a single-product CAMA vendor relationship, and worth factoring into how any schema-change ask (§6) is prioritized or sequenced with NEMRC.

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

**Condominium common land convention (existing today):** when common land has no SPAN of its own, `poly_parcels.SPAN` is populated with a synthetic filler: `C-<FIPS6 town code>-<sequence>` (e.g. `C-7085-1` for Williston). This is an existing, narrower analog to what the proposed `GROUNDSPAN` field (§6) would generalize. VCGI's own [Act 68 of 2024 parcels report](https://github.com/VCGI/publications/blob/main/Act68_2024/Act68-2024-Parcels-VCGI_As_Submitted_20241212.md) (submitted 2024-12-12) already recommended broadening this single `C-` prefix into a two-letter type-specific prefix system — e.g. `CO` (condominium), `MH` (mobile home park), `WT` (wind turbine) — followed by the town code and a sequence (e.g. `CO-003-0001`), for uniform synthetic-SPAN attribution of unlanded structures/common interest parcels in the Intersection Table (§3.3.4 of that report). That report also documents four distinct current mapping approaches for unlanded structures/common interest parcels, useful background for §6's proposed model:

| Method | Description | Trade-off |
|---|---|---|
| **Stacked** (current statewide recommendation) | Identical polygons stacked on the same footprint, related via the Intersection Table's `GIS_SPAN`/`GLIST_SPAN` | Simple geometry to maintain; includes common land in total acreage; no visual distinction between unit and common land |
| **Discrete** | Individual building-footprint polygons; common land has **no** SPAN | Visually distinguishes units from common land; avoids GIS/Grand-List SPAN mismatch; time-intensive to build/maintain footprints |
| **Distributed** | Individual building-footprint polygons; common land **does** have its own SPAN | Same trade-offs as Discrete, but common land is independently identified |
| **Points** (used elsewhere, e.g. Dakota County, MN) | One point per tax parcel ID, condos included as points | Some visual distinction without subtracting from total calculated acreage; requires a wholly separate geometry layer; not currently used in VT |

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

**On the `(or 0)*` and `(varies)*` annotations — confirmed, not speculative:** per direct input from Vermont Tax Department staff, municipal practice on stacked-unit acreage genuinely varies in the field: some towns divide the common land's acreage equally across all associated unit records, others assign the full acreage to the common-land record alone and list `0` on each associated unit record. Both practices exist today; there is no single enforced convention. VCGI's own [Act 68 of 2024 parcels report](https://github.com/VCGI/publications/blob/main/Act68_2024/Act68-2024-Parcels-VCGI_As_Submitted_20241212.md) flagged exactly this as an open item (Appendix 5, "Clarify Grand List vs. GIS Acreage Guidance Considerations") well before this workgroup — as of that report, stacked polygons accounted for 27,239 grand list records across 3,254 stacked polygons statewide, representing about 200,457 acres (~3.5% of all parcel acreage).

The `(varies)*` owner annotation reflects a real legal constraint, not just a data-entry inconsistency: under Vermont's Uniform Common Interest Ownership Act, **common-interest property cannot be separately listed on the grand list at all.** Per Tax Department guidance: *"By definition, there is common property involved in condominium ownership, and in property subject to the Uniform Common Interest Ownership Act (UCIOA) contained in Title 27A of the Vermont Statutes Annotated. The assessment of each unit must include the value of that unit's percentage of undivided interest in the common areas and common facilities. [27 V.S.A. § 1322](https://legislature.vermont.gov/statutes/section/27/109/01322) and [27A V.S.A. §§ 1-101 et seq.](https://legislature.vermont.gov/statutes/fullchapter/27A/001). For example, a 100-unit condominium where each unit is purchased without a divided interest in the common land, would be 100 parcels on the grand list, with each parcel having a 1% interest in the common property. The building, land and any common areas and facilities may not be separately listed."* This is consistent with the proposed model's `PARCEL`/`COMMON` record carrying `TAXBILL=NO` — it can exist as a **mapping** entity (since it needs to be represented in GIS) without existing as an independent **billing** entity (since UCIOA prohibits that on the grand list). See also [VCGI's documented current unlanded-structure mapping approaches](https://github.com/VCGI/publications/blob/main/Act68_2024/Act68-2024-Parcels-VCGI_As_Submitted_20241212.md#a331-current-unlanded-structure-and-common-interest-parcel-mapping-practices-in-vermont) (Stacked/Discrete/Distributed/Points, §4 above) for how this plays out geometrically today.

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

**`DWELLINGS` status — confirmed, not speculative:** per direct confirmation from VCGI, `DWELLINGS` genuinely does not exist today at either the CAMA or Grand List level, matching this document's independent finding in §5. It will need to be created at the CAMA level, the Grand List module level, or both — that division of responsibility is not yet decided. More fundamentally, **the actual definition of what constitutes a "dwelling unit" for this purpose is still being worked out** — this isn't just a missing field, it's a not-yet-finalized business rule (e.g., how an accessory dwelling unit, an unfinished basement apartment, or a mixed-use building's residential floor counts). Any recommendation on where to source this field should wait on that definition being settled.

**`LOCALID` status — confirmed, not speculative:** `LOCALID` is an intentional general-purpose placeholder representing whatever municipality-specific identifier a town actually uses — typically a Parcel ID and/or Map ID, which sometimes both exist for the same parcel. Per VCGI: this representation has to persist in the model because municipalities continue to treat their own local identifiers as the "real" unique key, even though **SPAN is the actual statewide unique identifier**. This is worth remembering as a genuine data-quality/adoption risk for the overall redesign, not just a naming choice — local-ID attachment at the municipal level is a real friction point independent of what the schema itself specifies.

`SPAN` and `OWNER1`/`LISTED_AC` (≈ `acresgl`) are not new — they already exist today on the GIS layer and `GRANDLIST` table respectively, and are simply carried through into the new model.

### 6.4 GIS implementation changes (as stated in the workgroup PDF)

- **Elevating "Inactives":** the legacy inactive-parcel geometry layer becomes the active, primary mapping layer representing all "sellable lots" per Act 164/H.933.
- **Retiring complex SQL joins:** embedding `ADMINSPAN`/`GROUNDSPAN` directly in the Grand List means the multi-join `JoinGL2Parcels` stored procedure (§4) "can be drastically simplified or retired."
- **Update of the Parcel Data Standard, guidance, and templates** — v2.3 (§4) would need a substantial revision; possible new tooling, developed jointly with vendors.
- **CAMA data integration:** improved record identification/management is expected to permit a more reliable relationship with detailed CAMA property info — explicitly tied to **32 V.S.A. § 5404**, the existing statutory reporting requirement that is *also* the reason VCGI has been collecting the NEMRC/Aumentum/Vision/Catalis CAMA samples documented in `readme.md` and `MSOL_AS_BUILT.md` in the first place. **This connects the two initiatives:** the CAMA-schema documentation effort and this parcel/SPAN redesign aren't separate tracks — §5404 compliance is the throughline linking both.

## 7. Open questions for the ongoing workgroup

*VCGI, the Tax Department, and NEMRC are already meeting on this — these are gaps identified while reconciling the workgroup's proposal against the actual current-state pipeline documented in §§3–4, not a suggestion that discussion hasn't started.*

1. **Where is `DWELLINGS` implemented, and what counts as a dwelling?** Confirmed (§6.3) that it exists at neither CAMA nor Grand List level today, and that the underlying definition of "dwelling unit" is still being worked out. Once that definition is settled: does NEMRC's Grand List module compute the rollup, does it require a new CAMA export field (e.g. summing MSOL's `EXP_SECTION.no_of_unit`, per MSOL_AS_BUILT.md §7.1), or is it entered manually per parcel by listers?
2. **Same sourcing question for `FLR_PCT_HS`/`FLR_PCT_NR`/`FLR_PCT_NN`.** The percentage-of-building-by-use mechanics already exist in MSOL CAMA's *commercial* silo (`EXP_OCCUPNCY.occ_perc`, per MSOL_AS_BUILT.md §7.3) but not the residential silo, and nothing today maps any CAMA percentage breakdown onto these three specific classification buckets. Where is this computed, and does it require new CAMA export fields from all four VT CAMA vendors, not just NEMRC?
3. **Timing sequencing:** Act 164's parcel-definition change is effective 2028; Act 170's classification fields are effective 2029 (contingent) and regional districts 2031. Does elevating the Inactive layer to primary (§6.4) happen on the 2028 timeline independent of the classification-field work, or are they being implemented as one bundled release?
4. **Does the `e911addr` field on the current `GRANDLIST` table (§3) already solve — or partially solve — the CAMA-to-E911 address gap** flagged in MSOL_AS_BUILT.md §7.2, or is it unreliably populated in practice?
5. **Is NEMRC's Grand List module (not just MSOL CAMA) prepared to originate/expose `ADMINSPAN`, `GROUNDSPAN`, `KIND`, and `TYPE`** — given NEMRC is the SPAN-issuing authority for essentially all VT towns regardless of CAMA vendor (§1), this is arguably a bigger ask of NEMRC's Grand List product than anything asked of MSOL CAMA specifically.
6. Per §6.4's connection to **32 V.S.A. § 5404**: this is directly the same statute behind VCGI's **current, active effort to formalize CAMA data transfer from all four VT vendors as-is** (building on the Act 68 of 2024 report's original recommendation to create a CAMA data standard and require standardized, regular vendor submittal). VCGI expects the Act 164/170 changes documented here will force further changes to that standard's schema and contents once it's formalized — and one explicit purpose of formalizing the as-is transfer first is to see exactly how (or whether) dwelling units are currently handled across vendors' existing data management, directly informing question 1 above.
7. **Stacked-unit acreage attribution (§6.2/§6.3) varies by town today** (equal division vs. full-on-common-record-with-zeros) — does the future-state model intend to standardize this practice, or continue accommodating both?
8. **What exactly flows back from CAMA to NEMRC's Grand List database (§1.1)?** The source diagram draws the NEMRC dB ↔ CAMA dB relationship as bidirectional, not a one-way SPAN handout. Confirming the actual mechanism (API, file exchange, manual re-entry, something else) matters for understanding how reliably CAMA-sourced data (valuations, dwelling counts, floor-area splits) could actually reach the Grand List module in an automated way.
9. **Does VTPIE (§1.2) actually depend on NEMRC for SPAN?** Flagged with a "?" in VCGI's own working diagram — genuinely unconfirmed, not just unlikely.
10. **Geometry/Grand-List timing mismatch (§1.1):** parcel geometry arrives from town-hired mapping vendors on a rolling basis, while the Grand List is joined on an annual cycle via the Tax Department. Worth surfacing as a known data-quality consideration (a given town's published parcel could be joined against geometry and Grand List data from different vintages) independent of anything else in this redesign.

See also `MSOL_AS_BUILT.md` §8's CAMA-specific vendor questions (EXP_DATADICT variability, PCCODE crosswalk confirmation, etc.), which remain relevant independent of this document.
