# Vermont NEMRC Microsolve CAMA Sample Viewer - Application Documentation

## Overview

This is a single-page web application designed to visualize Computer Assisted Mass Appraisal (CAMA) data for the town of Lincoln, Vermont to understand its contents. It utilizes a static data architecture where the frontend fetches JSON exports from an S3 bucket and links them dynamically to an interactive ArcGIS map.

Data are a dummy cut from NEMRC Microsolve dated December 2025, with no modifications to the source schema.

## Data Architecture

### Base Configuration

- **Data Source URL:** https://s3.us-east-2.amazonaws.com/vtopendata-prd/_Other/CAMA/sample-microsolve/

    - View in Browser: https://vtopendata-prd.s3-us-east-2.amazonaws.com/index.html#_Other/CAMA/sample-microsolve/

- **Lookup Source URL:** https://s3.us-east-2.amazonaws.com/vtopendata-prd/_Other/CAMA/vt_tax_property_class_codes.json

- **Primary Key:** `parcel_id` (Internal LRSN)

- **Secondary Key:** `parc_span` (SPAN - School Property Account Number)

### File Structure

There are 17 related tables in the NEMRC sample dataset, and 2 VCGI-created lookup tables, for a total of 19 objects.

| File Name         | Role    | Description                                                                  |
|-------------------|---------|------------------------------------------------------------------------------|
| EXP_MAIN.json     | Master  | Contains the core record for every parcel (Ownership, Valuation, Site info). |
| EXP_LABELS.json   | Config  | Provides human-readable labels for database field names.                     |
| EXP_LOOKUP.json   | Config  | Decoding ring for numeric codes (e.g., Style 1 = "Ranch").                   |
| EXP_SECTION.json  | Related | Details on main dwelling structures (Style, Year Built, Rooms).              |
| EXP_OUTBUILD.json | Related | Details on detached structures (Barns, Sheds).                               |
| EXP_SITEIMP.json  | Related | Site improvements (Water, Sewer).                                            |
| EXP_OYVAL.json    | Related | Historic valuation data.                                                     |
| EXP_TRANHIST.json | Related | Sales and transfer history.                                                  |
| EXP_PHOTOS.json   | Related | Metadata linking parcels to images. Placeholder for now.                                          |

### Additional File Usage

| File Name         | Usage Status | Context & Logic                                                                                                                                                                                             |   |   |   |   |   |
|-------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|---|---|---|---|
| EXP_EXTWALL.json  | Used         | Tab: "Building Details" Fetched and displayed as a table within the Building Details tab. The type field is decoded using the SIDING category in EXP_LOOKUP.                                                |   |   |   |   |   |
| EXP_FEATURES.json | Used         | Tab: "Building Details" Displayed as a table within the Building Details tab. Contains specific filtering logic to exclude records where the name is empty or quantity is 0.                                |   |   |   |   |   |
| EXP_FLOOR.json    | Used         | Tab: "Building Details" Displayed as a table within the Building Details tab. The type field is decoded using the FLOOR_COVER category in EXP_LOOKUP.                                                       |   |   |   |   |   |
| EXP_GARAGE.json   | Used         | Tab: "Outbuildings" Displayed as a table within the Outbuildings tab. Contains filtering logic to exclude records where type is '0' or area is '0'. Uses lookups for GARAGE_TYPE, SIDING, and GARAGE_FLOOR. |   |   |   |   |   |
| EXP_HEAT.json     | Used         | Tab: "Building Details" Displayed as a table within the Building Details tab. Filtered to exclude records where percent is '0'. The type field is decoded using the HEATING category in EXP_LOOKUP.         |   |   |   |   |   |
| EXP_IMPROVE.json  | Used         | Tab: "Improvements" Displayed as a table within the Improvements tab. Filtered to exclude records where type is empty or total value is '0'.                                                                |   |   |   |   |   |
| EXP_INSPECT.json  | Not Used     | This file is not referenced in the RELATED_FILES configuration object, so it is never fetched or rendered by the application.                                                                               |   |   |   |   |   |
| EXP_LAND.json     | Used         | Tab: "Land" Displayed as a table within the Land tab. Fields type and calc_meth are decoded using LAND_TYPE and LAND_CALC lookups.                                                                          |   |   |   |   |   |
| EXP_PORCH.json    | Used         | Tab: "Outbuildings" Displayed as a table within the Outbuildings tab. Filtered to exclude records where area is '0'. Uses lookups for PORCH_FLOOR, PORCH_WALL, and PORCH_ROOF.                              |   |   |   |   |   |
| EXP_ROOF.json     | Used         | Tab: "Building Details" Displayed as a table within the Building Details tab. The type field is decoded using the ROOF_COVER category in EXP_LOOKUP.                                                        |   |   |   |   |   |

## Property Details Card Documentation

The "Property Details" card is the primary information display. Below is the mapping of every field displayed on the card to its source data.

### Header Section

| Display Label        | Source File | Field Name | Transformation / Logic                                    |
|----------------------|-------------|------------|-----------------------------------------------------------|
| Address              | EXP_MAIN    | prop_locat | Cleaned string.                                           |
| Total Assessed Value | EXP_MAIN    | cama_total | Formatted as currency (USD).                              |
| Assessment Year      | EXP_MAIN    | assess_yea | If '0' or empty, defaults to max year found in EXP_OYVAL. |

### Badges (Summary Stats)

| Badge Label             | Logic Source | Condition                                                                     |
|-------------------------|--------------|-------------------------------------------------------------------------------|
| Total Structure(s)      | Calculated   | Count of records in EXP_SECTION + EXP_OUTBUILD.                               |
| Residential Building(s) | EXP_SECTION  | Count of records where bldg_type is '1' (Single Family) or '9' (Mobile Home). |
| Homestead Declared      | EXP_MAIN     | Displayed if homestead == '2'.                                                |
| Camp                    | EXP_SECTION  | Displayed if any structure has bldg_type == '10'.                             |
| Mobile Home             | EXP_SECTION  | Displayed if bldg_type == '9' OR design == '10' or '12'.                      |
| Water / Sewer           | EXP_SITEIMP  | Checks for type '1' (Water) or '2' (Sewer).                                   |

### Column 1: Ownership & Site

| Section   | Display Label  | Source File | Field Name | Transformation / Logic                                       |
|-----------|----------------|-------------|------------|--------------------------------------------------------------|
| Ownership | Owner          | EXP_MAIN    | owner_name | -                                                            |
|           | Parcel ID      | EXP_MAIN    | parcel_id  | Displays the raw LRSN.                                       |
|           | SPAN           | EXP_MAIN    | parc_span  | -                                                            |
|           | Status         | EXP_MAIN    | parcstatus | -                                                            |
| Site      | Type           | EXP_MAIN    | factori    | Decodes numeric code using vt_tax_property_class_codes.json. |
|           | Description    | EXP_MAIN    | factorh    | -                                                            |
|           | Acres          | EXP_MAIN    | factorj    | -                                                            |
|           | Township       | Hardcoded   | -          | Currently set to static string: "Lincoln (354)"              |
|           | Neighborhood # | EXP_MAIN    | neighborho | -                                                            |
|           | Homestead      | EXP_MAIN    | homestead  | '2' = "Homestead Declared", else "Non-homestead".            |

### Column 2: Building Info (Mini-List)

**Source File:** `EXP_SECTION.json` Iterates through every record associated with the parcel.

| Display Label | Field Name              | Transformation / Logic                                                                                            |
|---------------|-------------------------|-------------------------------------------------------------------------------------------------------------------|
| Style         | style                   | Decoded via EXP_LOOKUP (Category: SECTION_STYLE). Includes visual badges for SINGLE FAMILY, CAMP, or MOBILE HOME. |
| Year Built    | year_built              | -                                                                                                                 |
| Living Area   | bldg_sqft               | Formatted number + " sq ft".                                                                                      |
| Bedrooms      | bedrooms                | -                                                                                                                 |
| Bathrooms     | full_baths / half_baths | Concatenated string (e.g., "2 Full / 1 Half").                                                                    |
| Total Rooms   | tot_rooms               | -                                                                                                                 |
| Kitchens      | kitchens                | -                                                                                                                 |

### Column 3: Valuation & Record

| Section             | Display Label     | Source File | Field Name | Transformation    |
|---------------------|-------------------|-------------|------------|-------------------|
| Valuation Breakdown | Assessment Year   | EXP_MAIN    | assess_yea | See Header logic. |
|                     | Land              | EXP_MAIN    | cama_land  | Currency format.  |
|                     | Dwelling          | EXP_MAIN    | cama_dwell | Currency format.  |
|                     | Outbuildings      | EXP_MAIN    | cama_outb  | Currency format.  |
|                     | Site Improvements | EXP_MAIN    | cama_sitei | Currency format.  |
|                     | Total             | EXP_MAIN    | cama_total | Currency format.  |
| Record              | Tax Map #         | EXP_MAIN    | tax_map_nu | -                 |
|                     | Book              | EXP_MAIN    | book       | -                 |
|                     | Page              | EXP_MAIN    | page       | -                 |
|                     | Last Update       | EXP_MAIN    | lastupdate | -                 |

## Key Application Functions

### `initialize()`

The entry point of the application. It orchestrates the startup sequence:

1. Shows a loading indicator.

2. Calls initializeMap() to load ArcGIS.

3. Calls loadInitialData() to fetch JSONs.

4. Sets up event listeners for the search bar, back buttons, and scroll interactions.

### `loadInitialData()`

Responsible for fetching the "Essential" files required to render the initial table and map interactions (`EXP_MAIN`, `EXP_LOOKUP`, `EXP_LABELS`). It also includes specific logic to fetch and parse the nested `vt_tax_property_class_codes.json` structure into a usable lookup object.

### `initializeMap()`

Loads the ArcGIS API modules and configures the map view.

- **Parcels Layer:** VCGI FeatureServer (filtered to Lincoln).

- **Building Footprints:** VCGI FeatureServer (filtered to Lincoln, white fill/dark stroke). Popups enabled to show `POLY_ID`.

- **E911 Address Points:** VCGI FeatureServer.

- **Interactions:** Handles click events to identify parcels. If a parcel is clicked but no data exists in `EXP_MAIN`, it triggers a soft error (message displayed, but map view does not reset).

### `showDetailView(lrsn)`

The core rendering engine for the Property Details screen.

1. Finds the record in masterData using the LRSN.

2. Zooms the map to the specific parcel using the SPAN.

3. Filters all related data (Sections, Outbuildings, etc.) for that specific parcel.

4. Calculates summary statistics (badges, residential counts).

5. Constructs the HTML for the 3-column layout and the tabbed interface.

6. Injects the HTML into the DOM and handles tab switching logic.

### `cleanValue(val)`

A utility helper that sanitizes data by removing surrounding quotes (`"`) and extra whitespace, ensuring clean display of CSV-style JSON data.