import { FormErrors, StallCategory, RiskLevel } from '../types';

export const STALL_CODE_REGEX = /^MSZ-[A-D]-\d{3}$/;

// Rwanda phone number format:
// Can be +250 78X XXX XXX, +250788123456, 0788123456, 079..., 072..., 073...
export function validateRwandaPhone(phone: string): boolean {
  if (!phone) return false;
  // Strip spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Matches +25078XXXXXXX, +25079XXXXXXX, +25072XXXXXXX, +25073XXXXXXX
  const internationalRegex = /^\+2507[2389]\d{7}$/;
  // Matches 078XXXXXXX, 079XXXXXXX, 072XXXXXXX, 073XXXXXXX
  const localRegex = /^07[2389]\d{7}$/;
  // Matches 2507[2389]\d{7}
  const cleanWith250 = /^2507[2389]\d{7}$/;

  return internationalRegex.test(cleaned) || localRegex.test(cleaned) || cleanWith250.test(cleaned);
}

export function formatRwandaPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  if (cleaned.startsWith('250') && cleaned.length === 12) {
    // 250 788 123 456
    return `+250 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    // +250 788 123 456
    return `+250 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

export interface FormDataToValidate {
  vendorAlias: string;
  stallCode: string;
  category: string;
  contactNumber: string;
  riskLevel: string;
  consentConfirmed: boolean;
  evidenceImage?: string | null;
}

export function validateInspectionForm(
  data: FormDataToValidate,
  options?: { strictStallCode?: boolean; requireImage?: boolean }
): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};
  const isStrictStall = options?.strictStallCode ?? true;

  // 1. Vendor Alias
  if (!data.vendorAlias || !data.vendorAlias.trim()) {
    errors.vendorAlias = 'Vendor alias or representative name is required.';
  } else if (data.vendorAlias.trim().length < 2) {
    errors.vendorAlias = 'Vendor alias must be at least 2 characters long.';
  }

  // 2. Stall Code
  const trimmedCode = (data.stallCode || '').trim().toUpperCase();
  if (!trimmedCode) {
    errors.stallCode = 'Stall code is required (e.g., MSZ-A-104).';
  } else if (isStrictStall && !STALL_CODE_REGEX.test(trimmedCode)) {
    errors.stallCode =
      'Stall code must strictly follow MSZ-Zone-Number pattern (e.g., MSZ-A-104, zones A-D with 3 digits).';
  }

  // 3. Category
  const validCategories: StallCategory[] = [
    'Fresh Produce',
    'Dry Grains & Legumes',
    'Butchery & Poultry',
    'Dairy & Eggs',
    'Cooked Food & Beverages',
    'Crafts & Textiles',
  ];
  if (!data.category) {
    errors.category = 'Inspection category selection is required.';
  } else if (!validCategories.includes(data.category as StallCategory)) {
    errors.category = 'Please select a valid market goods category.';
  }

  // 4. Contact Number
  if (!data.contactNumber || !data.contactNumber.trim()) {
    errors.contactNumber = 'Contact phone number is required.';
  } else if (!validateRwandaPhone(data.contactNumber.trim())) {
    errors.contactNumber =
      'Invalid format. Use a valid Rwanda mobile number (e.g., +250 788 123 456 or 0788123456, MTN 078/079 or Airtel 072/073).';
  }

  // 5. Risk Level
  const validRisks: RiskLevel[] = ['Low', 'Medium', 'High', 'Critical'];
  if (!data.riskLevel) {
    errors.riskLevel = 'Risk assessment level is required.';
  } else if (!validRisks.includes(data.riskLevel as RiskLevel)) {
    errors.riskLevel = 'Select a valid risk level (Low, Medium, High, Critical).';
  }

  // 6. Consent Confirmation
  if (!data.consentConfirmed) {
    errors.consentConfirmed =
      'Vendor consent confirmation is mandatory under Musanze Market pilot regulations.';
  }

  // 7. Optional or recommended evidence check
  if (options?.requireImage && !data.evidenceImage) {
    errors.evidenceImage = 'One evidence photo must be attached before submitting.';
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
