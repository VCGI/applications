# Catalis AssessPro CAMA — As-Built Data Model (Sample Extract)

*Companion to [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) (NEMRC MicroSolve), [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) (Aumentum ProVal), and [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) (the statewide SPAN/Grand List/GIS layer). Third of the per-vendor CAMA as-built documents.*

*Sources: [`cama-explorer-demo-assesspro`](../cama-explorer-demo-assesspro) (this repo) — `BandTLayout-AssessPro.csv` (the vendor-provided field layout spec), `bandt_file_to_json` (the conversion script VCGI wrote to parse the raw fixed-width file, with its own inline comments), and `assesspro-sample.json` (3,052 parcel records, also mirrored at `vtopendata-dev.s3.us-east-2.amazonaws.com/_Other/CAMA/sample-assesspro/`). No CAMA vendor data dictionary was received for AssessPro — unlike MSOL and ProVal, **no demo/mockup viewer could be built for this extract at all**, for reasons explained in §3 below. Everything here is inferred from the layout CSV, the conversion script's comments, and the sample records themselves.*

---

## 1. A fundamentally different kind of extract: this is not AssessPro's native schema

Both MSOL and ProVal extracts are **relational exports of the vendor's own internal database** — multiple linked tables, one row per building section/land line/sale/etc. The AssessPro sample is architecturally nothing like that: it's a **single flat file in "Banker & Tradesman" (B&T) format** — one fixed-width text record per parcel, ~1,000 characters wide, with 82 named fields at fixed character positions (per `BandTLayout-AssessPro.csv`).

"Banker & Tradesman" is a real, pre-existing New England commercial real-estate data/publishing convention (The Warren Group's B&T service), not something specific to Catalis, AssessPro, or Vermont. That matters for how to read this sample: **it's a generic third-party summary export format that predates and is independent of Vermont's SPAN/Grand List system**, not a reflection of what AssessPro's own underlying database actually contains. Whatever detail doesn't fit into this fixed 82-field, one-row-per-parcel layout — full sales history beyond one prior sale, multiple building sections, land-line detail, sketches, neighborhood cost models, anything resembling MSOL's or ProVal's child tables — simply isn't present here, likely because the format was never designed to carry it, not necessarily because AssessPro's own database lacks it.

## 2. Field inventory (82 fixed-width fields, one flat record per parcel)

No child tables at all. Grouped conceptually from `BandTLayout-AssessPro.csv`:

| Group | Fields |
|---|---|
| Identifiers | `Account Number`, `Parcel ID Number`, `User Account Number` |
| Situs | `Location Street Number`, `Location Alternate Street Number`, `Location Street Name`, `Condo Unit Number`, `Condo Complex Name` |
| Ownership & mailing | `Owner Name #1/#2/#3`, `Mailing Address Line 1/2`, `Mailing City`, `Mailing State`, `Mailing Zip Code`, `Owner Occupied` |
| Site/zoning codes | `Zoning Code 1`, `Flood Hazard Code`, `Census Code`, `Utility Code 1/2/3`, `Traffic Code`, `Primary Land Use Code (LUC)`, `Total Acres` |
| Building characteristics | `Year Built`, `Effective Year Built`, `Gross/Finished Building Area`, `Building Type 1/2/3`, `Number of Buildings`, `Story Height`, **`Rental Living Units`** (§4), `Number of Rooms/Bedrooms/Full Baths/Half Baths/Other Fixtures`, `Bathroom Rating`, `Number of Kitchens`, `Kitchen Rating`, `Number of Fireplaces`, `Number of Wood Stove Flues`, `Solar Hot Water`, `Central Vacuum`, `Heating Type/Fuel`, `Percent Air Conditioned`, `Basement Area`/`Finished Basement Area`, `Roof Type/Cover`, `Exterior/Interior Wall Type`, `Attached/Detached/Basement Garage`, `Pool`, `Building Frame Type`, `Floor Type`, `Base Depreciation Year`, `Building Grade`, `Building Condition` |
| Sales (current + one prior only — no full history table) | `Legal Reference Number`, `Legal Reference Sale Date`, `Sale Price`, `NAL Description`, `Grantor`, and a parallel `Previous *` set of the same five fields |
| Valuation | `Total Land Value`, `Total Yard Item Value`, `Total Building Value`, `Total Assessed Value` |
| Legal | `Legal Description` (100 characters, free text) |

**A concrete data-quality finding, worth remembering:** the vendor-provided layout CSV itself had **three fields with incorrect character-position ranges** (`Story Height`, `Rental Living Units`, `Bathroom Rating` — overlapping/mismatched start-end positions relative to their stated length). VCGI's conversion script (`bandt_file_to_json`) had to hardcode corrections for these before the fixed-width file would parse correctly. Even a vendor-supplied format specification needs validation against actual output before being trusted.

## 3. No SPAN, anywhere in this extract — and no mockup as a result

This is the headline finding. None of the three identifier-like fields resembles a SPAN:

- `Account Number` — e.g. `"3"` — a short sequential ID, nothing like `XXX-YYY-ZZZZZ`.
- `Parcel ID Number` — e.g. `"202005.902"` — looks like a tax-map-style reference, not a SPAN.
- `User Account Number` — e.g. `"13124"` — another short internal ID.

There is no field in the B&T layout resembling MSOL's `parc_span` or even ProVal's disguised `tax_bill_id` ([PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) §2) — no candidate SPAN proxy exists in this export at all. **As a direct consequence, no demo/mockup viewer could be built for this extract, and it cannot currently be joined to VCGI's statewide standardized parcel dataset** — unlike MSOL and ProVal, there's no map-linked companion application for AssessPro.

**Two competing, unresolved explanations — genuinely open, not settled by this sample:**

1. **Format limitation, not a database limitation.** Per §1, the B&T layout is a fixed, generic 82-field third-party export spec that predates Vermont's SPAN system and isn't Vermont-specific. It's plausible AssessPro's own database tracks a Vermont SPAN internally (however it gets there — see below) and the B&T export format simply has no designated slot to carry it, since the format wasn't built with VT's system in mind.
2. **Export configuration gap.** It's equally plausible this specific extract just wasn't configured to include a SPAN-equivalent field, independent of the B&T format's limitations — i.e. a fixable export-request problem, not a structural one.

This directly bears on the still-open question in [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) §1 about whether non-NEMRC CAMA vendors reliably reflect SPAN. The ProVal sample ([PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) §2) suggested one non-NEMRC vendor *does* carry a SPAN-equivalent field, just under a misleading name (`tax_bill_id`). This AssessPro sample shows the opposite: no SPAN-equivalent field found anywhere. **The two non-NEMRC vendors examined so far do not behave the same way on this point**, and this sample alone can't determine whether that's because AssessPro genuinely doesn't track/receive SPAN from NEMRC's Grand List module, or because this particular export format/request just wasn't asked to include it. Worth a direct question to Catalis (§6).

## 4. A third data point for the "dwelling units" question

`Rental Living Units` — populated across the full range 0 to 60 in the 3,052-record sample (single-family parcels show `1`, a mobile home shows `1`, apartment/multi-unit buildings show up to `60`) — is clearly a real, actively-used field, not a placeholder. This is the **third different vendor answer** to a concept resembling Act 170's "number of dwelling units," after MSOL (no equivalent field found at all, per [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) §7.1) and ProVal (`Valuation_History.ResLivingUnits`, per [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) §4.2).

**Semantic caution, not an equivalence claim:** the field is named "*Rental* Living Units," which may specifically mean units that are rented out — a subset of total dwelling units — rather than a literal total unit count. An owner-occupied duplex, for instance, might record `1` here (the rented-out half) rather than `2` (total units). Worth confirming directly rather than assuming this is a drop-in dwelling-unit-count source.

## 5. Cross-vendor comparison (see also [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) §5 for the MSOL/ProVal columns)

| Concept | MSOL (NEMRC) | ProVal (Aumentum) | AssessPro (Catalis) |
|---|---|---|---|
| Extract architecture | Relational, 3 silos × ~30 tables each | Relational, unified parcel + child-table families | **Single flat file, one row per parcel, no child tables** |
| Native format origin | Vendor's own internal export routine | Vendor's own internal export routine | **Generic third-party industry format (B&T), not vendor- or VT-specific** |
| SPAN-equivalent field | `parc_span` (explicit) | `tax_bill_id` (disguised, but present) | **None found** |
| Sales history | Full history table (`EXP_TRANHIST`) | Full history table (`Transfer`) | **Current sale + one prior only, no history table** |
| Dwelling-unit-like field | None found | `Valuation_History.ResLivingUnits` | `Rental Living Units` (semantics may be narrower — see §4) |
| Mockup/GIS-joined viewer built? | Yes | Yes | **No — no SPAN to join on** |

## 6. Open questions for Catalis / AssessPro

1. **Does AssessPro's own database track a Vermont SPAN internally**, sourced from NEMRC's Grand List module the same way ProVal apparently does — and if so, can a future export simply include it, regardless of whether the B&T format itself has a slot for it?
2. Is there an **established workflow between Catalis/AssessPro and NEMRC** for reflecting SPAN, or does this depend entirely on the town's separate, manual submission to NEMRC's Grand List module with no CAMA-side integration at all?
3. Is `Rental Living Units` a count of *all* dwelling units, or specifically units currently rented out? Confirm before treating it as an Act 170-style dwelling-unit source.
4. Given the B&T format's real limitations (no full sales history, no building-section-level detail, no land-line detail), **is a full relational export available from AssessPro** (comparable to what MSOL and ProVal provided), or is B&T the only extract format Catalis offers for this product?

## A note on naming

Named for the CAMA product (AssessPro), consistent with [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) and [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md) — Catalis is the corporate vendor (having acquired the former Patriot Properties AssessPro product), much as NEMRC and Aumentum are vendor names distinct from their MicroSolve/ProVal products.
