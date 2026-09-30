import React, { useState, useMemo } from 'react';
import { InspectionRecord, RiskLevel } from '../types';
import { ClipboardList, Search, ChevronRight, Clock, ShieldCheck, AlertTriangle, ShieldAlert, Plus, CheckCircle2 } from 'lucide-react';

interface RecordsScreenProps {
  records: InspectionRecord[];
  onSelectRecord: (record: InspectionRecord) => void;
  onNavigateToNewInspection: () => void;
}

export const RecordsScreen: React.FC<RecordsScreenProps> = ({
  records,
  onSelectRecord,
  onNavigateToNewInspection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('All');

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchesSearch =
        searchTerm === '' ||
        rec.stallCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.vendorAlias.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRisk =
        selectedRiskFilter === 'All' || rec.riskLevel === selectedRiskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [records, searchTerm, selectedRiskFilter]);

  // Risk badges
  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Low Risk
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Medium Risk
          </span>
        );
      case 'High':
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            {level} Risk
          </span>
        );
    }
  };

  const highRiskCount = records.filter(
    (r) => r.riskLevel === 'High' || r.riskLevel === 'Critical'
  ).length;

  return (
    <div className="space-y-4 pb-24">
      {/* Top Records Summary Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Pilot Inspection Records
            </h2>
          </div>
          <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
            In-Memory Session
          </span>
        </div>

        {/* 3 Metric counters */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase text-slate-400 font-medium block">
              Total Logged
            </span>
            <span className="text-lg font-bold font-mono text-white">
              {records.length}
            </span>
          </div>
          <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase text-emerald-400 font-medium block">
              Low / Safe
            </span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              {records.filter((r) => r.riskLevel === 'Low').length}
            </span>
          </div>
          <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase text-rose-400 font-medium block">
              High / Urgent
            </span>
            <span className="text-lg font-bold font-mono text-rose-400">
              {highRiskCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search records by stall code, vendor, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
          />
        </div>

        {/* Risk Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 no-scrollbar">
          {['All', 'Low', 'Medium', 'High', 'Critical'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRiskFilter(r)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedRiskFilter === r
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {r === 'All' ? 'All Risks' : `${r} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* Records List (Stack Trigger) */}
      {filteredRecords.length > 0 ? (
        <div className="space-y-2.5">
          {filteredRecords.map((record) => (
            <button
              key={record.id}
              type="button"
              onClick={() => onSelectRecord(record)}
              className="w-full text-left bg-white p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-xs active:scale-99 transition-all flex items-center justify-between gap-3 group cursor-pointer"
            >
              {/* Evidence Thumbnail */}
              <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative">
                {record.evidenceImage ? (
                  <img
                    src={record.evidenceImage}
                    alt={record.stallCode}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono font-bold text-xs text-slate-400">
                    MSZ
                  </div>
                )}
              </div>

              {/* Record Summary */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono font-bold text-xs text-slate-900">
                    {record.stallCode}
                  </span>
                  <div>{getRiskBadge(record.riskLevel)}</div>
                </div>

                <p className="text-xs font-medium text-slate-700 truncate">
                  {record.vendorAlias} · {record.category}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{record.timestamp}</span>
                </div>
              </div>

              {/* Chevron Disclosure */}
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3">
          <ClipboardList className="w-10 h-10 text-slate-300 mx-auto" />
          <div>
            <h3 className="text-sm font-semibold text-slate-900">No Records Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No inspection records match the current filter or search criteria.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToNewInspection}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Create First Record
          </button>
        </div>
      )}
    </div>
  );
};
