# NEMRC Grand List Module — Annual Export to the Tax Department (As-Built)

*Companion to [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md), which documents SPAN authority, the statewide `GRANDLIST` table, and the current/proposed GIS parcel pipeline at a more abstract level. This document is the concrete, ground-truth instance of what that document's §1.1 calls the **"Grand List, other files"** extract channel — the actual annual file family NEMRC's Grand List module produces for each town and sends to the Vermont Department of Taxes, examined here via a real sample for the Town of Killington, VT (files prefixed `411`, tax year 2026).*

*Sources: all files in [`cama-data/NEMRC Grand List Extract/`](<NEMRC Grand List Extract>) in this repo — `411_Files_Explanation.csv`; the six `*_HEADERS.csv` official field-definition files (`411_gl_HEADERS.csv`, `411EXP_HEADERS.csv`, `411LST_HEADERS.csv`, `411TFS_HEADERS.csv`, `411TPF_HEADERS.csv`, `411TOT_HEADERS.csv`); the code/lookup tables (`411_gl_RESCODE.csv`, `411_gl_EXPCODE_SPEC.csv`, `411_gl_EXPCODE_STND.csv`, `411_NEMRC_STD_AND_SPEC_EXP.csv`, `411EXP_Transformations.csv`, `411TOT_CATEGORIES.csv`, `411TFS_TSTATUS_CODES.csv`, `411TFS_TTYPE_CODES.csv`); and the raw data files themselves (`411_gl57.csv`, `411TFP57.csv`, `411TFS57.csv`). All of this was provided directly by Vermont Tax Department staff, who appended headers to NEMRC's own header-less CSV output for internal review — hence the separate `*_HEADERS.csv` files. Distinguish this from the CAMA extract required under 32 V.S.A. §5404(b) (documented in [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md), [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md), [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md)): that's an appraisal/valuation-detail extract from town-level CAMA software, submitted to PVR. This is a different, statutorily separate channel — the actual **Grand List** (billing/SPAN) data, produced by NEMRC's Grand List module regardless of which CAMA vendor a town uses, and received by the Tax Department, not directly by VCGI.*

---

## 1. What this is, and why it's a different channel than the CAMA extract

[SPAN_PARCEL_GRANDLIST_MODEL.md §1.1](SPAN_PARCEL_GRANDLIST_MODEL.md#11-the-full-pipeline-town-to-public) describes, from a workgroup diagram, a "Grand List, other files" extract leaving the Town & Vendors tier and arriving at the Tax Department, separate from the Map Layers/parcel-geometry channel. This document is the first direct, concrete look at that channel — what it actually contains, file by file, for a real town.

**Delivery mechanism, per the Tax Department:** each town's Grand List module produces a **password-protected zip file**, sent annually to the Tax Department, containing both CSV files (the ones examined here) and `.dbf` files. The `.dbf` files exist specifically to allow the data to be loaded into **a state-run instance of the NEMRC Grand List software itself** — i.e., the Tax Department doesn't just receive flat files to parse; it can load a town's submission directly into its own copy of the same software towns use, and evidently does so as part of its own workflow. This is a materially different relationship with NEMRC than VCGI's own: VCGI receives finished, transformed CSV extracts from the Tax Department (§9 below), not raw NEMRC software access.

**Naming convention:** every file in this sample is prefixed `411`. Nothing in the accompanying documentation defines what `411` itself refers to — it is very likely an internal Tax Department batch or submission identifier for this particular town's file set, **not** Killington's SPAN town code (which the data itself confirms is `588` — see §4). This is worth a direct, low-stakes confirmation with the Tax Department (§11), simply so the prefix isn't mistaken for a town code by anyone reusing these files. The trailing two-digit suffix (`57` in this sample, e.g. `411_gl57.csv`) is explicitly defined in `411_Files_Explanation.csv` as a placeholder for "which GL instance the town is sending from" — explicitly **"not used by PVR."**

## 2. File inventory

| File (Killington sample) | General pattern | Contents | Scope |
|---|---|---|---|
| `411_gl57.csv` | `411GLXX` / `411_glXX` | Parcel-level Grand List data — the core file, 45 fields (§4) | All towns |
| `411EXP57.csv` | `411EXPXX` | Exemption data, summed by category — town-level aggregate (§6) | All towns |
| `411LST57.csv` | `411LSTXX` | Exemption data by parcel — parcel-level detail, including a parcel status field (§7) | All towns |
| `411TFS57.csv` | `411TFSXX` | TIF summary information | **TIF-district towns only** |
| `411TFP57.csv` | `411TFPXX` / `411TPFXX` | TIF data by parcel — the one file carrying genuine Active/Inactive/Non-taxable status (§7) | **TIF-district towns only** |
| `411TOT57.csv` | `411TOTXX` | Town-level totals by property category, plus municipal/education taxable-value rollups (§8) | All towns |

Per `411_Files_Explanation.csv`, `411GLXX` is explicitly noted as requiring **"manipulation needed for VTAX and VCGI format"** — i.e., this raw file is not what either the Tax Department's own downstream systems or VCGI ultimately consume; both need it transformed first (§9).

Supporting lookup/code files (all read in full, not town-specific): `411_gl_RESCODE.csv` (Resident Ownership codes), `411_gl_EXPCODE_SPEC.csv` / `411_gl_EXPCODE_STND.csv` / `411_NEMRC_STD_AND_SPEC_EXP.csv` (the two parallel exemption-code systems, §5), `411EXP_Transformations.csv` (the Municipal-GL/Education-GL treatment matrix, §5), `411TOT_CATEGORIES.csv` (the 16-category property taxonomy, §6/§8), `411TFS_TSTATUS_CODES.csv` / `411TFS_TTYPE_CODES.csv` (TIF status and type codes, §7).

## 3. The parcel-level Grand List file (`411_gl`) — official 45-field schema

Per `411_gl_HEADERS.csv`, per VCGI **"Appears to be close to the fields in final annual grand list as joined with parcel data by VCGI."** This is the single most important file in the whole export for cross-checking the abstract `GRANDLIST` table documented in [SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table), which was previously built only from field-name inference off the `JoinGL2Parcels` SQL. These are now **official, Tax-Department-confirmed field definitions**, not inference:

| # | Field | Type | Meaning |
|---|---|---|---|
| 1 | `YEAR` | N | Tax year (YYYY) |
| 2 | `SCHID` | N | School code |
| 3 | `CNTY` | N | County code (e.g. 5=Essex, 11=Rutland) |
| 4 | `TCODE` | N | Town code |
| 5 | `SPAN` | AN | SPAN, format `999-999-99999`, no duplicates |
| 6 | `PARCID` | AN | Town-internal parcel ID |
| 7–8 | `OWNER1`, `OWNER2` | AN | Owner name(s), Last/First |
| 9–10 | `ADDR1`, `ADDR2` | AN | Mailing address lines |
| 11–13 | `CITY`, `ST`, `ZIP` | AN | Mailing address city/state/zip |
| 14 | `DESCPROP` | AN | Physical property description |
| 15 | `LOCAPROP` | AN | Location — **"not well maintained in NEMRC, superseded by E911 Address (removed in current VTAX/VCGI export)"** |
| 16 | `CATCODE` | AN | Property category code (real estate only) |
| 17 | `RESCODE` | AN | Resident ownership code (§7 lookup) — **"DATA NOT WELL MAINTAINED"** |
| 18 | `ACRES` | N | Total acres, 2 decimals |
| 19 | `REAL_FLV` | N | Listed real value (full, before reductions) |
| 20 | `HSTED_FLV` | N | Homestead listed value (full) |
| 21 | `NRES_FLV` | N | Nonhomestead value (full) |
| 22–23 | `LAND_LV`, `IMPRV_LV` | N | Listed value of land / improvements |
| 24–25 | `EQUIPVAL`, `EQUIPCODE` | N/AN | Equipment (personal property) value; `"C"` if cable property |
| 26 | `INVENVAL` | N | Inventory value (personal property) |
| 27 | `HSDECL` | AN | Homestead declared, `Y`/`N` |
| 28 | `HSTED_TX` | N | Homestead value (taxable), after exemption |
| 29 | `HSITEVAL` | N | Housesite value (full, not taxable housesite value) |
| 30 | `VETEXAMT` | N | Veterans exemption amount ($10,000–$40,000) |
| 31 | `EXPCODE_SPEC` | N | Special exemption code, 1–9/16 (§5) |
| 32 | `EXPCODE_STND` | N | Standard exemption code, 1–7 (§5) |
| 33 | `EXP_END` | D | Exemption ending date |
| 34 | `EXPSTATUTE` | AN | Exemption's statutory authorization |
| 35–36 | `EXPAMT_HS`, `EXPAMT_NR` | N | Exemption amount, homestead / nonhomestead |
| 37–38 | `UVREDUC_HS`, `UVREDUC_NR` | N | Current Use reduction, homestead / nonhomestead |
| 39–40 | `GLVAL_HS`, `GLVAL_NR` | N | Education GL value (1%), homestead / nonhomestead — reflects full veterans/voted exemptions |
| 41 | `CRHOUSPCT` | N | Covenant Restricted Housing % |
| 42 | `MUNGL1PCT` | N | Municipal GL value (1%) — reflects veterans exemption up to town-voted maximum |
| 43–44 | `AOEGL_HS`, `AOEGL_NR` | N | AOE (Agency of Education) GL value (1%), homestead / nonhomestead — reflects max $10K veteran exemption plus voted amount |
| 45 | `E911ADDR` | AN | Emergency 911 address |

**Reconciliation against [SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table):** most of that document's inferred field glosses hold up well against this official list (`descprop`, `locaprop`, `cat`↔`CATCODE`, `rescode`↔`RESCODE`, `hsdecl`, `hsiteval`, `uvreduc_hs/nr`, `glval_hs/nr`, `crhouspct`, `mungl1pct`, `aoegl_hs/nr`, `e911addr` all match). Three corrections worth making there directly:

1. **No separate `EXPDESC` field exists on *this raw file*** — it has **two separate numeric exemption-code fields** (`EXPCODE_SPEC`, `EXPCODE_STND`, §5) plus `EXPSTATUTE` (statutory cite) and `EXP_END` (end date), no text-description field. **This is genuinely resolved as of §9, using the actual published VCGI schema, not left as an open question:** an `EXPDESC` field really does exist, but only on the *published* product — it's synthesized from these two raw codes somewhere in the Tax-Department transformation step, not carried natively from NEMRC.
2. **Real fields exist on this raw file that don't survive to the published VCGI layer at all**, per §9's field mapping: `SCHID`, `CNTY`, `TCODE` (school/county/town codes — distinct from the SPAN itself, which already encodes school and town) and `HSTED_TX` (taxable, not just full, homestead value) are all dropped before publication.
3. **`LOCAPROP`'s data-quality caveat is sourced, not inferred** — flagged unmaintained in NEMRC directly by the Tax Department — but its claimed disposition is not: the raw file says it's "already removed from the current VTAX/VCGI export," yet the live published schema still carries the field (§9). **Treat the removal claim as unconfirmed, not settled** (§11 item 8).

## 4. Confirmed, real SPAN example (Killington)

A real row from `411_gl57.csv` (condo unit, tax year 2026):

```
YEAR=2026, SCHID=185, CNTY=11, TCODE=588, SPAN=588-185-10401,
PARCID=10401-, OWNER1="1-3 PICO TOWNHOMES LLC", DESCPROP="Condo Unit",
LOCAPROP="PICO TOWNHOUSE I-3", CATCODE=O, RESCODE=NS
```

This confirms Killington's town code is `588` (`CNTY=11` matches Rutland County, consistent with `411_gl_HEADERS.csv`'s own example "11=Rutland"), joining the two other concrete town-code examples already documented in [SPAN_PARCEL_GRANDLIST_MODEL.md §2](SPAN_PARCEL_GRANDLIST_MODEL.md#2-span-structure-and-authority) (South Burlington `600`, Lincoln `354`). It also confirms, in passing, that `CATCODE=O` (a code not in the 16-category `411TOT` taxonomy, §6) is in active use for condo units in this file — worth reconciling against the `411_gl_RESCODE`/category lookups directly with the Tax Department if a complete `CATCODE` domain is ever needed (§11).

## 5. The exemption-code system(s)

There are **two parallel, independently-numbered exemption code fields** on `411_gl` — `EXPCODE_STND` (1–7) and `EXPCODE_SPEC` (1–9, plus 16) — not one combined system. This is a real design fact about NEMRC's schema, not a documentation artifact: `411_NEMRC_STD_AND_SPEC_EXP.csv` lists both side by side with `NULL` filled in for whichever code doesn't apply to a given row.

**Standard codes (`EXPCODE_STND`, field 32):**

| Code | Description |
|---|---|
| 1 | Approved VEPC Contracts/Exemptions |
| 2 | Approved TIFs |
| 3 | Grandfathered Contracts/Exemptions |
| 4 | Non-Approved (Voted) Contracts/Exemptions |
| 5 | Municipal Contracts (Owner Pays Education Tax) |
| 6 | Statutory Exemptions (town property, schools, churches, etc.) |
| 7 | Partial-Statutory (e.g. a rental unit on church-owned property) |

**Special codes (`EXPCODE_SPEC`, field 31):**

| Code | Description |
|---|---|
| 1 | Act 181 (**as of GL2026** — see §8) |
| 2 | Snow Making Equipment |
| 3 | Ski Lifts and Snow Making Equipment |
| 4 | Whey Plants |
| 5 | Vermont Yankee or Construction in Progress |
| 6 | Qualified Housing Units |
| 7 | Solar Plant |
| 8 | Wind Plant |
| 9 | Court Ordered |
| 16 | Act 181/Qualified (**starting GL2026**) |

**How exemptions actually subtract from the two Grand Lists** — per `411EXP_Transformations.csv`, this is genuinely a two-dimensional lookup (municipal treatment × education treatment are independently determined per exemption category, which is very likely what the user meant by "two tabs" needed to map/transform this data for statewide use):

| Exemption category | Municipal GL | Education GL |
|---|---|---|
| Approved (VEPC) Exemptions | subtract | subtract |
| Approved TIFs | no adjustment | subtract |
| Grandfathered Exemptions | subtract | subtract |
| Non-Approved (Voted) Exemptions | subtract | no adjustment |
| Municipal Contracts (Owner Pays Ed Tax) | subtract | no adjustment |
| Partial-Statutory Exemptions | subtract | subtract |
| Special Exemptions (Ski Lifts, Qualified Housing, etc.) | no adjustment | subtract |
| Current Use Exempt Reduction | subtract | subtract |
| Veteran Exemptions | subtract | subtract |
| PVR-Applied Exemptions — Municipal Only | subtract | no adjustment |
| PVR-Applied Exemptions — Education Only | no adjustment | subtract |
| PVR-Applied Exemptions — Municipal/Education | subtract | subtract |

The "PVR-Applied Exemptions" rows are notable: they are **applied by PVR directly**, not sourced from any `411EXP` field (the source-file column for the Education-Only row reads "internal to PVR — [32 V.S.A. §5412](https://legislature.vermont.gov/statutes/section/32/135/05412)"). This is a genuinely new statute surfaced by this sample, not previously documented anywhere in this repo — worth adding to the broader statutory picture alongside §5404(b)/§5405/§4041a/§3417 already tracked in [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md).

The town-level aggregate file `411EXP` sums each of these categories into paired homestead (`_HS`) / nonhomestead (`_NR`) fields (e.g. `VEPC_HS`/`VEPC_NR`, `TIF_HS`/`TIF_NR`, `VET_HS`/`VET_NR`/`VET_MU`) — per `411EXP_HEADERS.csv`. `411LST` carries the same exemption codes at parcel-level detail (`411LST_HEADERS.csv`), including a `PACTINACT` "Parcel Status (A = Active)" field — the *second* place in this export family, after `411TFP` (§7), where an active/inactive-type status field appears, though its exact semantics (whether it captures the same Active/Inactive concept used in the GIS parcel model, or something specific to exemption administration) aren't spelled out in the header file and are worth confirming directly.

**Resident Ownership Code** (`RESCODE`, field 17 of `411_gl` — flagged "DATA NOT WELL MAINTAINED," §3):

| Code | Meaning |
|---|---|
| T | Town resident |
| S | State resident |
| NS | Not a Vermont resident |
| C | Corporation, partnership, or other entity |

## 6. The 16-category property classification system

`411TOT_CATEGORIES.csv` documents a **third, independent property-classification system**, alongside CAMA's own category fields (documented per-vendor in [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md), [PROVAL_AS_BUILT.md](PROVAL_AS_BUILT.md), [ASSESSPRO_AS_BUILT.md](ASSESSPRO_AS_BUILT.md)) and the abstract `GRANDLIST.cat` field noted in [SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table). This is the classification used specifically for the town-level `411TOT` rollup (§8):

| Category | `411TOT` header prefix | Numeric code | Description |
|---|---|---|---|
| R1 | `R1` | 1 | Residential-1, <6 acres |
| R2 | `R2` | 2 | Residential-2, ≥6 acres |
| MHU | `MHU` | 3 | Mobile Home, Unlanded |
| MHL | `MHL` | 4 | Mobile Home, Landed |
| S1 | `V1` | 5 | Seasonal-1, <6 acres |
| S2 | `V2` | 6 | Seasonal-2, ≥6 acres |
| COMM | `COM` | 7 | Commercial |
| CMA | `CMA` | 8 | Commercial Apartment |
| IND | `IND` | 9 | Industrial |
| UE | `UE` | 10 | Utilities, Electric |
| UO | `UO` | 11 | Utilities, Other |
| FRM | `FRM` | 12 | Farm |
| OTH | `OTH` | 13 | Other |
| WOOD | `WD` | 14 | Woodland |
| MISC | `MSC` | 15 | Miscellaneous |
| **TC** | `TC` | **16** | **Telecommunications** |

**The `TC` (Telecommunications, code 16) category is new/emerging** — it is the concrete, schema-level confirmation of the user's own note that telecommunications property is becoming taxable for Grand List year 2026 (§8). Note also that the abbreviation used in column headers sometimes differs from the "official" category abbreviation (`S1`/`S2` are called `V1`/`V2` in the actual `411TOT` field names; `COMM`/`WOOD`/`MISC` become `COM`/`WD`/`MSC`) — worth using the header-prefix column, not the category-abbreviation column, when actually parsing `411TOT` files.

## 7. TIF files, and the critical active/inactive-parcel finding

Two files exist **only for towns with a TIF (Tax Increment Financing) district** — Killington is one, hence this sample includes them:

- **`411TFS` (TIF summary)** — one row per TIF district, town-level totals.
- **`411TFP`/`411TPF` (TIF by parcel)** — one row per parcel within the TIF district.

### 7.1 `411TFP` carries the only genuine Active/Inactive/Non-taxable status field in this entire export family

Per `411TPF_HEADERS.csv`, field `PACTIVE`: **`1 = Active`, `2 = Inactive`, `3 = Non-taxable statutory`.** No other file in the export — not `411_gl`, not `411EXP`, not `411TOT` — carries a field with this specific, unambiguous active/inactive semantics for a parcel's taxable status. (`411LST.PACTINACT`, §5, is a status field of some kind, but its relationship to this concept is unconfirmed.)

**Concrete evidence from Killington's own file** (`411TFP57.csv`, TIF district 1, tax year 2026): of **31 total parcels** in the district (`411TFS57.csv` field `TOTCT=31`), **11 are `PACTIVE=1` (Active)** and **20 are `PACTIVE=2` (Inactive)** — nearly two-thirds of the parcels in this TIF district are Inactive. Real examples, verbatim from the file:

| SPAN suffix / PARCID | Owner | Description | `PACTIVE` | `TCOMM` | Current Value (NHS) |
|---|---|---|---|---|---|
| `13193` | Killington / Pico Resort Partners LLC | Golf Course | 2 | "Inactive parcel." | $976,000 |
| `13637` | GG Killington LP | Part of Village Plan | 2 | "Inactive parcel." | $19,430,300 |
| `13630` | GG Killington LP | Part of Village Plan | 2 | "Inactive parcel." | $4,345,400 |
| `13210` | Killington / Pico Resort Partners LLC | Land Abutting Golf Course | 2 | "Inactive parcel." | $2,608,200 |
| `11375` | Cannon Property II LLC | Nightclub | 1 | *(blank)* | $952,700 |
| `13091` | GG Killington LP | Part of Village Plan | 1 | *(blank)* | $705,000 |
| `13487` | GG Killington LP | Part of Village Plan | 1 | *(blank)* | $6,078,000 |

**Why this matters for the Act 164/H.933 parcel redesign:** the Tax Department's own NEMRC-sourced Grand List export tracks genuine, unambiguous Active/Inactive parcel status **only for the roughly ~20-ish towns statewide that have a TIF district.** For the remaining ~240 non-TIF towns, **no file in this entire export family carries this status at all** — `411_gl` has no active/inactive field, `411EXP`/`411TOT` are aggregates with no per-parcel status, and `411LST.PACTINACT`'s relationship to this concept is unconfirmed. This is a direct, load-bearing confirmation of something [SPAN_PARCEL_GRANDLIST_MODEL.md §1.1](SPAN_PARCEL_GRANDLIST_MODEL.md#11-the-full-pipeline-town-to-public) only described abstractly ("VCGI obtains the annual Grand List extract from the Tax Department... joins it with the best available parcel geometry received from each town") — it did not previously establish that **the Tax Department's own Grand List source data structurally lacks inactive-parcel status outside TIF towns.** VCGI's own separately, voluntarily collected parcel geometry (the Active/Inactive GIS layers documented in [SPAN_PARCEL_GRANDLIST_MODEL.md §4](SPAN_PARCEL_GRANDLIST_MODEL.md#4-current-gis-parcel-data-model-vermont-gis-parcel-data-standard-v23-oct-2016)) is, as a direct result, **currently the more complete statewide source of inactive-parcel awareness** — more complete than what the Tax Department itself receives via this channel for the vast majority of towns. This has a direct bearing on the feasibility of the proposed `ADMINSPAN`/`GROUNDSPAN` model (§6 of that document): if the Grand List module itself doesn't export active/inactive status outside TIF towns today, then whatever raw material NEMRC's software *internally* tracks for this (per [SPAN_PARCEL_GRANDLIST_MODEL.md §1.5](SPAN_PARCEL_GRANDLIST_MODEL.md#15-the-grand-list-modules-own-parcelcontiguous-parcel-ui), which confirms the Grand List module's UI *does* track a `Parcel Status (Active/Inactive)` field on every parcel, not just TIF ones) simply isn't being exported into this Tax-Department-facing file family for most towns. The gap is in the **export**, not necessarily in NEMRC's own database — worth confirming directly (§11).

### 7.2 Known data-quality caveats on the TIF files (Tax Department's own words)

- **`411TFS.TOT_CVHS`/`TOT_CVNR`** (Total Current Listed Value, homestead/nonhomestead): flagged **"includes current value of inactive parcels, renders field useless."** Confirmed directly from the data: Killington's `TOT_CVNR = $72,013,300` necessarily comingles the $19.4M, $4.3M, $2.6M, etc. inactive parcel values shown in the table above with the active parcels' values — there is no way to isolate active-only value from this field as exported.
- **`411TFP.ACRES`/`OBACRE`**: flagged **"PVR believes these two field names are erroneously inverted from NEMRC, and so actually Acres = Base Acres and Base Acres = Acres."** Consistent with the sample: active parcels show identical `ACRES`/`OBACRE` values (e.g. `1.46`/`1.46`, `42.05`/`42.05`), while inactive parcels consistently show a nonzero `ACRES` alongside `OBACRE = 0` — plausible either way, but PVR's own stated belief is the labels are swapped, not that the data itself is wrong.
- Several `411TFP` fields (`TZONE`, `SUBSPAN`) are explicitly flagged **"this field is not used."**
- `411TFP` has additional Burlington-only fields (`P_BUILDIN2`, `P_EQPM2`, `P_INV2`, `P_LANDUSE2`, `P_RLANDUSE2`, `p_minv2`, `p_meqpm2`) for that city's own "special" TIF increment calculation — per `411_Files_Explanation.csv`, tied to Burlington's waterfront TIF district's historically distinct retention rate (100% of increment 1996–2010, 75% from 2010 forward).

### 7.3 TIF type and status codes

`411TFS_TTYPE_CODES.csv` (TIF Type, field `TTYPE`):

| Code | Description | Max education-increment retention |
|---|---|---|
| 1 | Grandfathered | 100.00% |
| 2 | Special Legislative | 98.00% |
| 3 | VEPC-Approved | 75.00% |
| 4 | New Act 184 | 75.00% |
| 5 | CHIP Act 69 (2025) | 75% ed / 85% Muni, if VEPC-approved criteria are met |

Killington's TIF district is `TTYPE=4` (New Act 184), with a `PCTKEEP` (actual retention percentage in `411TFS`) of **70%** — notably *below* that type's 75% maximum, confirming `PCTKEEP` is the district's own negotiated/actual rate, not simply a copy of the statutory maximum for its type. **Act 184** is a statute newly surfaced by this sample and not previously documented elsewhere in this repo.

`411TFS_TSTATUS_CODES.csv` (TIF Status, field `TSTATUS`): `1` = Active w/ increment value, `2` = Active – no development, `3` = Active – negative total increment, `4` = Expired, `5` = Rescinded.

## 8. GL2026 schema changes in progress

Two schema changes were reported as in-progress as of this writing, being tested with NEMRC and expected to reach towns "next week" (relative to when this was reported):

- **Telecommunications becoming taxable property** — confirmed at the schema level by the new `TC` (code 16) category in the `411TOT` taxonomy (§6), explicitly the newest addition to what is otherwise a stable, long-standing 15-category list.
- **A new exemption under Act 181** — confirmed at the schema level by `EXPCODE_SPEC` codes `1` ("Act 181 (as of GL2026)") and `16` ("Act 181/Qualified, starting GL2026"), both explicitly annotated with GL2026 effective dates in the source lookup file, distinguishing them from the other seven long-standing special exemption codes (2–9) which carry no such annotation.

Both are worth tracking alongside the Act 164/170 statutory timeline already documented in [readme.md](readme.md)'s Legislative Timeline, even though **Act 181** is a distinct piece of legislation from Act 164/170 and not otherwise covered by this documentation set.

## 9. The transformation step between NEMRC's raw export and what VCGI receives

This export (as received by the Tax Department, straight from NEMRC) is **not** the same file VCGI ultimately receives. Per `411_Files_Explanation.csv`, `411GLXX` explicitly requires **"manipulation needed for VTAX and VCGI format"**. This section previously listed two confirmed specifics inferred indirectly; it is now grounded in a direct, field-by-field comparison against the actual live, published FeatureServer schema for VCGI's Active parcel layer (`FS_VCGI_OPENDATA_Cadastral_VTPARCELS_poly_standardized_parcels_SP_v1`, retrieved and supplied by the user — see [SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table)/[§4](SPAN_PARCEL_GRANDLIST_MODEL.md#4-current-gis-parcel-data-model-vermont-gis-parcel-data-standard-v23-oct-2016)), rather than only the raw `411_gl_HEADERS.csv` dictionary:

| Raw `411_gl` field | Published field | What happened |
|---|---|---|
| `YEAR` | `GLYEAR` | Renamed — the published layer's own `YEAR` field is a **different, GIS-side** year value |
| `SCHID` | *(dropped)* | No school-code field on the published layer |
| `CNTY` | *(dropped)* | No county-code field on the published layer |
| `TCODE` | *(dropped, represented by `TOWN`/`TNAME` text instead)* | |
| `SPAN` | `GLIST_SPAN` | Renamed — the published layer's own `SPAN` field is the **GIS-side** SPAN, a different provenance entirely |
| `PARCID` | `PARCID` | Unchanged |
| `OWNER1`, `OWNER2` | `OWNER1`, `OWNER2` | Unchanged |
| `ADDR1`, `ADDR2` | `ADDRGL1`, `ADDRGL2` | Renamed (GL-suffixed) |
| `CITY`, `ST`, `ZIP` | `CITYGL`, `STGL`, `ZIPGL` | Renamed (GL-suffixed) |
| `DESCPROP` | `DESCPROP` | Unchanged |
| `LOCAPROP` | `LOCAPROP` | **Unchanged — see the contradiction noted below** |
| `CATCODE` | `CAT` | Renamed |
| `RESCODE` | `RESCODE` | Unchanged |
| `ACRES` | `ACRESGL` | Renamed (GL-suffixed) |
| `REAL_FLV`, `HSTED_FLV`, `NRES_FLV` | Same names | Unchanged |
| `LAND_LV`, `IMPRV_LV` | Same names | Unchanged |
| `EQUIPVAL`, `EQUIPCODE`, `INVENVAL` | Same names | Unchanged |
| `HSDECL` | `HSDECL` | Unchanged |
| `HSTED_TX` | *(dropped)* | No taxable-homestead-value field on the published layer — only the full-value `HSTED_FLV` is kept |
| `HSITEVAL`, `VETEXAMT` | Same names | Unchanged |
| `EXPCODE_SPEC`, `EXPCODE_STND` | `EXPDESC` | **Both numeric codes collapse into one resolved text field** — confirmed real on the published layer (alias "Other Exemption Type"), even though no such field exists on the raw NEMRC file |
| `EXP_END` | `ENDDATE` | Renamed |
| `EXPSTATUTE` | `STATUTE` | Renamed |
| `EXPAMT_HS`, `EXPAMT_NR` | `EXAMT_HS`, `EXAMT_NR` | Renamed (drops the "P") |
| `UVREDUC_HS`, `UVREDUC_NR` | Same names | Unchanged |
| `GLVAL_HS`, `GLVAL_NR` | Same names | Unchanged |
| `CRHOUSPCT`, `MUNGL1PCT` | Same names | Unchanged |
| `AOEGL_HS`, `AOEGL_NR` | Same names | Unchanged |
| `E911ADDR` | `E911ADDR` | Unchanged |
| *(none)* | `OBJECTID`, `SPAN` (GIS), `MAPID`, `PROPTYPE`, `YEAR` (GIS), `TOWN`, `SOURCENAME`, `SOURCETYPE`, `SOURCEDATE`, `EDITMETHOD`, `EDITOR`, `EDITDATE`, `MATCHSTAT`, `EDITNOTE`, `Shape__Area`, `Shape__Length` | Pure GIS-side fields, contributed by `poly_parcels` geometry, not the Grand List at all |

Two things this resolves, and one it doesn't:

1. **Exemption codes really are converted into text before publication — now field-confirmed, not just inferred.** The published layer's `EXPDESC` field ("Other Exemption Type") is real; it just doesn't exist anywhere upstream in the raw NEMRC file, which only carries the two numeric codes. This is exactly the transformation [SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table) had originally inferred from SQL naming, then walked back after reading the raw NEMRC header file, and has now confirmed again from the opposite direction (the published schema) — both the original inference and the raw-file-based correction were each right about a different stage of the pipeline.
2. **Several raw fields are simply dropped, not just renamed** — most notably `SCHID`, `CNTY`, `TCODE` (superseded by readable `TOWN`/`TNAME` text) and `HSTED_TX` (taxable homestead value; only the full-value `HSTED_FLV` survives to publication, unexplained — §11).
3. **`LOCAPROP` is *not* confirmed dropped — this is now a genuine, open contradiction, not a settled fact.** The raw file's own header comment says it's "removed in current VTAX/VCGI export," but the live published schema still carries a `LOCAPROP` field. This document previously took the raw file's claim at face value; that was premature. See [SPAN_PARCEL_GRANDLIST_MODEL.md §3](SPAN_PARCEL_GRANDLIST_MODEL.md#3-the-statewide-grandlist-table) item 2 and §11 item 8 below.

This confirms and sharpens [SPAN_PARCEL_GRANDLIST_MODEL.md §1.1](SPAN_PARCEL_GRANDLIST_MODEL.md#11-the-full-pipeline-town-to-public)'s existing statement that "VCGI obtains the annual Grand List extract from the Tax Department" — it is now clear that extract is a **Tax-Department-transformed** product, not a passthrough of NEMRC's raw file family documented here, and the transformation is now mapped field-by-field rather than only partially known.

## 10. Summary of known data-quality issues (Tax Department's own admissions, consolidated)

Collected here from callouts throughout this document, since they bear directly on how much weight to put on any given field in this export family:

| Field / File | Issue, in the Tax Department's own words |
|---|---|
| `411_gl.RESCODE` | "DATA NOT WELL MAINTAINED" |
| `411_gl.LOCAPROP` (also `411TFP.LOCAPROP`) | "not well maintained in NEMRC, superseded by E911 Address" — the raw file claims this is "removed in current VTAX/VCGI export," but the live published FeatureServer schema (§9) still carries a `LOCAPROP` field; **this specific claim is now an open contradiction, not confirmed** (§11 item 8) |
| `411TFS.TOT_CVHS`/`TOT_CVNR` | "includes current value of inactive parcels, renders field useless" |
| `411TFP.ACRES`/`OBACRE` | "PVR believes these two field names are erroneously inverted from NEMRC" |
| `411TFP.TZONE`, `411TFP.SUBSPAN` | "this field is not used" |
| `411TFS.MUNTOT_BVLOCk` | "field not used" |

## 11. Open questions

1. **What does the leading `411` filename prefix actually denote?** Confirmed it is not Killington's SPAN town code (`588`, per §4) — likely an internal Tax Department batch/submission identifier, but not defined anywhere in the source material.
2. **Could non-TIF towns' Grand List exports be extended to carry a `PACTIVE`-equivalent field?** Per §7.1, the Grand List module's own UI already tracks Active/Inactive status on every parcel regardless of TIF status ([SPAN_PARCEL_GRANDLIST_MODEL.md §1.5](SPAN_PARCEL_GRANDLIST_MODEL.md#15-the-grand-list-modules-own-parcelcontiguous-parcel-ui)) — the gap here appears to be in what's exported to the Tax Department, not necessarily in what NEMRC's software tracks internally. Confirming this distinction directly with NEMRC would materially de-risk the proposed `ADMINSPAN`/`GROUNDSPAN` redesign in [SPAN_PARCEL_GRANDLIST_MODEL.md §6](SPAN_PARCEL_GRANDLIST_MODEL.md#6-proposed-future-state-model-vcgitax-deptnemrc-workgroup-july-27-2026).
3. **What is `411LST.PACTINACT`'s actual relationship to `411TFP.PACTIVE`?** Both are status-type fields, but only one (`PACTIVE`) has documented Active/Inactive/Non-taxable semantics; `PACTINACT`'s header only says "A = Active," leaving its full domain and relationship to the TIF-file concept unconfirmed.
4. **What is the complete `CATCODE` domain used on `411_gl` itself?** The real Killington sample shows values like `O` (§4) that don't map directly onto the 16-category `411TOT` taxonomy (§6) — worth clarifying whether these are two genuinely different code systems or whether `411_gl.CATCODE` is a finer-grained breakdown that rolls up into the 16 `411TOT` categories.
5. **What is the full scope of the NEMRC-to-VTAX/VCGI transformation** (§9)? Now mapped field-by-field against the published Active layer schema, but a few specific gaps remain unexplained: why `SCHID`/`CNTY`/`TCODE`/`HSTED_TX` are dropped rather than carried through, and where exactly the `EXPCODE_SPEC`/`EXPCODE_STND` → `EXPDESC` lookup is actually performed (Tax Department, or upstream in NEMRC's own software).
6. **What exactly is the Tax Department's "state version of the NEMRC software program"** (§1) used for operationally — internal review only, or does it feed any other Tax Department system or process?
7. **Does the Muni-GL/Ed-GL exemption transformation matrix (§5) match how `MUNGL1PCT`/`GLVAL_HS`/`GLVAL_NR`/`AOEGL_HS`/`AOEGL_NR` are actually computed on `411_gl`**, or is that computation done at a different stage entirely (e.g., inside NEMRC's own software before export, with `411EXP` simply reporting the already-applied results)?
8. **Is `LOCAPROP` actually populated on the published Active layer, or present in the schema but empty?** The raw file's header comment claims it's "removed in current VTAX/VCGI export" (§9), but the live published schema still carries the field. This is a small, concrete example worth resolving directly — and a reminder that this entire document's claims about "what VCGI receives/publishes" should be checked against the actual live schema wherever possible, not just against Tax-Department-side header comments describing intent.
9. **Why was `HSTED_TX` (taxable homestead value) dropped from the published layer** (§9) when its full-value counterpart `HSTED_FLV` was kept? Is a taxable-value figure reconstructable downstream from `HSTED_FLV` plus the exemption/reduction fields, making `HSTED_TX` redundant to carry — or is this simply an oversight?

See also [SPAN_PARCEL_GRANDLIST_MODEL.md §7](SPAN_PARCEL_GRANDLIST_MODEL.md#7-open-questions-for-the-ongoing-workgroup) for the broader open-questions list this document feeds into, and [MSOL_AS_BUILT.md §8](MSOL_AS_BUILT.md#8-recommended-questions-for-nemrc) for CAMA-vendor-specific questions.
