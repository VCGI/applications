# Vermont NEMRC Microsolve CAMA Sample Viewer - Application Documentation

## Overview

This is a single-page web application designed to visualize Computer Assisted Mass Appraisal (CAMA) data for the town of Lincoln, Vermont to understand its contents. It utilizes a static data architecture where the frontend fetches JSON exports from an S3 bucket and links them dynamically to an interactive ArcGIS map.

Data are a dummy cut from NEMRC Microsolve dated December 2025, with no modifications to the source schema.

## Data Architecture

### Base Configuration

- **Data Source URL:** https://s3.us-east-2.amazonaws.com/vtopendata-dev/_Other/CAMA/sample-microsolve/

    - View in Browser: https://vtopendata-dev.s3-us-east-2.amazonaws.com/index.html#_Other/CAMA/sample-microsolve/

- **Lookup Source URL:** https://s3.us-east-2.amazonaws.com/vtopendata-dev/_Other/CAMA/vt_tax_property_class_codes.json

*(Corrected 2026-07-30: this data was originally hosted in the `vtopendata-prd` bucket and has since moved to `vtopendata-dev`; the live `index.html` already pointed at the `dev` location, but this readme had not been updated to match.)*

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

| File Name         | Usage Status | Context & Logic                                                                                                                                                                                             |
|-------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EXP_EXTWALL.json  | Used         | Tab: "Building Details" Fetched and displayed as a table within the Building Details tab. The type field is decoded using the SIDING category in EXP_LOOKUP.                                                |
| EXP_FEATURES.json | Used         | Tab: "Building Details" Displayed as a table within the Building Details tab. Contains specific filtering logic to exclude records where the name is empty or quantity is 0.                                |
| EXP_FLOOR.json    | Used         | Tab: "Building Details" Displayed as a table within the Building Details tab. The type field is decoded using the FLOOR_COVER category in EXP_LOOKUP.                                                       |
| EXP_GARAGE.json   | Used         | Tab: "Outbuildings" Displayed as a table within the Outbuildings tab. Contains filtering logic to exclude records where type is '0' or area is '0'. Uses lookups for GARAGE_TYPE, SIDING, and GARAGE_FLOOR. |
| EXP_HEAT.json     | Used         | Tab: "Building Details" Displayed as a table within the Building Details tab. Filtered to exclude records where percent is '0'. The type field is decoded using the HEATING category in EXP_LOOKUP.         |
| EXP_IMPROVE.json  | Used         | Tab: "Improvements" Displayed as a table within the Improvements tab. Filtered to exclude records where type is empty or total value is '0'.                                                                |
| EXP_INSPECT.json  | Not Used     | This file is not referenced in the RELATED_FILES configuration object, so it is never fetched or rendered by the application.                                                                               |
| EXP_LAND.json     | Used         | Tab: "Land" Displayed as a table within the Land tab. Fields type and calc_meth are decoded using LAND_TYPE and LAND_CALC lookups.                                                                          |
| EXP_PORCH.json    | Used         | Tab: "Outbuildings" Displayed as a table within the Outbuildings tab. Filtered to exclude records where area is '0'. Uses lookups for PORCH_FLOOR, PORCH_WALL, and PORCH_ROOF.                              |
| EXP_ROOF.json     | Used         | Tab: "Building Details" Displayed as a table within the Building Details tab. The type field is decoded using the ROOF_COVER category in EXP_LOOKUP.                                                        |                                                  |   |   |   |   |   |

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

## Property Details Contents

*Moved here from `cama-data/readme.md` (2026-07-29) — this table is specific to this Lincoln-based mock up and was the original property-details field inventory drafted before the broader, multi-vendor documentation effort in [`cama-data/`](../cama-data) existed.*

The table of property details below is informed by the NEMRC Microsolve CAMA sample for the town of Lincoln, VT. This data sample does not include condominiums or other complex multi-record properties with stacked polygons.

| Location       | Info                           | Types                                                                                                                  | Display       | Derivation |
|----------------|--------------------------------|------------------------------------------------------------------------------------------------------------------------|---------------|------------|
| Header         | Full Property  Address         |                                                                                                                        |               | Source     |
| Header         | Total Assessed Value           |                                                                                                                        |               | Source     |
| Header         | Total Assessed Value Year      |                                                                                                                        |               | Source     |
| Summary Badges | Count of Total Structures      |                                                                                                                        |               | Calculated |
| Summary Badges | Count of Residential Buildings |                                                                                                                        |               | Calculated |
| Summary Badges | Count of Dwelling Units        |                                                                                                                        | Conditional   | Calculated |
| Summary Badges | Count of Commercial Buildings  |                                                                                                                        | Conditional   | Calculated |
| Summary Badges | Count of Total Improvements    |                                                                                                                        |               | Calculated |
| Summary Badges | Type of Residence              | Single-Family, Mobile Home, Camp, Condo, Two Units, Three Units, Four   Unit, 5-8 Units, >8 Units, Co-Op, Mixed-Use    | Conditional   | Lookup     |
| Summary Badges | Type of Use                    | Residential, Commercial, Industrial, Farm/Ag, Timberland, Government,   Open Land/Misc, Other (specified), Unspecified | Conditional   | Lookup     |
| Summary Badges | Homestead Status               | Homestead, Nonhomestead residential, Nonhomestead nonresidential                                                       | Conditional   | Source     |
| Summary Badges | Utilities Service              | Water, Sewer, Septic, Electric, None                                                                                   | Conditional   | Source     |
| Property       | Owner Name                     |                                                                                                                        |               | Source     |
| Property       | Parcel ID                      |                                                                                                                        |               | Source     |
| Property       | SPAN                           |                                                                                                                        |               | Source     |
| Property       | LRSN / CAMA ID                 |                                                                                                                        |               | Source     |
| Property       | Parcel Status                  |                                                                                                                        |               | Source     |
| Site           | Type                           |                                                                                                                        |               | Lookup     |
| Site           | Description                    |                                                                                                                        |               | Source     |
| Site           | Acres                          |                                                                                                                        |               | Source     |
| Site           | Land Types                     |                                                                                                                        | Conditional   | Lookup     |
| Site           | Frontage                       |                                                                                                                        | Conditional   | Source     |
| Site           | Town                           |                                                                                                                        |               | Source     |
| Site           | TOWNGEOID                      |                                                                                                                        | Not Displayed | Lookup     |
| Site           | TVGEOID                        |                                                                                                                        | Not Displayed | Lookup     |
| Site           | VILLGEOID                      |                                                                                                                        | Not Displayed | Lookup     |
| Site           | Neighborhood                   |                                                                                                                        |               | Source     |
| Site           | Zoning                         |                                                                                                                        |               | Source     |
| Site           | Homestead Status               |                                                                                                                        |               | Source     |
| Buildings      | Building Number                |                                                                                                                        | Conditional   | Source     |
| Buildings      | Style                          |                                                                                                                        |               | Source     |
| Buildings      | Type                           |                                                                                                                        |               | Source     |
| Buildings      | Year Built                     |                                                                                                                        |               | Source     |
| Buildings      | Effective Year Built           |                                                                                                                        |               | Source     |
| Buildings      | Living/Finished Area           |                                                                                                                        |               | Source     |
| Buildings      | Total Area                     |                                                                                                                        |               | Source     |
| Buildings      | Bedrooms                       |                                                                                                                        |               | Source     |
| Buildings      | Bathrooms                      |                                                                                                                        |               | Source     |
| Buildings      | Kitchens                       |                                                                                                                        |               | Source     |
| Buildings      | Total Rooms                    |                                                                                                                        |               | Source     |
| Buildings      | Dwelling Units                 |                                                                                                                        | Conditional   | Calculated |
| Valuation      | Assessment Year                |                                                                                                                        |               | Source     |
| Valuation      | Land                           |                                                                                                                        |               | Source     |
| Valuation      | Dwellings                      |                                                                                                                        |               | Source     |
| Valuation      | Outbuildings                   |                                                                                                                        |               | Source     |
| Valuation      | Site Improvements              |                                                                                                                        |               | Source     |
| Valuation      | Total                          |                                                                                                                        |               | Source     |
| Record         | Tax Map #                      |                                                                                                                        |               | Source     |
| Record         | Book                           |                                                                                                                        |               | Source     |
| Record         | Page                           |                                                                                                                        |               | Source     |
| Record         | Last Update                    |                                                                                                                        |               | Source     |

## Interoperability and Relation With Parcel Geometry

*Moved here from `cama-data/readme.md` (2026-07-29). **This section reflects only the initial pass done with this Lincoln-based mock up and is not as thorough a review as the work since completed** — see [`cama-data/SPAN_PARCEL_GRANDLIST_MODEL.md`](../cama-data/SPAN_PARCEL_GRANDLIST_MODEL.md) and the per-vendor `*_AS_BUILT.md` documents in [`cama-data/`](../cama-data) for the current, comprehensive treatment of SPAN, the Grand List, and parcel geometry interoperability across all documented CAMA vendors.*

VCGI has attempted to create basic interoperability between sample CAMA data extracts from NEMRC's Microsolve CAMA platform, standardized parcel polygons defined by the Vermont parcel data standard, and related GIS data such as E911 address points. This work attempts to inform how to improve the availability of existing public information as associated with its property location. A CAMA extract for South Burlington, VT is used as it contains many complex property types with multiple tabular records per single parcel geometry such as condominiums and apartments.

There are challenges and opportunities for data interoperability between these sources. A demo web map application is used to display them, with data loaded in browser, pulled from S3 buckets, and defined in a single index.html file.

The audiences for the demo are municipal listers and assessors, Vermont's Tax Department District Advisors, Property Valuation and Review staff, and policy makers, as well as State of Vermont GIS & IT professionals responsible for aggregating and serving municipal CAMA data as an open data resource.

The intent is to work with these groups to specify a CAMA data standard, implement normalized data transfer, and define the technical requirements for aggregating CAMA data for publishing as a uniform open data resource. Specific details within CAMA data that are of interest are details and counts of buildings and structures on a property, counts of dwelling units that may not explicitly defined in single fields, and site details that are not detailed in grand list or other data. 

A further goal is to consider all in relation to an updated parcel definition that moves from the current "contiguous", aggregate on common ownership for tax administration purposes definition to one that maps properties based on the smallest sellable real estate unit. The latter definition may also begin to reflect and replace what are current called "inactive" parcels.

#### Summary of Interoperability Modeling

1. Normalizing Fragmented Tabular Data (Addressing Data Silos without an ETL)

    - Actions: We federated the three separate NEMRC Microsolve data silos (Residential, Commercial, Condominium) by fetching their respective EXP_MAIN JSON files from S3 locations and mapping common properties into a single, unified masterIndex array in the browser's memory.

    - Challenge: CAMA data is often structurally fragmented based on property type. Commercial properties have tables (like EXP_OCCUPNCY) that do not exist in Residential schemas and vice versa. A robust data pipeline must account for these structural variances while standardizing core search fields (like Address, Owner, and SPAN) so they can be queried uniformly.

2. Bridging Tabular Data and Spatial Geometry (Creating a Spatial Hook)

    - Actions: We established the parc_span field in the CAMA data as the foreign key that maps to the GLIST_SPAN (Grand List SPAN) field in the statewide parcel polygon layer.

    - Challenge: A strictly 1-to-1 relationship between a CAMA record and a physical piece of earth is not valid. Multi-use buildings and condominiums force cartographers to "stack" overlapping polygons. Therefore, applications cannot rely purely on the physical footprint (GIS SPAN) to pull data; they must query the GLIST_SPAN to successfully retrieve all the distinct tax records associated with that single spatial footprint.

3. Visualizing 1-to-Many Relationships (UI Disambiguation)

    - Actions: We implemented an Arcade expression in the map layer to dynamically highlight parcels where the GIS SPAN does not match the GLIST_SPAN (indicating stacked geometry). We also forced the user interface to intercept map clicks on these parcels, presenting a disambiguation table rather than blindly opening the first record it finds.

    - Challenge: Map interfaces inherently suggest that one click equals one property. Without visual cues (like the purple map highlight) and structural UI interventions (the "Found X records" table), users will miss critical property data hiding "underneath" the top-level polygon.

4. Exposing the Address Gap (E911 vs. CAMA)

    - Actions: We utilized a spatial intersect query. When a user clicks a parcel, the map engine draws a boundary around the polygon and counts how many E911 point geometries fall inside it, displaying that count alongside the CAMA record count.

    - Challenge: There is no hard database link between physical E911 address points and CAMA tax records. CAMA addresses (prop_locat or owner_addr) are often mailing addresses, while E911 points represent physical doors. This spatial intersect vividly demonstrates the data gap to policymakers and IT staff: a single tax record might correspond to a dozen physical addresses, and currently, only geography (not tabular keys) links them together.