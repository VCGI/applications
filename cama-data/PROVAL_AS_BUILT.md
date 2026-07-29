# Aumentum ProVal CAMA — As-Built Data Model (Barre Town Sample)

*Companion to [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md) (NEMRC MicroSolve) and [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md) (the statewide SPAN/Grand List/GIS layer). This is the second of what will be several per-vendor CAMA as-built documents — see the naming note at the end.*

*Sources: [`cama-explorer-demo-aumentum/index.html`](../cama-explorer-demo-aumentum/index.html) (the demo viewer's own source, which does the real work of joining these files together — same reverse-engineering approach used for MSOL); [`cama-explorer-demo-aumentum/CAMA-sample-data-methods.md`](../cama-explorer-demo-aumentum/CAMA-sample-data-methods.md) (the dwelling-unit calculation methodology, written by VCGI as an independent inference pass, not sourced from Act 170 or Aumentum documentation); a live listing of the 36-file sample extract at `vtopendata-dev.s3.us-east-2.amazonaws.com/_Other/CAMA/sample/` (Barre Town, VT); and direct sample records pulled from that S3 location. No data dictionary has been received from Aumentum — every field meaning below is inferred from field names, sample values, and how the demo viewer's own code uses them, exactly as with the original MSOL effort.*

---

## 1. Architecture — materially different from MSOL's three-silo model

Where NEMRC MicroSolve splits property records into three parallel top-level schemas by property type (Residential/Commercial/Condominium — MSOL_AS_BUILT.md §2), **Aumentum ProVal uses a single unified parcel record** (`Parcel_Main`, keyed by `lrsn`) regardless of property type, with property-type-specific detail living in **child-table families** layered alongside it:

- `R_*` tables (`R_Floor`, `R_Man_Housing`) — residential building detail
- `CI_*` tables (`CI_Building`, `CI_Floors`, `CI_Plumbing`, `CI_Special`, `CI_Unit_Cost`, `CI_Uses`) — commercial/investment building detail
- Everything else (`Land_*`, `Nbhd_*`, `Valuation_*`, `Transfer`, `Legal`, `Improvements`, `Sketch_*`) is shared across all property types

This is a genuinely different structural choice than MSOL's, worth keeping in mind for any eventual cross-vendor CAMA data standard (per the Act 68 of 2024 report referenced in the other two documents): "how is property type modeled" isn't a fixed CAMA-industry convention — vendors differ between top-level schema splits (MSOL) and single-schema-plus-child-tables (ProVal).

## 2. Identifiers: LRSN, `tax_bill_id`, and `parent_lrsn`

- **`LRSN`** — the CAMA-internal record identifier, one per parcel record. Notably, **this is the same acronym used generically in the original readme.md's "Property Details Contents" table** ("LRSN / CAMA ID") — suggesting LRSN terminology is a cross-vendor CAMA-industry convention, not NEMRC- or Aumentum-specific.
- **`tax_bill_id`** (on `Parcel_Main`) — this is the field the demo viewer uses as the **SPAN-equivalent join key** to the real VCGI parcel GIS layer. Confirmed directly in the viewer's map-click handler: it queries the live `FS_VCGI_OPENDATA_Cadastral_VTPARCELS_..._parcels_SP_v1` FeatureServer's actual `SPAN` field, then looks up `Parcel_Main` records where `tax_bill_id` matches that string. A sample value: `"039-012-11153"` — formatted identically to a real SPAN (`XXX-YYY-ZZZZZ`).

  **Worth flagging, not just asserting:** in the one sample record inspected, the middle segment of `tax_bill_id` (`012`) matches that same record's own `county_number` field (`012`) — not obviously a school-district code (per SPAN_PARCEL_GRANDLIST_MODEL.md §2, SPAN's middle segment should be the Agency of Education school-district code). This could mean (a) Washington County's numeric code and the relevant school district's AOE code happen to coincide for Barre Town, or (b) Aumentum's `county_number` field is internally something closer to an assessing-district/SPAN-prefix code than a literal county number. The demo viewer's own map-click logic clearly relies on `tax_bill_id` successfully matching real published SPANs to function at all, so it's very likely operationally equivalent to SPAN for Barre Town — but the `county_number` coincidence is worth a direct confirmation rather than assuming it's meaningless, especially before treating `tax_bill_id` as a drop-in SPAN source for any other town's Aumentum data.
- **`parent_lrsn`** (on `Parcel_Main`) — a **native parent/child parcel pointer**, populated as `"0"` for standalone parcels and set to another LRSN for child records (e.g. condo units). This is a genuinely useful cross-vendor data point for the `ADMINSPAN`/`GROUNDSPAN` proposal in SPAN_PARCEL_GRANDLIST_MODEL.md §6: **unlike MSOL (which has no native parent/child field at all — MSOL_AS_BUILT.md §7.3), ProVal already models a parent/child relationship between stacked records natively.** Worth examining as a possible precedent/reference implementation when discussing `GROUNDSPAN` semantics with vendors.

## 3. Table inventory (36 files in the sample extract)

Grouped as the demo viewer itself groups them (`RELATED_FILES` in `index.html`), which is a reasonable reflection of how an assessor would navigate the data:

| Group | Files | Notes |
|---|---|---|
| *(master/essential)* | `Site_Address`, `Parcel_Main` | `Site_Address` is a separate, address-only index table (LRSN, `FreeFormAddr`, `StrtCity`, `StrtZip`, plus E911-style fields like `Code911`, `StrtDir`, `StrtType`, `StrtSufx` that are mostly blank in the sample) — situs address is **not** folded into `Parcel_Main` the way it is in MSOL's `EXP_MAIN`. |
| Parcel & Legal | `Parcel_Main`, `Legal` | `Legal` holds free-text legal descriptions per parcel (e.g. "HOUSE & LAND", "TOWN FOREST", "COMBINATION OF PARCELS") — several sample records are Barre Town-owned forest/reservoir parcels, a nice real-world example of government-use property class. |
| Valuation | `Valuation_History`, `Valuation_Detail`, `Cap_Distributions`, `Influence_Mods` | See §4 — `Valuation_History` carries the `ResLivingUnits` field. |
| Sales & Transfers | `Transfer` | Direct analog to MSOL's `EXP_TRANHIST` — deed book/page, grantor/grantee, consideration, sale date. |
| Buildings & Improvements | `Improvements`, `Imp_Ext_Features`, `Permits`, `CI_Building` | `Improvements` is the general structure index (type codes like `DWELL`, `MHOME`, `APARTRES` — see §4); carries its own `dwelling_number` sequence field per improvement. |
| Commercial Buildings | `CI_Building`, `CI_Floors`, `CI_Plumbing`, `CI_Special`, `CI_Unit_Cost`, `CI_Uses` | `CI_Building.number_units` is the most-trusted dwelling-count source per the demo's own methodology (§4, Priority A). |
| Residential Buildings | `R_Floor`, `R_Man_Housing` | `R_Floor` carries per-floor area, `bedrooms`, `kit_count` (kitchen count — used as an apartment-unit proxy per §4, Priority C). |
| Land Details | `Land_Site`, `Land_Detail`, `Land_Influence` | `Land_Site` holds coded site attributes (utilities, road type, zoning) via a `CategoryType`/`CodeType` pair — conceptually similar to MSOL's `EXP_CATEG` lookup pattern. `Land_Detail` carries per-line acreage, frontage, land-type code (two-letter codes: `HS` Homesite, `FR`/`FN` Current Use Forest, `AG`/`CF` Current Use Agricultural, etc. — town-specific domain, not obviously a statewide standard). |
| Neighborhood | `Nbhd_Main`, `Nbhd_Res`, `Nbhd_Com`, `Nbhd_HF`, `Nbhd_Land`, `Nbhd_Land_Detail` | Cost/valuation-model tables keyed by neighborhood number — ProVal's analog to MSOL's cost-engine tables (`EXP_COSTABLS`/`EXP_COSTEQU`), but organized around neighborhood models rather than townwide cost tables. `Nbhd_Main.township_number` uses values `011`/`039` for Barre City/Barre Town — **this Barre Town sample extract appears to include at least one placeholder record for Barre City too**, worth noting since Barre City and Barre Town are legally distinct municipalities. |
| Sketches & Images | `Sketch_Main`, `Sketch_Vector`, `Sketch_Segment`, `Sketch_OB`, `Sketch_Notes`, `Sketch_Labels`, `Image_Directory` | `Sketch_Vector` stores building outlines as vector runs/rises (the demo viewer actually renders these to a canvas) — unlike MSOL, where sketches are external bitmap references only, ProVal's sketch geometry is present in the tabular extract itself. |

**One file in the S3 folder is not used anywhere in the demo viewer:** `Imp_Features.json` (as distinct from `Imp_Ext_Features.json`, which *is* used). Worth a look before assuming it's redundant — it may hold base improvement features not captured elsewhere.

## 4. Dwelling-unit handling — two different answers exist in this one extract

This is the most consequential finding for the ongoing Act 170 "number of dwelling units" question tracked in SPAN_PARCEL_GRANDLIST_MODEL.md §7.

**4.1 The demo viewer's derived methodology** (full detail in [`CAMA-sample-data-methods.md`](../cama-explorer-demo-aumentum/CAMA-sample-data-methods.md) — explicitly the user's own inference pass, "not based on the specifics of the legislation now in place or input from others"): a three-tier fallback hierarchy —

1. **Priority A:** sum `CI_Building.number_units` for the parcel, if any is >0.
2. **Priority B:** infer from `Parcel_Main.property_class` against a hardcoded multi-unit map (`102`/`202`→2, `103`/`203`→3, `104`/`204`→4).
3. **Priority C:** tally `Improvements` by type — `DWELL`/`MHOME`/`MHPARK2` count as 1 each; `APARTRES` falls back to summing `R_Floor.kit_count` (kitchen count, on the assumption 1 kitchen = 1 dwelling), or defaults to 1 if no kitchen count exists.

Results are annotated with a `~` (estimate, from Priority C's apartment fallback) or `*` (condo/duplex undercount risk, based on `parent_lrsn`, condo property-class codes, or the word "duplex" in the legal description) — a genuinely good UX pattern for surfacing uncertainty rather than presenting a single false-precision number, worth considering for any statewide `DWELLINGS` field design.

**4.2 A native field the methodology above does not use at all:** `Valuation_History.ResLivingUnits`. Sample records confirm this is a real, populated, per-valuation-snapshot field — `"ResLivingUnits": "0"` on an industrial/granite-quarry parcel (property class `421`), `"ResLivingUnits": "1"` on a single-family parcel (property class `101`) — and it's tracked historically (multiple `Valuation_History` rows per LRSN across reappraisal years), unlike the derived methodology which only produces a single current-state number.

**This means, within this one non-NEMRC vendor's extract, there are two different candidate sources for "how many dwelling units does this parcel have" — a native field (`ResLivingUnits`) and a derived heuristic (§4.1) — and they were never cross-checked against each other in building this demo.** This directly informs the open question in SPAN_PARCEL_GRANDLIST_MODEL.md §7 (item 1): before deciding whether/how to build a new `DWELLINGS` field at the CAMA or Grand List level, it's worth checking whether vendors *already* carry a native dwelling/living-unit field that's simply gone unused or unstandardized — `ResLivingUnits` here is a concrete example — rather than assuming the field needs to be invented from scratch industry-wide.

## 5. Cross-vendor comparison (MSOL vs. ProVal, so far — see also [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md) §5 for the 3-way table including Catalis AssessPro)

| Concept | MSOL (NEMRC) | ProVal (Aumentum) |
|---|---|---|
| Property-type architecture | Three separate top-level silos (res/comm/condo) | One unified parcel table + type-specific child-table families |
| Parcel record ID | `parcel_id` | `lrsn` (LRSN) — same generic industry term used for both |
| SPAN field | `parc_span` (direct field name) | `tax_bill_id` (not named "SPAN" at all — confirmed via the demo's own map-join logic; middle-segment coincidence with `county_number` flagged in §2, unconfirmed) |
| Native parent/child (stacked-unit) pointer | None found | `parent_lrsn` |
| Situs address | Folded into the main parcel record (`EXP_MAIN.prop_locat`) | Separate table (`Site_Address`) |
| Homestead | Single `homestead` flag + `homestd_va` value | `hmstd_code` **and a separate `future_hmstd_code`** — an existing precedent for tracking a *pending/declared* status distinct from current status, relevant to Act 170's dwelling-use attestation concept |
| Native dwelling-unit field | None found (only per-section `no_of_unit`, MSOL_AS_BUILT.md §7.1) | `Valuation_History.ResLivingUnits` exists but goes unused in the demo's own dwelling methodology (§4.2) |
| Property classification | `factori`/`prop_class`, confirmed matching Tax Dept `PCCODE` | `property_class`, also confirmed matching Tax Dept `PCCODE` (a second independent confirmation of the same statewide crosswalk) |
| Sketch geometry | External bitmap reference only | Vector geometry present in the tabular extract itself (rendered live by the demo viewer) |

## 6. Open questions for Aumentum

1. **Is `tax_bill_id` reliably equivalent to the statewide SPAN** for every parcel, or only functionally close enough for the Barre Town sample? The `county_number` coincidence in §2 is worth a direct answer.
2. **What is `ResLivingUnits` actually meant to capture**, and how reliably is it populated across the full Barre Town dataset (not just the two sample records inspected)? If it's a trustworthy native dwelling-unit count, it may be a far better Act 170 `DWELLINGS` source than any derived heuristic — including the one built for this very demo.
3. **Does `parent_lrsn` correspond to anything resembling the proposed `ADMINSPAN`/`GROUNDSPAN` structure** (SPAN_PARCEL_GRANDLIST_MODEL.md §6)? If Aumentum already models parent/child parcel relationships natively, that's a useful existing pattern to compare against the proposed redesign.
4. What is `Imp_Features.json` (§3), and why wasn't it wired into the demo viewer alongside `Imp_Ext_Features`?

## A note on naming

This document is named for the CAMA *product* (ProVal), matching the convention already used for MSOL_AS_BUILT.md (also named for a product, MicroSolve, not the vendor NEMRC) — "Aumentum" is the corporate vendor name, much as "NEMRC" is both the company and its product suite. As more vendor samples are added (Vision, Catalis/AssessPro), expect a parallel `<PRODUCT>_AS_BUILT.md` per vendor in this folder, with `readme.md` and `SPAN_PARCEL_GRANDLIST_MODEL.md` remaining the cross-vendor/statewide documents.
