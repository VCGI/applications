# Presentation Summary — Parcel Definition Workgroup (Meeting 1: VCGI / NEMRC / Vermont Dept. of Taxes)

*This is slide-by-slide source content for a PowerPoint deck, not the deck itself. Written for a **~30-minute presentation, 30 minutes discussion**, first of a likely multi-meeting series. Audience: VCGI, NEMRC, Vermont Department of Taxes. Non-NEMRC CAMA vendors (Aumentum/ProVal, Vision, Catalis/AssessPro) will get a separate session later — this meeting is intentionally NEMRC-centric, since NEMRC is the only party with two roles (statewide Grand List/SPAN steward for every town, and CAMA vendor via MicroSolve for ~77% of towns).*

*Every claim below is sourced from the as-built documentation in this repo — [readme.md](readme.md), [SPAN_PARCEL_GRANDLIST_MODEL.md](SPAN_PARCEL_GRANDLIST_MODEL.md), [MSOL_AS_BUILT.md](MSOL_AS_BUILT.md), [NEMRC_GRANDLIST_EXPORT_AS_BUILT.md](NEMRC_GRANDLIST_EXPORT_AS_BUILT.md), [VERMONT_CAMA_DATA_STANDARD_DRAFT.md](VERMONT_CAMA_DATA_STANDARD_DRAFT.md), [OPEN_QUESTIONS_AND_NEMRC_ASKS.md](OPEN_QUESTIONS_AND_NEMRC_ASKS.md) — cross-referenced per slide below so any claim can be traced back to its evidence if questioned live. Slide bullets are written to be read aloud as-is; **Speaker notes** carry the caveats/hedges that shouldn't be dropped when presenting, even though they're not slide text.*

*Tone note for delivery: this is a collaborative fact-finding effort, not an audit. Findings described as "gaps" below are gaps in the current, decades-old design — not criticisms of products or of any person in the room.*

*Revision note (this pass, 2026-09-15): this meeting was actually delivered on 2026-09-16 as `20260916_Parcel_Definition_Workgroup_NEMRC.pdf` ([reference/](reference/)), with several changes and additions relative to the last-drafted outline. This revision brings this summary back into sync with what was actually presented, rather than the prior plan: (1) TIF-parcel export scoping is now stated precisely as "parcels within a TIF district," not "TIF-district towns" (Slide 9), including a new VCGI estimate that ~70% of towns get no Active/Inactive signal from this channel at all; (2) the dwelling-unit habitability-determination question is no longer an open tension — the Tax Department confirmed directly that a single field, gated by the habitability determination, is sufficient (Slide 15); (3) a new four-way property-type framework (Type A/B/C/D) introduced at the meeting is added as Slide 8; (4) a new "Fix #3" slide (Slide 14) covers SPAN remaining the statewide unique identifier, with both changing SPAN and surveying town boundaries stated as explicitly out of scope; (5) VCGI's own recommendation to bundle dwelling-unit work with the parcel redesign is added as Slide 16; (6) the timing/sequencing question (Slide 17) is reframed as a cost tradeoff, not a yes/no; (7) new NEMRC asks (review the draft data standard) and a closing action item ("NEMRC get back to us on implementation") are added to Slides 19 and 23. Slide count grew from 21 to 24.*

---

## Slide 1 — Title

**Content:**
- Vermont Parcel & CAMA Data Modernization
- Current-State Findings & Open Questions
- Parcel Definition Workgroup — September 16, 2026
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

**Speaker notes:** This slide is deliberately framed as a structural/historical condition, not anyone's fault. Source: readme.md's "Why Modernize" section, citing VCGI's own Act 68 (2024) report's call for a municipal boundary survey. This is also the direct root cause of two later findings (cross-town parcels, Slide 11; and the explicit out-of-scope framing on Slide 14).

---

## Slide 4 — The Two Laws, and the Nearest Deadlines

**Content:**
- **Act 164 (H.933)** — splits the legal definition of "parcel": tax/Current Use purposes keep today's combined-ownership definition; mapping and per-parcel-payment purposes get a new "separate, sellable lot" definition — **effective April 1, 2028**
- **Act 170 (H.955)** — adds a required dwelling-unit count and a three-way property classification, plus a PVR rulemaking mandate to set statewide CAMA/parcel data standards
- **Nearest deadline of all: dwelling-unit count required on grand lists lodged starting CY2027**
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
- Separately: VTPIE isn't just a passive recipient either — it **independently recalculates its own annual Grand List summary**, which towns must reconcile against NEMRC's own figures every August

**Speaker notes:** This is good news, not a gap — it means the field-level sync infrastructure already exists for ordinary updates. The open item is narrower than it sounds: confirming this ~decade-old mechanism (`LSPROP01` / `MAIN` file-level sync) is still the current architecture, not superseded by something newer. The VTPIE point is worth a beat if there's time — it means any new field this workgroup adds needs to be computable in three systems eventually (CAMA, Grand List, *and* VTPIE), not two. Don't over-invest time here; it's a preview of a later problem, not today's main topic. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §1.5, §1.7.

---

## Slide 8 — Thinking Spatially: Four Property Types

**Content:**
- A four-way framework for organizing every property configuration this effort has to handle:

| Type | Lots | Owners | Tax bills | Units | Everyday name |
|---|---|---|---|---|---|
| **A** | 1 | 1 | 1 | 1 | "Basic" — the simple case |
| **B** | 1 | 1 | 1 | 2+ | Apartment / ADU |
| **C** | 2+ | 1 | 1 | — | "Horizontal"/surface combination — today's "inactives" |
| **D** | 1 (common) | 2+ | 2+ | 1+ | "Vertical"/stacked — condo, MHU, timeshare — today's "unlandeds" |

- Types A and B can potentially be treated as the same condition, depending on how unit counts are handled
- Types C and D are where current data management has the most variation, and need the most improvement

**Speaker notes:** This framework is new since the outline was first drafted and organizes the three "gap" and "fix" slides that follow — worth introducing here so the audience has the vocabulary before the gaps are named. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.2.

---

## Slide 9 — Confirmed Gap #1: Inactive-Parcel Status Mostly Isn't Exported

**Content:**
- The Grand List module's own screen tracks Active/Inactive status on every parcel, in every town
- But the annual export to the Tax Department only carries that status for parcels **physically within a TIF district** — not even every parcel of a TIF-district town, let alone statewide
- VCGI estimates this leaves roughly **~70% of towns** with no Active/Inactive signal from this channel at all
- For the rest, VCGI's own voluntarily-collected GIS layer is actually the **more complete statewide source** of inactive-parcel status
- This is very likely an export-scope fix, not a new data-tracking requirement

**Speaker notes:** Precision matters here — this is narrower than "non-TIF towns don't get this." Even a TIF town like Killington has most of its own parcels sitting outside its own TIF district (the district itself: 31 parcels total, a small fraction of the town's full inventory) — so those parcels get no status from this channel either. The ~70% figure is VCGI's own estimate, not independently re-derived elsewhere in this documentation — worth confirming its basis if asked. This is the single highest-priority item in the whole draft data standard; emphasize "the data already exists in your system — this is about what gets exported," since that's the most actionable framing for NEMRC. Source: `NEMRC_GRANDLIST_EXPORT_AS_BUILT.md` §7, `SPAN_PARCEL_GRANDLIST_MODEL.md` §5 item 7.

---

## Slide 10 — Confirmed Gap #2: Condos Have No Unit-to-Common-Land Link, Anywhere

**Content:**
- Reviewed MicroSolve's own condominium valuation system directly, cross-checked against a real town's data
- Each condo unit's SPAN is completely independent — nothing links it to the shared ground/common-element parcel
- The one grouping concept that exists ("Neighborhood Code") is a pure valuation-rate lookup key, not a parcel or legal relationship
- Same gap exists on the GIS/Grand-List side today

**Speaker notes:** This is the clearest, most concrete illustration of what the proposed `GROUNDSPAN` field would actually require: **new construction, not relabeling something that already exists**, on both the CAMA side and the GIS/Grand-List side. Worth saying plainly — this isn't a criticism of the condo system, which was never designed to do this job. This is Type D from Slide 8. Source: `MSOL_AS_BUILT.md` §11.

---

## Slide 11 — Confirmed Gap #3: Cross-Town Parcels Have No Formal Handling

**Content:**
- Two distinct situations, both currently handled ad hoc:
  - One physical parcel whose deeded boundary crosses a town line — each town assesses only its own portion, with no link between the two towns' records
  - Two legally separate parcels (one per town) that a lister might consider "contiguous" — whether this is ever actually combined in practice is unconfirmed
- Root cause: the same missing statewide municipal boundary survey from Slide 3
- SPAN is town-scoped today, and stays that way under the proposed model too, with additional "ESITE derivatives" mentioned as part of this ongoing challenge

**Speaker notes:** This is a genuine open policy question, not something IT alone can resolve — flagged as such in the docs. Don't expect or push for an answer today; the goal is making sure it's on the radar before it becomes a surprise later. The "ESITE derivatives" phrase is carried over as-delivered — it isn't spelled out further in the source material, so don't assert an interpretation live; it's worth asking the Tax Department/VCGI directly what it refers to. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §5 item 8, §1.5, §6.1, §7 item 24.

---

## Slide 12 — Fix #1 & Fix #2: Parcel vs. Administrative Parcel

**Content:**
- **Parcel** — a separate, sellable lot; matches Act 164's new mapping-purpose definition
- **Administrative Parcel** — contiguous ownership, used for billing/Current Use; essentially today's "Active parcel," renamed and formalized
- New relational fields: `KIND`, `TYPE`, `ADMINSPAN` (links contiguous sub-lots to their billing parent — **Fix #1**, covering Types A/B/C), `GROUNDSPAN` (links unlanded units to their common ground — **Fix #2**, covering Type D), `TAXBILL`, `PARCLCOUNT`
- Status: a proposal under active discussion from the July 27, 2026 workgroup session — not yet an adopted standard

**Speaker notes:** Say clearly that field names/domains are a working draft, not something being locked in today. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.1, §6.3.

---

## Slide 13 — A Worked Example

**Content:**
- One lot, one owner, six-unit apartment building (Type A/B from Slide 8):

| KIND | TYPE | ADMINSPAN | SPAN | PARCLCOUNT | DWELLINGS | TAXBILL |
|---|---|---|---|---|---|---|
| PARCEL | FULL | 036-011-11979 | 036-011-11979 | 1 | 6 | NO |
| ADMINPARCL | SINGLE | 036-011-11979 | *(null)* | 1 | 6 | YES |

- Two records for one physical lot: the mapping record (`PARCEL`) and the billing record (`ADMINPARCL`) — only the billing record generates a tax bill

**Speaker notes:** Keep this on screen a moment — it's the clearest single illustration of the whole redesign. More worked examples (condo stacking, multi-lot combination — Types C and D) exist in the full documentation if the discussion wants to go deeper. Note for later: this simple example is *why* Slide 17's parcel-definition wrinkle is easy to miss — `DWELLINGS` lines up cleanly here because there's exactly one `PARCEL` per `ADMINPARCL`. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.2.

---

## Slide 14 — Fix #3: SPAN Stays the Statewide Unique Identifier

**Content:**
- `ADMINSPAN` and `GROUNDSPAN` are explicitly **derivatives** of SPAN, not replacements for it
- SPAN keeps its existing town-school district-sequence format, and its role as the statewide unique property identifier, unchanged
- Two things stated as explicitly **out of scope** for this effort: changing SPAN's own structure, and fixing/surveying town boundaries with a modern survey
- The town-boundary problem is the same root cause named on Slide 3 — naming it out of scope here draws a clear line around what this workgroup is and isn't trying to solve

**Speaker notes:** Worth stating plainly, since it's easy to conflate "modernizing the parcel model" with "fixing the underlying municipal-boundary problem." This effort is explicitly the former only — the latter remains a real, longstanding, separate need. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.1.

---

## Slide 15 — Dwelling Units: Guidance from Tax, Now Settled

**Content:**
- The Tax Department published its own guidance August 13, 2026 — what was previously this effort's single biggest open definitional question is now resolved
- A dwelling unit needs: its own separate entrance; habitability facilities (sleeping, cooking, sanitary); and — the hard part — to be **fit for year-round habitation** (adequate heating, weatherization, usable year-round plumbing, reasonable year-round access)
- Explicitly independent of zoning/permitting, and of Homestead status — a camp can be declared a Homestead without qualifying as a "dwelling unit"
- **Confirmed directly by the Tax Department: one field is sufficient.** The habitability determination is the *gate* on whether a unit increments the count — "+1" if met, nothing if unmet. No second field records the determination itself.
- The guidance also confirms **CAMA, not the Grand List module, is the intended source** of this field — transmitted "as part of the existing CAMA upload"
- Still open: *which* upload channel that phrase actually means (§5404(b) statutory extract, or the vendor-agnostic NEMRC Standard Import)

**Speaker notes:** Lead with the good news — this closes out a real, longstanding open question on both counts (definition, *and* whether a second field is needed), and it's worth acknowledging that plainly. The remaining open item is narrower and more mechanical than it used to be: which channel, and how each vendor's data entry actually applies the habitability gate before a unit gets counted. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.3, Tax Department "Dwelling Unit Determination" (Aug 13, 2026).

---

## Slide 16 — VCGI's View: Bundle This With the Parcel Redesign

**Content:**
- VCGI's own recommendation, stated directly to the workgroup: changes to Grand List/CAMA needed to track dwelling units should **dovetail with** the other structural changes already proposed here (`ADMINSPAN`/`GROUNDSPAN`/`KIND`/`TYPE`) — not roll out as a standalone, separately-timed change
- Rationale: building `DWELLINGS` now against today's parcel concept risks re-keying or recounting it again in a few years, once the Parcel/Administrative Parcel redesign lands
- Not yet agreed to by NEMRC or the Tax Department — presented here as VCGI's position, for reaction and discussion

**Speaker notes:** Frame as an ask for the room's reaction, not a decision already made — this is exactly the kind of question this workgroup exists to work through together. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.3.

---

## Slide 17 — Dwelling Counts: Which "Parcel"?

**Content:**
- The Tax Department's own guidance defines "parcel," for this purpose, as *"all contiguous land under the same ownership"*
- That's the **old** definition — not the new "separate, sellable lot" `PARCEL` this whole redesign is built around
- Read plainly: dwelling units are meant to be counted per **Administrative Parcel** (the billing entity), not the new mapping-purpose `PARCEL`
- Works cleanly for the simple case on Slide 13 — genuinely unclear for a combined Administrative Parcel aggregating several underlying sellable lots
- **The sharper question (see Slide 16): not just "does this roll out with or separate from the 2029 classification work," but a cost/timing tradeoff** — build now against today's concept, or coordinate with the redesign so the work isn't done twice

**Speaker notes:** This is the slide worth slowing down for. Frame it as "we want to flag this while there's still time to align both efforts," not as a criticism of either the guidance or the redesign — it's a natural consequence of two different pieces of legislation, drafted somewhat independently, both touching "parcel." This workgroup is arguably the only place positioned to actually reconcile it. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.3.

---

## Slide 18 — What Act 170 Also Adds: Three-Way Classification

**Content:**
- `NRES_RES_FLV`, `NRES_NONRES_FLV`, floor-area-percentage splits (`FLR_PCT_HS`/`FLR_PCT_NR`/`FLR_PCT_NN`) — no analog today beyond a binary homestead flag
- Effective July 1, 2029, contingent on further legislative action — sequenced behind the dwelling-unit work, not urgent for today
- Ownership of the underlying policy question (what counts as "nonhomestead residential" vs. "nonhomestead nonresidential" in edge cases) sits with the Tax Department/Legislature, not NEMRC or VCGI

**Speaker notes:** Keep this brief — it's real, but it's 2029 and contingent, and today's time is better spent on the nearer-term dwelling-unit and Active/Inactive items. Source: `SPAN_PARCEL_GRANDLIST_MODEL.md` §6.3, `VERMONT_CAMA_DATA_STANDARD_DRAFT.md` §4.5.

---

## Slide 19 — Asks of NEMRC, as Grand List Steward

**Content:**
1. Export a universal Active/Inactive status field for every parcel, statewide — not just parcels within a TIF district *(the single highest-priority ask)*
2. Confirm whether `ADMINSPAN`/`GROUNDSPAN`/`KIND`/`TYPE` can be originated or exposed by the Grand List module
3. Confirm whether contiguous-parcel combination ever actually crosses town lines in practice
4. Confirm the CAMA↔Grand List sync mechanism described on Slide 7 is still current
5. Establish a change-request process and typical lead time for adding new export fields
6. The NEMRC Standard Import — a fixed, 24-field format that's very likely how *any* CAMA vendor (not just MicroSolve) feeds the Grand List — has no room for a dwelling-count field today. Extending it is a concrete, well-defined mechanical step, worth confirming NEMRC's openness to it directly
7. **New**: review the proposed [Vermont CAMA data standard](VERMONT_CAMA_DATA_STANDARD_DRAFT.md) directly and come to a future meeting ready to discuss it

**Speaker notes:** This is the distilled list from `OPEN_QUESTIONS_AND_NEMRC_ASKS.md` Part 1, in priority order. Item 7 is the direct ask made at this meeting — frame it as "here's the homework," concretely scoped rather than open-ended. Source citations for each item are in that document if NEMRC wants the full context.

---

## Slide 20 — Asks of NEMRC, as a CAMA Vendor (MicroSolve)

**Content:**
1. Adopt a canonical dwelling-count field, or confirm none exists and one needs to be built *(MicroSolve appears to be starting further behind on this than the other two vendors examined — and, per Slide 15, the field now needs to apply a habitability gate, not just count)*
2. Include the schema-metadata tables (`EXP_DATADICT`/`EXP_CATEG`) in every future extract as standard practice
3. Confirm the property-class field is always populated from the Tax Department's own code list verbatim

**Speaker notes:** Item 1 is worth saying plainly but not apologetically — it's a factual observation about what's been found in the samples examined so far, not a claim about the whole product. Source: `OPEN_QUESTIONS_AND_NEMRC_ASKS.md` Part 1, items 6–8.

---

## Slide 21 — Questions Only NEMRC Can Answer (Both Hats at Once)

**Content:**
- Where would a dwelling-count rollup actually be computed — Grand List, CAMA, or both? Only NEMRC controls both candidate systems
- Would the existing Globalscape FTP arrangement (already used for the CAMA extract) work for the new standard's fields too, or does the Grand List's own Tax Department submission need a separate channel?

**Speaker notes:** These are architecture questions internal to NEMRC's own product suite — worth calling out that VCGI/Tax Dept genuinely can't answer these without NEMRC's input. Source: `OPEN_QUESTIONS_AND_NEMRC_ASKS.md` Part 1, items 10–11.

---

## Slide 22 — Today's Discussion

**Content:**
1. Could `ADMINSPAN`/`GROUNDSPAN`/`KIND`/`TYPE` be originated or exposed by the Grand List module? *(the single biggest structural ask)*
2. Should the Grand List export finally carry Active/Inactive status for every parcel, statewide — not just parcels within a TIF district?
3. **Which "parcel" does the dwelling-unit count actually belong to** — the new sellable-lot `PARCEL`, or the Administrative Parcel the Tax Department's own guidance describes? *(Slide 17 — needed ahead of the CY2027 deadline)*
4. Do cross-town parcels need explicit handling in the new model, and if so, whose call is that?
5. **Timing tradeoff, not just sequencing**: build `DWELLINGS` now against today's parcel concept, or coordinate with the Parcel/Administrative Parcel redesign so it isn't re-keyed later? *(VCGI's own recommendation is to bundle these — Slide 16)*

**Speaker notes:** These five are deliberately a mix of NEMRC-specific asks and joint policy calls — pick based on how the room's energy is going rather than forcing all five. Item 3 replaces what was previously "what should count as a dwelling unit" — that question is now resolved, but it surfaced a sharper one. Not expecting resolution today on any of these.

---

## Slide 23 — What's Next

**Content:**
- Schema-level detail (exact population logic for `SPAN`/`ADMINSPAN`/`GROUNDSPAN`/`KIND`/`TYPE`) is in progress — not ready for this meeting
- A separate session with the non-NEMRC CAMA vendors (Aumentum/ProVal, Vision, Catalis/AssessPro) is planned
- This is expected to take more than one meeting — today's goal is a shared factual baseline and a short takeaway list, not final answers
- Full documentation (as-built findings, full open-questions list, draft data standard) available to all parties on request
- **Action item: NEMRC to review the proposed Vermont CAMA data standard ahead of the next meeting**
- **Closing action item: NEMRC to get back to the Tax Department and VCGI with its thoughts on implementation**

**Speaker notes:** Good closing note to manage expectations and signal this is a genuine ongoing collaboration, not a one-shot ask. The two action items are the concrete takeaway to make sure gets tracked between now and the next meeting.

---

## Slide 24 — Discussion

**Content:**
- Open floor
