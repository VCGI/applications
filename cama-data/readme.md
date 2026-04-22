# Vermont CAMA Data Overview

## Status per 32 V.S.A. § 5404

*Last Updated: January 26, 2026*

| **Percent   of Towns** | **Towns Per Tax** | **Tool**                      | **Vendor**                                                              | **Sample Received** | **Date Received** | **Notes**                                                                                                                                     | **Mock Up** |
|:----------------------:|:-----------------:|-------------------------------|-------------------------------------------------------------------------|:-------------------:|:-----------------:|-----------------------------------------------------------------------------------------------------------------------------------------------|-------------|
|           12%          |         32        | ASSESSPRO / AP5                     | Catalis (New England Municipal Consultants / NEMC acts as local vendor) |         Partial         |     1/28/2026     | Single table/near-complete extract. Met with vendor 2/17/2026 to confirm extract, forthcoming. |             |
|           77%          |        200        | MicroSolve CAMA               | NEMRC                                                                   |         Yes         |     12/4/2025     | 2 towns received. Multiple tables/complete extract. 1 town (Lincoln) dummy data only with no multi-fam or condo conditions within. South Burlingtion received, contains condos and commercial properties.                              | Created     |
|           7%           |         19        | PROVAL                        | Aumentum                                                                |         Yes         |     7/23/2025     | Barre Town extract. Multiple   tables/complete extract. Mock up created. Useful if representative. Data dictionary needed.                  | Created     |
|           3%           |         7         | Vision Governmental Solutions | Vision Governmental Solutions                                           |          No         |                   |                                                                                                                                               |             |
|           1%           |         2         | No CAMA Program               | No CAMA Program                                                         |          -          |                   |                                                                                                                                               |             |
|        **100%**        |      **260**      |                               |                                                                         |                     |                   |                                                                                                                                               |             |

[Stats Source Per Tax District Advisors](https://tax.vermont.gov/municipal-officials/listers-and-assessors/district-advisors)

*Status Doc: Documents - VCGI\VCGI-Administration\Program_Admin\Parcels\General Program Administration\Tax Dept\CAMA Data*

## Property Details Contents

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

## Interoperability

### NEMRC

This section details steps taken by VCGI to create basic interoperability between sample CAMA data extracts from NEMRC's Microsolve CAMA platform, standardized parcel polygons defined by the Vermont parcel data standard, and related GIS data such as E911 address points. A CAMA extract for South Burlington, VT is used as it contains many complex property types with multiple tabular records per single parcel geometry such as condominiums and apartments.

This section's purpose is to clarify challenges and opportunities for data interoperability between these sources to improve the availability of existing public information as associated with its property location. A demo web map application is used to display these challenges and opportunities, with data loaded in browser on demand, pulled from S3 buckets, and defined in a single index.html file.

The audiences for the demo are municipal listers and assessors, Vermont's Tax Department District Advisors, Property Valuation and Review staff, and policy makers, as well as State of Vermont GIS & IT professionals responsible for aggregating and serving municipal CAMA data as an open data resource.

#### Summary of Interoperability Modeling

1. Normalizing Fragmented Tabular Data (Addressing Data Silos without an ETL)

    - Actions: We federated the three separate NEMRC Microsolve data silos (Residential, Commercial, Condominium) by fetching their respective EXP_MAIN JSON files from S3 locations and mapping common properties into a single, unified masterIndex array in the browser's memory.

    - Challenge: CAMA data is often structurally fragmented based on property type. Commercial properties have tables (like EXP_OCCUPNCY) that do not exist in Residential schemas. A robust data pipeline must account for these structural variances while standardizing core search fields (like Address, Owner, and SPAN) so they can be queried uniformly.

2. Bridging Tabular Data and Spatial Geometry (Creating a Spatial Hook)

    - Actions: We established the parc_span field in the CAMA data as the foreign key that maps to the GLIST_SPAN (Grand List SPAN) field in the statewide parcel polygon layer.

    - Challenge: A strictly 1-to-1 relationship between a CAMA record and a physical piece of earth is a myth. Multi-use buildings and condominiums force cartographers to "stack" overlapping polygons. Therefore, applications cannot rely purely on the physical footprint (GIS SPAN) to pull data; they must query the GLIST_SPAN to successfully retrieve all the distinct tax records associated with that single spatial footprint.

3. Visualizing 1-to-Many Relationships (UI Disambiguation)

    - Actions: We implemented an Arcade expression in the map layer to dynamically highlight parcels where the GIS SPAN does not match the GLIST_SPAN (indicating stacked geometry). We also forced the user interface to intercept map clicks on these parcels, presenting a disambiguation table rather than blindly opening the first record it finds.

    - Challenge: Map interfaces inherently suggest that one click equals one property. Without visual cues (like the purple map highlight) and structural UI interventions (the "Found X records" table), users will miss critical property data hiding "underneath" the top-level polygon.

4. Exposing the Address Gap (E911 vs. CAMA)

    - Actions: We utilized a spatial intersect query. When a user clicks a parcel, the map engine literally draws a boundary around the polygon and counts how many E911 point geometries fall inside it, displaying that count alongside the CAMA record count.

    - Challenge: There is no hard database link between physical E911 address points and CAMA tax records. CAMA addresses (prop_locat or owner_addr) are often mailing addresses, while E911 points represent physical doors. This spatial intersect vividly demonstrates the data gap to policymakers and IT staff: a single tax record might correspond to a dozen physical addresses, and currently, only geography (not tabular keys) links them together.

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

[Connecticut](#)