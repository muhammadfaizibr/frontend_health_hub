"use client";

import React from "react";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import CategoryAutocomplete from "@/components/patient/search/CategoryAutoComplete";

export default function SearchFilters({ 
  search, 
  setSearch,
  sortBy,
  setSortBy,
  onCategorySelect,
  onSearchGeneral,
  onSearch,
  isLoading,
  categories,
  categoriesLoading,
  sortOptions
}) {
  return (
      <div className="flex flex-col gap-4">
        {/* Category Autocomplete Search */}
        <div className="flex gap-3 relative z-20">
          {/* Added relative z-20 to ensure dropdown appears above other elements */}
          <CategoryAutocomplete
            value={search}
            onChange={setSearch}
            onSelectCategory={onCategorySelect}
            onSearchGeneral={onSearchGeneral}
            categories={categories}
            isLoading={categoriesLoading}
            placeholder="Search by doctor category..."
          />
          <Button
            onClick={onSearch}
            isLoading={isLoading}
            className="px-8 whitespace-nowrap"
          >
            Search
          </Button>
        </div>

        {/* Sort Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={sortOptions}
            placeholder="Sort by"
          />
          
          {/* Optional: Add clear filters button */}
          <button
            onClick={() => {
              setSearch("");
              setSortBy("-created_at");
            }}
            className="button button-ghost text-sm flex items-center gap-2 justify-center"
          >
            <span className="material-symbols-outlined text-base">
              filter_alt_off
            </span>
            Clear Filters
          </button>
        </div>
      </div>
  );
}