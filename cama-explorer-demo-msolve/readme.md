# CAMA Sample Viewer NEMRC Microsolve

This application uses a sample CAMA data extract from NEMRC's Microsolve platform. It's goal is to display the schema and contents of the sample data to inform development of CAMA data standardization and submittal normalization.

## Structures and Residential Logic

Total Structure Badge: Counts all Sections + Outbuildings.

Residential Badge: Added a specific count for Building Types 1, 9, and 10.

Mobile Home Logic: Updated to explicitly include Design 12 ("Double Wide") as a trigger.

Multi-Family Badges: Added a loop to check for Apartment Houses (7), Duplexes (8), Condos (20), and Res. Commercial (21). If found, a badge with that specific label (e.g., "Duplex") is generated.

## Files

There are 17 .json files in the sample data set. They are hosted in the PRD opendata folder on Amazon S3:

```

s3://vtopendata-prd/_Other/CAMA/sample-microsolve/

```

| File  | Contents  |
|------ |:------:   |
| EXP_EXTWALL | Exterior Wall Covering |
| EXP_FEATURES    | Types of Additional Improvements |
| EXP_FLOOR | 