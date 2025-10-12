"use client";

import React, { useState } from "react";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { MEDICAL_SPECIALTIES } from "@/constants";

export function DoctorSearchFilters({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const specialtyOptions = [
    { value: "", label: "All Specialties" },
    ...MEDICAL_SPECIALTIES.map(specialty => ({
      value: specialty.toLowerCase(),
      label: specialty
    }))
  ];

  const locationOptions = [
    { value: "", label: "All Locations" },
    { value: "new-york", label: "New York" },
    { value: "los-angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "houston", label: "Houston" },
    { value: "phoenix", label: "Phoenix" }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, specialty: selectedSpecialty, location: selectedLocation });
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    setSelectedSpecialty(value);
    onFilterChange({ searchTerm, specialty: value, location: selectedLocation });
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectedLocation(value);
    onFilterChange({ searchTerm, specialty: selectedSpecialty, location: value });
  };

  return (
    <div className="card bg-surface p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search by name or specialty"
          value={searchTerm}
          onChange={handleSearchChange}
          icon="search"
        />
        <Select
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
          options={specialtyOptions}
          placeholder="Select specialty"
        />
        <Select
          value={selectedLocation}
          onChange={handleLocationChange}
          options={locationOptions}
          placeholder="Select location"
        />
        <Button 
          onClick={() => onFilterChange({ searchTerm, specialty: selectedSpecialty, location: selectedLocation })}
          fullWidth
        >
          Search
        </Button>
      </div>
    </div>
  );
}