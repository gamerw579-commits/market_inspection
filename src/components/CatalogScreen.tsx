import React, { useState, useMemo } from 'react';
import { MarketStall, StallCategory } from '../types';
import { StallCard } from './StallCard';
import { Search, Filter, RotateCcw, Building2, AlertTriangle, Plus, Sparkles, Layers } from 'lucide-react';

interface CatalogScreenProps {
  stalls: MarketStall[];
  onSelectStallToInspect: (stall: MarketStall) => void;
  onNavigateToNewInspection: () => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  stalls,
  onSelectStallToInspect,
  onNavigateToNewInspection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [forceEmptyState, setForceEmptyState] = useState(false);

  const categories = [
    'All',
    'Fresh Produce',
    'Dry Grains & Legumes',
    'Butchery & Poultry',
    'Dairy & Eggs',
    'Crafts & Textiles',
  ];

  // Filtered stalls
  const filteredStalls = useMemo(() => {
    if (forceEmptyState) return [];

    return stalls.filter((stall) => {
      // Search matching
      const matchesSearch =
        searchTerm === '' ||
        stall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stall.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stall.vendorAlias.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stall.locationDescription.toLowerCase().includes(searchTerm.toLowerCase());

      // Category matching
      const matchesCategory =
        selectedCategory === 'All' || stall.category === selectedCategory;

      // Priority matching
      const matchesPriority =
        selectedPriority === 'All' || stall.priority.includes(selectedPriority);

      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [stalls, searchTerm, selectedCategory, selectedPriority, forceEmptyState]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setForceEmptyState(false);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Pilot Zone Quick Banner */}
      <div className="bg-linear-to-r from-emerald-800 to-teal-900 text-white p-3.5 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
              Musanze Pilot Zones
            </span>
          </div>
          <span className="text-[11px] bg-emerald-500/30 text-emerald-100 px-2 py-0.5 rounded-full border border-emerald-400/30">
            {stalls.length} Stalls Registered
          </span>
        </div>
        <p className="text-xs text-emerald-100 leading-relaxed">
          Assigned field catalog for Musanze Central & Kariyeri Markets. Inspect visible hygiene, storage safety, and record vendor consent.
        </p>
      </div>

      {/* Search & Interactive Controls */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by stall code (MSZ-A-104), vendor, name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setForceEmptyState(false);
            }}
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Horizontal Category Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setForceEmptyState(false);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium text-xs transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Priority Filter & Assessor Empty State Trigger Bar */}
        <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
          <div className="flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] font-medium text-slate-500">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => {
                setSelectedPriority(e.target.value);
                setForceEmptyState(false);
              }}
              className="bg-white border border-slate-200 rounded-md text-[11px] py-0.5 px-1.5 focus:outline-none text-slate-700"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Priority 1 (Urgent)</option>
              <option value="Standard">Priority 2 (Standard)</option>
              <option value="Routine">Priority 3 (Routine)</option>
            </select>
          </div>

          {/* Test button for Assessor Script Test 2 */}
          <button
            type="button"
            onClick={() => setForceEmptyState(!forceEmptyState)}
            className="text-[11px] text-emerald-700 hover:text-emerald-800 underline font-medium cursor-pointer"
          >
            {forceEmptyState ? 'Restore Stalls' : 'Simulate Empty Catalog'}
          </button>
        </div>
      </div>

      {/* Catalog Grid / Cards */}
      {filteredStalls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredStalls.map((stall) => (
            <StallCard
              key={stall.id}
              stall={stall}
              onInspect={onSelectStallToInspect}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center my-4 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="max-w-xs space-y-1">
            <h3 className="text-sm font-semibold text-slate-900">
              No Market Stalls Found
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No assigned stalls match the current search keyword or category filter for this Musanze zone.
            </p>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
            <button
              type="button"
              onClick={onNavigateToNewInspection}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Inspect New Stall
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
