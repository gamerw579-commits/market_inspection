import React from 'react';
import { InspectionRecord } from '../types';
import { ArrowLeft, MapPin, Phone, ShieldCheck, Clock, Tag, User, FileText, CheckCircle2, Share2, Printer } from 'lucide-react';

interface InspectionDetailsScreenProps {
  record: InspectionRecord;
  onBack: () => void;
}

export const InspectionDetailsScreen: React.FC<InspectionDetailsScreenProps> = ({
  record,
  onBack,
}) => {
  return (
    <div className="space-y-4 pb-24 animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Top Stack Navigation Bar */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 active:scale-98 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer min-h-[36px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Records</span>
        </button>

        <span className="font-mono text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
          {record.groupVerificationCode}
        </span>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-2xs">
        {/* Stall Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-slate-900">
                {record.stallCode}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                · {record.category}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Vendor: <span className="font-semibold text-slate-900">{record.vendorAlias}</span>
            </p>
          </div>

          <div
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
              record.riskLevel === 'Low'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : record.riskLevel === 'Medium'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {record.riskLevel} Risk
          </div>
        </div>

        {/* Evidence Photo */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Field Evidence Photography
          </h4>
          {record.evidenceImage ? (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
              <img
                src={record.evidenceImage}
                alt={`Evidence for ${record.stallCode}`}
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                SOURCE: {record.evidenceSource?.toUpperCase() || 'MOBILE_FIELD'}
              </div>
            </div>
          ) : (
            <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
              No photo attached to this record.
            </div>
          )}
        </div>

        {/* Inspection Metadata Table */}
        <div className="space-y-2 text-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-1">
            Inspection Parameters
          </h4>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-medium flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                Contact Number
              </span>
              <p className="font-mono text-xs font-semibold text-slate-800 mt-0.5">
                {record.contactNumber}
              </p>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Logged Timestamp
              </span>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                {record.timestamp}
              </p>
            </div>
          </div>

          {/* Consent Status */}
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">
              Vendor signed/oral consent verified & on record
            </span>
          </div>

          {/* Officer Observations */}
          {record.officerNotes && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                <FileText className="w-3 h-3 text-slate-400" />
                Field Officer Notes & Follow-up
              </span>
              <p className="text-slate-700 leading-relaxed text-xs">
                {record.officerNotes}
              </p>
            </div>
          )}
        </div>

        {/* Footer Audit stamp */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Record ID: {record.id}</span>
          <span className="font-mono">Musanze Safe Markets Pilot</span>
        </div>
      </div>
    </div>
  );
};
