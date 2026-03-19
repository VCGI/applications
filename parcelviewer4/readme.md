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

### {expression/expr1}

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

### {expression/expr2}

Property Transfers since 2019
{expression/expr2}

### {expression/expr3}

Property Transfers since Annual Grand List
{expression/expr3}

### {expression/expr4}

Survey Information (if available)
{expression/expr4}

### {expression/expr5}

Link to Survey (if available)
{expression/expr5}

### {expression/expr6}

Total Acreage
{expression/expr6}

### {expression/expr7}

Parcel Summary
{expression/expr7}

### {expression/expr8}

Current Use
{expression/expr8}

### {expression/expr9}

Link to Current Use Dataset
{expression/expr9}

### {expression/expr10}

Parcel Summary with PTTRs and Current Use
{expression/expr10}

### {expression/expr11}

Homestead Status & Value
{expression/expr11}

### {expression/expr12}

GIS Source Intersector
{expression/expr12}

### {expression/expr13}

Parcel ID Null Handler
{expression/expr13}

### {expression/expr14}

Map ID Null Handler
{expression/expr14}

### {expression/expr15}

Survey Visibility Toggle
{expression/expr15}

### {expression/expr16}

Current Use Visibility Toggle
{expression/expr16}

### {expression/expr17}

GIS Acres
{expression/expr17}

### {expression/expr18}

Acreage Percent Difference
{expression/expr18}

### {expression/expr19}

Category Lookup
{expression/expr19}

### {expression/expr20}

Unmatched Parcel Warning Toggle
{expression/expr20}

### {expression/expr21}

Recent Transfer Summary
{expression/expr21}

### {expression/expr22}

Current Use Summary
{expression/expr22}

### {expression/expr23}

Recent Transfer Display Toggle
{expression/expr23}
