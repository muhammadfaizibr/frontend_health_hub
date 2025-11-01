"use client";

import React, { useState } from "react";

export default function AppointmentDetailTabs({ 
  prescriptionsCount = 0, 
  reportsCount = 0,
  children 
}) {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "Details", icon: "info" },
    { 
      id: "prescriptions", 
      label: "Prescriptions", 
      icon: "medication",
      count: prescriptionsCount 
    },
    { 
      id: "reports", 
      label: "Reports", 
      icon: "lab_profile",
      count: reportsCount 
    },
  ];

  return (
    <div className="card bg-surface">
      <div className="border-b border-color">
        <div className="flex gap-1 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-secondary hover:bg-hover"
              }`}
            >
              <span className="material-symbols-outlined text-sm">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-secondary/10 text-secondary"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {children(activeTab)}
      </div>
    </div>
  );
}