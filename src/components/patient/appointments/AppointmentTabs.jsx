"use client";

import React, { useState } from "react";

// Separate Tab Button Component
const TabButton = ({ tab, isActive, onClick }) => (
  <button
    onClick={() => onClick(tab.id)}
    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
      isActive
        ? "border-primary-color text-primary-color"
        : "border-transparent text-secondary hover:text-primary hover:border-color"
    }`}
  >
    {tab.label} ({tab.count})
  </button>
);

export default function AppointmentTabs({ 
  upcomingCount = 0, 
  conductedCount = 0, 
  cancelledCount = 0, 
  children 
}) {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: upcomingCount },
    { id: "conducted", label: "Conducted", count: conductedCount },
    { id: "cancelled", label: "Cancelled", count: cancelledCount },
  ];

  return (
    <>
      <div className="border-b border-color">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={setActiveTab}
            />
          ))}
        </nav>
      </div>
      {children(activeTab)}
    </>
  );
}