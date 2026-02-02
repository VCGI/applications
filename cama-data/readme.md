# Vermont CAMA Data Overview

## Status per 32 V.S.A. § 5404

*Last Updated: January 26, 2026*

| **Percent   of Towns** | **Towns Per Tax** | **Tool**                      | **Vendor**                                                              | **Sample Received** | **Date Received** | **Notes**                                                                                                                                     | **Mock Up** |
|:----------------------:|:-----------------:|-------------------------------|-------------------------------------------------------------------------|:-------------------:|:-----------------:|-----------------------------------------------------------------------------------------------------------------------------------------------|-------------|
|           12%          |         32        | ASSESSPRO                     | Catalis (New England Municipal Consultants / NEMC acts as local vendor) |         Yes         |     1/28/2026     | Single table/near-complete extract. Data does not include SPAN nor SPAN components, needs one to relate with parcels. Made request to vendor. |             |
|           77%          |        200        | MicroSolve CAMA               | NEMRC                                                                   |         Yes         |     12/4/2025     | Multiple tables/complete extract. Dummy Data Only, no multi-fam or condo conditions within. Mock up created. More complex dataset requested.                              | Created     |
|           7%           |         19        | PROVAL                        | Aumentum                                                                |         Yes         |     7/23/2025     | Barre Town extract. Multiple   tables/complete extract. Mock up created. Useful if representative. Data dictionary needed.                  | Created     |
|           3%           |         7         | Vision Governmental Solutions | Vision Governmental Solutions                                           |          No         |                   |                                                                                                                                               |             |
|           1%           |         2         | No CAMA Program               | No CAMA Program                                                         |          -          |                   |                                                                                                                                               |             |
|        **100%**        |      **260**      |                               |                                                                         |                     |                   |                                                                                                                                               |             |

[Stats Source Per Tax District Advisors](https://tax.vermont.gov/municipal-officials/listers-and-assessors/district-advisors)

*Status Doc: Documents - VCGI\VCGI-Administration\Program_Admin\Parcels\General Program Administration\Tax Dept\CAMA Data*

## Property Details Contents

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

Catalis CAMA - AssessPro (Formerly PATRIOT Properties)

#### Contacts

- Wayne P <WayneP@catalisgov.com>
- Pat Santoso <Patrick.Santoso@catalisgov.com>

---

### New England Municipal Consultants (NEMC) - VT Vendor of Catalis' AssessPro

#### Contacts

- William Krajeski <bill@nemcvt.com>
- Matt Krajeski <mattkraj09@gmail.com>

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