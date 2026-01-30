# Vermont CAMA Data Overview

## Status per 32 V.S.A. § 5404

*Last Updated: January 26, 2026*

| **Percent   of Towns** | **Towns Per Tax** | **Tool**                      | **Vendor**                                                              | **Sample Received** | **Date Received** | **Notes**                                                                                                                                     | **Mock Up** |
|:----------------------:|:-----------------:|-------------------------------|-------------------------------------------------------------------------|:-------------------:|:-----------------:|-----------------------------------------------------------------------------------------------------------------------------------------------|-------------|
|           12%          |         32        | ASSESSPRO                     | Catalis (New England Municipal Consultants / NEMC acts as local vendor) |         Yes         |     1/28/2026     | Single table/near-complete extract. Data does not include SPAN nor SPAN components, needs one to relate with parcels. Made request to vendor. |             |
|           77%          |        200        | MicroSolve CAMA               | NEMRC                                                                   |         Yes         |     12/4/2025     | Multiple tables/complete   extract. Dummy Data Only, no multi-fam or condo conditions within. Mock up   created.                              | Created     |
|           7%           |         19        | PROVAL                        | Aumentum                                                                |         Yes         |     7/23/2025     | Barre Town extract. Multiple   tables/complete extract. Mock up created. Useful if representative. Data   dictionary needed.                  | Created     |
|           3%           |         7         | Vision Governmental Solutions | Vision Governmental Solutions                                           |          No         |                   |                                                                                                                                               |             |
|           1%           |         2         | No CAMA Program               | No CAMA Program                                                         |          -          |                   |                                                                                                                                               |             |
|        **100%**        |      **260**      |                               |                                                                         |                     |                   |                                                                                                                                               |             |

[Stats Source Per Tax District Advisors](https://tax.vermont.gov/municipal-officials/listers-and-assessors/district-advisors)

*Status Docs and Dummy Data: Documents - VCGI\VCGI-Administration\Program_Admin\Parcels\General Program Administration\Tax Dept\CAMA Data*

## CAMA Vendors

### NEMRC

#### Software

MicroSolve CAMA

#### Contacts

- Chris Miele <chris@nemrc.com>
- Ernie Saunders <esaunders@nemrc.com>

#### Status

> [!IMPORTANT]
> GlobalScape FTP configured for use Friday, September 26, 2025.
> Emailed Chris for sample data on Monday, September 29, 2025.

---

### Tyler Technologies

#### Software

Assesspro (Assessment Pro)

#### Contacts

- Gio Giordano <Gio.Giordano@tylertech.com>
- John Vickery <John.Vickery@tylertech.com>

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
