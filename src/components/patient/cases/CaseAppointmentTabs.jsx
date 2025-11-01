"use client";

import React from "react";
import { Tabs } from "@/components/ui/Tabs";

export default function CaseAppointmentTabs({ activeTab, onTabChange, counts }) {
  const tabs = [
    { id: "all", label: "All", count: counts.all },
    { id: "upcoming", label: "Upcoming", count: counts.upcoming },
    { id: "conducted", label: "Conducted", count: counts.conducted },
    { id: "cancelled", label: "Cancelled", count: counts.cancelled },
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