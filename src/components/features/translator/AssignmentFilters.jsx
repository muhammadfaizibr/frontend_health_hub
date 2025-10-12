"use client";

import React, { useState } from "react";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export function AssignmentFilters({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, statusFilter, languageFilter });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    onFilterChange({ searchTerm, statusFilter: value, languageFilter });
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setLanguageFilter(value);
    onFilterChange({ searchTerm, statusFilter, languageFilter: value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="w-full md:w-48">
        <Select
          value={statusFilter}
          onChange={handleStatusChange}
          placeholder="Filter by status"
        >
          <option value="">All Statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </div>
      <div className="w-full md:w-48">
        <Select
          value={languageFilter}
          onChange={handleLanguageChange}
          placeholder="Filter by language"
        >
          <option value="">All Languages</option>
          <option value="Spanish">Spanish</option>
          <option value="Hindi">Hindi</option>
          <option value="French">French</option>
          <option value="Arabic">Arabic</option>
          <option value="Mandarin">Mandarin</option>
        </Select>
      </div>
    </div>
  );
}