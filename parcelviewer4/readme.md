# Vermont Parcel Viewer Popup Configuration

## HTML Popup - Parcels - Active Layer (v.4.1)
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

## Arcade Attribute Expressions - Parcels - Active Layer (v.4.1)

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

```javascript
// Just formats the existing GL Acres
return Text($feature.ACRESGL, '#.00');

//prior to version 4.03 below
//var GLACRES = $feature.ACRESGL;
//var GLACRESdec = Text($feature.ACRESGL, '#.00');
//var GISACRES = AreaGeodetic($feature,'acres');
//var AC_Diff_PCT = ((Abs(GLACRES-GISACRES))/((GLACRES+GISACRES)/2))*100;
//Round(AC_Diff_PCT,2)
//
//return ('Annual Grand List Acres: '+GLACRESdec+TextFormatting.NewLine+'GIS Acres: '+Round(GISACRES,2)+TextFormatting.NewLine+Round(AC_Diff_PCT,1)+'% Difference');
```

### {expression/expr7} (Not in Use; Was in 4.0.2 and below)

Parcel Summary
{expression/expr7}

```javascript
var parcelFeature = $feature;

//References PTTR point layer within the map
var transferLayer = FeatureSetByName($map, "Vermont Property Transfers");

var propSt = $feature.E911ADDR
var propCity = $feature.TOWN
var GLowner1 = $feature.OWNER1
var GLowner2 = $feature.OWNER2
var GLyear = $feature.GLYEAR
var RealListVal = $feature.REAL_FLV
var GISYear = $feature.YEAR

//Annual Grand List date; ***update year with new GLs as available*** (*purposefully set to March, seems to exclude April from below if set to 4/1*)
var GLDate = Date(2024, 3, 1)

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
        if (IsEmpty(GLowner2)) {
        recordsAfterDate = "The property at "+propSt+" in "+propCity+" is owned by "+GLowner1+". A property transfer has occured for this parcel since the current statewide Grand List ("+GLYEAR+") and ownership may have changed. See property transfer details below. Parcel geometry was last updated in "+GISYear+"."
        } else {
        recordsAfterDate = "The property at "+propSt+" in "+propCity+" is owned by "+GLowner1+" and "+GLowner2+". A property transfer has occured for this parcel since the current statewide Grand List ("+GLYEAR+") and ownership may have changed. See property transfer details below. Parcel geometry was last updated in "+GISYear+"."
        }
      }
    }

    //If there are multiple PTTR SPANs within a single parcel (i.e., it is multi-SPAN)
    if (!uniqueSPAN) {
      if (IsEmpty(GLowner2)) {
      var result = "The property at "+propSt+" in "+propCity+" is owned by "+GLowner1+". This is a multi-SPAN parcel. Multiple properties, owners, and transfers may exist within this parcel. Parcel geometry was last updated in "+GISYear+"."
      } else {
      var result = "The property at "+propSt+" in "+propCity+" is owned by "+GLowner1+" and "+GLowner2+". This is a multi-SPAN parcel. Multiple properties, owners, and transfers may exist within this parcel. Parcel geometry was last updated in "+GISYear+"."
      }  
    
      //var result = "The property at "+propSt+" in "+propCity+" is owned by "+GLowner1+". This is a multi-SPAN parcel. Multiple properties, owners, and transfers may exist within this parcel. Parcel geometry was last updated in "+GISYear+".";
      //If there is only one SPAN for the parcel, find all those between the current Grand List and present
    } else if (recordsAfterDate != "") {
      var result = recordsAfterDate;
      //No transfers between current GL and present
    } else {
      if (IsEmpty(GLowner2)) {
      var result = "The property at "+propSt+" in "+propCity+" is owned by "+GLowner1+". There is no record of a property transfer for this parcel since the current statewide Grand List ("+GLYEAR+"). Parcel geometry was last updated in "+GISYear+"."
      } else {
      var result = "The property at "+propSt+" in "+propCity+" is owned by "+GLowner1+" and "+GLowner2+". There is no record of a property transfer for this parcel since the current statewide Grand List ("+GLYEAR+"). Parcel geometry was last updated in "+GISYear+"."
      }  
    }

  } else {
    //No transfer of this parcel at all (since 2019)
          if (IsEmpty(GLowner2)) {
          var result = "The property at "+propSt+" in "+propCity+" is owned by "+GLowner1+". There is no record of a property transfer for this parcel since the current statewide Grand List ("+GLYEAR+"). Parcel geometry was last updated in "+GISYear+"."
          } else {
          var result = "The property at "+propSt+" in "+propCity+" is owned by "+GLowner1+" and "+GLowner2+". There is no record of a property transfer for this parcel since the current statewide Grand List ("+GLYEAR+"). Parcel geometry was last updated in "+GISYear+"."
        }
  }
} else {
  //Parcel is not a PROPTYPE = PARCEL feature
  var result = "This feature is categorized as "+parcelFeature.PROPTYPE+". Feature geometry was last updated in "+GISYear+".";
}

return result
```

### {expression/expr8} IN USE

Current Use
{expression/expr8}

```javascript
// 1. Added 'TAX_YEAR', 'TOT_AG_ACR', and 'TOT_FOR_AC' to the request
var cuTable = FeatureSetByName($map, "VT Data - Current Use Program Properties", ['SPAN', 'ENROLL_YR', 'TOT_ENR_AC', 'TOT_ACRES', 'TAX_YEAR', 'TOT_AG_ACR', 'TOT_FOR_AC']);

// 2. Filter the table to find a matching SPAN
var parcelSpan = $feature.SPAN;
var filterExpr = "SPAN = '" + parcelSpan + "'";
var match = First(Filter(cuTable, filterExpr));

// 3. Logic if a match is found
if (!IsEmpty(match)) {
    var enrolledAcres = match.TOT_ENR_AC;
    var totalAcres = match.TOT_ACRES;
    var agAcres = match.TOT_AG_ACR;
    var forAcres = match.TOT_FOR_AC;
    
    // Check if Enrollment Year is null
    var enrollYrDisplay = match.ENROLL_YR;
    if (IsEmpty(enrollYrDisplay)) {
        enrollYrDisplay = "Not available";
    }
    
    // Determine Land Type (Ag, Forest, or Both)
    var landType = "None Listed";
    if (agAcres > 0 && forAcres > 0) {
        landType = "Agriculture and Forest";
    } else if (agAcres > 0) {
        landType = "Agriculture";
    } else if (forAcres > 0) {
        landType = "Forest";
    }

    // Calculate percentage safety check
    var percentText = "Calculation unavailable";
    if (totalAcres > 0 && !IsEmpty(totalAcres)) {
        var pct = (enrolledAcres / totalAcres) * 100;
        percentText = Round(pct, 2) + "%";
    }

    // 4. Construct return string with land type and hyperlink
    return "Status: Enrolled (" + match.TAX_YEAR + ")" + TextFormatting.NewLine +
           "Land Type: " + landType + TextFormatting.NewLine +
           "Enrollment Year: " + enrollYrDisplay + TextFormatting.NewLine + 
           "Enrolled Acres: " + enrolledAcres + TextFormatting.NewLine +
           "Total Property Acres: " + totalAcres + TextFormatting.NewLine +
           "Percent Enrolled: " + percentText + TextFormatting.NewLine ;
} else {
    return "Status: Not Enrolled";
}
```

### {expression/expr9} IN USE

Link to Current Use Dataset
{expression/expr9}

```javascript
var cuTable = FeatureSetByName($map, "VT Data - Current Use Program Properties", ['SPAN']);
var parcelSpan = $feature.SPAN;
var match = First(Filter(cuTable, "SPAN = '" + parcelSpan + "'"));

if (!IsEmpty(match)) {
    return "https://geodata.vermont.gov/datasets/bc419e4f43504a398e13ec3586c0a7de_0/explore";
} else {
    return "";
}
```

### {expression/expr10} Not in Use (For development)

Parcel Summary with PTTRs and Current Use
{expression/expr10}

```javascript
var parcelFeature = $feature;

//References PTTR point layer within the map
var transferLayer = FeatureSetByName($map, "Vermont Property Transfers");

//References Current Use table within the map - including tax year and agriculture and forest acreage fields
var cuTable = FeatureSetByName($map, "VT Data - Current Use Program Properties", ["SPAN", "TAX_YEAR", "TOT_AG_ACR", "TOT_FOR_AC"], false);

// Fetch the tax year from the dataset regardless of the specific parcel match
var cuGlobal = First(cuTable);
var cuDatasetYear = DefaultValue(cuGlobal.TAX_YEAR, "Unknown Year"); //if year is not found

// Safe Variable Definitions (DefaultValue prevents the script from returning null if data is missing)
var propSt = DefaultValue($feature.E911ADDR, "");
var propCity = DefaultValue($feature.TOWN, "");
var GLowner1 = DefaultValue($feature.OWNER1, "");
var GLowner2 = DefaultValue($feature.OWNER2, "");
var GLyear = DefaultValue($feature.GLYEAR, "");
var GISYear = DefaultValue($feature.YEAR, "");

//Annual Grand List date; ***update year with new GLs as available*** (*purposefully set to March, seems to exclude April from below if set to 4/1*)
var GLDate = Date(2024, 3, 1)

// --- 1. OWNERSHIP & GIS SECTION ---
var ownerTxt = "";
if (IsEmpty(GLowner2)) {
    ownerTxt = GLowner1;
} else {
    ownerTxt = GLowner1 + " and " + GLowner2;
}

var result = "The property at " + propSt + " in " + propCity + " is owned by " + ownerTxt + ". Parcel geometry was last updated in " + GISYear + ".";

// --- 2. PROPERTY TRANSFER SECTION ---
var transferNote = "";

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
        if (firstSpan == null) {
          firstSpan = transfer.SPAN;
        } else if (firstSpan != transfer.SPAN) {
          //Flag to indicate there are multiple PTTR SPANs within a single parcel (indicates multi-SPAN)
          uniqueSpan = false;
        }
        
        recordsAfterDate = "A property transfer has occured for this parcel since the current statewide Grand List (" + GLyear + ") and ownership may have changed. See property transfer details below.";
      }
    }

    //If there are multiple PTTR SPANs within a single parcel (i.e., it is multi-SPAN)
    if (!uniqueSpan) {
      transferNote = "This is a multi-SPAN parcel. Multiple properties, owners, and transfers may exist within this parcel.";
    } else if (recordsAfterDate != "") {
      transferNote = recordsAfterDate;
    } else {
      transferNote = "There is no record of a property transfer for this parcel since the current statewide Grand List (" + GLyear + ").";
    }

  } else {
    //No transfer of this parcel at all (since 2019)
    transferNote = "There is no record of a property transfer for this parcel since the current statewide Grand List (" + GLyear + ").";
  }
} else {
  //Parcel is not a PROPTYPE = PARCEL feature
  transferNote = "This feature is categorized as " + DefaultValue(parcelFeature.PROPTYPE, "Unknown") + ".";
}

// Add Transfer note with a carriage return
result += TextFormatting.NewLine + TextFormatting.NewLine + transferNote;

// --- 3. CURRENT USE SECTION ---
// Using Grand List SPAN from the parcel feature to match against SPAN in the table
var currentSpan = $feature.GLIST_SPAN;

var cuNote = "";
// Only attempt filter if currentSpan is not null to avoid errors
if (!IsEmpty(currentSpan)) {
    var cuMatch = Filter(cuTable, "SPAN = @currentSpan");

    if (Count(cuMatch) > 0) {
        var cuRecord = First(cuMatch);
        var taxYr = cuRecord.TAX_YEAR;
        var agAcres = cuRecord.TOT_AG_ACR;
        var forAcres = cuRecord.TOT_FOR_AC;
        
        // Determine Land Type logic
        var landType = "enrolled"; 
        if (agAcres > 0 && forAcres > 0) {
            landType = "enrolled for Agriculture and Forest";
        } else if (agAcres > 0) {
            landType = "enrolled for Agriculture";
        } else if (forAcres > 0) {
            landType = "enrolled for Forest";
        }

        cuNote = "As of " + taxYr + " this parcel is " + landType + " in the Current Use program. See additional details below.";
    } else {
        // Append the sentence for NOT ENROLLED properties using the TAX_YEAR from the Current Use dataset
        cuNote = "As of " + cuDatasetYear + " this parcel is not enrolled in the Current Use program.";
    }
} else {
    // Handling cases where GLIST_SPAN is missing from the parcel record
    cuNote = "As of " + cuDatasetYear + " this parcel is not enrolled in the Current Use program.";
}

// Add Current Use note with a carriage return
result += TextFormatting.NewLine + TextFormatting.NewLine + cuNote;

return result;
```

### {expression/expr11} IN USE

Homestead Status & Value
{expression/expr11}

```javascript
// Checks HSDECL. If Y, adds the value with formatting.
var isDecl = DefaultValue($feature.HSDECL, "N");
var val = DefaultValue($feature.HSTED_FLV, 0);

if (isDecl == 'Y' || isDecl == 'Yes') {
    // Format the number to currency
    var formattedVal = Text(val, '$#,###');
    return "Declared: Yes" + TextFormatting.NewLine + "Value: " + formattedVal;
} else {
    return "Declared: No";
}
```

### {expression/expr12} IN USE

GIS Source Intersector
{expression/expr12}

```javascript
var parcel = $feature;
// Reference the Town Parcel Data Status layer (fetching only necessary fields)
var statusLayer = FeatureSetByName($map, "Town Parcel Data Status", ["CurrentMapCapacity", "SubmittingEntity"], false);

var intersectStatus = Intersects(statusLayer, parcel);
var firstStatus = First(intersectStatus);

// If there's an intersecting polygon, concatenate the capacity and entity
if (!IsEmpty(firstStatus)) {
    var cap = DefaultValue(firstStatus.CurrentMapCapacity, "Unknown Capacity");
    var entity = DefaultValue(firstStatus.SubmittingEntity, "Unknown Entity");
    return cap + " (" + entity + ")";
} else {
    return "No Status Data Found";
}
```

### {expression/expr13} IN USE

Parcel ID Null Handler
{expression/expr13}

```javascript
var pid = $feature.PARCID;
if (IsEmpty(pid) || Trim(pid) == "") { 
    return "Not Specified"; 
} else { 
    return pid; 
}
```

### {expression/expr14} IN USE

Map ID Null Handler
{expression/expr14}

```javascript
var mid = $feature.MAPID;
if (IsEmpty(mid) || Trim(mid) == "") { 
    return "Not Specified"; 
} else { 
    return mid; 
}
```

### {expression/expr15} IN USE

Survey Visibility Toggle
{expression/expr15}

```javascript
var parcelFeature = $feature;
var attachmentLayer = FeatureSetByName($map, "Surveys - Vermont Land Survey Library");
var intersectingAtts = Intersects(attachmentLayer, parcelFeature);

if (Count(intersectingAtts) > 0) {
  for (var survey in intersectingAtts) {
    var surveyCentroid = Centroid(Geometry(survey));
    if (Contains(parcelFeature, surveyCentroid)) {
        return "inline-block"; // Shows the button
     }
  }
}
return "none"; // Hides the button
```

### {expression/expr16} Not in use

Current Use Visibility Toggle
{expression/expr16}

```javascript
var cuTable = FeatureSetByName($map, "VT Data - Current Use Program Properties", ['SPAN']);
var parcelSpan = $feature.SPAN;
var match = First(Filter(cuTable, "SPAN = '" + parcelSpan + "'"));

if (!IsEmpty(match)) {
    return "inline-block"; // Shows the button
} else {
    return "none"; // Hides the button
}
```

### {expression/expr17} IN USE

GIS Acres
{expression/expr17}

```javascript
// Calculates and returns just the GIS acres
var GISACRES = AreaGeodetic($feature, 'acres');
return Round(GISACRES, 2);
```

### {expression/expr18} IN USE

Acreage Percent Difference
{expression/expr18}

```javascript
// Calculates and returns just the percent difference
var GLACRES = $feature.ACRESGL;
var GISACRES = AreaGeodetic($feature, 'acres');

if (GLACRES == 0 && GISACRES == 0) { return "0%"; } // Safety check

var AC_Diff_PCT = ((Abs(GLACRES - GISACRES)) / ((GLACRES + GISACRES) / 2)) * 100;
return Round(AC_Diff_PCT, 1) + '%';
```

### {expression/expr19} IN USE

Category Lookup
{expression/expr19}

```javascript
var cat = Trim(Text($feature.CAT));

if (IsEmpty(cat) || cat == "") {
    return "Not specified";
}

// Convert to uppercase to ensure an exact match with the dictionary
cat = Upper(cat);

var catDict = {
    "R1": "Residential <6 Acres (R1)",
    "R2": "Residential >6 Acres (R2)",
    "MHU": "Mobile Home Unlanded (MHU)",
    "MHL": "Mobile Home Landed (MHL)",
    "S1": "Seasonal <6 Acres (S1)",
    "S2": "Seasonal >6 Acres (S2)",
    "COMM": "Commercial (COMM)",
    "CMA": "Commercial Apartment (CMA)",
    "IND": "Industrial (IND)",
    "UE": "Utilities Electric (UE)",
    "UO": "Utilities Other (UO)",
    "FRM": "Farm (FRM)",
    "OTH": "Other (OTH)",
    "WOOD": "Woodland (WOOD)",
    "MISC": "Miscellaneous (MISC)"
};

// Return the matched description, or the original code if it's an unexpected value
if (HasKey(catDict, cat)) {
    return catDict[cat];
} else {
    return cat; 
}
```

### {expression/expr20} IN USE

Unmatched Parcel Warning Toggle
{expression/expr20}

```javascript
var pType = $feature.PROPTYPE;
var mStat = $feature.MATCHSTAT;

// Check if both conditions are met
if (pType == "PARCEL" && mStat == "UNMATCHED") {
    return "flex"; // Shows the banner
} else {
    return "none"; // Hides the banner
}
```

### {expression/expr21} IN USE

Recent Transfer Summary
{expression/expr21}

```javascript
var parcelFeature = $feature;
var transferLayer = FeatureSetByName($map, "Vermont Property Transfers");
var GLDate = Date(2024, 3, 1);
var GLYear = DefaultValue($feature.GLYEAR, "");

if (parcelFeature.PROPTYPE != "PARCEL") {
    return "";
}

var transferFeatures = Intersects(transferLayer, parcelFeature);

if (Count(transferFeatures) > 0) {
    for (var transfer in transferFeatures) {
        if (transfer.closeDate > GLDate) {
            return "A property transfer has occurred since the " + GLYear + " Grand List. Ownership and valuation data below may be outdated.";
        }
    }
}

return "";
```

### {expression/expr22} Not in use (for development)

Current Use Summary
{expression/expr22}

```javascript
var cuTable = FeatureSetByName($map, "VT Data - Current Use Program Properties", ['SPAN', 'TAX_YEAR', 'TOT_AG_ACR', 'TOT_FOR_AC']);
var parcelSpan = $feature.SPAN;
var match = First(Filter(cuTable, "SPAN = '" + parcelSpan + "'"));

if (!IsEmpty(match)) {
    var agAcres = match.TOT_AG_ACR;
    var forAcres = match.TOT_FOR_AC;
    var taxYr = match.TAX_YEAR;
    
    var landType = "enrolled"; 
    if (agAcres > 0 && forAcres > 0) {
        landType = "Agriculture and Forest";
    } else if (agAcres > 0) {
        landType = "Agriculture";
    } else if (forAcres > 0) {
        landType = "Forest";
    }

    return "🌳 Enrolled in the Current Use program (" + taxYr + ") for " + landType + ".";
} else {
    return "This parcel is not currently enrolled in the Current Use program.";
}
```

### {expression/expr23} IN USE

Recent Transfer Display Toggle
{expression/expr23}

```javascript
var parcelFeature = $feature;
var transferLayer = FeatureSetByName($map, "Vermont Property Transfers");
var GLDate = Date(2024, 3, 1);

if (parcelFeature.PROPTYPE != "PARCEL") {
    return "none";
}

var transferFeatures = Intersects(transferLayer, parcelFeature);

if (Count(transferFeatures) > 0) {
    for (var transfer in transferFeatures) {
        if (transfer.closeDate > GLDate) {
            return "block"; // Shows the alert box
        }
    }
}

return "none"; // Hides the alert box
```

## 4.0.2 Popup - Town Parcel Data Status

Parcel Status of {TOWN}
| Current Map Capacity       | Contract GIS Vendor                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Current Vendor             | CAI                                                                                                                  |
| Download Link              | [View](https://maps.vcgi.vermont.gov/gisdata/vcgi/packaged_zips/CadastralParcels_VTPARCELS/VTPARCELS_Montpelier.zip) |
| GIS Geometry Date          | 12/2/2025                                                                                                            |
| RPC                        | Central Vermont Regional Planning Commission                                                                         |
| Submission ID              | Montpelier 2025-09-09T22:13:02.000Z                                                                                  |
| Submittal Grand List Year  | 2025                                                                                                                 |
| Submittal Reviewed By Town | No                                                                                                                   |
| Submitter                  | Don Butson                                                                                                           |
| Submitting Entity          | CAI                                                                                                                  |
| Status Updated             | 19-Mar-26                                                                                                            |
| Note                       |                                                                                                                      |

## HTML Popup - Town Parcel Data Status (v.4.1)

## Arcade Attribute Expressions - Town Parcel Data Status (v.4.1)

## 4.0.2 Popup - Surveys - Vermont Land Survey Library

{Name of Survey}

| Name of Surveyor      | Mark Day                |
| --------------------- | ----------------------- |
| Date of Survey        | 1/8/2024                |
| Name of Uploader      | up loaded by surveyor   |
| Uploader Email        | mark@dlsvt.com          |
| Survey Type           | General Property Survey |
| Town                  | Milton                  |
| Notes                 |                         |
| Recording Information | unknown                 |

## HTML Popup - Surveys - Vermont Land Survey Library (v.4.1)

## Arcade Attribute Expressions - Vermont Land Survey Library (v.4.1)

## 4.0.2 Popup - Parcels - Inactives

INACTIVE PARCEL

| STATUS     | INACTIVE |
| ---------- | -------- |
| PARENTSPAN |          |
| SPAN       |          |
| TOWN       | MILTON   |

## HTML Popup - Parcels - Inactives (v.4.1)

## Arcade Attribute Expressions - Parcels - Inactives (v.4.1)

## HTML Popup - Parcels - Current Use (v.4.1)

Version Before Switching to 3 CU Tax Categories
```html
<div style="color:#0f172a;font-family:Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
    <div style="margin-bottom:16px;">
        <div style="color:#64748b;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;">
            <strong>SPAN: {SPAN} &nbsp;|&nbsp; CU Ref #: {CU_REF_NUM}</strong>
        </div>
        <div style="align-items:center;display:flex;gap:8px;margin:6px 0;">
            <span style="background-color:#475569;color:#ffffff;font-size:12px;"><span style="border-radius:999px;padding:4px 10px;text-transform:uppercase;"><strong>{TOWN_NAME}</strong></span></span> <span style="color:#475569;font-size:13px;">| {TAX_YEAR} Current Use Enrollment</span>
        </div>
        <div style="color:#0f172a;font-size:18px;line-height:1.2;margin-top:8px;">
            <strong>{expression/expr0}</strong>
        </div>
        <div style="color:#475569;font-size:13px;margin-top:4px;">
            Year Enrolled: <strong>{expression/expr10}</strong> &nbsp;|&nbsp; Enrolled Acres: <strong>{TOT_ENR_AC}</strong>
        </div>
    </div>
    <div style="display:grid;gap:12px;grid-template-columns:repeat(2, minmax(0,1fr));margin-bottom:16px;">
        <div style="border-radius:10px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Ag Enrollment</strong>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Total Ag Acres: <span style="color:#0f172a;"><strong>{expression/expr8}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Active Acres: <span style="color:#0f172a;"><strong>{ACT_AG_ACR}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;">
                Open/Idle Acres: <span style="color:#0f172a;"><strong>{OPN_IDL_AG}</strong></span>
            </div>
        </div>
        <div style="border-radius:10px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Forest Enrollment</strong>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Total Forest Acres: <span style="color:#0f172a;"><strong>{TOT_FOR_AC}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Productive: <span style="color:#0f172a;"><strong>{expression/expr3}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;">
                Non-Productive: <span style="color:#0f172a;"><strong>{expression/expr4}</strong></span>
            </div>
        </div>
        <div style="border-radius:10px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Buildings Overview</strong>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Total Enrolled Bldgs: <span style="color:#0f172a;"><strong>{ENR_BLDGS}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Enrolled Farm Housing: <span style="color:#0f172a;"><strong>{ENR_FM_HSE}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;">
                Enrolled Barns: <span style="color:#0f172a;"><strong>{ENR_BARNS}</strong></span>
            </div>
        </div>
        <div style="background-color:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Forest Conservation</strong>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Total Conservation: <span style="color:#0f172a;"><strong>{expression/expr2}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;margin-bottom:2px;">
                Less than 1 mile: <span style="color:#0f172a;"><strong>{CONSAC_LTM}</strong></span>
            </div>
            <div style="color:#475569;font-size:12px;">
                Greater than 1 mile: <span style="color:#0f172a;"><strong>{CONSAC_GTM}</strong></span>
            </div>
        </div>
    </div>
    <div style="background-color:#f8fafc;border-radius:10px;border:1px solid #cbd5e1;display:{expression/expr11};margin-bottom:16px;padding:14px;">
        <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:8px;text-transform:uppercase;">
            <strong>Ecological &amp; Wildlife Enrollments</strong>
        </div>
        <div style="display:grid;gap:12px;grid-template-columns:repeat(2, minmax(0,1fr));">
            <div style="color:#475569;display:{expression/expr12};font-size:12px;line-height:1.6;">
                <div style="color:#0f172a;margin-bottom:2px;">
                    <strong>Significant Wildlife</strong>
                </div>
                <div>
                    <span style="color:#64748b;">Total Acres:</span> <strong>{expression/expr13}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">&lt; 1 Mile:</span> <strong>{SGWL_ACLTM}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">&gt; 1 Mile:</span> <strong>{SGWL_ACGTM}</strong>
                </div>
            </div>
            <div style="color:#475569;display:{expression/expr14};font-size:12px;line-height:1.6;">
                <div style="color:#0f172a;margin-bottom:2px;">
                    <strong>Special Places</strong>
                </div>
                <div>
                    <span style="color:#64748b;">Total Acres:</span> <strong>{expression/expr15}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">&lt; 1 Mile:</span> <strong>{SPC_PL_LTM}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">&gt; 1 Mile:</span> <strong>{SPC_PL_GTM}</strong>
                </div>
            </div>
            <div style="color:#475569;display:{expression/expr16};font-size:12px;line-height:1.6;">
                <div style="color:#0f172a;margin-bottom:2px;">
                    <strong>Ecological Treatment (ESTA)</strong>
                </div>
                <div>
                    <span style="color:#64748b;">Total Acres:</span> <strong>{expression/expr17}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">&lt; 1 Mile:</span> <strong>{ESTAAC_LTM}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">&gt; 1 Mile:</span> <strong>{ESTAAC_GTM}</strong>
                </div>
            </div>
            <div style="color:#475569;display:{expression/expr18};font-size:12px;line-height:1.6;">
                <div style="color:#0f172a;margin-bottom:2px;">
                    <strong>Reserve Forest</strong>
                </div>
                <div>
                    <span style="color:#64748b;">Total Acres:</span> <strong>{expression/expr19}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">&lt; 1 Mile:</span> <strong>{RESFOR_LTM}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">&gt; 1 Mile:</span> <strong>{RESFOR_GTM}</strong>
                </div>
            </div>
        </div>
    </div>
    <div style="border-bottom:1px solid #e2e8f0;border-top:1px solid #e2e8f0;display:grid;gap:12px;grid-template-columns:repeat(2, minmax(0,1fr));margin-bottom:16px;padding:14px 0;">
        <div style="color:#475569;font-size:12px;line-height:1.6;">
            <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:4px;text-transform:uppercase;">
                <strong>Valuation Data</strong>
            </div>
            <div>
                <span style="color:#64748b;">Total Listed Value:</span> <span style="color:#0f172a;font-size:13px;"><strong>{expression/expr5}</strong></span>
            </div>
            <div>
                <span style="color:#64748b;">Total Use Value:</span> <span style="color:#0f172a;font-size:13px;"><strong>{expression/expr6}</strong></span>
            </div>
        </div>
        <div style="color:#475569;display:flex;flex-direction:column;font-size:12px;justify-content:center;line-height:1.6;">
            <div style="background-color:#fcfbec;border-radius:8px;border:1px solid #9f912a;padding:10px;text-align:center;">
                <div style="color:#615815;font-size:11px;letter-spacing:0.4px;margin-bottom:2px;text-transform:uppercase;">
                    <strong>Total CU Reduction</strong>
                </div>
                <div style="color:#3d370b;font-size:15px;">
                    <strong>{expression/expr7}</strong>
                </div>
            </div>
        </div>
    </div>
    <div style="background-color:#f8fafc;border-radius:10px;border:1px solid #cbd5e1;margin-bottom:16px;padding:14px;">
        <div style="color:#64748b;font-size:11px;letter-spacing:0.4px;margin-bottom:8px;text-transform:uppercase;">
            <strong>Acreage Summary</strong>
        </div>
        <div style="display:grid;gap:12px;grid-template-columns:repeat(2, minmax(0,1fr));">
            <div style="color:#475569;font-size:12px;line-height:1.6;">
                <div>
                    <span style="color:#64748b;">Parcel Total Acres (GL):</span> <strong>{TOT_ACRES}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">Excluded Acres:</span> <strong>{expression/expr9}</strong>
                </div>
            </div>
            <div style="color:#475569;font-size:12px;line-height:1.6;">
                <div>
                    <span style="color:#64748b;">Enrolled Acres:</span> <strong>{TOT_ENR_AC}</strong>
                </div>
                <div>
                    <span style="color:#64748b;">Percent Enrolled:</span> <span style="color:#615815;"><strong>{expression/expr1}</strong></span>
                </div>
            </div>
        </div>
    </div>
    <div style="color:#94a3b8;font-size:10px;line-height:1.5;margin-top:20px;text-align:center;">
        <strong>Disclaimer:</strong> This map is for general reference only. Parcel data are general in nature and do not represent survey-grade boundary information. Substantial inaccuracies in boundary lines or Grand List attributes should be brought to the attention of the appropriate municipal clerk. Vermont municipalities are the ultimate source of information presented here.
    </div>
</div>
```

## Arcade Attribute Expressions - Parcels - Current Use (v.4.1)

### {expression/expr0}

Bins and Displays Land Type Title based on Total Ag and Total Forest Enrolled Acre Values

```javascript
// {expression/expr0} Land Type Title
var ag = DefaultValue($feature.ACT_AG_ACR, 0) + DefaultValue($feature.OPN_IDL_AG, 0);
var fr = DefaultValue($feature.TOT_FOR_AC, 0);

if (ag > 0 && fr > 0) { return "Agriculture & Forest Enrollment"; }
else if (ag > 0) { return "Agriculture Enrollment"; }
else if (fr > 0) { return "Forest Enrollment"; }
else { return "Current Use Enrollment"; }
```

### {expression/expr1}

Displays Percent Enrolled; Calculated in ETL

```javascript
// {expression/expr1} Percent Enrolled
var pct = $feature.PERC_AC_ENROLL_CU;
if (!IsEmpty(pct)) {
    return Round(pct, 1) + "%";
}
// Fallback if the field is empty
var enr = DefaultValue($feature.TOT_ENR_AC, 0);
var tot = DefaultValue($feature.TOT_ACRES, 0);
if (tot > 0) { return Round((enr / tot) * 100, 1) + "%"; }
return "N/A";
```

### {expression/expr2}

Sums Total Conservation Acres

```javascript
// {expression/expr2} Total Conservation Acres
var ltm = DefaultValue($feature.CONSAC_LTM, 0);
var gtm = DefaultValue($feature.CONSAC_GTM, 0);
return Round(ltm + gtm, 2);
```

### {expression/expr3}

Sums Total Productive Forest

```javascript
// {expression/expr3} Total Productive Forest
var ltm = DefaultValue($feature.PRODAC_LTM, 0);
var gtm = DefaultValue($feature.PRODAC_GTM, 0);
return Round(ltm + gtm, 2);
```

### {expression/expr4}

Sums Total Non-Productive Forest

```javascript
// {expression/expr4} Total Non-Productive Forest
var ltm = DefaultValue($feature.NPROD_LTM, 0);
var gtm = DefaultValue($feature.NPROD_GTM, 0);
var np20_ltm = DefaultValue($feature.NP20_ACLTM, 0);
var np20_gtm = DefaultValue($feature.NP20_ACGTM, 0);
return Round(ltm + gtm + np20_ltm + np20_gtm, 2);
```

### {expression/expr5}

Formats total listed value for display

```javascript
// {expression/expr5} Formatted Total Listed Value
var val = DefaultValue($feature.TOT_LST_VL, 0);
return Text(val, '$#,###');
```

### {expression/expr6}

Formats total use value for display

```javascript
//{expression/expr6} Formatted Total Use Value
var val = DefaultValue($feature.TOT_USE_V, 0);
return Text(val, '$#,###');
```

### {expression/expr7}

Formats Total CU reduction for display

```javascript
// {expression/expr7} Formatted Total CU Reduction
var val = DefaultValue($feature.CU_RED_TOT, 0);
return Text(val, '$#,###');
```

### {expression/expr8}

```javascript
// {expression/expr8} Total Agriculture Acres
// can likely also just use TOT_AG_ACR (type: esriFieldTypeSingle, alias: Total Agriculture Acreage (Active & Open)
var act = DefaultValue($feature.ACT_AG_ACR, 0);
var opn = DefaultValue($feature.OPN_IDL_AG, 0);
return Round(act + opn, 2);
```

### {expression/expr9}

Calculates and displays total excluded acres

```javascript
// {expression/expr9} Total Excluded Acres
// could also likely just use TOT_EXC_AC (type: esriFieldTypeSingle, alias: Total Excluded Acreage State
var tot = DefaultValue($feature.TOT_ACRES, 0);
var enr = DefaultValue($feature.TOT_ENR_AC, 0);
var exc = tot - enr;
if (exc < 0) { return 0; }
return Round(exc, 2);
```

### {expression/expr10}

Contingent display of enrollment year

```javascript
// {expression/expr10} Enrollment Year Null Handler
var eYear = $feature.ENROLL_YR;
if (IsEmpty(eYear)) {
    return "Not Specified";
}
return eYear;
```

### {expression/expr11}

Contingent display of "ecological" fields if not 0

```javascript
// {expression/expr11} Master Ecological Box Toggle
var w_ltm = DefaultValue($feature.SGWL_ACLTM, 0);
var w_gtm = DefaultValue($feature.SGWL_ACGTM, 0);
var p_ltm = DefaultValue($feature.SPC_PL_LTM, 0);
var p_gtm = DefaultValue($feature.SPC_PL_GTM, 0);
var e_ltm = DefaultValue($feature.ESTAAC_LTM, 0);
var e_gtm = DefaultValue($feature.ESTAAC_GTM, 0);
var r_ltm = DefaultValue($feature.RESFOR_LTM, 0);
var r_gtm = DefaultValue($feature.RESFOR_GTM, 0);

var total = w_ltm + w_gtm + p_ltm + p_gtm + e_ltm + e_gtm + r_ltm + r_gtm;

if (total > 0) { return "block"; }
return "none";
```

### {expression/expr12}

Contingent display of significant wildlife if not 0

```javascript
// {expression/expr12} Significant Wildlife Toggle
var ltm = DefaultValue($feature.SGWL_ACLTM, 0);
var gtm = DefaultValue($feature.SGWL_ACGTM, 0);
if ((ltm + gtm) > 0) { return "block"; } return "none";
```

### {expression/expr13}

Sums and rounds significant wildlife for display

```javascript
// {expression/expr13} Significant Wildlife Total
var ltm = DefaultValue($feature.SGWL_ACLTM, 0);
var gtm = DefaultValue($feature.SGWL_ACGTM, 0);
return Round(ltm + gtm, 2);
```

### {expression/expr14}

Contingent display of special places / sensitive habitat if not 0

```javascript
// {expression/expr14} Special Places / Sensitive Habitat Toggle
var ltm = DefaultValue($feature.SPC_PL_LTM, 0);
var gtm = DefaultValue($feature.SPC_PL_GTM, 0);
if ((ltm + gtm) > 0) { return "block"; } return "none";
```

### {expression/expr15}

Sums and rounds special places / sensitive habitat total for display

```javascript
// {expression/expr15} Special Places / Sensitive Habitat Total
var ltm = DefaultValue($feature.SPC_PL_LTM, 0);
var gtm = DefaultValue($feature.SPC_PL_GTM, 0);
return Round(ltm + gtm, 2);
```

### {expression/expr16}

Contingent display of ecologically significant treatment if not 0

```javascript
// {expression/expr16} ETSA (Ecologically Significant Treatment) Toggle
var ltm = DefaultValue($feature.ESTAAC_LTM, 0);
var gtm = DefaultValue($feature.ESTAAC_GTM, 0);
if ((ltm + gtm) > 0) { return "block"; } return "none";
```

### {expression/expr17}

Sums and rounds ecological significant treatment for display

```javascript
// {expression/expr17} ETSA (Ecologically Significant Treatment) Total
var ltm = DefaultValue($feature.ESTAAC_LTM, 0);
var gtm = DefaultValue($feature.ESTAAC_GTM, 0);
return Round(ltm + gtm, 2);
```

### {expression/expr18}

Contingent display of reserve forest if not 0

```javascript
// {expression/expr18} Reserve Forest Toggle
var ltm = DefaultValue($feature.RESFOR_LTM, 0);
var gtm = DefaultValue($feature.RESFOR_GTM, 0);
if ((ltm + gtm) > 0) { return "block"; } return "none";
```

### {expression/expr19}

Sums and rounds reserve forest for display

```javascript
// {expression/expr19} Reserve Forest Total
var ltm = DefaultValue($feature.RESFOR_LTM, 0);
var gtm = DefaultValue($feature.RESFOR_GTM, 0);
return Round(ltm + gtm, 2);
```

### {expression/expr5}
### {expression/expr6}
### {expression/expr7}
### {expression/expr8}
### {expression/expr9}
### {expression/expr10}
### {expression/expr11}
### {expression/expr12}
### {expression/expr13}
### {expression/expr14}
### {expression/expr15}
### {expression/expr16}
### {expression/expr17}
### {expression/expr18}
### {expression/expr19}
### {expression/expr20}