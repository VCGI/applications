# Vermont CAMA Data Overview

## Status

*Last Updated: December 24, 2025*

| PCT Towns | [Towns Per Tax](https://tax.vermont.gov/municipal-officials/listers-and-assessors/district-advisors "https://tax.vermont.gov/municipal-officials/listers-and-assessors/district-advisors") | Tool                          | Vendor                        | Sample Received | Date Received | Notes                                                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ----------------------------- | --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 12%       | 32                                                                                                                                                                                         | ASSESSPRO                     | Tyler Tech                    | No              |               |                                                                                                                                                                    |
| 77%       | 200                                                                                                                                                                                        | MicroSolve CAMA               | NEMRC                         | Yes             | 12/4/2025     | Dummy Data Only. Multiple tables/complete extract                                                                                                                  |
| 7%        | 19                                                                                                                                                                                         | PROVAL                        | Aumentum                      | Yes             | 7/23/2025     | Barre Town extract. Multiple tables/complete extract. Used in mock up tool. Useful if representative. Dummy data hosted via S3: https://vtopendata-prd.s3.us-east-2.amazonaws.com/_Other/CAMA/sample/                                                               |
| 3%        | 7                                                                                                                                                                                          | Vision Governmental Solutions | Vision Governmental Solutions | No              |               |                                                                                                                                                                    |
| 0%        | 0                                                                                                                                                                                          | Patriot                       | Catalis                       | No              | 7/7/2025      | Dummy data only from NEMC. Single table following Bankers & Tradesmen schema. Catalis response: "We  cannot give you everything". Unclear number of towns who use. |
| 1%        | 2                                                                                                                                                                                          | No CAMA Program               | No CAMA Program               | \-              |               |                                                                                                                                                                    |
|           |                                                                                                                                                                                            |                               |                               |                 |               |                                                                                                                                                                    |
| 100%      | 260                                                                                                                                                                                        |                               |                               |                 |               |                                                                                                                                                                    |

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
- Russ Beaudoin <argivt@msn.com>

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

### Catalis (formerly Patriot)

#### Software

Catalis CAMA (Formerly PATRIOT Properties)

#### Contacts

- Wayne P <WayneP@catalisgov.com>
- Pat Santoso <Patrick.Santoso@catalisgov.com>

---

### New England Municipal Consultants (NEMC)

#### Contacts

- William Krajeski <bill@nemcvt.com>
- Matt Krajeski <mattkraj09@gmail.com>
