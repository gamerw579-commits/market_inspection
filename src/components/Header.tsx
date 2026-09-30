import React from 'react';
import { Shield, FileCheck, Smartphone, SlidersHorizontal, WifiOff } from 'lucide-react';

interface HeaderProps {
  groupCode: string;
  onOpenEvidence: () => void;
  fontScale: number;
  onChangeFontScale: (scale: number) => void;
  deviceWidth: 'mobile-narrow' | 'mobile-standard' | 'fluid';
  onChangeDeviceWidth: (width: 'mobile-narrow' | 'mobile-standard' | 'fluid') => void;
}

export const Header: React.FC<HeaderProps> = ({
  groupCode,
  onOpenEvidence,
  fontScale,
  onChangeFontScale,
  deviceWidth,
  onChangeDeviceWidth,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner with INES Branding & Group Code */}
      <div className="bg-slate-900 text-white px-3 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200 tracking-wide text-[11px]">
            INES-Ruhengeri SWE 3409
          </span>
          <span className="text-slate-500 hidden sm:inline">·</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline flex items-center gap-1">
            <WifiOff className="w-3 h-3 text-slate-400 inline" />
            Field Pilot (In-Memory)
          </span>
        </div>

        {/* Group Verification Code in Header */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            Group Code:
          </span>
          <span className="font-mono font-bold text-xs bg-emerald-500 text-slate-950 px-2 py-0.5 rounded shadow-xs tracking-wider">
            {groupCode}
          </span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">
              Musanze Safe Markets
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Field Officer Stall Inspection
            </p>
          </div>
        </div>

        {/* Quick Tools & Controls */}
        <div className="flex items-center gap-1.5">
          {/* Narrow / Device Simulator Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => onChangeDeviceWidth('mobile-narrow')}
              title="Narrow Phone Screen (375px iPhone SE) - Rubric Assessor Test 8"
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                deviceWidth === 'mobile-narrow'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              375px
            </button>
            <button
              type="button"
              onClick={() => onChangeDeviceWidth('mobile-standard')}
              title="Standard Phone Screen (412px Android)"
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                deviceWidth === 'mobile-standard'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              412px
            </button>
            <button
              type="button"
              onClick={() => onChangeDeviceWidth('fluid')}
              title="Fluid Full Width"
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                deviceWidth === 'fluid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fluid
            </button>
          </div>

          {/* Font Scale Tester (Assessor Script Step 8: rotate device font scale) */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 text-xs">
            <span className="text-[10px] text-slate-500 font-medium">Font:</span>
            <button
              type="button"
              onClick={() => onChangeFontScale(fontScale === 1 ? 1.25 : fontScale === 1.25 ? 1.5 : 1)}
              className="text-[11px] font-semibold text-slate-700 hover:text-emerald-700 px-1 py-0.5 rounded"
              title="Cycle font scale for responsive testing"
            >
              {fontScale}x
            </button>
          </div>

          {/* Assessor Evidence & Verification Suite */}
          <button
            type="button"
            onClick={onOpenEvidence}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-medium shadow-xs transition-all cursor-pointer whitespace-nowrap min-h-[36px]"
            title="Open INES SWE 3409 Verification Script, Roles & UI/UX Evidence"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Assessor Suite</span>
          </button>
        </div>
      </div>
    </header>
  );
};
