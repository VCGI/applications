# VTPIE CAMA Requirements (2024) — What It Reveals About Parcel Data Management

*Scope note: this document analyzes `VTPIE CAMA Requirements 2024.docx` (Version 3.5, dated 2/9/2024 — a PVR/VTPIE Project Team document, originally drafted 2020–2022 by Axiomatic and updated in 2024 by Catalis) strictly as a **design artifact**. Per direct confirmation, the CAMA-integration workflow it describes was not completed and is not planned to be completed; Vermont continues to rely on NEMRC's Grand List module for SPAN issuance, parcel maintenance, TIF district management, and the other functions this document proposed moving elsewhere. Nothing here should be read as a description of current operational reality — every finding below is framed as "what this document's authors identified as a needed improvement," cross-checked against what is actually documented as true today in [../SPAN_PARCEL_GRANDLIST_MODEL.md](../SPAN_PARCEL_GRANDLIST_MODEL.md) and [../NEMRC_GRANDLIST_EXPORT_AS_BUILT.md](../NEMRC_GRANDLIST_EXPORT_AS_BUILT.md). This document intentionally does not explore or speculate on why the integration wasn't completed — that is out of scope here.*

*Source: `VTPIE CAMA Requirements 2024.docx`, in this folder, read in full (executive summary, Table 1, Schedule at a Glance, all business-requirement tables, the CAMA Export schema, reference code tables, VTPIE Imports section, and the TIF import field list).*

---

## 1. What this document is

A requirements specification for a never-completed integration between VTPIE (the Tax Department's Vermont Property Information Exchange, built on an "Integrated Property Tax Management System," IPTMS) and municipal CAMA software. Per its own executive summary:

> "The proposed future state integrates the state's Integrated Property Tax Management System (IPTMS) web application called Vermont Property Information Exchange (VTPIE) and municipal Computer Assisted Mass Appraisal Software (CAMA) platforms to provide a linear data management process for property taxation. Local assessors and listers will maintain their municipalities property rolls (real and personal ownership and valuation information) within their local CAMA. The municipality will send data updates into the VTPIE system where they will manage their tax program information (homestead enrollment, exemptions, current use, and TIF districts)."

The document's own version history (11 revisions, 11/23/2020 through 2/9/2024) shows this was actively worked for over three years. Its own "Schedule at a Glance" table shows several *other* VTPIE modules — GIS mapping viewer, the public Data View portal, Sales Validation, Ratio Study/Equalization, Current Use enrollment, and Homestead declarations — marked **"Complete"**, consistent with what's already documented as VTPIE's real, current scope ([SPAN_PARCEL_GRANDLIST_MODEL.md §1.2](../SPAN_PARCEL_GRANDLIST_MODEL.md#12-vtpie-in-detail)). **Parcel Maintenance and the CAMA Export itself never appear in that schedule table at all** — every other module has an assigned phase and go-live date (even ones not yet complete, like Tax Billing at "June 2024"); Parcel Maintenance/CAMA Export does not. That is a neutral, factual observation directly from the source document, not speculation about cause.

Two modules are worth noting as a direct data-lineage link to material already documented: **Exemptions and TIF districts are both stated to be "imported from the NEMRC Grand List application"** as their initial VTPIE data source. This confirms that even in VTPIE's own target design, NEMRC's Grand List module (and by extension the exact `411EXP`/`411LST`/`411TFS`/`411TFP` file family documented in [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md](../NEMRC_GRANDLIST_EXPORT_AS_BUILT.md)) was always meant to be the upstream source of record for this data, not something VTPIE would originate independently.

## 2. The proposed system-of-record shift: parcel maintenance and SPAN generation move into CAMA

The document's Table 1 ("System of Record for Grand List Tasks") is explicit that, in this design, **CAMA — not a separate Grand List module, and not VTPIE — becomes the system of record for parcel maintenance and SPAN generation:**

| Element | Process | System of record |
|---|---|---|
| Parcel Maintenance | Generation and management of SPAN | **CAMA** |
| | Processing transfers, splits, merges | **CAMA** |
| | Management of contiguous parcels | **CAMA** |
| | Tracking inactive parcels | **CAMA** |
| Personal Property | Creating and managing personal property | CAMA |
| | Personal Property Exemptions / Grievance | VTPIE |
| District Management | Village, special, and school Districts | CAMA |
| | Tax Increment Finance Districts | VTPIE |
| Grand List | Export of ownership, valuation per 32 V.S.A. § 4152 | CAMA |
| | Creation of Grand List (applying exemptions), submission, **Creation of Form 411** | VTPIE |

Per the document's own framing: *"The two primary deviations from the existing data management process are the shifting of parcel maintenance (transfers/splits/merges) and generating School Property Account Numbers (SPANS) into CAMA."*

**This is worth naming plainly as a third, distinct architectural model — not the same as either of the other two already documented:**

1. **Actual current state** (per [SPAN_PARCEL_GRANDLIST_MODEL.md §1](../SPAN_PARCEL_GRANDLIST_MODEL.md#1-the-end-to-end-pipeline--three-systems-towns-use-and-a-fourth-downstream-of-all-of-them)): SPAN generation and parcel maintenance are centralized in **NEMRC's Grand List module**, used essentially statewide, **independent of which CAMA vendor a town runs**. A town using Aumentum/ProVal or Catalis/AssessPro for appraisal still relies on NEMRC's separate Grand List product for SPAN.
2. **This VTPIE document's design**: SPAN generation and parcel maintenance move **into whichever CAMA product a town runs** — meaning each of the four CAMA vendors (NEMRC MicroSolve, Aumentum/ProVal, Vision, Catalis/AssessPro) would independently generate and manage SPAN for its own towns. This is a **decentralized** model, a genuine departure from NEMRC's current centralized, vendor-agnostic role.
3. **The July 2026 Act 164/170 workgroup's proposal** ([SPAN_PARCEL_GRANDLIST_MODEL.md §6](../SPAN_PARCEL_GRANDLIST_MODEL.md#6-proposed-future-state-model-vcgitax-deptnemrc-workgroup-july-27-2026)): new `ADMINSPAN`/`GROUNDSPAN` fields embedded "directly in the Grand List," with the `JoinGL2Parcels` SQL join simplified or retired as a result — a proposal that, as currently documented, doesn't specify whether "the Grand List" here means NEMRC's existing centralized product (option 1, continued) or something closer to option 2's per-CAMA-vendor model.

Since this document's decentralized model was **not implemented**, current reality remains option 1. But its detailed business requirements (§3 below) are still a genuine, independently-produced (2020–2024, by PVR/Axiomatic/Catalis, entirely separate from the 2026 NEMRC workgroup) record of what a *good* parcel-maintenance system needs to do — and several of its findings corroborate, refine, or add to what the July 2026 proposal is trying to solve, worth weighing directly in that ongoing conversation (§7 below).

## 3. Parcel Maintenance business requirements (PM-1–PM-21)

The document's own framing: *"To eliminate the need for duplicate data entry, and multiple data exchanges parcel maintenance (splits, merges, direct transfers, management of contiguous parcels, and generation of SPAN numbers) will occur within CAMA."*

| No. | Requirement | Notes (verbatim) |
|---|---|---|
| PM-1 | Split one record into many, SPAN stays with the portion with the house | Maintain parcel history/lineage; assign site improvements/outbuildings to each portion |
| PM-2 | Merge many records into one | Maintain parcel history/lineage; if merged for contiguity, indicate on inactive parcels which active parcel they were merged with |
| PM-3 | Process ownership change from a deed | Ownership changes should **not** change SPAN; warn users if closing date falls in the wrong tax year (e.g. after April 1) |
| PM-4 | Assign/manage unique SPAN for every active and inactive record | 3-digit town + 3-digit school + 5-digit sequential ID; must accommodate **multiple school districts** |
| PM-5 | Import existing active/inactive SPANs from NEMRC (one-time cutover) | Parcels/SPANs inactivated when contiguous parcels merge; may reactivate on sale; **inactive SPANs include the active SPAN they're linked to**; ability to communicate inactive parcels to VTPIE with every sync |
| PM-6 | Manage contiguous parcels | Combine by inactivating all but one, updating the active parcel's land/building attributes; active SPAN must be the one with the dwelling (if multiple, the one homestead was declared on); value per highest-and-best-use, separate "cards" possible for mixed-use merges |
| PM-7 | Inactivate contiguous parcels | |
| PM-8 | For inactive contiguous parcels, track the active parcel it's associated with and that it's inactive due to contiguity | Searchable via SPAN (required) or parcel ID (optional) |
| PM-9 | Maintain SPAN for inactive contiguous parcels | |
| PM-10 | Reactivate an inactive contiguous parcel if it sells | Requires removing land/improvements from the parent parcel and returning them to the newly-active parcel; desirable to prompt the user to do this maintenance automatically |
| PM-11 | Maintain non-taxable real property | |
| PM-12 | Import non-taxable property from NEMRC if not already in CAMA | One-time cutover exchange |
| PM-13 | Maintain an owner code | T (Town resident), S (State resident), N (Out-of-state resident), C (Corporation) |
| PM-14 | Import owner code from NEMRC if not in CAMA | One-time import |
| PM-15 | Maintain taxable status | Taxable, Non-Taxable, State Owned |
| PM-16 | Maintain special districts (school, village, etc.) | School district is necessary to generate SPAN |
| PM-17 | Maintain town parcel ID numbers | Map/Block/Lot, etc. |
| PM-18 | Track Safe At Home status | For address redaction |
| PM-19 | Maintain category code per a state-approved list | |
| PM-20 | Restrict deletion of parcels | Inactive parcels should not be deleted |
| PM-21 | Maintain multiple situs (E-911) addresses per parcel | For merged parcels, keep the distinct addresses of each original constituent parcel |

### 3.1 Direct corroboration of the "inactive record needs a pointer to its active parent" concept — independently, from 2020, not just the 2026 workgroup

PM-2, PM-5, PM-6, PM-7, PM-8, and PM-9 collectively describe, in different words, exactly the same structural idea as `poly_inactive.PARENTSPAN` (documented since the Vermont GIS Parcel Data Standard v2.3, [§4](../SPAN_PARCEL_GRANDLIST_MODEL.md#4-current-gis-parcel-data-model-vermont-gis-parcel-data-standard-v23-oct-2016)) and the proposed `ADMINSPAN` field ([§6.3](../SPAN_PARCEL_GRANDLIST_MODEL.md#63-new-field-definitions-per-the-workgroup-pdf)): an inactive/sub-lot record needs to carry a durable reference to whichever active/billing record it's combined into. **This document shows PVR's own planners had already identified this exact requirement by 2020–2022 — years before the 2026 Act 164/170 workgroup proposed `ADMINSPAN`.** It isn't a novel idea invented for the current redesign; it's a recurring, independently-arrived-at requirement across at least three separate efforts (the original Parcel Data Standard's `PARENTSPAN`, this VTPIE document, and the 2026 workgroup).

**A genuinely new nuance PM-6 adds, not documented anywhere else:** when multiple dwellings exist on parcels being merged, the tie-break rule for which SPAN survives as "active" is **"whichever one homestead was declared on,"** not simply "whichever has a dwelling." Worth carrying into the current redesign's own definition of the `ADMINSPAN`/`SPAN` relationship for horizontal combinations (§6.2 of the model document) — the worked examples there don't currently specify a tie-break rule for the multi-dwelling case.

### 3.2 A genuinely new operational scenario: reactivating a merged parcel on sale (PM-10)

Nothing in the current as-built documentation — not the Parcel Data Standard, not the NEMRC Grand List module screenshots/training materials already reviewed ([SPAN_PARCEL_GRANDLIST_MODEL.md §1.5](../SPAN_PARCEL_GRANDLIST_MODEL.md#15-the-grand-list-modules-own-parcelcontiguous-parcel-ui)) — describes the *reverse* operation: an inactive parcel becoming active again because it sold separately from its merged parent. PM-10 describes this precisely, including that it requires manually moving land/improvement value back off the (former) active parent record. **Whether the actual NEMRC Grand List module supports this cleanly today is unconfirmed** and worth a direct question — the existing training materials document splits, transfers, and initial combination, but not un-combination.

### 3.3 PM-21 (multiple situs addresses for merged parcels) is a concrete argument *for* the proposed Parcel/Administrative Parcel split

Today's single `E911ADDR` field (confirmed real on both the raw NEMRC file and the published `GRANDLIST`-derived layer, per [SPAN_PARCEL_GRANDLIST_MODEL.md §3](../SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table)) is one address per record. PM-21 identifies a real, named need for **multiple** situs addresses on a single merged/administrative parcel — one per original constituent lot. This is naturally solved by the July 2026 proposal's structure ([§6.2](../SPAN_PARCEL_GRANDLIST_MODEL.md#62-worked-examples)): each constituent `PARCEL` row (e.g. `TYPE=PARTSURFCE`) already keeps its own distinct `SPAN`/`LOCALID`, so each could independently carry its own E911 address, while only the aggregated `ADMINPARCL`/`COMBINED` billing record needs a single address for tax-bill mailing purposes. **This is a concrete, real-world requirement that argues in favor of the proposed split, worth citing directly if the redesign needs a plain-English justification beyond the Act 164 legal definition change.**

### 3.4 The "O" (Other) category rule, and a live example of exactly this scenario

PM-19's note (and the reference table in §5 below) specifies: *"O | Other | Export must contain the category it should be equalized against."* — i.e., a parcel coded "Other" isn't exempt from category-based equalization; the export must **also** carry the real category it should be equalized against. This is directly relevant to a fact already found in real data: the Killington sample's `411_gl57.csv` shows a real condo record with `CATCODE=O` ([NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §4](../NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#4-confirmed-real-span-example-killington)). Per this rule, that record should also carry a real equalization-target category somewhere — **worth checking directly whether it does**, since no such secondary category field was found in the raw `411_gl` schema examined so far.

## 4. The proposed CAMA Export schema — a third schema to reconcile against the raw NEMRC file and the published VCGI layer

This document specifies a proposed CAMA-to-VTPIE export format, explicitly **"similar in scope to the existing 411 data export generated by the NEMRC Grand List Software."** Comparing it field-by-field against the two schemas already fully documented (the raw `411_gl` NEMRC export and the live published `FS_VCGI_OPENDATA_..._poly_standardized_parcels_SP_v1` layer) surfaces several things worth flagging:

### 4.1 The single most important field in this whole document: `Status`

The very first field in the proposed export is **`Status` — "Records status (Active/Inactive)" — on every record, for every town.** This is the exact, already-designed fix for the single most consequential gap already documented: [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §7](../NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#7-tif-files-and-the-critical-activeinactive-parcel-finding) found that genuine Active/Inactive parcel status is only exported to the Tax Department today for TIF-district towns, via one file (`411TFP`'s `PACTIVE`). This VTPIE design specified a universal `Status` field, on the base parcel record, for **every** town — meaning if this integration had been completed, the TIF-only inactive-status gap that this documentation set independently rediscovered in 2026 would already have been solved by design in 2020–2024. **This is worth surfacing prominently in the ongoing redesign conversation** ([SPAN_PARCEL_GRANDLIST_MODEL.md §5 item 7 / §7 item 16](../SPAN_PARCEL_GRANDLIST_MODEL.md#5-limits-of-the-current-model-pre-redesign)) — not as something to revive wholesale, but as evidence that a universal per-parcel status field is both recognized as necessary and has already been specified once.

### 4.2 `NumberofDwellings` — a pre-existing, already-specified answer to the `DWELLINGS` gap

The proposed export includes a field named plainly **`Number of Dwellings`** ("Number of dwellings," Integer, database field `NumberofDwellings`). [SPAN_PARCEL_GRANDLIST_MODEL.md §5 item 2](../SPAN_PARCEL_GRANDLIST_MODEL.md#5-limits-of-the-current-model-pre-redesign) and multiple open questions ([§7 items 1, 13](../SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup)) have treated `DWELLINGS` as a field with **no existing precedent anywhere** in CAMA or the Grand List — confirmed directly from VCGI. This document shows that's true of what actually got built, but **not true of what PVR had already specified**: a dwelling-count field, CAMA-sourced, feeding into the state system, was designed here in 2020–2024 — years before Act 170 (2026) legislatively required a "number of dwelling units" grand-list column. **This means the current redesign doesn't need to invent this field from nothing — a prior, concrete specification already exists and is worth reviewing directly** (even though, since VTPIE-CAMA integration wasn't completed, the field itself was never actually implemented, consistent with the confirmed current-state gap).

### 4.3 New fields with no precedent in either previously-documented schema

| Field | Description | Why it matters |
|---|---|---|
| `Owner Suppressed` | "Suppressed from public records indicator (Safe At Home) True/False" | A genuinely new privacy/data-governance finding: Vermont's "Safe At Home" address-confidentiality program apparently needs to suppress certain owners' addresses from public records. **No such flag exists anywhere in the confirmed live `GRANDLIST`/published-layer schema** — worth flagging directly, since VCGI's own statewide parcel layer publishes owner mailing addresses. |
| `Billing Address 1/2/City/State/Zip` | A second, distinct address, separate from `Mailing Address` | Nothing in the raw NEMRC file or the published layer distinguishes a billing address from a mailing address — only one address exists today. This implies a real, currently-unmet need (e.g., bills going to a mortgage/escrow company while correspondence goes elsewhere). |
| `Situs (E-911) Address 1/2/City/State/Zip` | A fully structured, five-part E-911 address | Considerably richer than today's single `E911ADDR` string field — directly relevant to PM-21's multiple-situs-address requirement (§3.3 above). |
| `Mobile Registration/Serial Number`, `Mobile Model`, `Mobile Manufacturer` | Mobile/manufactured-home-specific identification fields | No equivalent exists in either previously-documented schema, despite Mobile Home Unlanded/Landed (`MHU`/`MHL`) being a recognized category in every version of the classification taxonomy seen so far. |
| `Last Reappraisal date` | Date of the parcel's/town's last reappraisal | Not present in either previously-documented schema. Directly relevant to Act 170's Regional Assessment Districts ([§6.5](../SPAN_PARCEL_GRANDLIST_MODEL.md#65-regional-assessment-districts-and-pvrs-rulemaking-mandate-act-170-3417)), which require member towns to fully reappraise every six years starting 2031 — tracking that cycle needs exactly this kind of field, and nothing in the current pipeline appears to carry it. |
| `CAMA ID` | A CAMA-internal account number, distinct from both `Parcel ID` and `SPAN` | A third town/system-level identifier alongside `Parcel ID`/`Map ID`, reinforcing [§6.3](../SPAN_PARCEL_GRANDLIST_MODEL.md#63-new-field-definitions-per-the-workgroup-pdf)'s `LOCALID` finding that municipalities and vendors persistently maintain their own IDs alongside SPAN. |
| `Contiguous SPANs` | "Reference of contiguous SPAN numbers," `Text(13)` — single-SPAN width | An independent, 2020-era design precedent for the same linking concept as `PARENTSPAN`/`ADMINSPAN` (§3.1 above) — embedded directly in the export schema itself, not just the CAMA UI. |
| `Tax Entity Code` | No description given | Left entirely undefined in the source document — genuinely unclear what this represents; worth asking directly rather than guessing. |

### 4.4 Confirmed matches to already-documented NEMRC-side fields — evidence the 2024 revision was grounded in NEMRC's real data

Two fields added specifically in the 2024 revision (per the version history: *"Add Tax Status Field to CAMA Export,"* *"Add Insurance Value Field to CAMA Export"*) map directly onto fields already confirmed in the raw NEMRC export:

- **`Tax Status`** (`T`: Taxable, `N`: NonTaxable, `S`: State Owned Property) matches the three-way taxable/non-taxable/statutory concept already confirmed via `411TFP.PACTIVE` (`1`=Active, `2`=Inactive, `3`=Non-taxable statutory, [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §7.1](../NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#71-411tfp-carries-the-only-genuine-activeinactivenon-taxable-status-field-in-this-entire-export-family)) — **though this design keeps "active/inactive" (`Status`) and "taxable status" (`Tax Status`) as two separate, orthogonal fields, a cleaner separation of concerns than NEMRC's single overloaded `PACTIVE` field, which conflates both ideas into one three-way code.** Worth considering directly for the current redesign.
- **`Insurance Value Indicator`** (`I`: Insurance Value Used, `A`: Assessed Value) is an **exact conceptual and coding match** to `411LST.REALVALTYPE` ("Valuation Type: A = Assessment, I = Insurance Replacement Cost," [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §5](../NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#5-the-exemption-code-systems)) — direct, concrete confirmation that this 2024 revision was informed by NEMRC's actual existing Grand List module fields, not designed in isolation.

### 4.5 An apparent internal inconsistency in the source document itself (noted, not resolved)

The export schema lists both `Equipment Property Value` (described, oddly, as *"Value of personal property equipment (cable only)"*) and a separate `Cable Equipment Value` field immediately after it. The `(cable only)` parenthetical on `Equipment Property Value` looks like it may be a copy-paste artifact from the adjacent cable field's own description, since a genuinely separate "Cable Equipment Value" field exists right below it. Flagged here as an apparent inconsistency in the source document, not something this analysis resolves.

## 5. Category and owner codes — a third naming-variant system

This document's own "Real Property Codes" reference table uses yet another set of abbreviations for the same underlying property-category concept already documented via `411TOT_CATEGORIES.csv` ([NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §6](../NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#6-the-16-category-property-classification-system)):

| Concept | This document | `411TOT` category abbrev. | `411TOT` header prefix |
|---|---|---|---|
| Commercial | `C` | COMM | `COM` |
| Commercial Apartment | `CA` | CMA | `CMA` |
| Industrial | `I` | IND | `IND` |
| Farm | `F` | FRM | `FRM` |
| Woodland | `W` | WOOD | `WD` |
| Miscellaneous | `M` | MISC | `MSC` |
| Residential-1/2, Mobile Home U/L, Seasonal/Vacation-1/2, Utility E/O, Other | Same as `411TOT` | — | — |

**This is now the third distinct abbreviation variant observed for what is fundamentally one classification concept** (the other two — category-abbreviation vs. header-prefix — already coexist within the `411TOT` file family alone). This document also has **no `TC` (Telecommunications) category at all**, consistent with it predating the GL2026 telecom-taxable schema change already documented as in-progress. Taken together, this accumulating pattern of naming drift across systems is a concrete, evidence-backed argument for exactly what Act 170 §3417 already authorizes PVR to do — set one standardized data/category standard, rather than each system (and each revision of each system) inventing its own abbreviation convention.

**A minor internal inconsistency, also worth just noting:** the Owner Code requirement text (PM-13) describes code `N` as "Out of state resident," but this document's own separate "Owner Codes" reference table describes the same concept as `NS`, "Non-state resident" — an inconsistency within the source document itself, not something this analysis needs to resolve, but worth being aware of if either table is used as a literal reference.

## 6. TIF import fields — further evidence of NEMRC's internal field structure

The "VTPIE Imports" section lists a one-time transitional import of TIF data, with field names (`P_PROP`, `P_SUB`, `P_TIFID`, `P_SPAN`, `P_TZONE`, etc.) explicitly annotated **"see lsprop"** or **"SEE LSSYST"** — i.e., these are NEMRC's own *internal* TIF database field names (from tables apparently called `lsprop`/`lssyst`), not the `411TFS`/`411TFP` export field names already documented. **`lsprop` is now independently confirmed as a real NEMRC internal database name**, not a placeholder — a separate NEMRC training document on the NEMRC↔CAMA sync mechanism names it directly as `LSPROP01`, "the" live NEMRC parcel database ([SPAN_PARCEL_GRANDLIST_MODEL.md §1.5](../SPAN_PARCEL_GRANDLIST_MODEL.md#15-the-grand-list-modules-own-parcelcontiguous-parcel-ui)). Most map conceptually onto already-documented fields (`P_SPAN`↔`SPAN`, `P_CONTR`/`P_MCONTR`↔ base-value fields on `411TFS`/`411TFP`) but **one is worth flagging as a direct contradiction**: this document describes `P_TZONE` as **"TIF ZONE (DEFAULT TO 1)"** — implying it's a real, meaningful field — while the raw NEMRC `411TFP` export's own header file explicitly states its `TZONE` field **"is not used"** ([NEMRC_GRANDLIST_EXPORT_AS_BUILT.md §7.2](../NEMRC_GRANDLIST_EXPORT_AS_BUILT.md#72-known-data-quality-caveats-on-the-tif-files-tax-departments-own-words)). Whether this reflects the field genuinely being meaningful internally (in `lsprop`) but not populated/used in the export specifically, or a documentation error in one source or the other, is unconfirmed.

## 7. What this means for the current Act 164/170 redesign

- **The core `ADMINSPAN`-style linking concept is not a 2026 invention** — PVR's own planners specified the same structural need (an inactive/sub-lot record durably pointing at its active/billing parent) as far back as 2020. This gives the current workgroup a second, independently-produced source to check the proposed field design against, beyond just the current NEMRC Grand List module UI already reviewed.
- **A universal per-parcel Active/Inactive `Status` field was already specified once, and never implemented** — directly relevant to closing the TIF-only inactive-status gap that this documentation set found and flagged as an open question. Worth treating as a starting point, not a novel ask, when raising this with NEMRC or Tax Department leadership.
- **A `NumberofDwellings` field was already specified once, and never implemented** — the same is true here as for `Status`. Before designing `DWELLINGS` from scratch, this specification is worth reviewing directly alongside the two vendor-native fields already found (Aumentum's `ResLivingUnits`, Catalis's `Rental Living Units`).
- **PM-21's multiple-situs-address requirement is a concrete, real-world argument in favor of the proposed Parcel/Administrative-Parcel split** (§3.3 above) — worth citing directly as a practical justification, not just the Act 164 legal-definition change.
- **Several genuinely new gaps surfaced here have no analog anywhere in the current Act 164/170 discussion:** Safe-at-Home/owner-address suppression, a distinct billing vs. mailing address, mobile-home-specific identification fields, and a last-reappraisal-date field relevant to Regional Assessment Districts' six-year cycle. None of these are mentioned in [SPAN_PARCEL_GRANDLIST_MODEL.md §6](../SPAN_PARCEL_GRANDLIST_MODEL.md#6-proposed-future-state-model-vcgitax-deptnemrc-workgroup-july-27-2026)'s proposed field set — worth considering whether any belong in it.
- **PVR's own separation of "active/inactive" (`Status`) from "taxable status" (`Tax Status`) into two orthogonal fields is arguably cleaner than NEMRC's single overloaded `PACTIVE` field** (which conflates both), and worth considering as a design principle for the current redesign's own status fields.

## 8. Open questions

1. Does the actual NEMRC Grand List module support reactivating a merged/inactive parcel cleanly when it sells separately (PM-10), given no training material reviewed so far describes this specific reverse operation?
2. Does the real Killington `411_gl` record with `CATCODE=O` (§3.4 above) also carry a secondary equalization-target category, per this document's own stated rule for the "Other" category?
3. What does `Tax Entity Code` (§4.3) actually represent? No description is given anywhere in the source document.
4. Is `P_TZONE` ("TIF ZONE, DEFAULT TO 1," per this document) genuinely meaningful internally to NEMRC's `lsprop`/`lssyst` tables, even though the exported `411TFP.TZONE` field is documented as unused (§6 above)? **`lsprop` itself is now confirmed real** (as `LSPROP01`, NEMRC's live parcel database — [SPAN_PARCEL_GRANDLIST_MODEL.md §1.5](../SPAN_PARCEL_GRANDLIST_MODEL.md#15-the-grand-list-modules-own-parcelcontiguous-parcel-ui)), which makes it somewhat more plausible that `P_TZONE` is a genuine internal field, but this remains otherwise unconfirmed.
5. ~~Is there a Vermont "Safe At Home" address-confidentiality program that actually requires suppressing certain parcel owners' addresses from public records?~~ **Resolved (VCGI, 2026-08-03):** yes, administered by the Vermont Secretary of State. VCGI checks with the Secretary of State upon receipt of each annual Grand List file from the Tax Department and applies any necessary redactions before publishing the joined Grand List/parcel table; the Tax Department has separately begun its own checks with the Secretary of State before sharing the Grand List elsewhere. **Both are downstream, reactive mitigations — per VCGI, suppression capability should still be implemented at the source: each municipality's own CAMA/Grand List data entry.** See [VERMONT_CAMA_DATA_STANDARD_DRAFT.md §4.2](../VERMONT_CAMA_DATA_STANDARD_DRAFT.md#42-ownership--address-fields-phase-1-except-where-noted)'s `OWNER_SUPPRESSED` field.

These questions, plus every other open question across this documentation set, are consolidated by theme and responsible party in [../OPEN_QUESTIONS_AND_NEMRC_ASKS.md](../OPEN_QUESTIONS_AND_NEMRC_ASKS.md).
