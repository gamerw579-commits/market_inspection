import React, { useState, useEffect } from 'react';
import { StallCategory, RiskLevel, FormErrors } from '../types';
import { validateInspectionForm, formatRwandaPhone } from '../utils/validation';
import { MediaCapture } from './MediaCapture';
import { AlertCircle, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, AlertTriangle, Info } from 'lucide-react';

interface InspectionFormScreenProps {
  initialValues?: {
    vendorAlias: string;
    stallCode: string;
    category: StallCategory;
    contactNumber: string;
    riskLevel: RiskLevel;
    consentConfirmed: boolean;
    evidenceImage: string | null;
    officerNotes?: string;
  };
  onProceedToReview: (formData: {
    vendorAlias: string;
    stallCode: string;
    category: StallCategory;
    contactNumber: string;
    riskLevel: RiskLevel;
    consentConfirmed: boolean;
    evidenceImage: string | null;
    officerNotes: string;
    timestamp: string;
  }) => void;
  groupCode: string;
}

export const InspectionFormScreen: React.FC<InspectionFormScreenProps> = ({
  initialValues,
  onProceedToReview,
  groupCode,
}) => {
  const [vendorAlias, setVendorAlias] = useState(initialValues?.vendorAlias || '');
  const [stallCode, setStallCode] = useState(initialValues?.stallCode || '');
  const [category, setCategory] = useState<StallCategory>(
    initialValues?.category || 'Fresh Produce'
  );
  const [contactNumber, setContactNumber] = useState(initialValues?.contactNumber || '');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(initialValues?.riskLevel || 'Low');
  const [consentConfirmed, setConsentConfirmed] = useState(
    initialValues?.consentConfirmed ?? false
  );
  const [evidenceImage, setEvidenceImage] = useState<string | null>(
    initialValues?.evidenceImage || null
  );
  const [officerNotes, setOfficerNotes] = useState(initialValues?.officerNotes || '');

  // Touched state for immediate or deferred field validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Categories list
  const categories: StallCategory[] = [
    'Fresh Produce',
    'Dry Grains & Legumes',
    'Butchery & Poultry',
    'Dairy & Eggs',
    'Cooked Food & Beverages',
    'Crafts & Textiles',
  ];

  // Re-run validation whenever fields change
  useEffect(() => {
    const result = validateInspectionForm({
      vendorAlias,
      stallCode,
      category,
      contactNumber,
      riskLevel,
      consentConfirmed,
      evidenceImage,
    });
    setErrors(result.errors);
  }, [vendorAlias, stallCode, category, contactNumber, riskLevel, consentConfirmed, evidenceImage]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Quick format phone on blur
  const handlePhoneBlur = () => {
    handleBlur('contactNumber');
    if (contactNumber.trim()) {
      setContactNumber(formatRwandaPhone(contactNumber.trim()));
    }
  };

  // Submit and advance to review
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    setTouched({
      vendorAlias: true,
      stallCode: true,
      category: true,
      contactNumber: true,
      riskLevel: true,
      consentConfirmed: true,
      evidenceImage: true,
    });

    const result = validateInspectionForm({
      vendorAlias,
      stallCode,
      category,
      contactNumber,
      riskLevel,
      consentConfirmed,
      evidenceImage,
    });

    if (!result.isValid) {
      // Form is blocked
      return;
    }

    // Generate readable timestamp in Central Africa Time (Kigali)
    const now = new Date();
    const formattedTimestamp = `${now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}, ${now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })} CAT`;

    onProceedToReview({
      vendorAlias: vendorAlias.trim(),
      stallCode: stallCode.trim().toUpperCase(),
      category,
      contactNumber: contactNumber.trim(),
      riskLevel,
      consentConfirmed,
      evidenceImage,
      officerNotes: officerNotes.trim(),
      timestamp: formattedTimestamp,
    });
  };

  // Assessor Test Helpers for quick evaluation
  const fillValidSample = () => {
    setVendorAlias('Mukeshimana Vestine');
    setStallCode('MSZ-A-104');
    setCategory('Fresh Produce');
    setContactNumber('+250 788 567 890');
    setRiskLevel('Low');
    setConsentConfirmed(true);
    setEvidenceImage('/src/assets/images/musanze_stall_inspection_1790761427827.jpg');
    setOfficerNotes('Stall displays verified clean wooden shelving. Fresh water container available with tap. Vendor provided full consent.');
    setHasAttemptedSubmit(false);
  };

  const fillInvalidSample = () => {
    setVendorAlias(''); // Blank
    setStallCode('INVALID-99'); // Malformed code
    setCategory('Fresh Produce');
    setContactNumber('123456'); // Invalid phone
    setRiskLevel('High');
    setConsentConfirmed(false); // Missing consent
    setEvidenceImage(null);
    setHasAttemptedSubmit(true);
    setTouched({
      vendorAlias: true,
      stallCode: true,
      contactNumber: true,
      consentConfirmed: true,
    });
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header Info Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>New Pilot Inspection Record</span>
          </div>
          <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {groupCode}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          All records operate in-memory for the Musanze pilot. Ensure all field-level validation rules pass before continuing to review.
        </p>

        {/* Quick Testing Bar for Assessor */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-400 font-medium">Assessor Fast Fill:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fillValidSample}
              className="text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition-colors"
            >
              Fill Valid Data
            </button>
            <button
              type="button"
              onClick={fillInvalidSample}
              className="text-[11px] font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded border border-rose-200 transition-colors"
            >
              Trigger Invalid Errors
            </button>
          </div>
        </div>
      </div>

      {/* Submission Blocked Banner (shows when user tries to submit with errors) */}
      {hasAttemptedSubmit && Object.keys(errors).length > 0 && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Blocked: Validation Errors Detected</p>
            <p className="text-[11px] text-rose-700 mt-0.5">
              Please resolve the {Object.keys(errors).length} highlighted field error(s) below before proceeding to the review screen.
            </p>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. Vendor Alias */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
            <span>Vendor Alias / Representative *</span>
            <span className="text-[11px] font-normal text-slate-400">Fictional Name</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Mama Aline, Papa Claude, Bizimana Jean"
            value={vendorAlias}
            onChange={(e) => setVendorAlias(e.target.value)}
            onBlur={() => handleBlur('vendorAlias')}
            className={`w-full px-3 py-2.5 bg-white border rounded-xl text-xs focus:outline-none focus:ring-2 transition-all ${
              (touched.vendorAlias || hasAttemptedSubmit) && errors.vendorAlias
                ? 'border-rose-400 focus:ring-rose-400/20 bg-rose-50/20'
                : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          />
          {(touched.vendorAlias || hasAttemptedSubmit) && errors.vendorAlias && (
            <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.vendorAlias}
            </p>
          )}
        </div>

        {/* 2. Stall Code (Strict Format Pattern MSZ-[A-D]-[0-9]{3}) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-800">
              Stall Code * <span className="font-mono text-[11px] text-slate-500">(MSZ-Zone-Number)</span>
            </label>
            <span className="text-[10px] text-slate-400 font-mono">Pattern: MSZ-[A-D]-[0-9]{'{3}'}</span>
          </div>
          <input
            type="text"
            placeholder="e.g. MSZ-A-104, MSZ-B-205, MSZ-C-301"
            value={stallCode}
            onChange={(e) => setStallCode(e.target.value.toUpperCase())}
            onBlur={() => handleBlur('stallCode')}
            className={`w-full px-3 py-2.5 bg-white border rounded-xl text-xs font-mono uppercase focus:outline-none focus:ring-2 transition-all ${
              (touched.stallCode || hasAttemptedSubmit) && errors.stallCode
                ? 'border-rose-400 focus:ring-rose-400/20 bg-rose-50/20'
                : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          />
          {(touched.stallCode || hasAttemptedSubmit) && errors.stallCode ? (
            <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.stallCode}
            </p>
          ) : (
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <Info className="w-3 h-3 text-slate-400" />
              Valid zones: A (Greens), B (Grains), C (Animal products), D (Crafts) followed by 3 digits.
            </p>
          )}
        </div>

        {/* 3. Category Selector */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-800">
            Market Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as StallCategory)}
            onBlur={() => handleBlur('category')}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Rwanda-Style Fictional Contact Number */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-800">
              Vendor Contact Number *
            </label>
            <span className="text-[10px] text-slate-400">MTN (078/079) or Airtel (072/073)</span>
          </div>
          <input
            type="tel"
            placeholder="e.g. +250 788 123 456 or 0788123456"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            onBlur={handlePhoneBlur}
            className={`w-full px-3 py-2.5 bg-white border rounded-xl text-xs font-mono focus:outline-none focus:ring-2 transition-all ${
              (touched.contactNumber || hasAttemptedSubmit) && errors.contactNumber
                ? 'border-rose-400 focus:ring-rose-400/20 bg-rose-50/20'
                : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
          />
          {(touched.contactNumber || hasAttemptedSubmit) && errors.contactNumber && (
            <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.contactNumber}
            </p>
          )}
        </div>

        {/* 5. Risk Level (Low, Medium, High, Critical) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-800">
            Observed Stall Risk Level *
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['Low', 'Medium', 'High', 'Critical'] as RiskLevel[]).map((level) => {
              const isSelected = riskLevel === level;
              const colorClasses = {
                Low: isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50',
                Medium: isSelected
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50',
                High: isSelected
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                  : 'bg-white text-orange-800 border-orange-200 hover:bg-orange-50',
                Critical: isSelected
                  ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                  : 'bg-white text-rose-800 border-rose-200 hover:bg-rose-50',
              }[level];

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setRiskLevel(level)}
                  className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition-all cursor-pointer ${colorClasses}`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Camera & Gallery Workflow */}
        <div className="pt-2 border-t border-slate-200">
          <MediaCapture
            currentImage={evidenceImage}
            onImageSelected={(img) => setEvidenceImage(img)}
            error={(touched.evidenceImage || hasAttemptedSubmit) ? errors.evidenceImage : undefined}
          />
        </div>

        {/* 7. Officer Observations Notes (Optional) */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
            <span>Field Officer Notes & Observations</span>
            <span className="text-[11px] font-normal text-slate-400">Optional</span>
          </label>
          <textarea
            rows={2}
            placeholder="Record drainage state, waste disposal bins, product elevation, or customer safety notes..."
            value={officerNotes}
            onChange={(e) => setOfficerNotes(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
          />
        </div>

        {/* 8. Mandatory Consent Confirmation */}
        <div
          className={`p-3 rounded-xl border transition-all ${
            (touched.consentConfirmed || hasAttemptedSubmit) && errors.consentConfirmed
              ? 'bg-rose-50/60 border-rose-300'
              : consentConfirmed
              ? 'bg-emerald-50/60 border-emerald-200'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={consentConfirmed}
              onChange={(e) => setConsentConfirmed(e.target.checked)}
              onBlur={() => handleBlur('consentConfirmed')}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block">
                Vendor Consent Confirmation *
              </span>
              <span className="text-[11px] text-slate-600 leading-snug block mt-0.5">
                The vendor representative has been informed of the Musanze Safe Market field audit pilot and explicitly consents to physical stall assessment and attached photographic evidence documentation.
              </span>
            </div>
          </label>
          {(touched.consentConfirmed || hasAttemptedSubmit) && errors.consentConfirmed && (
            <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-2 pl-6">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.consentConfirmed}
            </p>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
          >
            <span>Review Inspection Summary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-1.5">
            Validation is enforced locally. Invalid forms cannot advance to review.
          </p>
        </div>
      </form>
    </div>
  );
};
