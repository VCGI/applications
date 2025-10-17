# Vermont Protected Lands Viewer Arcade Code

This page documents arcade in use as built in the Vermont Protected Lands Viewer application maintained by the Vermont Center for Geographic Information (VCGI). Certain app functionality depends on this code, and is only found in the application and/or its referenced map products (not in the data sources themselves). Advanced users looking to recreate this functionality may refer to this documentation.

## Pop-Ups

These functions are executed via Attribute Expressions on the Protected Lands data layer, they may reference other layers in the same map, and are displayed within the pop up only (are not within attributes).

### Expression: Interest Org Type

This script presents the interest type in the pop up card.

```javascript
If($feature.INT_ORGTYP == 'FED') { 
   return 'Federal'
} 
else if($feature.INT_ORGTYP == 'STAT') {
    return 'State'
} 
else if($feature.INT_ORGTYP == 'LOC') {
    return 'Municipal'
} 
else if($feature.INT_ORGTYP == 'NGO') {
    return 'NGO'
}
else if($feature.INT_ORGTYP == 'PVT') {
    return 'Private'
}
else if($feature.INT_ORGTYP == 'UNK') {
    return 'Unknown'
}
```

### Expression: GAP Status Number

This expression maintains the numeric display of GAP Status for the pop up card.

```javascript
If($feature.GAPSTATUS == '1') { 
   return '1'
} 
else if($feature.GAPSTATUS == '2') {
    return '2'
} 
else if($feature.GAPSTATUS == '3') {
    return '3'
} 
else if($feature.GAPSTATUS == '4') {
    return '4'
}
```

### Expression: Date Acquired Formatting

This expression reformats the Date Acquired field for display in the pop up card.

```javascript
Text($feature.DATEAQRD, 'MMM. D, YYYY')
```

### Expression: Update Date Formatting

This expression reformats the Update Date field for display in the pop up card.

```javascript
Text($feature.UPDDATE, 'MMM. D, YYYY')
```

### Expression: GIS Acres Display

This expression reformats the GIS Acres field for display in the pop up card.

```javascript
var GISACRES = $feature.GISACRES;
var LACRES = $feature.LISTED_AC;
var AC_Diff_PCT = ((Abs(LACRES-GISACRES))/((LACRES+GISACRES)/2))*100;
Round(AC_Diff_PCT,2)

return (GISACRES+' ac'+TextFormatting.NewLine+(Round(AC_Diff_PCT,1)+'% Difference'));
```

### HTML Text Container

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
                <span style="color:#64748b;">Edit Date:</span> <span><strong>{UPDDATE}</strong></span><strong>&nbsp;</strong>
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
