"use client";

import { memo } from "react";

interface FilterTab {
  id: string;
  label: string;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
}

export const FilterTabs = memo(function FilterTabs({
  tabs,
  activeTab,
  onTabChange,
}: FilterTabsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition ${
            activeTab === tab.id
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
});
