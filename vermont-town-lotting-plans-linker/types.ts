
export interface ArcGISFeatureAttribute {
  OBJECTID?: number; // Made optional as it's not explicitly requested in outFields anymore
  CurrentName: string;
  URL: string | null; // URL can be null
  FormerName?: string | null; // FormerName can be null or not present
  OriginDate?: string | null; // OriginDate can be null, not present, or a string starting with YYYY
  OriginYear?: string | null; // New field for YYYY formatted year
}

export interface ArcGISFeature {
  attributes: ArcGISFeatureAttribute;
}

export interface ArcGISResponse {
  features: ArcGISFeature[];
  error?: {
    code: number;
    message: string;
    details?: string[];
  };
}
