export type StallCategory =
  | 'Fresh Produce'
  | 'Dry Grains & Legumes'
  | 'Butchery & Poultry'
  | 'Dairy & Eggs'
  | 'Cooked Food & Beverages'
  | 'Crafts & Textiles';

export type StallZone =
  | 'Zone A - Green Grocers'
  | 'Zone B - Cereals & Legumes'
  | 'Zone C - Animal Products'
  | 'Zone D - Artisanal & Crafts';

export type InspectionStatus =
  | 'Compliant'
  | 'Follow-up Needed'
  | 'Pending Inspection'
  | 'Flagged High Risk';

export type InspectionPriority =
  | 'Priority 1 (Urgent)'
  | 'Priority 2 (Standard)'
  | 'Priority 3 (Routine)';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface MarketStall {
  id: string;
  code: string; // e.g. MSZ-A-104
  name: string;
  category: StallCategory;
  zone: StallZone;
  status: InspectionStatus;
  priority: InspectionPriority;
  vendorAlias: string;
  contactNumber: string;
  lastInspectionDate?: string;
  imageUrl: string;
  locationDescription: string;
}

export interface InspectionRecord {
  id: string;
  stallCode: string;
  vendorAlias: string;
  category: StallCategory;
  contactNumber: string;
  riskLevel: RiskLevel;
  consentConfirmed: boolean;
  evidenceImage: string | null;
  evidenceSource?: 'camera' | 'gallery' | 'sample';
  timestamp: string;
  groupVerificationCode: string;
  officerNotes?: string;
  sanitationRating?: number; // 1-5
  submittedAt: number; // unix timestamp for sorting
}

export interface FormErrors {
  vendorAlias?: string;
  stallCode?: string;
  category?: string;
  contactNumber?: string;
  riskLevel?: string;
  consentConfirmed?: string;
  evidenceImage?: string;
}

export type TabType = 'catalog' | 'new-inspection' | 'records';
export type ScreenStack = 'tabs' | 'inspection-details';

export interface AssessorTestItem {
  id: number;
  name: string;
  criterion: string;
  expectedResult: string;
  linkedMark: string;
  status: 'passed' | 'pending';
}
