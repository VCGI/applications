# Open Questions — By Theme and Responsible Party, Plus a Distilled NEMRC Asks List

*This document consolidates every open question raised across this documentation set, organized by theme and by who would actually need to answer or act on each one. It also pulls out a short, standalone list of concrete changes NEMRC specifically would need to make to accommodate [VERMONT_CAMA_DATA_STANDARD_DRAFT.md](VERMONT_CAMA_DATA_STANDARD_DRAFT.md), given NEMRC's unusual dual role as both the statewide SPAN/Grand-List steward and one of four CAMA vendors (MicroSolve).*

*Every item is drawn directly from the per-document "open questions" sections it links to — currently [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §7 (22 items), [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) §8 (9 items), [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) §6 (4 items), [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md) §6 (4 items), [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md) §11 (9 items), [VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md) §8 (5 items), and [VERMONT_CAMA_DATA_STANDARD_DRAFT.md](VERMONT_CAMA_DATA_STANDARD_DRAFT.md) §9 (6 items) — 63 items total, growing as new source material is examined (a few of the most recent additions are cited to specific sections of the source documents directly, rather than to their own "open questions" list, since they arose from material reviewed after those lists were first compiled). Each item below keeps a stable ID (`OQ-1`, `OQ-2`, ...) so the by-party index at the end can reference them without repeating full text. The original per-document sections are left intact — this is an additional index, not a replacement.*

---

## Part 1: Distilled NEMRC Asks

**Why this list exists separately:** NEMRC is the only party in this entire picture with two distinct hats — the sole statewide SPAN-issuing/Grand-List steward (independent of CAMA vendor choice) *and* one of the four CAMA vendors (MicroSolve). Almost every other open question in this document eventually touches NEMRC in some way, which makes it easy for a NEMRC-specific ask to get lost in a 57-item list. This section pulls out only the concrete, answerable changes NEMRC specifically would need to make to accommodate [VERMONT_CAMA_DATA_STANDARD_DRAFT.md](VERMONT_CAMA_DATA_STANDARD_DRAFT.md), split by which of NEMRC's two hats each one falls under, in rough priority order.

### As Grand List module steward (affects every VT town, regardless of CAMA vendor)

1. **Expose a universal, per-parcel `STATUS` (Active/Inactive) field in the annual export to the Tax Department, for every town — not just TIF-district towns.** This is the single highest-priority ask in the whole standard ([VERMONT_CAMA_DATA_STANDARD_DRAFT.md §4.1](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#41-identification--structuralrelational-fields-phase-1)). The Grand List module's own UI already tracks this status on every parcel ([SPAN_PARCEL_GRANDLIST_MODEL.md §1.5](SPAN_PARCEL_GRANDLIST_MODEL.md#15-the-grand-list-modules-own-parcelcontiguous-parcel-ui)) — this is very likely an export-scope change, not a new data-tracking requirement. *(OQ-16, OQ-32)*
2. **Confirm whether `ADMINSPAN`/`GROUNDSPAN`/`KIND`/`TYPE` can be originated or exposed by the Grand List module**, and whether the existing "Contiguous Parcel Information" mechanism (today keyed by `Parcel #`, not SPAN) could be exposed SPAN-keyed instead. This is arguably the single biggest structural ask of NEMRC in the entire Act 164/170 redesign. *(OQ-5, OQ-6)*
3. **Confirm whether contiguous-parcel combination ever actually crosses town lines** in practice, given each town runs its own separate Grand List database and SPAN is town-scoped — needed before the `ADMINSPAN` design can assume a single-town scope is always sufficient. *(OQ-7)*
4. ~~Confirm what, if anything, currently syncs automatically between MicroSolve CAMA and the Grand List module.~~ **Largely answered by a NEMRC training document ("Link between NEMRC and CAMA"):** ordinary value/identifying-data updates on an existing parcel sync automatically in both directions (details in [SPAN_PARCEL_GRANDLIST_MODEL.md §1.5](SPAN_PARCEL_GRANDLIST_MODEL.md#15-the-grand-list-modules-own-parcelcontiguous-parcel-ui)); only parcel splits/transfers require manual dual entry. **Remaining ask:** confirm this file-level (`LSPROP01`↔`MAIN`) sync mechanism is still current, not superseded by something newer. *(OQ-13)*
5. **Establish (or confirm) a change-request process and typical lead time for adding fields/tables to the standard export** — needed regardless of which specific fields the final standard settles on. *(OQ-34)*

### As a CAMA vendor (MicroSolve specifically)

6. **Adopt a canonical dwelling-count field** — either rename/map an existing internal concept to `UNITCNT` (per [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §4.4](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#44-buildingimprovement-detail-phase-1--carried-forward-directly-from-the-act-68-2024-proposal)) or confirm none exists and one needs to be built. Unlike Aumentum and Catalis, no vendor-native dwelling-count-adjacent field has been found in MSOL so far ([MSOL_AS_BUILT.md §7.1](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc)) — MicroSolve may be starting from further behind than the other two vendors on this specific field. *(OQ-1)*
7. **Commit to including `EXP_DATADICT`/`EXP_CATEG` in every future extract as standard practice** — confirmed missing from one of two samples examined (Lincoln) and present in the other (South Burlington); this is a solvable extract-completeness issue, not an ambiguous one. *(OQ-51)*
8. **Confirm `factori`/`prop_class` is always populated from the Tax Department's `PCCODE` list verbatim**, and whether a maintained crosswalk exists on NEMRC's end for when it diverges — directly relevant to adopting a single canonical `CATCODE` domain statewide ([VERMONT_CAMA_DATA_STANDARD_DRAFT.md §6](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#6-category-code-reconciliation--one-canonical-list-not-three)). *(OQ-22)*
9. ~~Confirm whether MicroSolve has any native parent/child parcel or unit-grouping concept, even if not currently exported.~~ **Resolved (2026-08-06): no** — MicroSolve's own condominium system has no such concept at all (its "Neighborhood Code" is a valuation lookup key, not a parcel link). Aumentum's `parent_lrsn` (also referenced here, [PROVAL_AS_BUILT.md §6](PROVAL_AS_BUILT.md#6-open-questions-for-aumentum) item 3) remains a genuinely different, more promising precedent worth comparing against — MicroSolve just isn't one. *(OQ-29)*

### Where the two hats overlap — questions only NEMRC itself can answer

10. **Where would a `UNITCNT`/`DWELLINGS` rollup actually be computed — the Grand List module, MicroSolve CAMA, or both?** This is a genuinely NEMRC-internal architecture question, since NEMRC alone controls both candidate systems. *(OQ-2)*
11. **Would the same Globalscape FTP arrangement NEMRC's CAMA data already flows through also be suitable for submitting the new standard's fields**, or does the Grand List module's own annual Tax Department submission need a separate channel? *(related to OQ-18)*

*The numbered items above are the ones worth raising directly and specifically with NEMRC (Chris Miele/Ernie Saunders). The full, unabridged context for each is in Part 2 below, cross-referenced by `OQ-` ID.*

## Part 2: All open questions, by theme

*Legend for "Responsible" column: **NEMRC** (Grand List module and/or MicroSolve), **Tax Dept/PVR**, **VCGI**, **Other vendors** (Aumentum, Vision, Catalis), **Joint** (needs more than one party together, or a workgroup-level policy call).*

### Theme A: Dwelling-unit count — definition and sourcing

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-1 | Does NEMRC MicroSolve have any native dwelling-count-adjacent field, and can a genuine "dwelling units" rollup be added to the export? | NEMRC | [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc) item 6 |
| OQ-2 | Where would a `DWELLINGS`/`UNITCNT` rollup actually be computed — the Grand List module, MSOL CAMA, or both? | NEMRC | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 1; readme.md "If you're NEMRC" |
| OQ-3 | What is `ResLivingUnits` (ProVal) actually meant to capture, and how reliably is it populated across the full dataset, not just the sample examined? | Other vendors (Aumentum) | [PROVAL_AS_BUILT.md §6](PROVAL_AS_BUILT.md#6-open-questions-for-aumentum) item 2 |
| OQ-4a | Is `Rental Living Units` (Catalis) a count of all dwelling units or specifically rented-out units? | Other vendors (Catalis) | [ASSESSPRO_AS_BUILT.md §6](ASSESSPRO_AS_BUILT.md#6-open-questions-for-catalis--assesspro) item 3 |
| OQ-30 | Would `ResLivingUnits`/`Rental Living Units` actually satisfy a canonical `UNITCNT` field, or do their existing definitions diverge from a plain dwelling-unit count? | Other vendors, VCGI | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 22; [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §9](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#9-open-questions) item 1 |
| OQ-56 | Does a "Lock-Off" condo unit (one legal unit, one SPAN, with an internally-partitioned separately-rentable sub-space, confirmed in MSOL's condo valuation system) count as one dwelling unit or two for Act 170's `DWELLINGS` purposes? A concrete edge case the "dwelling unit" definition work needs to resolve. | Tax Dept/PVR | [MSOL_AS_BUILT.md §11.2](MSOL_AS_BUILT.md#112-the-valuation-system-a-blank-slate-no-built-in-cost-tables); [SPAN_PARCEL_GRANDLIST_MODEL.md §6.3](SPAN_PARCEL_GRANDLIST_MODEL.md#63-new-field-definitions-per-the-workgroup-pdf) |
| OQ-31 | What actually counts as a "dwelling unit" (accessory unit, unfinished basement apartment, mixed-use residential floor)? | Tax Dept/PVR | [SPAN_PARCEL_GRANDLIST_MODEL.md §6.3](SPAN_PARCEL_GRANDLIST_MODEL.md#63-new-field-definitions-per-the-workgroup-pdf); readme.md "If you're at the Tax Department / PVR" |

### Theme B: SPAN structure, `ADMINSPAN`/`GROUNDSPAN`, and the Grand List module's internals

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-5 | Is the Grand List module (not just MSOL CAMA) prepared to originate/expose `ADMINSPAN`, `GROUNDSPAN`, `KIND`, and `TYPE`? **Now confirmed harder than a simple exposure ask, at least for `GROUNDSPAN`/condos**: MSOL CAMA's own condominium system has no unit-to-common-property linkage concept at all (see OQ-29) — so this isn't just "expose what already exists," it's "build a relationship that doesn't exist on either side yet." | NEMRC | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 5 |
| OQ-6 | Could the existing "Contiguous Parcel Information" mechanism (`Parcel #`-keyed today) be exposed SPAN-keyed instead, to build `ADMINSPAN` from it? | NEMRC | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 13; readme.md "If you're NEMRC" |
| OQ-7 | Does contiguous-parcel combination (two *separate* parcels, one per town, administratively combined) ever actually occur across town lines, given SPAN is town-scoped and each town's Grand List database is separate? **Distinct from OQ-55**, which is about one physical parcel straddling a town line, not two being combined. | NEMRC | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 14; readme.md "If you're NEMRC" |
| OQ-55 | **Should the proposed Parcel/Administrative Parcel model explicitly address parcels that straddle a town line, and if so, how?** Today this is handled entirely as a manual, per-lister CAMA valuation workaround (confirmed via a real NEMRC "Land in Two Towns" training example — [MSOL_AS_BUILT.md §10](MSOL_AS_BUILT.md#10-land-valuation-tables-and-the-land-in-two-towns-cross-town-blending-method)), with no formal linkage between the two towns' separate, independently SPAN-numbered records for what is legally one parcel. Rooted in the same underlying condition as OQ-7 (Vermont has never completed a definitive, modern, statewide municipal boundary/corner-point survey), but a structurally distinct problem from it. | Tax Dept/PVR, VCGI, Joint | [SPAN_PARCEL_GRANDLIST_MODEL.md §5](SPAN_PARCEL_GRANDLIST_MODEL.md#5-limits-of-the-current-model-pre-redesign) item 8; [SPAN_PARCEL_GRANDLIST_MODEL.md §6.1](SPAN_PARCEL_GRANDLIST_MODEL.md#61-core-idea-split-parcel-from-administrative-parcel); [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 23 |
| OQ-8 | Could the existing `HS-122` and `TIF` tabs on the Grand List module's parcel record be extended to carry a future dwelling-use attestation or classification data? | NEMRC | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 15; readme.md "If you're NEMRC" |
| OQ-9 | Does `parent_lrsn` (ProVal) correspond to anything resembling the proposed `ADMINSPAN`/`GROUNDSPAN` structure — a useful existing pattern if so? | Other vendors (Aumentum) | [PROVAL_AS_BUILT.md §6](PROVAL_AS_BUILT.md#6-open-questions-for-aumentum) item 3 |
| OQ-29 | ~~Does MicroSolve have any native parent/child parcel or unit-grouping concept, even if not currently exported?~~ **Resolved (2026-08-06): no.** Confirmed via a direct review of MicroSolve's condominium valuation system (a 2025 NEMRC training presentation, cross-checked against the real South Burlington condo extract) — the only apparent grouping mechanism, a "Neighborhood Code," is confirmed to be a pure valuation-table lookup key with no parcel or legal significance. Each condo unit's own SPAN is fully independent. | *(resolved)* | [MSOL_AS_BUILT.md §11.4](MSOL_AS_BUILT.md#114-the-confirmed-gap-no-mechanism-anywhere-tracks-the-unit-to-common-property-relationship) |
| OQ-10 | Is there a documented, enforced rule for how SPAN values are assigned to "stacked" records on one footprint (condos, mixed-use)? Is this NEMRC's logic or a lister/Tax-Dept convention NEMRC just stores? | NEMRC | [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc) item 3 |

### Theme C: Active/Inactive status and the TIF-only export gap

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-16 | Could non-TIF towns' NEMRC Grand List exports be extended to carry a `PACTIVE`-equivalent status field? | NEMRC, Tax Dept/PVR | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 16; [SPAN_PARCEL_GRANDLIST_MODEL.md §5](SPAN_PARCEL_GRANDLIST_MODEL.md#5-limits-of-the-current-model-pre-redesign) item 7; [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §11](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#11-open-questions) item 2 |
| OQ-11 | What is the full code list for MSOL's `parcstatus` field (only `"A"` observed) — is there an inactive/retired status that would let VCGI align it with the GIS inactive-parcels layer? | NEMRC | [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc) item 5 |
| OQ-12 | What is `411LST.PACTINACT`'s actual relationship to `411TFP.PACTIVE`? Both are status-type fields, but only one has documented Active/Inactive/Non-taxable semantics. | Tax Dept/PVR, NEMRC | [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §11](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#11-open-questions) item 3 |
| OQ-32 | Should NEMRC's annual Grand List export to the Tax Department be extended to carry Active/Inactive status for all towns, not just TIF-district ones — as a Tax Department policy decision? | Tax Dept/PVR | readme.md "If you're at the Tax Department / PVR" |

### Theme D: CAMA-to-Grand-List sync mechanics

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-13 | ~~What exactly flows back from CAMA to NEMRC's Grand List database?~~ **Largely resolved**, per a NEMRC training document ("Link between NEMRC and CAMA"): ordinary value/identifying-data updates sync automatically both directions for existing parcels (owner/address/911 data/tax map/sale data one way; `cama_total`/`homestd_va`/`cama_site2` → Real/Homestead/Housesite the other), via the `LSPROP01`↔`MAIN` file-level mechanism, with an automatic "Change of Appraisal" flag and a documented manual-reconciliation procedure. Parcel splits/transfers still require manual dual entry (unchanged finding). **Still open:** whether new-parcel/SPAN requests ever originate in CAMA, and whether this mechanism is still current given the source document's ~2014 apparent vintage. | NEMRC | [SPAN_PARCEL_GRANDLIST_MODEL.md §1.5](SPAN_PARCEL_GRANDLIST_MODEL.md#15-the-grand-list-modules-own-parcelcontiguous-parcel-ui); [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 8 |
| OQ-14 | Does the actual NEMRC Grand List module support reactivating a merged/inactive parcel cleanly when it sells separately, given no reviewed training material describes this specific reverse operation? | NEMRC | [VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md §8](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#8-open-questions) item 1 |
| OQ-53 | Is the `LSPROP01`↔`MAIN` file-level sync mechanism between NEMRC and MSOL CAMA (§1.5) still the current architecture, or has it been superseded by something else (e.g., a cloud/API-based sync) since the source document's apparent ~2014 vintage? | NEMRC | [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc) item 9 |

### Theme E: Vendor SPAN reliability and data-transfer mechanism

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-15 | Does Catalis AssessPro track a Vermont SPAN internally at all, sourced from NEMRC the same way ProVal apparently does? Now a statutory-compliance question (§5404(b)), not just a data-completeness one. | Other vendors (Catalis) | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 11; [ASSESSPRO_AS_BUILT.md §6](ASSESSPRO_AS_BUILT.md#6-open-questions-for-catalis--assesspro) item 1 |
| OQ-33 | Is there an established workflow between Catalis/AssessPro and NEMRC for reflecting SPAN, or does this depend entirely on a manual, town-side submission to NEMRC's Grand List module? | Other vendors (Catalis), NEMRC | [ASSESSPRO_AS_BUILT.md §6](ASSESSPRO_AS_BUILT.md#6-open-questions-for-catalis--assesspro) item 2 |
| OQ-17 | Is `tax_bill_id` (ProVal) reliably equivalent to statewide SPAN for every parcel, or only functionally close for the one sample examined? | Other vendors (Aumentum) | [PROVAL_AS_BUILT.md §6](PROVAL_AS_BUILT.md#6-open-questions-for-aumentum) item 1 |
| OQ-18 | Will Aumentum/ProVal, Vision, and Catalis/AssessPro use the same Globalscape FTP arrangement NEMRC uses, in their own vendor-specific folders, or a separate mechanism per vendor? | Other vendors, Tax Dept/VCGI | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 12; readme.md "If you're NEMRC"; [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §9](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#9-open-questions) item 2 |
| OQ-19 | Given the B&T format's real limitations, is a full relational export available from AssessPro (comparable to MSOL/ProVal), or is B&T the only extract format Catalis offers? | Other vendors (Catalis) | [ASSESSPRO_AS_BUILT.md §6](ASSESSPRO_AS_BUILT.md#6-open-questions-for-catalis--assesspro) item 4 |
| OQ-20 | What is `Imp_Features.json` (ProVal)? | Other vendors (Aumentum) | [PROVAL_AS_BUILT.md §6](PROVAL_AS_BUILT.md#6-open-questions-for-aumentum) item 4 |
| OQ-34 | Given Act 164/170 may require new reporting categories, does NEMRC have a change-request process for adding fields/tables to the standard export, and what's the typical lead time? | NEMRC | [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc) item 7 |
| OQ-51 | Can NEMRC commit to including `EXP_DATADICT`/`EXP_CATEG` in every future town extract as standard practice, and can VCGI receive each town's own copy rather than assuming one town's mapping is universal? | NEMRC | [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc) item 1 |

### Theme F: Three-way classification and floor-area proration

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-21 | Where is floor-area-by-use (`FLR_PCT_HS`/`FLR_PCT_NR`/`FLR_PCT_NN`) actually computed, and does it require new CAMA export fields from all four vendors, not just NEMRC? | Joint (all 4 vendors) | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 2 |

### Theme G: Category-code and schema standardization

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-22 | Can NEMRC confirm `factori`/`prop_class` is always populated from the Tax Department's `PCCODE` list verbatim, and is there a maintained crosswalk for when it diverges? | NEMRC | [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc) item 2 |
| OQ-23 | What is the complete `CATCODE` domain used on `411_gl` itself — does a real value like `O` (found in a live Killington record) map onto the 16-category `411TOT` taxonomy, or is it a separate, finer-grained system? | Tax Dept/PVR | [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §11](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#11-open-questions) item 4 |
| OQ-24 | Does that same Killington record (`CATCODE=O`) also carry the secondary equalization-target category the VTPIE document's own rule requires for the "Other" category? | Tax Dept/PVR | [VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md §8](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#8-open-questions) item 2 |
| OQ-25 | Does adopting a single numeric `CATCODE` (1–16) as canonical require any changes to how PVR's own equalization-study categories are defined, or is it purely a formatting change? | Tax Dept/PVR | [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §9](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#9-open-questions) item 4 |
| OQ-57 | Is the Grand List module's `Cama file` selector (`R`/`C`/`O`/`N` — confirmed to control which of MSOL's three separate silo databases holds a parcel's CAMA record, [MSOL_AS_BUILT.md §2](MSOL_AS_BUILT.md#2-three-parallel-schemas-silos-not-one)) set automatically from `Category`, or chosen manually by the lister? What happens to existing silo data if it's changed after the fact — is there a migration path, or does changing it orphan the old record? | NEMRC | [MSOL_AS_BUILT.md §2](MSOL_AS_BUILT.md#2-three-parallel-schemas-silos-not-one); [MSOL_AS_BUILT.md §6](MSOL_AS_BUILT.md#6-property-classification-two-parallel-systems) |

### Theme H: Confirmed data-quality issues and raw-vs-published discrepancies

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-26 | ~~What does the leading `411` filename prefix actually denote?~~ **Resolved (VCGI, 2026-08-03):** `411` is simply the Tax Department's colloquial term for the Grand List itself — not a town or SPAN code. | *(resolved)* | [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §1](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#1-what-this-is-and-why-its-a-different-channel-than-the-cama-extract) |
| OQ-27 | ~~Is `LOCAPROP` actually still populated on the published Active layer, or present-but-empty?~~ **Resolved (VCGI, 2026-08-03):** present in the schema, but empty for every record. | *(resolved)* | [SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table) |
| OQ-28 | ~~Are the `YEAR`/`GLYEAR` and `TOWN`/`TNAME` field pairs on the published Active layer ever monitored for disagreement?~~ **Resolved (VCGI, 2026-08-03):** these are expected to differ at times — geometry is received/published on a rolling per-town basis while the Grand List is annual, so newer geometry is joined to the most recent available Grand List record rather than a same-vintage one. Not a monitored anomaly, an accepted consequence of the two workflows. | *(resolved)* | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 20 |
| OQ-35 | Why was `HSTED_TX` dropped from the published Active layer when its full-value counterpart `HSTED_FLV` was kept — intentional scoping, or an oversight? | Tax Dept/PVR, VCGI | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 21; [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §11](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#11-open-questions) item 9 |
| OQ-36 | What is the full scope of the NEMRC-to-VTAX/VCGI transformation, beyond the confirmed changes (exemption codes resolved to text, the disputed `LOCAPROP` removal)? | Tax Dept/PVR | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 17; [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §11](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#11-open-questions) item 5 |
| OQ-37 | Does the Muni-GL/Ed-GL exemption transformation matrix match how `MUNGL1PCT`/`GLVAL_HS`/`GLVAL_NR`/`AOEGL_HS`/`AOEGL_NR` are actually computed on `411_gl`, or is that done earlier, inside NEMRC's own software? | NEMRC, Tax Dept/PVR | [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §11](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#11-open-questions) item 7 |
| OQ-38 | Is `P_TZONE` genuinely meaningful internally to NEMRC's `lsprop`/`lssyst` tables, even though the exported `411TFP.TZONE` field is documented as unused? **`lsprop` itself is now confirmed real** (as `LSPROP01`, NEMRC's live parcel database — [SPAN_PARCEL_GRANDLIST_MODEL.md §1.5](SPAN_PARCEL_GRANDLIST_MODEL.md#15-the-grand-list-modules-own-parcelcontiguous-parcel-ui)), making `P_TZONE`'s internal meaningfulness somewhat more plausible, but still unconfirmed. | NEMRC | [VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md §8](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#8-open-questions) item 4 |
| OQ-39 | What exactly is the Tax Department's "state version of the NEMRC software program" used for operationally — internal review only, or does it feed other systems/processes? | Tax Dept/PVR | [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §11](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#11-open-questions) item 6 |
| OQ-40 | What is `Tax Entity Code` (VTPIE CAMA Export field) actually meant to represent — left undefined in the source document? | Tax Dept/PVR | [VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md §8](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#8-open-questions) item 3 |
| OQ-41 | Does the `e911addr` field on the current `GRANDLIST` table already solve — or partially solve — the CAMA-to-E911 address gap, or is it unreliably populated in practice? | Tax Dept/PVR | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 4 |
| OQ-52 | Which MSOL `EXP_MAIN` field actually receives the "911 data" NEMRC pushes into CAMA — `prop_locat`/`prop_addr`, a separate undocumented field, or nowhere durable? Confirming this could close, or meaningfully narrow, the long-flagged CAMA-to-E911 gap on the CAMA side specifically (distinct from OQ-41's Grand-List-table-level question). | NEMRC | [MSOL_AS_BUILT.md §7](MSOL_AS_BUILT.md#7-known-structural-gaps-for-gisstatewide-reporting) item 2; [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc) item 8 |

### Theme I: New/privacy fields (Safe At Home, billing address, last reappraisal)

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-42 | ~~Is there a real, currently-operating Vermont "Safe At Home" address-confidentiality program?~~ **Resolved (VCGI, 2026-08-03):** yes, stewarded by the Vermont Secretary of State. VCGI checks with the Secretary of State on receipt of each annual Grand List file and redacts before publishing; the Tax Department has separately begun its own checks before sharing elsewhere. **Still genuinely open:** both of those are downstream/reactive — suppression capability should still be implemented at the source, i.e., each municipality's own CAMA/Grand List data entry. | Tax Dept/PVR, NEMRC (municipal-level source data), Other vendors | [VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md §8](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#8-open-questions) item 5; [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §9](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#9-open-questions) item 3; [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §4.2](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#42-ownership--address-fields-phase-1-except-where-noted) |
| OQ-43 | Should a distinct billing address (`BILLADDR*`) be Phase 1 rather than Phase 2, given it may already be operationally needed today (e.g., escrow/mortgage billing)? | Tax Dept/PVR, VCGI | [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §9](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#9-open-questions) item 5 |
| OQ-44 | Where should `LASTREAPPRAISAL` actually be sourced from if a town has never formally tracked it — is a retroactive backfill feasible ahead of 2031? | Tax Dept/PVR, VCGI | [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §9](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#9-open-questions) item 6 |
| OQ-54 | What "state payments" data does NEMRC's Grand List module store, that NEMRC's own training material flags as confidential (alongside 911 addresses) and unsuitable for a public-facing tax map — a distinct, not-yet-investigated category from anything else documented so far? | Tax Dept/PVR, NEMRC | [SPAN_PARCEL_GRANDLIST_MODEL.md §1.6](SPAN_PARCEL_GRANDLIST_MODEL.md#16-town-optional-local-tax-map-integration-out-of-scope-for-the-statewide-pipeline-but-worth-a-few-cross-confirmations) |

### Theme J: Timing, sequencing, and statutory compliance

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-45 | Does elevating the Inactive layer to primary happen on the 2028 Act 164 timeline independent of the 2029 classification-field work, or as one bundled release? | Tax Dept/PVR, VCGI | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 3 |
| OQ-46 | Does [32 V.S.A. §5412](https://legislature.vermont.gov/statutes/section/32/135/05412) (PVR-applied education-only exemptions) have any bearing on the proposed classification/exemption fields? | Tax Dept/PVR | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 18 |
| OQ-47 | Is stacked-unit acreage attribution (equal division vs. full-on-common-record-with-zeros, which varies by town today) meant to be standardized by the future-state model, or continue accommodating both practices? | Tax Dept/PVR, Joint | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 7 |
| OQ-48 | ~~Given VCGI's active effort to formalize CAMA data transfer from all four vendors as-is, how will Act 164/170 changes further modify that standard's schema once formalized?~~ **Resolved (VCGI, 2026-08-03):** yes — VCGI expects Act 164/170 changes to impact the CAMA data standard, and by extension the extracts vendors submit to remain in compliance with it. | *(resolved)* | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 6 |

### Theme K: VTPIE dependency and cross-town/geometry-timing considerations

| ID | Question | Responsible | Source |
|---|---|---|---|
| OQ-49 | Does VTPIE actually depend on NEMRC for SPAN? Flagged with a "?" in VCGI's own working diagram — genuinely unconfirmed. | Tax Dept/PVR, NEMRC | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 9 |
| OQ-50 | ~~Is the geometry/Grand-List timing mismatch worth surfacing as a standing data-quality consideration?~~ **Resolved (VCGI, 2026-08-03):** it's expected, not a defect — geometry is received/published on a rolling per-town basis, the Grand List only once a year, so a town's geometry can be newer than its most recent available Grand List record. Newer geometry is still joined via SPAN to the most recent Grand List record where one exists. See also OQ-28. | *(resolved)* | [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) item 10 |

---

## Part 3: Index by responsible party

*Cross-references `OQ-` IDs from Part 2 — full text lives there, not repeated here.*

### NEMRC (as Grand List module steward)
OQ-2, OQ-5, OQ-6, OQ-7, OQ-8, OQ-9 *(confirm/compare)*, OQ-10, OQ-11, OQ-12 *(joint)*, OQ-13, OQ-14, OQ-16 *(joint)*, OQ-18 *(joint)*, OQ-33 *(joint)*, OQ-34, OQ-37 *(joint)*, OQ-38, OQ-49 *(joint)*, OQ-53, OQ-54 *(joint)*

### NEMRC (as MSOL CAMA vendor)
OQ-1, OQ-2 *(shared with above)*, OQ-22, OQ-51, OQ-52, OQ-57

### Tax Department / PVR
OQ-12, OQ-16, OQ-23, OQ-24, OQ-25, OQ-31, OQ-32, OQ-35, OQ-36, OQ-37, OQ-39, OQ-40, OQ-41, OQ-42, OQ-43, OQ-44, OQ-45, OQ-46, OQ-47, OQ-49, OQ-54 *(joint)*, OQ-55 *(joint)*, OQ-56

### VCGI
OQ-20, OQ-25 *(shared)*, OQ-35 *(shared)*, OQ-42 *(shared)*, OQ-43 *(shared)*, OQ-44 *(shared)*, OQ-45 *(shared)*, OQ-55 *(shared)*

### Other CAMA vendors (Aumentum/ProVal, Vision, Catalis/AssessPro)
OQ-3, OQ-4a, OQ-9, OQ-15, OQ-17, OQ-18 *(shared)*, OQ-19, OQ-20 *(shared)*, OQ-33 *(shared)*

### Joint / workgroup-level policy calls (no single party can answer alone)
OQ-21, OQ-30, OQ-47, OQ-55

### Resolved this session (2026-08-03, per VCGI)

OQ-26 (411 prefix = colloquial name for the Grand List), OQ-27 (`LOCAPROP` present-but-empty), OQ-28 (`YEAR`/`GLYEAR`, `TOWN`/`TNAME` divergence expected), OQ-48 (Act 164/170 confirmed to impact the CAMA standard), OQ-50 (geometry/Grand-List timing mismatch expected) — full answers in Part 2 above. OQ-20 and OQ-42 were narrowed/partially answered but retain a genuinely open remainder, so they stay in the active lists above.

### Resolved this session (2026-08-06, via direct review of NEMRC's condominium system)

OQ-29 (MicroSolve has no native parent/child parcel or unit-grouping concept — confirmed via a 2025 NEMRC condo-system presentation cross-checked against the real South Burlington condo extract) — full answer in Part 2 above. This also directly informs, without fully resolving, OQ-5 (whether the Grand List module is prepared to originate/expose `GROUNDSPAN` — now confirmed that `GROUNDSPAN` isn't a matter of exposing an existing concept on the CAMA side either), which stays in the active lists above.

---

See also: [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup), [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc), [PROVAL_AS_BUILT.md §6](PROVAL_AS_BUILT.md#6-open-questions-for-aumentum), [ASSESSPRO_AS_BUILT.md §6](ASSESSPRO_AS_BUILT.md#6-open-questions-for-catalis--assesspro), [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §11](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#11-open-questions), [VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md §8](VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md#8-open-questions), and [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §9](VERMONT_CAMA_DATA_STANDARD_DRAFT.md#9-open-questions) for the original, per-document versions of each item.
