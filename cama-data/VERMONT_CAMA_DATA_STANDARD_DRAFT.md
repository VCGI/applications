# Vermont CAMA Data Standard — Preliminary Draft

*Status: a preliminary, VCGI-authored synthesis — not an adopted standard, not yet reviewed by the Tax Department, NEMRC, or the other CAMA vendors. Intended as a concrete starting point for that review, and as candidate input to PVR's rulemaking authority over "standards for the collection and recordation of parcel data" and "requirements relating to information technology, including standards for data software contracts and computer-assisted mass appraisal systems" ([Act 170 §3417](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf); see [SPAN_PARCEL_GRANDLIST_MODEL.md §6.5](SPAN_PARCEL_GRANDLIST_MODEL.md#65-regional-assessment-districts-and-pvrs-rulemaking-mandate-act-170-3417)).*

*Built from every source already assembled in this repository: the real vendor extracts documented in [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) (NEMRC MicroSolve), [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) (Aumentum ProVal), and [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md) (Catalis AssessPro); the NEMRC Grand List Module's real export to the Tax Department, documented in [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md); the confirmed, live schema of VCGI's published statewide parcel layers and the statewide `GRANDLIST` table, documented in [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §3–§4; the proposed Act 164/170 `KIND`/`TYPE`/`ADMINSPAN`/`GROUNDSPAN`/`TAXBILL`/`PARCLCOUNT`/`DWELLINGS`/`FLR_PCT_*` model, documented in that same file's §6; findings from [VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md); and VCGI's own first-pass CAMA data standard proposal, [Recommendation 3 of the Act 68 of 2024 parcels report](https://github.com/VCGI/publications/blob/main/Act68_2024/Act68-2024-Parcels-VCGI_As_Submitted_20241212.md#recommendation-3-implement-vermont-cama-data-standard-and-require-submittal-to-state) (submitted 2024-12-12), which this draft builds on and extends rather than replaces.*

---

## 1. Purpose and relationship to the Act 68 of 2024 proposal

VCGI's Act 68 of 2024 report already recommended, in general terms, that Vermont adopt a CAMA data standard and require regular vendor submittal, and proposed a first-phase schema (its own Table 1: `SPAN`, `YearBuilt`, `YearReno`, `TotFinSqFt`, `Heat1ID`/`Heat1Pct`, `Heat2ID`/`Heat2Pct`, `TotRooms`, `Bdrms`, `FullBths`, `ThrQtBths`, `HalfBths`, `Ktchns`, `PctCmplt`, `UnitCnt`, `StoryCnt`, `UnlndCode`) plus a two-letter unlanded-structure prefix system (its Table 2: `CO`, `CA`, `MH`, `SA`, `WT`). That proposal was necessarily abstract — it predates the vendor extracts, the real NEMRC Grand List export sample, the confirmed live published-layer schema, and the Act 164/170 workgroup's structural redesign, all of which have since been directly examined in this repository.

**This document does not replace that proposal — it carries it forward, field for field, into a fuller schema now that real evidence exists to check it against**, and folds in three things the 2024 proposal couldn't have anticipated: (1) the Act 164/170 structural fields (`KIND`/`TYPE`/`ADMINSPAN`/`GROUNDSPAN`/`TAXBILL`/`PARCLCOUNT`), (2) confirmed, real gaps and inconsistencies found by directly examining vendor and NEMRC data (e.g., three different, mutually inconsistent category-code abbreviation systems already in live use), and (3) fields identified as necessary in the Tax Department's own 2020–2024 VTPIE CAMA Requirements planning that were never built but remain relevant regardless of that project's status (e.g., a universal Active/Inactive `Status` field, `NumberofDwellings`, Safe-At-Home address suppression).

## 2. Design principles

1. **Ground every field in real, confirmed evidence** — either an existing field already in production use by at least one VT CAMA vendor or the NEMRC Grand List module, or an explicit, named legislative requirement (Act 164/170), or a specific, cited gap already found in this documentation effort. No field here is speculative.
2. **One canonical name and domain per concept.** Multiple sources already documented use different names/abbreviations for the same underlying concept (category codes have three variants; owner-residency codes use both `N` and `NS` for the same value). This standard picks one canonical name/domain per concept and documents the variants it supersedes, rather than adding a fourth variant.
3. **Phase what's actually urgent separately from what depends on later legislative triggers.** Fields required to satisfy the existing, already-effective [32 V.S.A. §5404(b)](https://legislature.vermont.gov/statutes/section/32/135/05404) extract requirement and the 2028 Act 164 parcel-definition change are Phase 1. Fields that only make sense once Act 170's contingent 2029 classification rollout takes effect are Phase 2.
4. **Prefer adopting a field already proven in production somewhere in Vermont over inventing a new one.** Where a vendor-native field already does most of the job (e.g., ProVal's `ResLivingUnits`, NEMRC's own provenance/edit-lineage fields already used on the published GIS layer), this standard recommends adopting it rather than requiring a parallel, redundant field.
5. **Don't require what the current pipeline has already shown doesn't work.** Several fields already documented as "not well maintained" or structurally unreliable (`RESCODE`, `LOCAPROP`, TIF aggregate totals that commingle active/inactive values) are called out explicitly, with a recommended fix baked into the standard itself rather than silently carried forward.

## 3. Phasing

- **Phase 1 (near-term — aligned with the already-effective §5404(b) extract requirement and Act 164's April 1, 2028 parcel-definition change):** all structural/relational fields, identification, ownership/address, property description/category, building/improvement detail, exemption codes, status/taxable-status, and data-provenance fields (§5.1–§5.4, §5.6, §5.8 below).
- **Phase 2 (contingent — aligned with Act 170's July 1, 2029 three-way classification, itself contingent on further legislative action):** the classification/floor-area fields (§5.5) and personal-property detail beyond what Phase 1 already needs for basic exemption handling (§5.7).
- Fields flagged **"privacy/urgent — recommend Phase 1 regardless of legislative timeline"** (Safe-At-Home suppression) are called out as such, since they concern real people's safety, not a legislative trigger date.

## 4. The proposed schema

### 4.1 Identification & structural/relational fields (Phase 1)

| Field | Description | Type (length) | Domain/Example | Nullable | Source/precedent |
|---|---|---|---|---|---|
| `SPAN` | Unique statewide parcel identifier | String (13) | `036-011-11979` | **No** — the only universally required field, per both this standard and the 2024 Act 68 proposal | Confirmed on every schema examined |
| `PARCID` | Town-internal parcel/account ID | String (50) | — | Yes | Raw NEMRC `411_gl`; VTPIE CAMA Export |
| `LOCALID` | General-purpose placeholder for whatever local ID a town actually uses (Map/Block/Lot, etc.) — towns persistently treat this as their "real" key even though SPAN is the statewide one | String | — | Yes | [SPAN_PARCEL_GRANDLIST_MODEL.md §6.3](SPAN_PARCEL_GRANDLIST_MODEL.md#63-new-field-definitions-per-the-workgroup-pdf); VTPIE's separate `Parcel ID`/`CAMA ID`/Map-Block-Lot fields — this standard folds those into one general field rather than three |
| `KIND` | Differentiates physical mapping entities from tax-billing entities | String (domain) | `PARCEL`, `ADMINPARCL` | No | July 2026 workgroup proposal |
| `TYPE` | Sub-type of the multi-record condition | String (domain) | `FULL`, `SINGLE`, `PARTSURFCE`, `PARTSTACKD`, `COMBINED`, `COMMON` | No | Same |
| `ADMINSPAN` | Parent key for horizontal (contiguous multi-lot) conditions | String (13) | Valid SPAN | Yes (null on standalone `FULL` records) | Same. **Independently corroborated by two earlier, separate designs**: the GIS layer's existing `PARENTSPAN` field and VTPIE's own 2020-era `Contiguous SPANs` field — see [VTPIE analysis §3.1](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#31-direct-corroboration-of-the-inactive-record-needs-a-pointer-to-its-active-parent-concept--independently-from-2020-not-just-the-2026-workgroup) |
| `GROUNDSPAN` | Foreign key for vertical (stacked/condo) conditions, linking units to their common-ground record | String (13) | Valid SPAN, real or synthetic (§4.6) | Yes | July 2026 workgroup proposal |
| `TAXBILL` | Does this record generate an actual tax bill (prevents double-billing) | Boolean | `YES`/`NO` | No | Same |
| `PARCLCOUNT` | Count of separate, sellable lots represented — feeds [32 V.S.A. §4041a](https://legislature.vermont.gov/statutes/section/32/129/04041a)/[§5405](https://legislature.vermont.gov/statutes/section/32/135/05405) per-parcel payment calculations | Integer | — | No | Same |
| `STATUS` | **Active/Inactive status, on every record, for every town** | String (domain) | `ACTIVE`, `INACTIVE` | No | Already exists on the published GIS `poly_inactive` layer; **already specified once, statewide, in VTPIE's 2020–2024 CAMA Export design and never built** — see [VTPIE analysis §4.1](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#41-the-single-most-important-field-in-this-whole-document-status). **This is the single highest-value field in this entire standard**: it directly closes the confirmed gap that Active/Inactive status is currently exported to the Tax Department only for TIF-district towns ([NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §7](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#7-tif-files-and-the-critical-activeinactive-parcel-finding)) |
| `TAX_STATUS` | Taxable status — kept **separate and orthogonal** from `STATUS` | String (domain) | `T` (Taxable), `N` (NonTaxable), `S` (State Owned) | No | VTPIE's `Tax Status` field, added 2024; matches the taxable/non-taxable/statutory concept in NEMRC's own `411TFP.PACTIVE`, which this standard deliberately does **not** replicate as a single overloaded field — see [VTPIE analysis §4.4](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#44-confirmed-matches-to-already-documented-nemrc-side-fields--evidence-the-2024-revision-was-grounded-in-nemrcs-real-data) |

### 4.2 Ownership & address fields (Phase 1, except where noted)

| Field | Description | Type (length) | Domain/Example | Source/precedent |
|---|---|---|---|---|
| `OWNER1`, `OWNER2` | Owner name(s) | String (200) | — | Universal across every schema examined |
| `RESCODE` | Owner-residency code | String (domain) | `T` (Town resident), `S` (State resident), `NS` (Not a VT resident), `C` (Corporation/partnership/other entity) | Standardizes on `NS`, not the single-letter `N` used inconsistently in VTPIE's own requirement text (§5 below) — avoiding confusion with "Non-Residential"/"Nonhomestead" terminology already flagged as ambiguous ([SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table)) |
| `MAILADDR1`, `MAILADDR2`, `MAILCITY`, `MAILSTATE`, `MAILZIP` | Owner mailing address | String | — | Confirmed on raw NEMRC `411_gl` and the published layer (as `ADDRGL*`/`CITYGL`/etc.) |
| `OWNER_SUPPRESSED` | **Address-confidentiality flag (Safe At Home)** | Boolean | `TRUE`/`FALSE` | **Privacy/urgent — recommend Phase 1 regardless of legislative timeline, now confirmed as a real, currently-mitigated gap, not a hypothetical.** No such field exists anywhere in the confirmed live `GRANDLIST`/published-layer schema, even though VCGI's own statewide layer publishes owner mailing addresses. **Confirmed by VCGI:** Vermont's Safe At Home program is real and stewarded by the Vermont Secretary of State; today, VCGI checks with the Secretary of State upon receipt of each annual Grand List file from the Tax Department for any necessary redactions and applies them before publishing the joined Grand List/parcel table, and the Tax Department has separately begun its own checks with the Secretary of State before sharing the Grand List elsewhere. **Both of those are downstream, reactive mitigations, not a substitute for source-level suppression** — per VCGI, suppression capability should still be implemented at the source: each Vermont municipality's own CAMA/Grand List data entry. From VTPIE's `Owner Suppressed` field — see [VTPIE analysis §4.3](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#43-new-fields-with-no-precedent-in-either-previously-documented-schema) |
| `BILLADDR1`, `BILLADDR2`, `BILLCITY`, `BILLSTATE`, `BILLZIP` | Billing address, only populated when distinct from the mailing address | String | — | New, from VTPIE — no equivalent in any schema examined so far; nullable, defaults to mailing address when absent |
| `SITUSADDR1`, `SITUSADDR2`, `SITUSCITY`, `SITUSSTATE`, `SITUSZIP` | Structured, five-part situs (E-911) address | String | — | Richer than today's single `E911ADDR` string field; from VTPIE's structured proposal. **Lives on the `PARCEL` record, not the `ADMINPARCL` billing record** — this is how the standard resolves VTPIE's own "multiple situs addresses for merged parcels" requirement (PM-21) structurally, since each constituent `PARCEL` already carries its own `SPAN`/`LOCALID` under the `KIND`/`TYPE` model (§4.1) — see [VTPIE analysis §3.3](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#33-pm-21-multiple-situs-addresses-for-merged-parcels-is-a-concrete-argument-for-the-proposed-parceladministrative-parcel-split) |

### 4.3 Property description & category (Phase 1)

| Field | Description | Type (length) | Domain/Example | Source/precedent |
|---|---|---|---|---|
| `DESCPROP` | Legal/physical property description | String (400) | — | Universal |
| `CATCODE` | Property category, using the **canonical 16-category list** (§5 below) | String (2) | `1`–`16` | Reconciles three competing abbreviation systems already in live use — see §5 |
| `ACRES` | Total listed acreage | Decimal (10,2) | — | Universal |
| `REAL_FLV`, `LAND_LV`, `IMPRV_LV` | Real estate full listed value; land value; improvement value | Integer | — | Universal |
| `LASTREAPPRAISAL` | Date of the parcel's/town's last reappraisal | Date | — | New, from VTPIE — no equivalent in any schema examined. Directly relevant to Act 170's Regional Assessment Districts, which require member towns to fully reappraise every six years starting 2031 ([SPAN_PARCEL_GRANDLIST_MODEL.md §6.5](SPAN_PARCEL_GRANDLIST_MODEL.md#65-regional-assessment-districts-and-pvrs-rulemaking-mandate-act-170-3417)) — see [VTPIE analysis §4.3](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#43-new-fields-with-no-precedent-in-either-previously-documented-schema) |

### 4.4 Building/improvement detail (Phase 1 — carried forward directly from the Act 68 2024 proposal)

These are the 2024 Act 68 report's own Table 1 fields, carried forward essentially unchanged — real-world evidence gathered since then hasn't surfaced a reason to redesign them, only to note one important convergence (below):

| Field | Description | Type (length) | Example |
|---|---|---|---|
| `YEARBUILT` | Actual year built | Integer (4) | `1950` |
| `YEARRENO` | Year of most recent renovation | Integer (4) | `2003` |
| `TOTFINSQFT` | Total finished square footage | Decimal (10) | `4500` |
| `HEAT1ID`, `HEAT1PCT` | Primary heat/cool source and its usage percent | String (30, domain) / Integer (3) | `Heat Pump`, `75` |
| `HEAT2ID`, `HEAT2PCT` | Secondary heat/cool source and its usage percent | String (30, domain) / Integer (3) | `Forced Air`, `25` |
| `TOTROOMS`, `BDRMS`, `FULLBTHS`, `THRQTBTHS`, `HALFBTHS`, `KTCHNS` | Room/bath/kitchen counts | Integer (5) | — |
| `PCTCMPLT` | Percent of structure complete | Integer (3) | `100` |
| `STORYCNT` | Story count | Integer (3) | `2` |
| `UNLNDCODE` | Unlanded-structure type prefix, if applicable | String (2, domain) | `CO`, `CA`, `MH`, `SA`, `WT` (§5) |
| `MOBILEREGNUM`, `MOBILESERIALNUM`, `MOBILEMODEL`, `MOBILEMFR` | Mobile/manufactured-home-specific identification | String (100) | — | New, from VTPIE — no equivalent in Act 68's original proposal or any vendor schema examined, despite `MH` already being a recognized category everywhere. Phase 1 only for parcels coded `UNLNDCODE=MH`. |

**`UNITCNT` — the field most likely to resolve the `DWELLINGS` question, triangulated from three independent sources:**

| Field | Description | Type (length) |
|---|---|---|
| `UNITCNT` | Count of inhabitable units within the structure | Integer (5) |

Act 68's 2024 proposal already specified `UnitCnt` ("count of inhabitable units within structure") — a field that, read plainly, already answers Act 170's 2027 "number of dwelling units" grand-list requirement, **without needing to invent a separate `DWELLINGS` field.** This is now independently corroborated by three separate lines of evidence gathered since: VTPIE's own `NumberofDwellings` field (2020–2024, never built — [VTPIE analysis §4.2](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#42-numberofdwellings--a-pre-existing-already-specified-answer-to-the-dwellings-gap)), Aumentum ProVal's native `ResLivingUnits` field (already in production, unused by VCGI's own dwelling-count methodology — [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) §4), and Catalis AssessPro's native `Rental Living Units` field ([ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md)). **Recommendation: adopt `UNITCNT` as the canonical field name, and confirm directly with Aumentum and Catalis whether their existing native fields can simply be renamed/mapped to it**, rather than requiring all four vendors to build something new.

**The underlying definitional question is now legally settled — but settling it revealed that a simple count isn't actually sufficient.** The Tax Department's published "Dwelling Unit Determination" guidance (August 13, 2026, [`reference/dwelling-unit-determination-aug-13-2026.md`](reference/dwelling-unit-determination-aug-13-2026.md); full discussion in [SPAN_PARCEL_GRANDLIST_MODEL.md §6.3](SPAN_PARCEL_GRANDLIST_MODEL.md#63-new-field-definitions-per-the-workgroup-pdf)) defines a dwelling unit as requiring a separate entrance, habitability facilities (sleeping/cooking/sanitary), and — the part with no analog in any field examined so far — being **fit for year-round habitation** (adequate heating, weatherization, usable plumbing, reasonable year-round access), a lister judgment call based on "the overall facts and circumstances," explicitly independent of zoning/permitting and of Homestead status. None of `ResLivingUnits`, `Rental Living Units`, or the never-built `NumberofDwellings` are documented anywhere as capturing a habitability determination — they are simple unit counts. **This means `UNITCNT` alone, however it's sourced, likely cannot satisfy the legal definition on its own** — a genuine per-unit habitability determination (a new field, or a business rule applied before the count is entered) appears to be needed in addition to the count itself. Worth resolving directly with the Tax Department and all four CAMA vendors before finalizing this field, rather than assuming a rename/remap is sufficient.

### 4.5 Valuation & classification (Phase 2 — contingent on Act 170's 2029 rollout)

| Field | Description | Type (length) |
|---|---|---|
| `HSTED_FLV` | Homestead full listed value | Integer |
| `NRES_RES_FLV` | Nonhomestead **residential** full listed value | Integer |
| `NRES_NONRES_FLV` | Nonhomestead **nonresidential** full listed value | Integer |
| `FLR_PCT_HS`, `FLR_PCT_NR`, `FLR_PCT_NN` | Percent of finished floor space allocated to homestead / nonhomestead-residential / nonhomestead-nonresidential | Percent (integer) |
| `HSDECL` | Homestead declared | `Y`/`N` |
| `CRHOUSPCT` | Covenant-restricted housing percent | Decimal |

**On terminology:** this standard deliberately does **not** reuse "Non-Residential" as a label anywhere in the 3-way split, even though that's the alias already in use on the current published `NRES_FLV` field ([SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table)) and independently in VTPIE's own 2020s design (`Non Residential Total Value`, [VTPIE analysis §4.4](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#44-confirmed-matches-to-already-documented-nemrc-side-fields--evidence-the-2024-revision-was-grounded-in-nemrcs-real-data)). Both existing systems use "Non-Residential" to mean "nonhomestead" (which includes plenty of actual residential property — rentals, second homes) — exactly the ambiguity Act 170's genuine residential/nonresidential split is meant to resolve. Using `NRES_RES_FLV`/`NRES_NONRES_FLV` (already the July 2026 workgroup's own naming) avoids perpetuating that ambiguity into the new fields themselves.

Floor-area-percentage mechanics already exist today in MSOL CAMA's commercial silo (`EXP_OCCUPNCY.occ_perc`, per [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) §7.3) but not its residential silo — extending the same mechanism residential-side, rather than building something new, is the recommended path for `FLR_PCT_*`.

### 4.6 Exemptions (Phase 1)

| Field | Description | Type (length) | Domain |
|---|---|---|---|
| `EXPCODE_SPEC` | Special exemption code | Integer | 1–9, 16 (Act 181, GL2026) |
| `EXPCODE_STND` | Standard exemption code | Integer | 1–7 |
| `EXPSTATUTE` | Exemption's statutory citation | String | — |
| `EXP_END` | Exemption ending date | Date | — |
| `VETEXAMT` | Veterans exemption amount | Integer | $10,000–$40,000 |

**Recommendation: carry the numeric codes, not a resolved text description, at the CAMA layer.** The raw NEMRC export carries only these two numeric codes; a resolved `EXPDESC` text field only appears later, once the Tax Department transforms the data for publication ([SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table) reconciliation; [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §9](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#9-the-transformation-step-between-nemrcs-raw-export-and-what-vcgi-receives)). Requiring every CAMA vendor to independently maintain resolved exemption text risks four vendors drifting out of sync with each other's wording; a single, centrally-maintained code-to-text lookup (the existing `411_NEMRC_STD_AND_SPEC_EXP.csv`-style table) applied once, downstream, is more maintainable.

### 4.7 Personal property (Phase 1 for towns with a personal property tax; Phase 2 detail otherwise)

| Field | Description | Type (length) | Domain |
|---|---|---|---|
| `EQUIPVAL` | Equipment value (personal property) | Integer | — |
| `EQUIPCODE` | Equipment code | String (1) | `C` if cable property |
| `INVENVAL` | Inventory value | Integer | — |

**Business rule worth documenting alongside the schema, not just in it:** cable personal property is exempt on the municipal grand list but taxable for education — per VTPIE's own `PP-4` requirement note. This asymmetry is why `EQUIPCODE` needs to distinguish cable from other equipment in the first place, not merely a coding convenience.

### 4.8 Status, taxable status & data provenance (Phase 1)

| Field | Description | Type (length) | Domain |
|---|---|---|---|
| `TAXYEAR` | Tax year of the record | Integer (4) | `YYYY` |
| `INSURANCEVALUEINDICATOR` | Whether the valuation was generated using an insurance replacement value or standard assessment | String (1) | `I` (Insurance), `A` (Assessed) |
| `SOURCENAME`, `SOURCETYPE`, `SOURCEDATE`, `EDITMETHOD`, `EDITOR`, `EDITDATE`, `EDITNOTE` | Data provenance / edit lineage | String | — |

**`INSURANCEVALUEINDICATOR` is a directly confirmed match, not a guess:** VTPIE's 2024 revision added an identical field ("Insurance Value Indicator," `I`/`A`), which is an exact conceptual and coding match to NEMRC's own `411LST.REALVALTYPE` field, already in production use today ([NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §5](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#5-the-exemption-code-systems); [VTPIE analysis §4.4](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#44-confirmed-matches-to-already-documented-nemrc-side-fields--evidence-the-2024-revision-was-grounded-in-nemrcs-real-data)). This is about as well-corroborated as a field can be before formal adoption.

**Provenance fields are not new — this standard just asks all four CAMA vendors to use the same ones VCGI's own published GIS layer already carries** (`SOURCENAME`, `SOURCETYPE`, `SOURCEDATE`, `EDITMETHOD`, `EDITOR`, `EDITDATE`, `EDITNOTE`, confirmed live on the published Active/Inactive parcel layers per [SPAN_PARCEL_GRANDLIST_MODEL.md §4](SPAN_PARCEL_GRANDLIST_MODEL.md#4-current-gis-parcel-data-model-vermont-gis-parcel-data-standard-v23-oct-2016)) — rather than each vendor tracking edit lineage independently, in incompatible ways, which is closer to what happens today.

## 5. Unlanded structure / common-interest prefix codes

Adopted directly from the Act 68 2024 proposal's Table 2, which already recommended replacing the current single generic `C-` synthetic-SPAN prefix (documented in [SPAN_PARCEL_GRANDLIST_MODEL.md §4](SPAN_PARCEL_GRANDLIST_MODEL.md#4-current-gis-parcel-data-model-vermont-gis-parcel-data-standard-v23-oct-2016), e.g. `C-7085-1` for Williston) with a two-letter, type-specific system:

| Prefix | Applies to |
|---|---|
| `CO` | Condominiums |
| `CA` | Camps |
| `MH` | Mobile homes (landed or unlanded) |
| `SA` | Ground-mount solar arrays |
| `WT` | Wind turbines |

**How this integrates with `GROUNDSPAN`:** the July 2026 workgroup's own worked examples use a real, town-issued SPAN for `GROUNDSPAN` when the common-ground parcel already has one (e.g. `405-126-13918`, [SPAN_PARCEL_GRANDLIST_MODEL.md §6.2](SPAN_PARCEL_GRANDLIST_MODEL.md#62-worked-examples)). For common land with no SPAN of its own, this standard recommends `GROUNDSPAN` accept one of these prefix-coded synthetic values instead (e.g. `CO-003-0001`), retiring the older single-letter `C-` convention in favor of this more specific one — exactly as the 2024 proposal recommended, now with a field (`GROUNDSPAN`) to attach it to that didn't exist in 2024.

## 6. Category code reconciliation — one canonical list, not three

Three different abbreviation systems for the same underlying 14–16 category concept are already in live, documented use:

| Canonical code | Description | `411TOT` category abbrev. | `411TOT` header prefix | VTPIE 2024 doc |
|---|---|---|---|---|
| 1 | Residential, <6 acres | R1 | `R1` | R1 |
| 2 | Residential, ≥6 acres | R2 | `R2` | R2 |
| 3 | Mobile home, unlanded | MHU | `MHU` | MHU |
| 4 | Mobile home, landed | MHL | `MHL` | MHL |
| 5 | Seasonal, <6 acres | S1 | `V1` | S1 |
| 6 | Seasonal, ≥6 acres | S2 | `V2` | S2 |
| 7 | Commercial | COMM | `COM` | `C` |
| 8 | Commercial apartment | CMA | `CMA` | `CA` |
| 9 | Industrial | IND | `IND` | `I` |
| 10 | Utilities, electric | UE | `UE` | UE |
| 11 | Utilities, other | UO | `UO` | UO |
| 12 | Farm | FRM | `FRM` | `F` |
| 13 | Other | OTH | `OTH` | `O` |
| 14 | Woodland | WOOD | `WD` | `W` |
| 15 | Miscellaneous | MISC | `MSC` | `M` |
| 16 | Telecommunications (new, GL2026) | TC | `TC` | *(not present — predates this change)* |

**Recommendation: adopt the numeric code (1–16) as the canonical `CATCODE` value statewide**, with the existing abbreviation sets retained only as display labels, not separate stored values. This directly answers what Act 170 §3417 already authorizes PVR to do, and removes a real, evidence-backed inconsistency rather than adding a fourth naming variant on top of the three already found.

**Carry forward the "Other" category's existing rule:** per the VTPIE document's own note, a parcel coded "Other" (13) must also carry the real category it should be equalized against — this standard's `CATCODE` field should support that as a documented business rule (a secondary equalization-target category), not silently drop it, since a real production record (Killington, `CATCODE=O`) was already found using this category without a confirmed secondary value ([VTPIE analysis §3.4](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#34-the-o-other-category-rule-and-a-live-example-of-exactly-this-scenario)).

## 7. Submittal mechanism

The Act 68 2024 proposal recommended either a "read-only, credentialed API service endpoint" or, absent that, monthly flat-file uploads, with VCGI compiling data from all four vendors. **This can now be refined with an already-working precedent**: NEMRC's CAMA data already reaches VCGI today via a real, functioning **Globalscape FTP** arrangement — NEMRC uploads to its own `CAMA-NEMRC` folder, virtually tied to VCGI's `CAMA\NEMRC` folder, syncing near-instantaneously ([SPAN_PARCEL_GRANDLIST_MODEL.md §1.4](SPAN_PARCEL_GRANDLIST_MODEL.md#14-the-cama-extract-submission-channel-32-vsa--5404b-and-globalscape-ftp)). **Recommendation: extend this same Globalscape arrangement to Aumentum/ProVal, Vision, and Catalis/AssessPro**, each in their own vendor-specific folder, rather than building a new API from scratch — it's simpler to extend a mechanism already proven to work for one of the four vendors than to stand up a new one for all four. Whether this is workable for the other three vendors is unconfirmed and worth asking directly (already an open question in [SPAN_PARCEL_GRANDLIST_MODEL.md §7 item 12](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup)).

This submittal requirement is also the direct technical implementation of the already-effective **32 V.S.A. §5404(b)** extract requirement — this standard is, in effect, a candidate specification for what that statutorily-required extract should actually contain, an open item the statute itself leaves unspecified.

## 8. Data-quality guidance baked into the standard

Several fields already confirmed as unreliable in production should not simply be carried forward unexamined into a new standard:

- **`RESCODE`/owner-residency code** is flagged "DATA NOT WELL MAINTAINED" directly by the Tax Department ([NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §3](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#3-the-parcel-level-grand-list-file-411_gl--official-45-field-schema)). Retained in this standard because no better alternative exists, but any consumer of this field should treat it with the same caution already documented, not assume new vendors will maintain it any better without an explicit data-quality expectation attached to the standard itself.
- **`LOCAPROP`/free-text location** has a genuinely unresolved status in current production — the raw NEMRC file claims it's "removed" from the VCGI export, but the live published schema still carries it ([SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table)). **This standard recommends deprecating free-text `LOCAPROP` entirely**, in favor of the structured `SITUSADDR*` fields (§4.2) — resolving the ambiguity by making the field's replacement unambiguous going forward, rather than perpetuating an already-contradictory field.
- **Aggregate rollup fields that commingle active/inactive values are unreliable** — directly confirmed by NEMRC's own `411TFS.TOT_CVHS`/`TOT_CVNR` fields, which the Tax Department itself describes as "renders field useless" because they include inactive-parcel values ([NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §7.2](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#72-known-data-quality-caveats-on-the-tif-files-tax-departments-own-words)). This is the concrete, real-world justification for requiring `STATUS` on every individual record (§4.1) rather than relying on any town- or district-level aggregate figure to distinguish active from inactive value.

## 9. Open questions

1. Will Aumentum/ProVal's `ResLivingUnits` and Catalis/AssessPro's `Rental Living Units` actually map cleanly onto the proposed canonical `UNITCNT` field, or do their existing definitions diverge from "count of inhabitable units" in some way not yet checked? **Now sharpened by the Tax Department's own dwelling-unit-determination guidance**: none of these fields are documented as capturing the year-round-habitability determination the legal definition actually requires (§4.4) — the open question isn't just naming/mapping anymore, it's whether a habitability determination needs to be captured as a separate new field/business rule, in addition to whichever count field is adopted.
2. Can the Globalscape FTP arrangement already used by NEMRC (§6) actually be extended to the other three vendors, or does at least one require a genuinely different transfer mechanism?
3. ~~Is there a real, currently-operating Vermont "Safe At Home" address-confidentiality program?~~ **Resolved (VCGI, 2026-08-03):** yes — administered by the Vermont Secretary of State (§4.2). **Remaining, still-open ask:** suppression capability needs to be implemented at the source — each municipality's own CAMA/Grand List data entry — rather than relying solely on VCGI's and the Tax Department's current downstream, post-receipt checks with the Secretary of State.
4. Does adopting the numeric `CATCODE` (1–16) as canonical (§5) require any changes to how PVR's own equalization-study categories are defined, or is this purely a data-formatting change with no methodological effect?
5. Should `BILLADDR*` (§4.2) be Phase 1 rather than Phase 2, given it may already be operationally needed today for towns with escrow/mortgage-company billing arrangements, independent of any Act 164/170 timeline?
6. Where should `LASTREAPPRAISAL` (§4.3) actually be sourced from if a town has never formally tracked it — is a retroactive backfill from other reappraisal records (Regional Assessment District planning, existing Tax Department records) feasible ahead of the 2031 six-year-cycle requirement?

See also [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup), [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc), and [VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md §8](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#8-open-questions) for the broader open-questions lists this draft draws on and feeds back into. **All of the above, plus every other open question in this documentation set, are consolidated by theme and responsible party — along with a distilled NEMRC-specific asks list — in [OPEN_QUESTIONS_AND_NEMRC_ASKS.md](OPEN_QUESTIONS_AND_NEMRC_ASKS.md).**
