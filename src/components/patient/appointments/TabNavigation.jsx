"use client";

import React from "react";

export function TabNavigation({ tabs, activeTab, onTabChange }) {
  return (
    <div className="border-b border-color">
      <nav className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.value
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
