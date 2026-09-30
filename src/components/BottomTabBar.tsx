import React from 'react';
import { TabType } from '../types';
import { Store, PlusCircle, ClipboardCheck } from 'lucide-react';

interface BottomTabBarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  recordCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentTab,
  onTabChange,
  recordCount,
}) => {
  const tabs = [
    {
      id: 'catalog' as TabType,
      label: 'Home',
      icon: Store,
      badge: null,
    },
    {
      id: 'new-inspection' as TabType,
      label: 'New Inspection',
      icon: PlusCircle,
      badge: null,
    },
    {
      id: 'records' as TabType,
      label: 'Records',
      icon: ClipboardCheck,
      badge: recordCount > 0 ? recordCount : null,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 h-16 items-center px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer group transition-colors focus:outline-none"
            >
              {/* Active Indicator Top Pill */}
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-emerald-600 rounded-full" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive
                      ? 'text-emerald-600 scale-105 stroke-[2.2]'
                      : 'text-slate-400 group-hover:text-slate-600 stroke-[1.8]'
                  }`}
                />
                {tab.badge !== null && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-emerald-600 text-white text-[9px] font-bold font-mono flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-1 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'font-bold text-emerald-700'
                    : 'font-medium text-slate-500 group-hover:text-slate-700'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
