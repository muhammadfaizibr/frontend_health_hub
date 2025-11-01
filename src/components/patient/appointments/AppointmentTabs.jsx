"use client";

import React from "react";
import { Tabs } from "@/components/ui/Tabs";

export default function AppointmentTabs({ 
  activeTab,
  onTabChange,
  upcomingCount = 0, 
  conductedCount = 0, 
  cancelledCount = 0
}) {
  const tabs = [
    { id: "upcoming", label: "Upcoming", count: upcomingCount },
    { id: "conducted", label: "Conducted", count: conductedCount },
    { id: "cancelled", label: "Cancelled", count: cancelledCount },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={onTabChange}
      showCounts={true}
      variant="underline"
    />
  );
}