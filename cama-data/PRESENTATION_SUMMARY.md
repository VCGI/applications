# Presentation Summary — Parcel Definition Workgroup (Meeting 1: VCGI / NEMRC / Vermont Dept. of Taxes)

*This is slide-by-slide source content for a PowerPoint deck, not the deck itself. Written for a **~30-minute presentation, 30 minutes discussion**, first of a likely multi-meeting series. Audience: VCGI, NEMRC, Vermont Department of Taxes. Non-NEMRC CAMA vendors (Aumentum/ProVal, Vision, Catalis/AssessPro) will get a separate session later — this meeting is intentionally NEMRC-centric, since NEMRC is the only party with two roles (statewide Grand List/SPAN steward for every town, and CAMA vendor via MicroSolve for ~77% of towns).*

*Every claim below is sourced from the as-built documentation in this repo — [readme.md](readme.md), [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md), [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md), [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md), [VERMONT_CAMA_DATA_STANDARD_DRAFT.md](VERMONT_CAMA_DATA_STANDARD_DRAFT.md), [OPEN_QUESTIONS_AND_NEMRC_ASKS.md](OPEN_QUESTIONS_AND_NEMRC_ASKS.md) — cross-referenced per slide below so any claim can be traced back to its evidence if questioned live. Slide bullets are written to be read aloud as-is; **Speaker notes** carry the caveats/hedges that shouldn't be dropped when presenting, even though they're not slide text.*

*Tone note for delivery: this is a collaborative fact-finding effort, not an audit. Findings described as "gaps" below are gaps in the current, decades-old design — not criticisms of products or of any person in the room.*

---

## Slide 1 — Title

**Content:**
- Vermont Parcel & CAMA Data Modernization
- Current-State Findings & Open Questions
- Parcel Definition Workgroup — [date]
- VCGI · NEMRC · Vermont Department of Taxes

---

## Slide 2 — Agenda

**Content:**
- Why this effort exists, and what's changing (10 min)
- What we've confirmed about how things actually work today (10 min)
- The proposed model, and what it asks of NEMRC specifically (10 min)
- Discussion (30 min)

**Speaker notes:** Set expectations up front: this is meeting one of several. Nothing needs to be fully resolved today — the goal is a shared, accurate factual baseline and a short list of things to take away and confirm before the next meeting.

---

## Slide 3 — Why This Effort Exists

**Content:**
- Vermont has never had a coordinated, modern survey of its own municipal boundaries or corner points
- Parcel identity today is defined by tax-bill/program administration, not by underlying legal land records
- ~250 towns, each running its own instance of the Grand List module and (usually) its own CAMA system
- Result: no single, common baseline for "how much of what land is where," statewide
- Acts 164 and 170 (2026) require these systems to work together more precisely, on a series of deadlines running through 2031

**Speaker notes:** This slide is deliberately framed as a structural/historical condition, not anyone's fault. Source: readme.md's "Why Modernize" section, citing VCGI's own Act 68 (2024) report's call for a municipal boundary survey. This is also the direct root cause of two later findings (cross-town parcels, §slide 10).

---

## Slide 4 — The Two Laws, and the Nearest Deadlines

**Content:**
- **Act 164 (H.933)** — splits the legal definition of "parcel": tax/Current Use purposes keep today's combined-ownership definition; mapping and per-parcel-payment purposes get a new "separate, sellable lot" definition — **effective April 1, 2028**
- **Act 170 (H.955)** — adds a required dwelling-unit count and a three-way property classification, plus a PVR rulemaking mandate to set statewide CAMA/parcel data standards
- **Nearest deadline of all: dwelling-unit count required on grand lists lodged starting CY2027** — no field exists today, anywhere, to source it
- Three-way classification (homestead / nonhomestead-residential / nonhomestead-nonresidential): July 1, 2029, contingent on further legislative action
- Regional Assessment Districts begin operating January 1, 2031

**Speaker notes:** The CY2027 dwelling-count deadline is closer than most people in the room will assume — it's worth landing that point clearly. The full statutory table with every date and citation is in readme.md.

---

## Slide 5 — Three Systems Today, Plus a Fourth Downstream

**Content:**
- **CAMA** — appraisal record-keeping. Vendor varies by town: MicroSolve (NEMRC, ~77% of towns), Aumentum/ProVal, Vision, Catalis/AssessPro
- **Grand List module** (NEMRC) — billing and the statewide **SPAN** identifier. Used by *every* town, regardless of which CAMA vendor that town uses
- **VTPIE** (Tax Department) — sales ratio/equalization study, Current Use, exemptions, homestead/lister response
- **VCGI's statewide parcel GIS layer** — downstream of all three, built from parcel geometry towns submit voluntarily

**Speaker notes:** This is the picture everyone in the room already knows in outline — the point of this slide is to confirm we're all describing the same thing before going further. Diagram source: readme.md "Purpose of This Document," `SPAN_PARCEL_GRANDLIST_MODEL.md` §1.1.

---

## Slide 6 — NEMRC's Dual Role

**Content:**
- Sole statewide steward of SPAN and the Grand List module — every town, every CAMA vendor
- Also one of four CAMA vendors, via MicroSolve (~77% of towns)
- Almost every open question in this effort touches NEMRC in one hat or the other
- That's why today's session is NEMRC-specific, before the broader vendor session later

**Speaker notes:** Frame this as the reason NEMRC gets its own meeting, not as singling anyone out. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §1.3, `OPEN_QUESTIONS_AND_NEMRC_ASKS.md` intro.

---

## Slide 7 — What Already Syncs Between CAMA and the Grand List, Today

**Content:**
- For an *existing* parcel: identifying data (owner, address, 911 data, tax map, sale/transfer info) flows Grand List → CAMA automatically
- Valuation data (Real / Homestead / Housesite values) flows CAMA → Grand List automatically
- Built-in verification exists on both sides (a Grand List report, and a "Check Sync with CAMA" button)
- For a parcel **split or transfer** (i.e., a new parcel record): no automatic sync — manual, dual entry by the same lister in both systems

**Speaker notes:** This is good news, not a gap — it means the field-level sync infrastructure already exists for ordinary updates. The open item is narrower than it sounds: confirming this ~decade-old mechanism (`LSPROP01` / `MAIN` file-level sync) is still the current architecture, not superseded by something newer. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §1.5.

---

## Slide 8 — Confirmed Gap #1: Inactive-Parcel Status Mostly Isn't Exported

**Content:**
- The Grand List module's own screen tracks Active/Inactive status on every parcel, in every town
- But the annual export to the Tax Department only carries that status for towns with a TIF district (~20 of ~260 towns)
- For the rest, VCGI's own voluntarily-collected GIS layer is actually the **more complete statewide source** of inactive-parcel status
- This is very likely an export-scope fix, not a new data-tracking requirement

**Speaker notes:** This is the single highest-priority item in the whole draft data standard. Emphasize "the data already exists in your system — this is about what gets exported," since that's the most actionable framing for NEMRC. Source: `NEMRC_GRANDLIST_EXPORT_AS_BUILT.md` §7, `SPAN_PARCEL_GRANDLIST_MODEL.md` §5 item 7.

---

## Slide 9 — Confirmed Gap #2: Condos Have No Unit-to-Common-Land Link, Anywhere

**Content:**
- Reviewed MicroSolve's own condominium valuation system directly, cross-checked against a real town's data
- Each condo unit's SPAN is completely independent — nothing links it to the shared ground/common-element parcel
- The one grouping concept that exists ("Neighborhood Code") is a pure valuation-rate lookup key, not a parcel or legal relationship
- Same gap exists on the GIS/Grand-List side today

**Speaker notes:** This is the clearest, most concrete illustration of what the proposed `GROUNDSPAN` field would actually require: **new construction, not relabeling something that already exists**, on both the CAMA side and the GIS/Grand-List side. Worth saying plainly — this isn't a criticism of the condo system, which was never designed to do this job. Source: `MSOL_AS_BUILT.md` §11.

---

## Slide 10 — Confirmed Gap #3: Cross-Town Parcels Have No Formal Handling

**Content:**
- Two distinct situations, both currently handled ad hoc:
  - One physical parcel whose deeded boundary crosses a town line — each town assesses only its own portion, with no link between the two towns' records
  - Two legally separate parcels (one per town) that a lister might consider "contiguous" — whether this is ever actually combined in practice is unconfirmed
- Root cause: the same missing statewide municipal boundary survey from slide 3
- SPAN is town-scoped today, and stays that way under the proposed model too

**Speaker notes:** This is a genuine open policy question, not something IT alone can resolve. Don't expect or push for an answer today; the goal is making sure it's on the radar before it becomes a surprise later. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §5 item 8, §1.5.

---

## Slide 11 — The Proposed Model: Parcel vs. Administrative Parcel

**Content:**
- **Parcel** — a separate, sellable lot; matches Act 164's new mapping-purpose definition
- **Administrative Parcel** — contiguous ownership, used for billing/Current Use; essentially today's "Active parcel," renamed and formalized
- New relational fields: `KIND`, `TYPE`, `ADMINSPAN` (links contiguous sub-lots to their billing parent), `GROUNDSPAN` (links unlanded units to their common ground), `TAXBILL`, `PARCLCOUNT`
- Status: a proposal under active discussion from the July 27, 2026 workgroup session — not yet an adopted standard

**Speaker notes:** Say clearly that field names/domains are a working draft, not something being locked in today. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.1, §6.3.

---

## Slide 12 — An Example

**Content:**
- One lot, one owner, six-unit apartment building:

| KIND | TYPE | ADMINSPAN | SPAN | PARCLCOUNT | DWELLINGS | TAXBILL |
|---|---|---|---|---|---|---|
| PARCEL | FULL | 036-011-11979 | 036-011-11979 | 1 | 6 | NO |
| ADMINPARCL | SINGLE | 036-011-11979 | *(null)* | 1 | 6 | YES |

- Two records for one physical lot: the mapping record (`PARCEL`) and the billing record (`ADMINPARCL`) — only the billing record generates a tax bill

**Speaker notes:** Keep this on screen a moment — it's the clearest single illustration of the whole redesign. More worked examples (condo stacking, multi-lot combination) exist in the full documentation if the discussion wants to go deeper. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.2.

---

## Slide 13 — What Act 170 Adds On Top: Dwellings and Classification

**Content:**
- `DWELLINGS` — confirmed not to exist today, anywhere: not in CAMA, not in the Grand List, not in the GIS layer
- The bigger issue isn't the missing field — it's that **what counts as a "dwelling unit" isn't defined yet** (accessory units, basement apartments, mixed-use buildings)
- Three-way classification fields (`NRES_RES_FLV`, `NRES_NONRES_FLV`, floor-area-percentage splits) have no analog today beyond a binary homestead flag
- Both are Phase 2 in the draft data standard — real, but sequenced behind the Phase 1 items below

**Speaker notes:** This is a policy definition question for the Tax Department/Legislature, not something NEMRC or VCGI can resolve unilaterally — worth naming that ownership explicitly. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.3, `VERMONT_CAMA_DATA_STANDARD_DRAFT.md` §4.5.

---

## Slide 14 — Asks of NEMRC, as Grand List Steward

**Content:**
1. Export a universal Active/Inactive status field for every town, not just TIF towns *(the single highest-priority ask)*
2. Confirm whether `ADMINSPAN`/`GROUNDSPAN`/`KIND`/`TYPE` can be originated or exposed by the Grand List module
3. Confirm whether contiguous-parcel combination ever actually crosses town lines in practice
4. Confirm the CAMA↔Grand List sync mechanism described on slide 7 is still current
5. Establish a change-request process and typical lead time for adding new export fields

**Speaker notes:** This is the distilled list from `OPEN_QUESTIONS_AND_NEMRC_ASKS.md` Part 1, in priority order. Source citations for each item are in that document if NEMRC wants the full context.

---

## Slide 15 — Asks of NEMRC, as a CAMA Vendor (MicroSolve)

**Content:**
1. Adopt a canonical dwelling-count field, or confirm none exists and one needs to be built *(MicroSolve appears to be starting further behind on this than the other two vendors examined)*
2. Include the schema-metadata tables (`EXP_DATADICT`/`EXP_CATEG`) in every future extract as standard practice
3. Confirm the property-class field is always populated from the Tax Department's own code list verbatim

**Speaker notes:** Item 1 is worth saying plainly but not apologetically — it's a factual observation about what's been found in the samples examined so far, not a claim about the whole product. Source: `OPEN_QUESTIONS_AND_NEMRC_ASKS.md` Part 1, items 6–8.

---

## Slide 16 — Questions Only NEMRC Can Answer (Both Hats at Once)

**Content:**
- Where would a dwelling-count rollup actually be computed — Grand List, CAMA, or both? Only NEMRC controls both candidate systems
- Would the existing Globalscape FTP arrangement (already used for the CAMA extract) work for the new standard's fields too, or does the Grand List's own Tax Department submission need a separate channel?

**Speaker notes:** These are architecture questions internal to NEMRC's own product suite — worth calling out that VCGI/Tax Dept genuinely can't answer these without NEMRC's input. Source: `OPEN_QUESTIONS_AND_NEMRC_ASKS.md` Part 1, items 10–11.

---

## Slide 17 — Today's Discussion

**Content:**
1. Could `ADMINSPAN`/`GROUNDSPAN`/`KIND`/`TYPE` be originated or exposed by the Grand List module? *(the single biggest structural ask)*
2. What should count as a "dwelling unit"? *(needed ahead of the CY2027 deadline — the nearest one we have)*
3. Should the Grand List export finally carry Active/Inactive status for every town?
4. Do cross-town parcels need explicit handling in the new model, and if so, whose call is that?
5. Sequencing: does the 2028 parcel-definition change roll out independently of the 2029 classification work, or together?

**Speaker notes:** These five are deliberately a mix of NEMRC-specific asks and joint policy calls — pick based on how the room's energy is going rather than forcing all five. Not expecting resolution today on any of them.

---

## Slide 18 — What's Next

**Content:**
- Schema-level detail (exact population logic for `SPAN`/`ADMINSPAN`/`GROUNDSPAN`/`KIND`/`TYPE`) is in progress — not ready for this meeting
- A separate session with the non-NEMRC CAMA vendors (Aumentum/ProVal, Vision, Catalis/AssessPro) is planned
- This is expected to take more than one meeting — today's goal is a shared factual baseline and a short takeaway list, not final answers
- Full documentation (as-built findings, full open-questions list, draft data standard) available to all parties on request

**Speaker notes:** Good closing note to manage expectations and signal this is a genuine ongoing collaboration, not a one-shot ask.

---

## Slide 19 — Discussion

**Content:**
- Open floor
