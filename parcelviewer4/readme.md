# Vermont Parcel Viewer Popup Configuration

## HTML Popup - Parcels - Active Layer (v.4.0.3)
```html
<div style="color:#0f172a;font-family:Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
    <div style="margin-bottom:16px;">
        <div style="color:#64748b;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;">
            <strong>SPAN {GLIST_SPAN}</strong>
        </div>
        <div style="align-items:center;display:flex;gap:8px;margin:6px 0;">
            <span style="background-color:#003300;color:#ffffff;font-size:12px;"><span style="border-radius:999px;padding:4px 10px;text-transform:uppercase;"><strong>{TOWN} </strong></span></span><span style="color:#475569;font-size:13px;">| {PROPTYPE}</span>
        </div>
        <div style="font-size:20px;line-height:1.2;margin-top:4px;">
            <strong>{E911ADDR}</strong>
        </div>
    </div>
    <div style="align-items:center;background-color:#fef2f2;border-radius:8px;border:1px solid #fca5a5;color:#991b1b;display:{expression/expr20};font-size:13px;gap:8px;margin-bottom:16px;padding:10px 14px;">
        <span><strong>⚠️</strong></span><strong> Parcel not matched with Grand List</strong>
    </div>
    <div style="background-color:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;color:#334155;display:{expression/expr23};font-size:13px;line-height:1.6;margin-bottom:16px;padding:14px;">
        <strong>{expression/expr21}</strong>
    </div>
    <div style="display:grid;gap:12px;grid-template-columns:repeat(2, minmax(0,1fr));margin-bottom:16px;">
        <div style="border-radius:10px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Ownership</strong>
            </div>
            <div style="color:#0f172a;font-size:14px;">
                <strong>{OWNER1}</strong>
            </div>
            <div style="color:#0f172a;font-size:14px;margin-bottom:4px;">
                <strong>{OWNER2}</strong>
            </div>
            <div style="color:#64748b;font-size:12px;">
                Type: {expression/expr1}
            </div>
        </div>
        <div style="border-radius:10px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Valuation</strong>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Full Value: <span style="color:#0f172a;font-size:14px;"><strong>${REAL_FLV}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Land: <span style="color:#0f172a;"><strong>${LAND_LV}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;">
                Improvements: <span style="color:#0f172a;"><strong>${IMPRV_LV}</strong></span>
            </div>
        </div>
        <div style="border-radius:10px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Description</strong>
            </div>
            <div style="color:#0f172a;font-size:13px;margin-bottom:4px;">
                {DESCPROP}
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:4px;">
                Category: <span style="color:#1b3240;"><strong>{expression/expr19}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                GL Acres: <span style="color:#0f172a;"><strong>{expression/expr6}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                GIS Acres: <span style="color:#0f172a;"><strong>{expression/expr17}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;">
                Difference: <span style="color:#0f172a;"><strong>{expression/expr18}</strong></span>
            </div>
        </div>
        <div style="border-radius:10px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Homestead</strong>
            </div>
            <div style="color:#0f172a;font-size:13px;">
                <strong>{expression/expr11}</strong>
            </div>
        </div>
        <div style="background-color:#f8fafc;border-radius:10px;border:1px solid #cbd5e1;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Land Surveys</strong>
            </div>
            <div style="color:#475569;font-size:12px;">
                {expression/expr4}
            </div>
            <p>
                <a style="background-color:#f1f5f9;border-radius:4px;border:1px solid #cbd5e1;color:#334155;display:{expression/expr15};font-size:11px;margin-top:8px;padding:4px 8px;text-decoration:none;" href="{expression/expr5}" target="_blank"><strong>🔗 View Survey&nbsp;</strong></a>
            </p>
        </div>
        <div style="background-color:#f2f6f6;border-radius:10px;border:1px solid #9db5b6;padding:12px;">
            <div style="color:#457a7c;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Current Use</strong>
            </div>
            <div style="color:#233d3e;font-size:12px;">
                {expression/expr8}
            </div>
            <p>
                <a style="background-color:#e3ecec;border-radius:4px;border:1px solid #9db5b6;color:#457a7c;display:{expression/expr16};font-size:11px;margin-top:8px;padding:4px 8px;text-decoration:none;" href="{expression/expr9}" target="_blank"><strong>📊 View Dataset&nbsp;</strong></a>
            </p>
        </div>
    </div>
    <div style="background-color:#f9fbe0;border-radius:10px;border:1px solid #c3d600;margin-bottom:16px;padding:14px;">
        <div style="border-bottom:1px solid #d5e34d;color:#4a5700;font-size:11px;letter-spacing:0.4px;margin-bottom:10px;padding-bottom:6px;text-transform:uppercase;">
            <strong>Property Transfers</strong>
        </div>
        <div style="display:grid;gap:16px;grid-template-columns:repeat(2, minmax(0,1fr));">
            <div>
                <div style="color:#2d3600;font-size:12px;margin-bottom:4px;">
                    <strong>Since 2019</strong>
                </div>
                <div style="color:#3d4a00;font-size:12px;line-height:1.5;">
                    {expression/expr2}
                </div>
            </div>
            <div>
                <div style="color:#2d3600;font-size:12px;margin-bottom:4px;">
                    <strong>Since Annual Grand List</strong>
                </div>
                <div style="color:#3d4a00;font-size:12px;line-height:1.5;">
                    {expression/expr3}
                </div>
            </div>
        </div>
    </div>
    <div style="border-top:1px solid #e2e8f0;display:grid;gap:12px;grid-template-columns:repeat(2, minmax(0,1fr));margin-bottom:16px;padding-top:14px;">
        <div style="color:#475569;font-size:12px;line-height:1.6;">
            <div>
                <span style="color:#94a3b8;">Grand List Year:</span> <strong>{GLYEAR}</strong>
            </div>
            <div>
                <span style="color:#94a3b8;">GIS Year:</span> <strong>{YEAR}</strong>
            </div>
            <div>
                <span style="color:#94a3b8;">GIS Source:</span> <strong>{expression/expr12}</strong>
            </div>
        </div>
        <div style="color:#475569;font-size:12px;line-height:1.6;">
            <div>
                <span style="color:#94a3b8;">Last GIS Edit:</span> <strong>{EDITDATE}</strong>
            </div>
            <div>
                <span style="color:#94a3b8;">GIS Editor:</span> <strong>{EDITOR}</strong>
            </div>
            <div>
                <span style="color:#94a3b8;">GIS Notes:</span> <strong>{EDITNOTE}</strong>
            </div>
        </div>
    </div>
    <div style="background-color:#f1f5f9;border-radius:8px;color:#475569;display:flex;flex-wrap:wrap;font-size:12px;gap:16px;padding:10px 14px;">
        <div>
            <span style="color:#64748b;font-size:10px;"><span style="letter-spacing:0.4px;text-transform:uppercase;">Parcel ID</span></span><br>
            <strong>{expression/expr13}</strong>
        </div>
        <div>
            <span style="color:#64748b;font-size:10px;"><span style="letter-spacing:0.4px;text-transform:uppercase;">Map ID</span></span><br>
            <strong>{expression/expr14}</strong>
        </div>
    </div>
    <div style="color:#94a3b8;font-size:10px;line-height:1.5;margin-top:20px;text-align:center;">
        <strong>Disclaimer:</strong> This map is for general reference only. Parcel data are general in nature and do not represent survey-grade boundary information. Substantial inaccuracies in boundary lines or Grand List attributes should be brought to the attention of the appropriate municipal clerk. Vermont municipalities are the ultimate source of information presented here.
    </div>
</div>
```

## Arcade Attribute Expressions - Parcels - Active Layer (v.4.0.3)

### {expression/expr0}

Ownership (Annual Grand List)
{expression/expr0}

This script combines several fields to create a single ownership return.

```javascript
Concatenate([$feature.OWNER1,$feature.OWNER2], ', ') +TextFormatting.NewLine
+$feature.ADDRGL1 +TextFormatting.NewLine 
+Concatenate([$feature.CITYGL,$feature.STGL,$feature.ZIPGL], ', ')
```

### {expression/expr1} IN USE

Resident Ownership Code (Keyed)
{expression/expr1}

This script decodes the RESCODE field for display.

```javascript
If($feature.RESCODE == 'T') { 
   return 'T (Grand List owner is a Town Resident)'
} 
else if($feature.RESCODE == 'S') {
    return 'S (Grand List owner lives in state, but not in town)'
} 
else if($feature.RESCODE == 'NS') {
    return 'NS (Non-state; Grand List owner resides out of state)'
} 
else if($feature.RESCODE == 'C') {
    return 'C (Grand List owner is a Corporation)'
}

```

### {expression/expr2} IN USE

Property Transfers since 2019
{expression/expr2}

```javascript
// Get the clicked parcel feature
var parcelFeature = $feature;

//Reference PTTR layer
var transferLayer = FeatureSetByName($map, "Vermont Property Transfers");


var pttrStart = Date(2018, 12, 31);

//Check for parcel PROPTYPE only (no ROWs, water, etc.)
if (parcelFeature.PROPTYPE == "PARCEL") {
  //Look for PTTR points that intersect parcel features
  var transferFeatures = Intersects(transferLayer, parcelFeature); 

  //If a PTTR point intersects a parcel
  if (Count(transferFeatures) > 0) {
    //Checks below for multi=SPAN parcel by looking for unqiue SPANs
    var uniqueSpan = true;
    var firstSpan = null;
    var allRecords = "";
    for (var transfer in transferFeatures) {

      if (transfer.postedDate>pttrStart){
        if (firstSpan == null) {
          firstSpan = transfer.SPAN;
        } else if (firstSpan != transfer.SPAN) {

          uniqueSPAN = false;
        }
        
        allRecords += "Closing Date: " + Text(transfer.closeDate, 'YYYY-MM-DD') + "\n";
        allRecords += "Seller: " + transfer.sellEntNam +" "+transfer.sellFstNam+" "+transfer.sellLstNam+ "\n";
        allRecords += "Buyer: " + transfer.buyEntNam +" "+transfer.buyFstNam+" "+transfer.buyLstNam+ "\n\n";
      }
    }
    if (!uniqueSpan) {
      return "NOTE: This is a multi-SPAN parcel. Multiple properties, owners, and transfers may exist within this parcel.\n\n "+allRecords;
    } else if (allRecords != ""){
      return allRecords;
    }
  } else {
  //No record of transfer between 2019-present
    return "There is no record of a property transfer for this parcel between 2019 and present."; 
  }
} else {
//Note for non-parcel features
return "This feature is categorized as "+parcelFeature.PROPTYPE+". Transfer data not applicable."; 
}
```

### {expression/expr3} IN USE

Property Transfers since Annual Grand List
{expression/expr3}

```javascript
// Get the clicked parcel feature
var parcelFeature = $feature;

//References PTTR point layer within the map
var transferLayer = FeatureSetByName($map, "Vermont Property Transfers");

// Adjust the date as needed per latest Grand List (*purposefully set to March, seems to exclude April from below if set to 4/1*)
var GLDate = Date(2024, 3, 1);

var GLYear = $feature.GLYEAR

//Isolate only PARCEL features from parcel layer (no ROWs, water, etc.)
if (parcelFeature.PROPTYPE == "PARCEL") {
  //Look for any PTTR points that intersect (lie within) with the parcel
  var transferFeatures = Intersects(transferLayer, parcelFeature);

  //If more than 0 PTTR points are within the parcel
  if (Count(transferFeatures) > 0) {
    //Checks below for multi-SPAN parcels by looking for unique SPANs
    var uniqueSpan = true;
    var firstSpan = null;
    var recordsAfterDate = "";
    for (var transfer in transferFeatures) {
      //If the closing date is after the current GL (i.e., has been transferred since annual GL was published)
      if (transfer.closeDate > GLDate) {
        if (firstSPAN == null) {
          firstSpan = transfer.SPAN;
        } else if (firstSpan != transfer.SPAN) {
          //Flag to indicate there are multiple PTTR SPANs within a single parcel (indicates multi-SPAN)
          uniqueSpan = false;
        }
        //Report on survey info for popup
        recordsAfterDate += "Closing Date: " + Text(transfer.closeDate, 'YYYY-MM-DD') + "\n"; 
        recordsAfterDate += "Seller: " + transfer.sellEntNam +" "+transfer.sellFstNam+" "+transfer.sellLstNam+ "\n";
        recordsAfterDate += "Buyer: " + transfer.buyEntNam +" "+transfer.buyFstNam+" "+transfer.buyLstNam+ "\n\n";
      }
    }

    //If there are multiple PTTR SPANs within a single parcel (i.e., it is multi-SPAN)
    if (!uniqueSPAN) {
      return "NOTE: This is a multi-SPAN parcel. Multiple properties, owners, and transfers may exist within this parcel.\n\n" + recordsAfterDate;
      //If there is only one SPAN for the parcel, find all those between the current Grand List and present
    } else if (recordsAfterDate != "") {
      return recordsAfterDate;
      //No transfers between current GL and present
    } else {
      //UPDATE YEAR following annual GL join
      return "There is no record of a property transfer for this parcel since the current statewide Grand List ("+GLYear+").";
    }
  } else {
    //No transfer of this parcel at all (since 2019)
    return "There is no record of a property transfer for this parcel since the current statewide Grand List ("+GLYear+").";
  }
} else {
  //Parcel is not a PROPTYPE = PARCEL feature
  return "This feature is categorized as "+parcelFeature.PROPTYPE+". Transfer data not applicable.";
}
```

### {expression/expr4} IN USE

Survey Information (if available)
{expression/expr4}

```javascript
// Get the clicked parcel feature
var parcelFeature = $feature;

//Reference survey layer
var surveysLayer = FeatureSetByName($map, "Surveys - Vermont Land Survey Library"); 

// Intersect the parcel with the polygons of the surveys layer
var surveysIntersect = Intersects(parcelFeature, surveysLayer);

//Count number of attachments for a survey record
var cnt = 0 
for (var att in surveysIntersect) {
  cnt += Count(Attachments(att)) 
}

if (Count(surveysIntersect) > 0) {
  var surveyInfo = "";
  for (var survey in surveysIntersect) {
    // Check if the centroid of the survey polygon falls within the clicked parcel
    var surveyCentroid = Centroid(Geometry(survey));
    if (Contains(parcelFeature, surveyCentroid)) { //Report on survey info
      surveyInfo += "Survey Type: " + survey.survey_type + "\n";
      surveyInfo += "Survey Date: " + Text(survey.survey_date, 'YYYY-MM-DD') + "\n";
      surveyInfo += "Surveyor: " + Text(survey.surveyor_name) + "\n\n";
    }
  }
  if (surveyInfo != "") {
      //If there is more than one attachment for a survey:
      if (cnt >1){
      var surveysInfo2 = surveyInfo + "See link below. Toggle on the Surveys layer to access links to additional survey(s)."
      return surveysInfo2
    }
    else {
      return surveyInfo + "See link below. Toggle on the Surveys layer to verify whether additional surveys are available.";
    }
  } else {
    return "Unable to find survey(s) associated with this parcel. Toggle on the Surveys layer to verify whether any surveys are available.";
  }
} else {
  return "Unable to find survey(s) associated with this parcel. Toggle on the Surveys layer to verify whether any surveys are available.";
}
```

### {expression/expr5} IN USE

Link to Survey (if available)
{expression/expr5}

```javascript
var parcelFeature = $feature;
var attachmentLayer = FeatureSetByName($map, "Surveys - Vermont Land Survey Library");
var intersectingAtts = Intersects(attachmentLayer, parcelFeature);

if (Count(intersectingAtts) > 0) {
  for (var survey in intersectingAtts) {
    var surveyCentroid = Centroid(Geometry(survey));
    if (Contains(parcelFeature, surveyCentroid)) {
        var ObjectID = survey.OBJECTID; 
        var AttachID = First(Attachments(survey)).ID; 
        var Part1 = "https://services1.arcgis.com/BkFxaEFNwHqX3tAw/arcgis/rest/services/FS_VCGI_Land_Survey_Library_reviewed_v2_1/FeatureServer/0/";
        var Part2 = "/attachments/";
        return Part1 + ObjectID + Part2 + AttachID;
     }
  }
}
return "";
```

### {expression/expr6} IN USE

Total Acreage
{expression/expr6}

### {expression/expr7}

Parcel Summary
{expression/expr7}

### {expression/expr8} IN USE

Current Use
{expression/expr8}

### {expression/expr9}

Link to Current Use Dataset
{expression/expr9}

### {expression/expr10}

Parcel Summary with PTTRs and Current Use
{expression/expr10}

### {expression/expr11} IN USE

Homestead Status & Value
{expression/expr11}

### {expression/expr12} IN USE

GIS Source Intersector
{expression/expr12}

### {expression/expr13} IN USE

Parcel ID Null Handler
{expression/expr13}

### {expression/expr14} IN USE

Map ID Null Handler
{expression/expr14}

### {expression/expr15}

Survey Visibility Toggle
{expression/expr15}

### {expression/expr16}

Current Use Visibility Toggle
{expression/expr16}

### {expression/expr17} IN USE

GIS Acres
{expression/expr17}

### {expression/expr18} IN USE

Acreage Percent Difference
{expression/expr18}

### {expression/expr19} IN USE

Category Lookup
{expression/expr19}

### {expression/expr20} IN USE

Unmatched Parcel Warning Toggle
{expression/expr20}

### {expression/expr21} IN USE

Recent Transfer Summary
{expression/expr21}

### {expression/expr22}

Current Use Summary
{expression/expr22}

### {expression/expr23} IN USE

Recent Transfer Display Toggle
{expression/expr23}
