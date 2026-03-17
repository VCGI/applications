# Vermont Parcel Viewer Popup Configuration

# Expresssion - Ownership
```javascript
var parcelFeature = $feature;

var ownerTxt = "";
if (IsEmpty(GLowner2)) {
    ownerTxt = GLowner1;
} else {
    ownerTxt = GLowner1 + " and " + GLowner2;
}
```


## Expression - Parcel Summary with PTTRs and Current Use
This is an all-in-one expression to list everything.
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

## HTML Text Container


## HTML Text Container - Protected Lands Viewer Example

```html
<div style="color:#0f172a;font-family:Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
    <div style="align-items:center;display:flex;gap:10px;margin-bottom:10px;">
        <span style="background-color:#e6ebe6;color:#003300;font-size:12px;"><span style="border-radius:999px;letter-spacing:.4px;padding:6px 10px;text-transform:uppercase;"><strong>{expression/expr0} </strong></span></span><span style="font-size:18px;"><span style="line-height:1.2;"><strong>{NAME}</strong></span></span>
    </div>
    <div style="color:#334155;font-size:14px;margin-bottom:14px;">
        <strong>Designation:</strong> <span>{DESIGNAT}</span>
    </div>
    <div style="display:grid;gap:10px;grid-template-columns:repeat(2, minmax(0,1fr));margin-bottom:12px;">
        <div style="border-radius:14px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:.4px;text-transform:uppercase;">
                LISTED ACRES
            </div>
            <div style="font-size:20px;margin-top:2px;">
                <span><strong>{LISTED_AC}</strong></span>
            </div>
            <div style="color:#94a3b8;font-size:11px;margin-top:2px;">
                <span>GIS Acres: {expression/expr3}&nbsp;</span>
            </div>
        </div>
        <div style="border-radius:14px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:.4px;text-transform:uppercase;">
                GAP STATUS
            </div>
            <div style="font-size:20px;margin-top:2px;">
                <span><strong>{expression/expr1}</strong></span>
            </div>
            <div style="color:#94a3b8;font-size:11px;margin-top:2px;">
                <span>{GAPSTATUS}</span>
            </div>
        </div>
        <div style="border-radius:14px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:.4px;text-transform:uppercase;">
                PROTECTING ENTITIES
            </div>
            <div style="font-size:18px;margin-top:2px;">
                <span><strong>{PAGENCY1}</strong></span>
            </div>
            <div style="color:#94a3b8;font-size:11px;margin-top:2px;">
                Other Interests:<br>
                <span>{PAGENCY2}</span><br>
                <span>{PAGENCY3}</span><br>
                <span>{PAGENCY4}</span><br>
                <span>{PAGENCY5}</span>
            </div>
        </div>
        <div style="border-radius:14px;border:1px solid #e2e8f0;padding:12px;">
            <div style="color:#64748b;font-size:11px;letter-spacing:.4px;text-transform:uppercase;">
                PROTECTION
            </div>
            <div style="font-size:16px;margin-top:2px;">
                <span><strong>{PTYPE1}</strong></span>
            </div>
            <div style="color:#94a3b8;font-size:11px;margin-top:2px;">
                Other Protection:<br>
                <span>{PTYPE2}</span><br>
                <span>{PTYPE3}</span><br>
                <span>{PTYPE4}</span><br>
                <span>{PTYPE5}</span><br>
                &nbsp;
            </div>
        </div>
    </div>
    <div style="background-color:#f8fafc;border-radius:12px;border:1px dashed #cbd5e1;margin-bottom:12px;padding:12px;">
        <div style="color:#64748b;font-size:12px;letter-spacing:.4px;margin-bottom:6px;text-transform:uppercase;">
            GIS STEWARD
        </div>
        <div style="font-size:15px;margin-bottom:8px;">
            <span><strong>{GISSTEWARD}</strong></span>
        </div>
        <div style="color:#94a3b8;font-size:11px;margin-top:2px;">
            Source Layer: <span>{SOURCE_LYR}&nbsp;</span><br>
            &nbsp;
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <a style="background-color:#F5F3FF;border-radius:999px;border:1px solid #e2e8f0;color:#5B21B6;font-size:12px;padding:8px 12px;text-decoration:none;" href="" target="_blank"><strong>🗺️ Open in Google Maps&nbsp;</strong></a>
        </div>
    </div>
    <div style="display:grid;gap:10px;grid-template-columns:repeat(2, minmax(0,1fr));">
        <div style="color:#334155;font-size:12px;line-height:1.6;">
            <div>
                <span style="color:#64748b;">Zone Code:</span> <strong>{PROP_ZONE}</strong>
            </div>
            <div>
                <span style="color:#64748b;">Form-Based:</span> <strong>{FORM_BASED}</strong>
            </div>
            <div>
                <span style="color:#64748b;">Act59 Category:</span> <span><strong>{ACT59CAT}</strong></span><strong>&nbsp;</strong>
            </div>
        </div>
        <div style="color:#334155;font-size:12px;line-height:1.6;">
            <div>
                <span style="color:#64748b;">Date Acquired:</span> <span><strong>{expression/expr2}</strong></span>
            </div>
            <div>
                <span style="color:#64748b;">Edit Date:</span> <span><strong>{expression/expr4}</strong></span>
            </div>
            <div>
                <span style="color:#64748b;">Geom Stats:</span> <strong>{expression/expr11}</strong>
            </div>
            <div>
                <span style="color:#64748b;">Notes:</span> <span><strong>{PNOTES}</strong></span>
            </div>
        </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span style="background-color:#EDE9FE;color:#5B21B6;font-size:11px;"><span style="border-radius:999px;padding:6px 10px;">{OWNERKIND} </span></span><span style="background-color:#FEF3C7;color:#854d0e;font-size:11px;"><span style="border-radius:999px;padding:6px 10px;">{expression/expr12}&nbsp;</span></span>
    </div>
</div>
```
