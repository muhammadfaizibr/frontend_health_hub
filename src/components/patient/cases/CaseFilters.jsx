"use client";

import React from "react";
import { Tabs } from "@/components/ui/Tabs";

export default function CaseFilters({ activeFilter, onFilterChange, counts }) {
  const tabs = [
    { id: "all", label: "All Cases", count: counts.all },
    { id: "open", label: "Open", count: counts.open },
    { id: "in_progress", label: "In Progress", count: counts.in_progress },
    { id: "closed", label: "Closed", count: counts.closed },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeFilter}
      onChange={onFilterChange}
      showCounts={true}
      variant="pills"
    />
  );
}