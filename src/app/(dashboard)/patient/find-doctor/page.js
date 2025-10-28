"use client";

import React, { useState, useCallback } from "react";
import SearchFilters from "@/components/patient/search/SearchFilters";
import DoctorCard from "@/components/patient/search/DoctorCard";
import { useDoctorSearch, useCategories } from "@/lib/hooks/useDoctors";

const EmptyState = ({ icon, title, description }) => (
  <div className="text-center py-12">
    <span className="material-symbols-outlined text-6xl text-secondary mb-4">
      {icon}
    </span>
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-secondary">{description}</p>
  </div>
);

export default function PatientFindDoctorPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("-created_at");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    searchType: "category",
    ordering: "-created_at"
  });

  const { categories, isLoading: categoriesLoading } = useCategories();
  const { doctors, isLoading: isSearching, error: searchError } = useDoctorSearch(
    searchParams, 
    hasSearched
  );

  const sortOptions = [
    { value: "-created_at", label: "Newest First" },
    { value: "created_at", label: "Oldest First" },
    { value: "-years_of_experience", label: "Most Experienced" },
    { value: "years_of_experience", label: "Least Experienced" }
  ];

  const handleCategorySelect = useCallback((categoryValue) => {
    setHasSearched(true);
    setSearchParams({
      category: categoryValue,
      searchType: "category",
      ordering: sortBy
    });
  }, [sortBy]);

  const handleSearchGeneral = useCallback((searchValue) => {
    setHasSearched(true);
    setSearchParams({
      searchTerm: searchValue,
      searchType: "general",
      ordering: sortBy
    });
  }, [sortBy]);

  const handleSearch = useCallback(() => {
    if (searchTerm.trim()) {
      handleSearchGeneral(searchTerm);
    }
  }, [searchTerm, handleSearchGeneral]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Find a Doctor</h1>
        <p className="text-secondary mt-1">
          Search for qualified healthcare professionals by category
        </p>
      </div>

      <SearchFilters
        search={searchTerm}
        setSearch={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onCategorySelect={handleCategorySelect}
        onSearchGeneral={handleSearchGeneral}
        onSearch={handleSearch}
        isLoading={isSearching}
        categories={categories}
        categoriesLoading={categoriesLoading}
        sortOptions={sortOptions}
      />

      <div className="flex flex-col gap-4">
        {searchError && (
          <div className="bg-error/10 border border-error text-error px-4 py-3 rounded">
            <p>Error loading doctors: {searchError.message}</p>
          </div>
        )}

        {!hasSearched ? (
          <EmptyState
            icon="search"
            title="Start Your Search"
            description='Type a doctor category to begin (e.g., "Cardiologist", "Pediatrician")'
          />
        ) : isSearching ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color" />
            <p className="text-secondary mt-2">Searching for doctors...</p>
          </div>
        ) : doctors.length > 0 ? (
          <>
            <div className="text-sm text-secondary">
              Found {doctors.length} doctor{doctors.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {doctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon="search_off"
            title="No doctors found"
            description="Try searching for a different category"
          />
        )}
      </div>
    </div>
  );
}