# Vermont CAMA Data Providers

## NEMRC

**Software:** MicroSolve CAMA

**Contacts:**

- Chris Miele <chris@nemrc.com>
- Ernie Saunders <esaunders@nemrc.com>

**Status**

> [!IMPORTANT]
> GlobalScape FTP configured for use Friday, September 26, 2025.
> Emailed Chris for sample data on Monday, September 29, 2025.

## Tyler Technologies

**Software:** Assesspro (Assessment Pro)

**Contacts:**

- Gio Giordano <Gio.Giordano@tylertech.com>
- John Vickery <John.Vickery@tylertech.com>

## Aumentum Technologies (formerly ProVal) 

:+1:

**Software:** ProVal or Aumentum Valuation

**Contacts:**

- Victoria Cole <Victoria.Cole@AumentumTech.com>
- William Pleake <William.Pleake@AumentumTech.com>
- Russ Beaudoin <argivt@msn.com>

**Status:**

> [!NOTE]
> VC sent full sample data for one town (Barre Town) via their own FTP. Still need data dictionary for turning codes into understandable strings.

> [!NOTE]
> Full sample data is largely useful for purposes of reporting building and property details, can likely be ETL'd or processed as-is

## Vision Government Solutions

**Software:** VISION Cama

**Contacts:**

- Tasha Vincent <tvincent@vgsi.com>

## Catalis (formerly Patriot)

**Software:** Catalis CAMA (Formerly PATRIOT Properties)

**Contacts:**

- Wayne P <WayneP@catalisgov.com>
- Pat Santoso <Patrick.Santoso@catalisgov.com>

## New England Municipal Consultants (NEMC)

**Contacts:**

- William Krajeski <bill@nemcvt.com>
- Matt Krajeski <mattkraj09@gmail.com>

## CAMA SAMPLE VIEWER Dwelling Unit Methodology

Summary of how (residential) dwellings calculated from Aumentum Sample:

Based on the code provided, the "Dwellings" value displayed in the **Property Details** card is determined through a prioritized hierarchy of logic. The application attempts to calculate the unit count using three different methods, accepting the first "positive" result it finds in specific order.

Here is the breakdown of how the value is calculated:

### 1. Data Sources

The application looks at data from the following files/tables for the selected parcel:

- **`CI_Building`:** Commercial/Investment building records.
- **`Parcel_Main`:** The main parcel record (specifically the Property Class Code).
- **`Improvements`:** List of structures (e.g., DWELL, MHOME, APARTRES).
- **`R_Floor`:** Residential floor details (specifically Kitchen Counts).

### 2. The Calculation Hierarchy

The application calculates three potential values and applies them in this order of priority:

#### Priority A: Explicit Unit Count (`CI_Building`)

First, the system sums the `number_units` field from all Commercial/Investment building records associated with the parcel.

- **If this sum is greater than 0:** This value is used as the Dwellings count.
- **Why:** This is considered the most accurate, direct data entry for multi-unit properties.

#### Priority B: Property Class Code Inference (`Parcel_Main`)

If no commercial units are found, the system checks the **Property Class Code** against a hardcoded list of multi-unit residential codes:

- **Code 102 or 202:** Sets count to **2**
- **Code 103 or 203:** Sets count to **3**
- **Code 104 or 204:** Sets count to **4**
- **If a match is found:** This value is used.

#### Priority C: Improvement Enumeration (`Improvements`)

If neither of the above yields a result, the system iterates through the list of improvements and tallies them based on type:

- **Single Units:** If the type is `DWELL`, `MHOME` (Mobile Home), or `MHPARK2`, it adds **1** per record.
- **Apartments (`APARTRES`):** It looks at the `R_Floor` records.
- If a `kit_count` (Kitchen Count) exists, it adds the number of kitchens (assuming 1 kitchen = 1 dwelling).
- If no kitchen count exists, it defaults to adding **1**.

**Note:** If the final count is derived from this method—specifically involving Apartments—the system marks the value as an "estimate" (see Visual Indicators below).

### 3. Visual Indicators

The application adds specific symbols to the final number to indicate data quality or context:

**The Tilde (`~`):**

- **Meaning:** The value is an estimate.
- **Trigger:** This appears if the count was derived from **Priority C** (Improvement Enumeration) involving Apartment types where specific unit data might be ambiguous.

**The Asterisk (`*`):**

- **Meaning:** Indicates a Condo or Duplex where the unit count might be undercounted in the source data (e.g., the record might represent only *one* side of a duplex).
- **Trigger:**
- The Property Class Code indicates a Condo (130-135, 230-235) or a specific commercial code (337).
- The Legal Description contains the word "duplex".
- The record has a valid `parent_lrsn` (indicating it is a child parcel, like a condo unit)