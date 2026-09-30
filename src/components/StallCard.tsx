import React, { useState } from 'react';
import { MarketStall } from '../types';
import { MapPin, Phone, AlertTriangle, CheckCircle2, Clock, ShieldAlert, ArrowRight } from 'lucide-react';

interface StallCardProps {
  stall: MarketStall;
  onInspect: (stall: MarketStall) => void;
  onViewDetails?: (stall: MarketStall) => void;
}

export const StallCard: React.FC<StallCardProps> = ({ stall, onInspect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Status Chip styling
  const getStatusBadge = (status: MarketStall['status']) => {
    switch (status) {
      case 'Compliant':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Compliant
          </span>
        );
      case 'Follow-up Needed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Follow-up
          </span>
        );
      case 'Flagged High Risk':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            Flagged High Risk
          </span>
        );
      case 'Pending Inspection':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
            <AlertTriangle className="w-3 h-3 text-sky-600" />
            Pending Inspection
          </span>
        );
    }
  };

  // Priority indicator
  const getPriorityBadge = (priority: MarketStall['priority']) => {
    if (priority.includes('Urgent')) {
      return (
        <span className="text-[11px] font-semibold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
          {priority}
        </span>
      );
    }
    if (priority.includes('Standard')) {
      return (
        <span className="text-[11px] font-medium text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
          {priority}
        </span>
      );
    }
    return (
      <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
        {priority}
      </span>
    );
  };

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden flex flex-col">
      {/* Top Banner with Image and Chips */}
      <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
        {!imageError && stall.imageUrl ? (
          <img
            src={stall.imageUrl}
            alt={stall.name}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Fallback image placeholder if image fails to load or while loading */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 text-slate-400 p-3 text-center">
            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center mb-1 text-slate-500 font-bold text-xs shadow-xs">
              {stall.code.split('-')[1] || 'MSZ'}
            </div>
            <span className="text-xs font-medium text-slate-500">{stall.category}</span>
          </div>
        )}

        {/* Code Chip over image */}
        <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs text-white px-2 py-0.5 rounded text-xs font-mono font-semibold tracking-wider">
          {stall.code}
        </div>

        {/* Priority chip top right */}
        <div className="absolute top-2.5 right-2.5">
          {getPriorityBadge(stall.priority)}
        </div>
      </div>

      {/* Body content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs text-slate-500 font-medium tracking-tight">
              {stall.category}
            </span>
            <div>{getStatusBadge(stall.status)}</div>
          </div>

          <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-1 mb-1">
            {stall.name}
          </h3>

          <div className="space-y-1 text-xs text-slate-600 mb-3">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-800">Vendor:</span>
              <span className="truncate">{stall.vendorAlias}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
              <span className="truncate">{stall.locationDescription}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
              <Phone className="w-3 h-3 shrink-0 text-slate-400" />
              <span>{stall.contactNumber}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400">
            {stall.lastInspectionDate ? `Checked ${stall.lastInspectionDate}` : 'Uninspected pilot'}
          </span>
          <button
            type="button"
            onClick={() => onInspect(stall)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 active:scale-98 rounded-lg border border-emerald-200 transition-all cursor-pointer whitespace-nowrap min-h-[36px]"
          >
            Inspect Stall
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
