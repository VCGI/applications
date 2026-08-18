# Vermont Parcel Data Modernization

*How Vermont identifies, tracks, transmits, maps, and publishes municipal parcel data and what's changing under Act 164 (H.933) and Act 170 (H.955) of 2026. Scoped to parcel identification specifically, not downstream, related taxation/valuation activities.*

## Why Modernize

Who owns which lands where? With what details? For several reasons these seemingly simple questions remain complicated or difficult to answer throughout Vermont. Many challenges in answering them are due to Vermont's history as a New England State with:
- [at times](https://archive.org/details/statepapersofverv1verm/), [centuries-old](https://archive.org/details/statepapersofver00verm/), [documentation](https://archive.org/details/statepapersofver0000verm_n8r9/) of [where boundaries are](https://archive.org/details/newhampshiregran00newh/);
- hundreds of small municipalities being responsible for authoritative [land records management](https://vmcta.org/Vermont_Land_Records_Online) and access;
- a parcel definition based on Tax bill and program administration rather than one that reflects and indexes with underlying legal land records;
- no coordinated effort ever developed to [fully resolve the extents of its jurisdictions](https://github.com/VCGI/publications/blob/main/Act68_2024/Act68-2024-Parcels-VCGI_As_Submitted_20241212.md#support-survey-of-municipal-boundaries-andor-corner-points); and
- widely varying technology orientations and resulting practices.

A result is that statewide questions of public concern that benefit from knowing how much of what kinds of lands are located where remain hard or even impossible to answer due to a lack of common baseline information.

Given these conditions the [statewide standardized parcel dataset](https://vcgi.vermont.gov/data-and-programs/parcel-program) has become one of the best available resources for considering such questions. These may be related to statewide conservation and development trends, [housing conditions](https://map.vermont.gov/housing), [extent of current tax policies](https://vcgi.vermont.gov/news/current-use-data-now-available-parcel-viewer-updated), emergency management, and more. While not perfect and for reference purposes only, the uniform parcel dataset with aggregated geometry from municipalities joined with annual grand list information allows one to quickly investigate where many things are (or are not) throughout the state.

Nearly 10 years of stewardship of [statewide parcel data](https://geodata.vermont.gov/pages/parcels) has clarified both the limitations of and opportunities for underlying property data management. These practices precede parcel data assembly and its ultimate use toward clarifying or addressing persistent statewide public policy issues. Changes brought forth by Act 164 and Act 170 thus begin there.

<img width="2250" height="1400" alt="Existing Parcel Practice" src="https://github.com/user-attachments/assets/e80708e8-5010-4426-9ce9-fcf7e88a00e9" />

<img width="2250" height="1400" alt="Existing Parcel Practice Inverted" src="https://github.com/user-attachments/assets/21925c4f-3925-4210-9938-ae3af4f67f3c" />

## Purpose of This Document

Vermont towns are subject to three separate systems for property/parcel administration: 
- a **CAMA** system (appraisal record-keeping — which may or may not be NEMRC's MicroSolve),
- the NEMRC-maintained **Grand List module** (billing and the statewide **SPAN** identifier), and
- **VTPIE** (the Vermont Property Information Exchange, a Tax-Department-led platform covering select tax-program activities).

VCGI's own statewide parcel GIS layer sits downstream of all three, built from parcel geometry that towns submit voluntarily. Two 2026 laws, [Act 164](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT164/ACT164%20As%20Enacted.pdf) and [Act 170](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf), require these systems to work together more precisely, on a series of deadlines running through 2031: 
- a new physical/legal definition of "parcel",
- a new required dwelling-unit count,
- a new three-way property classification, and
- a direct legislative mandate for the state to set data standards across all of it.

This repository is an attempt to document, as best as the available evidence allows, how these systems *actually* work today. It is reverse-engineered from sample data, system extracts, vendor training materials, and direct conversations with VCGI, Tax Department, municipal officials, map vendors, NEMRC staff, and CAMA vendor staff so that the coming changes can be implemented on a shared, accurate factual basis rather than guessed at independently by each party. This document is the entry point and synthesis; the detailed technical findings live in the linked documents below.

## Who This Is For

- **Tax Department / Property Valuation and Review (PVR):** you hold the legislative authority behind most of this. SPAN is legally "the numbering system prescribed by the Director" ([32 V.S.A. §5404(b)](https://legislature.vermont.gov/statutes/section/32/135/05404)), and [Act 170](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf) §3417 directs you to set statewide standards for parcel data collection and CAMA/IT contracts. Start with [The Short Version](#the-short-version), [Legislative Timeline](#legislative-timeline), and [What This Means for Tax Department / PVR](#if-youre-at-the-tax-department--pvr).
- **CAMA vendors** (Aumentum, Vision, Catalis, and others who may contract with VT towns in the future): you'll need to implement new extract fields and reporting on the timeline below. Start with [What This Means for CAMA Vendors](#if-youre-a-cama-vendor) and your product's own as-built document, linked there.
- **NEMRC:** you are, at once, one of four CAMA vendors *and* the sole statewide source of SPAN for every Vermont town, regardless of which CAMA product that town runs. Nearly everything documented here eventually depends on your Grand List module's cooperation, not just your CAMA product's. Start with [What This Means for NEMRC](#if-youre-nemrc), which includes the legislative-change summary you asked for.

## The Short Version

- Towns see three systems: **CAMA** (town-level, vendor-specific — NEMRC MicroSolve for ~77% of towns, Aumentum/ProVal, Vision, or Catalis/AssessPro elsewhere), the NEMRC-maintained **Grand List module** (statewide SPAN issuance and billing, regardless of CAMA vendor), and VTPIE (the Tax Department's Vermont Property Information Exchange, handling select tax-program activities). VCGI's statewide parcel GIS layer is downstream of all three — it joins town-submitted parcel geometry to the Grand List using SPAN, via the Tax Department — but town participation in it, submitting updated SPAN-attributed parcel geometry, **remains voluntary**, unlike the other three. It is nonetheless the single easiest and most useful way for the public and policy makers to access property information statewide, which is why VCGI has undertaken this modernization effort rather than continuing to just receive whatever geometry towns submit as-is.
- The single most consequential change: Vermont's legal definition of "parcel" is splitting in two — an **ownership/billing parcel** (who pays one tax bill) and a **mapping/sellable-lot parcel** (a physical, separately-sellable piece of land) — and today's software mostly only models the first one well.
- Two other concrete new requirements: a **count of dwelling units per parcel** (required on grand lists starting with those lodged in calendar year 2027, which is the nearest deadline of anything here, and no field exists anywhere today to source it), and a **three-way property classification** (homestead / nonhomestead residential / nonhomestead nonresidential) with percentage-of-floor-space splitting for mixed-use buildings (2029, contingent on further legislative action).
- **None of this works without SPAN**, and NEMRC's Grand List module is the only source of SPAN for all ~260 Vermont towns today, independent of CAMA vendor.
- [Act 170 §3417](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf) gives PVR direct rulemaking authority over parcel-data and CAMA/IT standards. This documentation is meant to be usable input to that rulemaking, not just a set of talking points for vendor conversations.

## Legislative Timeline

*Rows link to the more complete technical discussion. This table is meant to orient, not replace that detail. Cross-checked against a review by the Tax Department's policy advisor on July 30, 2026.*

| When | What Happens | Statute | Why It Matters |
|---|---|---|---|
| **July 1, 2025** *(already effective — compliance still unmet statewide)* | Annual CAMA extract to PVR required, identifying every parcel by SPAN. | [32 V.S.A. §5404(b)](https://legislature.vermont.gov/statutes/section/32/135/05404), as enacted by Act 69 of 2025 (S.127), Sec. 6 | The baseline requirement behind this entire documentation effort — and towns/vendors are not yet in compliance with it. The bills below can help formalize the vendor-facing request and specify what the extract should contain. See [§1.4](SPAN_PARCEL_GRANDLIST_MODEL.md#14-the-cama-extract-submission-channel-32-vsa--5404b-and-globalscape-ftp). |
| *(Already enacted, no specific date)* | Per-parcel payment to towns (currently $1.00/parcel) for assisting PVR with the equalization study. | [32 V.S.A. §5405](https://legislature.vermont.gov/statutes/section/32/135/05405) | One of the two statutes the parcel-definition split (below) explicitly carves out a "separate and sellable lot" meaning for — connects directly to why `PARCLCOUNT` in the proposed model exists ("for State funding calculations," [§6.3](SPAN_PARCEL_GRANDLIST_MODEL.md#63-new-field-definitions-per-the-workgroup-pdf)). |
| Not gated to a specific date | PVR Director directed to set statewide standards for parcel data collection and CAMA/IT software contracts. | [Act 170, §3417](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf) | **The direct statutory hook for adopting this documentation as an actual state standard.** See [§6.5](SPAN_PARCEL_GRANDLIST_MODEL.md#65-regional-assessment-districts-and-pvrs-rulemaking-mandate-act-170-3417). |
| Grand lists lodged beginning **CY2027** | New required "number of dwelling units" column on the Grand List. | [Act 170](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf) Sec. 57, [32 V.S.A. §4152(a)(10)](https://legislature.vermont.gov/statutes/section/32/129/04152) | **Nearest dated deadline of anything here.** No field exists today — in CAMA, the Grand List, or the GIS layer — to source this count. See [§6.3](SPAN_PARCEL_GRANDLIST_MODEL.md#63-new-field-definitions-per-the-workgroup-pdf). |
| **July 1, 2026** *(enacted date — the Tax Department has confirmed this was a technical drafting error; intended to align with the July 1, 2031 reappraisal-system changes below, with a technical correction expected next session)* | Two per-parcel reappraisal payment multipliers established: grand list maintenance and reappraisal year. | Act 170, Sec. 35, [32 V.S.A. §4041a](https://legislature.vermont.gov/statutes/section/32/129/04041a) (Reappraisal) | The other statute the parcel-definition split explicitly carves out — same funding-calculation relevance to `PARCLCOUNT` as §5405 above. Treat the effective date with caution until the correction is enacted. |
| **April 1, 2028** | Legal definition of "parcel" splits: for tax and Current Use purposes, still the combined/contiguous-ownership parcel; for mapping and per-parcel-payment purposes (§4041a and §5405 above), a separate, sellable lot. | [Act 164](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT164/ACT164%20As%20Enacted.pdf) Sec. 20, [32 V.S.A. §4152(a)(3)](https://legislature.vermont.gov/statutes/section/32/129/04152) | Directly drives the proposed Parcel vs. Administrative Parcel model. See [§6.1](SPAN_PARCEL_GRANDLIST_MODEL.md#61-core-idea-split-parcel-from-administrative-parcel). |
| CY2028 *(contingent)* | Tax Dept begins collecting property-use data toward classification; reports to the Joint Fiscal Office by Oct. 1, 2028. | [Act 170, Sec. 60](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf) | Precursor to the 2029 classification rollout below. |
| **July 1, 2029** *(contingent on 2025 Acts and Resolves No. 73, as amended by Act 170 Sec. 18, and on enactment of tax rate multipliers — repeals the Act 73 of 2025 contingent classification legislation it replaces)* | Parcels classified three ways (homestead / nonhomestead residential / nonhomestead nonresidential), with floor-area proration for mixed use; new dwelling-use attestation. | [Act 170](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf) Secs. 58–64, [32 V.S.A. §4152a](https://legislature.vermont.gov/statutes/section/32/129/04152), [§5410](https://legislature.vermont.gov/statutes/section/32/135/05410) | No analog today beyond a binary homestead flag. See [§6.3](SPAN_PARCEL_GRANDLIST_MODEL.md#63-new-field-definitions-per-the-workgroup-pdf). |
| **January 1, 2031** | Regional Assessment Districts begin operating (joint 6-year reappraisal cycles, ≥10,000 parcels each). | [Act 170](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf), [32 V.S.A. §§3415](https://legislature.vermont.gov/statutes/section/32/121/03415)–3419 | See [§6.5](SPAN_PARCEL_GRANDLIST_MODEL.md#65-regional-assessment-districts-and-pvrs-rulemaking-mandate-act-170-3417). |
| **July 1, 2031** | Statewide assessment/lien date moves from April 1 to January 1 (dozens of statutes amended); applies to the 2032 grand list. | [Act 164, Secs. 24–48](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT164/ACT164%20As%20Enacted.pdf) | Mechanical, but touches nearly every date-driven field/workflow in CAMA and the Grand List. |
| **July 1, 2031** | Regional Assessment District Appeals Boards take over valuation-appeal jurisdiction from municipal Boards of Civil Authority. | [Act 170](https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT170/ACT170%20As%20Enacted.pdf), 32 V.S.A. §§3418–3419 | See [§6.5](SPAN_PARCEL_GRANDLIST_MODEL.md#65-regional-assessment-districts-and-pvrs-rulemaking-mandate-act-170-3417). |

## The Current System, in Brief

- **CAMA** holds the appraisal detail — building characteristics, land lines, valuation math — for whichever vendor's software a town runs (not necessarily NEMRC's MicroSolve). It does **not** issue SPAN; it just stores whatever SPAN the Grand List module assigned. See [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md), [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md), [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md).
- **The NEMRC-maintained Grand List module** (a separate product from CAMA, used statewide regardless of which CAMA vendor a town runs) generates and maintains SPAN, produces the annual lodged Grand List, and is the record a town submits to the state.
- **VTPIE** (the Tax Department's Vermont Property Information Exchange) is the third system towns use, handling select tax-program activities — sales ratio/equalization study, current use, utility inventories, homestead/lister response, exemption management. Detail: [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §1.2, and here [VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS](https://github.com/VCGI/applications/blob/main/cama-data/VTPIE/VTPIE_CAMA_REQUIREMENTS_PARCEL_ANALYSIS.md).
- **VCGI's statewide parcel GIS layer sits downstream of all three of the above** — it joins town-submitted parcel geometry to the Grand List (which VCGI receives from the Tax Department, not directly from towns or NEMRC) using SPAN as the key, publishing the result as the statewide "Active" and "Inactive" parcel layers. Unlike CAMA, the Grand List, and VTPIE, town participation in submitting that geometry **remains voluntary**.
- VCGI's standing to lead this work rests on its own statutory authority to develop, publish, maintain, and implement GIS data standards statewide ([10 V.S.A. chapter 8](https://legislature.vermont.gov/statutes/fullchapter/10/008)). CAMA data standards and the parcel definition itself aren't GIS data standards on their own, but their relationship to how GIS parcel data works — especially under Act 164/170 — is why this effort is being developed in partnership with the Tax Department, which retains authority over the other aspects of property information management addressed here (32 V.S.A. §5404(b); Act 170 §3417).
- Full detail, including the actual Globalscape FTP mechanism NEMRC uses to submit CAMA data today, and a first direct look at the Grand List module's own "Active/Inactive/Contiguous Parcel" screens: [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §1.

## What's Changing

- **Parcel vs. Administrative Parcel.** Today, when several adjoining lots share one owner, they're combined into one "Active" parcel for billing, with the individual lots marked "Inactive." Act 164 requires the *mapping* definition of parcel to mean a separate, sellable lot instead — which is exactly what today's "Inactive" layer already models, just not as the primary published layer. The proposed fix: elevate that layer to primary, and introduce two new linking fields — `ADMINSPAN` (combines multiple physical lots into one tax bill) and `GROUNDSPAN` (links condo units to their shared ground/common element). Full detail: [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §6. **A real complication for this plan, confirmed via an actual NEMRC Grand List export sample:** the Tax Department's own Grand List data only carries genuine Active/Inactive parcel status for the minority of towns with a TIF district — for the rest, VCGI's own voluntarily-submitted parcel geometry is currently the more complete statewide source of that status. See [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md) §7 and [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §5 item 7.
- **Dwelling units.** A new `DWELLINGS`-type field, required by CY2027, that doesn't exist today at the CAMA, Grand List, or GIS level in any of the three CAMA products examined so far — though two of those three vendors have *something* dwelling-count-adjacent already (Aumentum's `ResLivingUnits`, Catalis's `Rental Living Units`), neither of which has been confirmed as the right source. The definition of "dwelling unit" itself is still being worked out.
- **Three-way classification.** Replacing today's simple homestead/non-homestead flag with three categories (homestead / nonhomestead residential / nonhomestead nonresidential) and percentage-of-floor-space proration for mixed-use buildings — mechanically similar to what already exists in commercial CAMA valuation tables, but not wired to this purpose anywhere yet.
- **A real statutory lever for standardization.** Act 170 §3417 gives PVR authority to set the actual parcel-data and CAMA/IT standards this documentation has been reverse-engineering the *current state* of — see the timeline above.

## What This Means

### If you're at the Tax Department / PVR

- Your authority is already the backbone of this: 32 V.S.A. §5404(b) makes SPAN "the numbering system prescribed by the Director," and Act 170 §3417 gives you rulemaking authority over parcel-data collection standards and CAMA/IT contracts — see [§6.5](SPAN_PARCEL_GRANDLIST_MODEL.md#65-regional-assessment-districts-and-pvrs-rulemaking-mandate-act-170-3417).
- A handful of decisions here are policy calls, not IT questions, and are yours to make: what actually counts as a "dwelling unit"; whether the 2028 parcel-definition change and the 2029 classification work roll out together or on separate tracks; how (or whether) cross-town contiguous parcels get handled uniformly, since SPAN is town-scoped but ownership isn't always; and whether NEMRC's annual Grand List export to your department should be extended to carry Active/Inactive parcel status for all towns, not just the TIF-district ones it covers today — see [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md) §7.
- The full, current list of open technical/policy questions the workgroup is tracking is consolidated in [OPEN_QUESTIONS_AND_NEMRC_ASKS.md](OPEN_QUESTIONS_AND_NEMRC_ASKS.md) — organized by theme and by responsible party, so specific items can be handed to specific people rather than treating this as one large undifferentiated problem.

### If you're a CAMA vendor

- The concrete, near-term ask: participate in formalizing your product's data-extract format under 32 V.S.A. §5404(b) — this is literally what's already happened for three of the four vendors serving VT towns (documented in [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md), [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md), [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md)). A concrete starting point for that conversation: [VERMONT_CAMA_DATA_STANDARD_DRAFT.md](VERMONT_CAMA_DATA_STANDARD_DRAFT.md), a preliminary, VCGI-authored schema built from all four vendors' real data plus VCGI's own 2024 first-pass proposal.
- What's coming that will likely require product or schema work: a dwelling-unit count field, floor-area-percentage classification fields, and — if adopted — `ADMINSPAN`/`GROUNDSPAN`-style relational fields for multi-parcel/multi-unit conditions.
- Vendor-specific open questions are listed at the end of each product's as-built document — e.g. whether Aumentum's `tax_bill_id` is reliably equivalent to SPAN statewide and what `ResLivingUnits` actually represents ([PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) §6); whether Catalis/AssessPro tracks a Vermont SPAN internally at all, given the one sample examined has none ([ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md) §6); no sample has yet been received from Vision Government Solutions, which is itself an open item.

### If you're NEMRC

You're the most consequential vendor in this entire picture: you are, at once, one of four CAMA vendors *and* the sole statewide source of SPAN, via a separate Grand List module used regardless of which CAMA software a town runs. Nearly every change described above eventually routes through your Grand List module, not just MicroSolve.

- **A short, distilled list of exactly what you'd need to change to accommodate the proposed CAMA data standard, split by your two roles (Grand List steward vs. MicroSolve vendor):** [OPEN_QUESTIONS_AND_NEMRC_ASKS.md, Part 1](OPEN_QUESTIONS_AND_NEMRC_ASKS.md#part-1-distilled-nemrc-asks).
- **The legislative timeline above was requested by NEMRC** — see [Legislative Timeline](#legislative-timeline) — and is meant to keep everyone working on this (Tax, VCGI, and the other CAMA vendors) aligned on what's coming and by when, not just you.
- Specific technical questions that are yours to answer, drawn from the full open-questions list in [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §7:
  - Can `EXP_DATADICT`/`EXP_CATEG` (the self-describing schema files that were missing entirely from the Lincoln sample but present in South Burlington's) be included in every future extract as standard practice?
  - Your Grand List module's own "Contiguous Parcel Information" screen already tracks the relationship a proposed `ADMINSPAN` field would formalize — today, keyed by `Parcel #`, not SPAN. Could it be exposed SPAN-keyed instead?
  - Where would a `DWELLINGS` rollup actually be computed — your Grand List module, MSOL CAMA, or both?
  - Will Aumentum, Vision, and Catalis use the same Globalscape FTP arrangement your CAMA data already flows through, or something else?
  - Does contiguous-parcel combination ever actually cross town lines in practice, given each town runs a separate Grand List database?
  - Could the existing `HS-122` and `TIF` tabs on your Grand List module's parcel record be extended to carry the 2029 dwelling-use attestation, rather than building something new?

## Open Questions Still Being Worked Through

**All 57 open questions across every document in this set are now consolidated in one place, organized by theme and by who's actually responsible for answering each one:** [OPEN_QUESTIONS_AND_NEMRC_ASKS.md](OPEN_QUESTIONS_AND_NEMRC_ASKS.md). That document also pulls out a short, standalone list of exactly what NEMRC specifically would need to change to accommodate [VERMONT_CAMA_DATA_STANDARD_DRAFT.md](VERMONT_CAMA_DATA_STANDARD_DRAFT.md), given NEMRC's dual role as both the Grand List/SPAN steward and a CAMA vendor.

Quick theme pointers, if you're looking for one topic specifically (see the document above for the complete, cross-referenced version):

- **Dwelling units — definition and sourcing:** Theme A.
- **SPAN structure, `ADMINSPAN`/`GROUNDSPAN`, and the Grand List module's own mechanics:** Theme B.
- **The NEMRC Grand List export's inactive-parcel-data gap (TIF towns only):** Theme C.
- **Vendor-specific data-transfer and SPAN-reliability questions:** Theme E.
- **Classification/floor-area proration sourcing:** Theme F.
- **Category-code standardization:** Theme G.
- **Confirmed data-quality issues and raw-vs-published discrepancies:** Theme H.
- **New/privacy fields (Safe At Home, billing address, last reappraisal):** Theme I.
- **Timing, sequencing, and statutory compliance:** Theme J.

## The Full Documentation Set

| Document | Covers |
|---|---|
| **`readme.md`** *(this file)* | Entry point and synthesis; CAMA vendor status/contacts below. |
| [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) | SPAN authority and structure, the statewide Grand List table, the current GIS parcel pipeline, the Grand List module's own Active/Inactive UI, and the proposed future-state model — the core technical document behind this synthesis. |
| [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md) | The actual annual NEMRC Grand List module export received by the Tax Department (Killington sample) — official field schemas, exemption code systems, and a critical finding that genuine Active/Inactive parcel status is only exported for TIF-district towns. |
| [VERMONT_CAMA_DATA_STANDARD_DRAFT.md](VERMONT_CAMA_DATA_STANDARD_DRAFT.md) | A preliminary, VCGI-authored draft CAMA data standard — synthesizes every vendor extract, the NEMRC Grand List export, the published GIS layers, and the proposed Act 164/170 fields into one candidate schema, building on VCGI's 2024 Act 68 proposal. |
| [OPEN_QUESTIONS_AND_NEMRC_ASKS.md](OPEN_QUESTIONS_AND_NEMRC_ASKS.md) | Every open question across this documentation set (57 items), consolidated by theme and responsible party, plus a distilled list of NEMRC-specific changes needed to accommodate the draft CAMA data standard. |
| [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) | NEMRC MicroSolve CAMA schema (South Burlington and Lincoln samples). |
| [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) | Aumentum ProVal CAMA schema (Barre Town sample). |
| [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md) | Catalis AssessPro CAMA schema (statewide flat-file sample) — and why it has no SPAN. |
| [cama-explorer-demo-msolve](../cama-explorer-demo-msolve) | Working mock-up viewer + documentation for the MicroSolve/Lincoln sample. |
| [cama-explorer-demo-aumentum](../cama-explorer-demo-aumentum) | Working mock-up viewer + dwelling-unit methodology for the Aumentum/Barre Town sample. |
| [cama-explorer-demo-assesspro](../cama-explorer-demo-assesspro) | Source files for the Catalis/AssessPro sample (no viewer — see [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md) §3 for why). |

---

## CAMA Data Overview

### Status per 32 V.S.A. § 5404

*Last Updated: July 29, 2026*

**What the statute actually requires (32 V.S.A. § 5404(b), as enacted by Act 69 of 2025 (S.127), Sec. 6, effective July 1, 2025):** annually, on or before **August 15**, the clerk of a municipality (or the supervisor of an unorganized town or gore) must transmit to the Director of Property Valuation and Review (PVR) at the Vermont Department of Taxes "an extract of the assessor database also referred to as a Computer Assisted Mass Appraisal (CAMA) system or Computer Assisted Mass Appraisal database" that identifies each parcel by "a parcel identification number assigned under a numbering system prescribed by the Director." **That numbering system is SPAN, and is expected to remain SPAN** even as the parcel-definition changes under Act 164/H.933 take effect (see [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §2/§7 for the redesign discussion). **This requirement is already in effect, and statewide compliance with it has not yet been achieved.** There is currently **no prescribed electronic transfer method** — CAMA vendors are expected to build tailored reports for Vermont's request (as they do in other states) and submit on behalf of their towns; Act 164/170 can help formalize that request and specify what the extract should contain. See [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §1.4 for how this is actually happening today (the Globalscape FTP arrangement with NEMRC) and what remains unconfirmed for the other vendors.

| **Percent   of Towns** | **Towns Per Tax** | **Tool**                      | **Vendor**                                                              | **Sample Received** | **Date Received** | **Notes**                                                                                                                                     | **Mock Up** |
|:----------------------:|:-----------------:|-------------------------------|-------------------------------------------------------------------------|:-------------------:|:-----------------:|-----------------------------------------------------------------------------------------------------------------------------------------------|-------------|
|           12%          |         32        | ASSESSPRO / AP5                     | Catalis (New England Municipal Consultants / NEMC acts as local vendor) |         Yes         |     1/28/2026     | Single flat-file "Banker & Tradesman" format extract (3,052 records), not a relational export. No SPAN-equivalent field found — no mock up could be built as a result. As-built documentation: [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md). |             |
|           77%          |        200        | MicroSolve CAMA               | NEMRC                                                                   |         Yes         |     12/4/2025     | 2 towns received. Multiple tables/complete extract. 1 town (Lincoln) dummy data only with no multi-fam or condo conditions within. South Burlingtion received, contains condos and commercial properties. As-built documentation: [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md).                              | [South Burlington](https://files.vcgi.vermont.gov/other/demo/cama-sample-microsolve-sburl/index.html) / [Lincoln](https://files.vcgi.vermont.gov/other/demo/cama-sample-microsolve/index.html) |
|           7%           |         19        | PROVAL                        | Aumentum                                                                |         Yes         |     7/23/2025     | Barre Town extract. Multiple   tables/complete extract. Mock up created. Useful if representative. Data dictionary needed. As-built documentation: [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md).                  | [Barre Town](https://files.vcgi.vermont.gov/other/demo/cama-sample-aumentum/index.html) |
|           3%           |         7         | Vision Governmental Solutions | Vision Governmental Solutions                                           |          No         |                   |                                                                                                                                               |             |
|           1%           |         2         | No CAMA Program               | No CAMA Program                                                         |          -          |                   |                                                                                                                                               |             |
|        **100%**        |      **260**      |                               |                                                                         |                     |                   |                                                                                                                                               |             |

[Stats Source Per Tax District Advisors](https://tax.vermont.gov/municipal-officials/listers-and-assessors/district-advisors)

*Status Doc: Documents - VCGI\VCGI-Administration\Program_Admin\Parcels\General Program Administration\Tax Dept\CAMA Data*

## CAMA Vendors

### NEMRC

#### Software

MicroSolve CAMA

#### Contacts

- Chris Miele <chris@nemrc.com>
- Ernie Saunders <esaunders@nemrc.com>

---

### Aumentum Technologies (formerly ProVal)

#### Software

ProVal or Aumentum Valuation

#### Contacts

- Victoria Cole <Victoria.Cole@AumentumTech.com>
- William Pleake <William.Pleake@AumentumTech.com>

#### Status

> [!NOTE]
> VC sent full sample data for one town (Barre Town) via their own FTP. Still need data dictionary for turning codes into understandable strings.

> [!NOTE]
> Full sample data is largely useful for purposes of reporting building and property details, can likely be ETL'd or processed as-is

---

### Vision Government Solutions

#### Software

VISION Cama

#### Contacts

- Tasha Vincent <tvincent@vgsi.com>

---

### Catalis (AssessPro) (formerly Patriot)

#### Software

Catalis CAMA - AssessPro / AP5 (Formerly PATRIOT Properties)

#### Contacts

- Wayne P <WayneP@catalisgov.com>
- Pat Santoso <Patrick.Santoso@catalisgov.com>

---

### New England Municipal Consultants (NEMC) - VT Vendor of Catalis' AssessPro / AP5

#### Contacts

- William Krajeski <bill@nemcvt.com>
- Matt Krajeski <mattkraj09@gmail.com>
- Ryan Silvestri <ryan@nemcvt.net>

---

### Tyler Technologies - Not currently contracted for CAMA in VT

#### Software

Assessment Pro

#### Contacts

- Gio Giordano <Gio.Giordano@tylertech.com>
- John Vickery <John.Vickery@tylertech.com>

## Other Statewide Dataset Examples

[Maryland](https://catalog.data.gov/dataset/cama-detailed-building-characteristics)

[Connecticut](https://portal.ct.gov/datapolicy/gis-office/parcel-and-cama)
