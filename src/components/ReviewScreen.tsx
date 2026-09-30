import React from 'react';
import { StallCategory, RiskLevel } from '../types';
import { CheckCircle2, ArrowLeft, Save, ShieldCheck, Clock, Phone, MapPin, Tag, FileText, User } from 'lucide-react';

interface ReviewScreenProps {
  data: {
    vendorAlias: string;
    stallCode: string;
    category: StallCategory;
    contactNumber: string;
    riskLevel: RiskLevel;
    consentConfirmed: boolean;
    evidenceImage: string | null;
    officerNotes: string;
    timestamp: string;
  };
  groupCode: string;
  onBackToEdit: () => void;
  onConfirmSave: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  data,
  groupCode,
  onBackToEdit,
  onConfirmSave,
}) => {
  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'Low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Top Banner with prominent Group Verification Code */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verification & Review
          </span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {data.timestamp}
          </span>
        </div>

        <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700/80 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
              Group Verification Code
            </p>
            <p className="text-lg font-mono font-bold text-white tracking-widest mt-0.5">
              {groupCode}
            </p>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 font-medium">
            Pre-Save Audit
          </span>
        </div>
      </div>

      {/* Validated Fields Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
          Validated Inspection Record
        </h2>

        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Stall Code */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              Stall Code
            </span>
            <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">
              {data.stallCode}
            </p>
          </div>

          {/* Risk Level */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              Risk Assessment
            </span>
            <span
              className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md border mt-1 ${getRiskBadge(
                data.riskLevel
              )}`}
            >
              {data.riskLevel} Risk
            </span>
          </div>

          {/* Vendor Alias */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-medium flex items-center gap-1">
              <User className="w-3 h-3 text-slate-400" />
              Vendor Alias
            </span>
            <p className="text-xs font-semibold text-slate-900 mt-0.5 truncate">
              {data.vendorAlias}
            </p>
          </div>

          {/* Contact Number */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-medium flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" />
              Rwanda Contact
            </span>
            <p className="text-xs font-mono font-medium text-slate-800 mt-0.5 truncate">
              {data.contactNumber}
            </p>
          </div>
        </div>

        {/* Category */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 flex items-center gap-1">
            <Tag className="w-3 h-3 text-slate-400" />
            Market Goods Category:
          </span>
          <span className="font-semibold text-slate-900">{data.category}</span>
        </div>

        {/* Consent Confirmation */}
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">
            Vendor Pilot Consent Verified & Logged by Field Officer
          </span>
        </div>

        {/* Officer Notes if provided */}
        {data.officerNotes && (
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
            <span className="text-[10px] text-slate-500 uppercase font-medium flex items-center gap-1 mb-1">
              <FileText className="w-3 h-3 text-slate-400" />
              Field Officer Notes
            </span>
            <p className="text-slate-700 leading-relaxed text-xs">
              {data.officerNotes}
            </p>
          </div>
        )}
      </div>

      {/* Selected Image Preview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
          <span>Attached Field Evidence</span>
          <span className="text-[10px] text-slate-400 font-normal">Photo 1 of 1</span>
        </h3>

        {data.evidenceImage ? (
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 relative">
            <img
              src={data.evidenceImage}
              alt="Inspection evidence"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
              STALL: {data.stallCode}
            </div>
            <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-medium">
              Verified
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400">
            No image attached. Physical evidence is recommended for Musanze pilot.
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5 pt-2">
        <button
          type="button"
          onClick={onBackToEdit}
          className="flex-1 py-3 px-3 bg-white hover:bg-slate-50 active:scale-98 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Details</span>
        </button>
        <button
          type="button"
          onClick={onConfirmSave}
          className="flex-1 py-3 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
        >
          <Save className="w-4 h-4" />
          <span>Confirm & Save</span>
        </button>
      </div>
    </div>
  );
};
