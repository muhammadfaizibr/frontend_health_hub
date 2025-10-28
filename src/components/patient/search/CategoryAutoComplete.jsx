"use client";

import React, { useState, useRef, useEffect } from "react";

export default function CategoryAutocomplete({
  value,
  onChange,
  onSelectCategory,
  onSearchGeneral,
  categories,
  isLoading,
  placeholder = "Search by doctor category..."
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Filter categories based on input
    if (value.trim()) {
      const filtered = categories.filter(cat =>
        cat.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCategories([]);
      setShowDropdown(false);
    }
  }, [value, categories]);

  useEffect(() => {
    // Click outside handler
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCategory = (category) => {
    onChange(category.label);
    onSelectCategory(category.value);
    setShowDropdown(false);
  };

  const handleSearchGeneral = () => {
    onSearchGeneral(value);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCategories.length > 0) {
        handleSelectCategory(filteredCategories[0]);
      } else {
        handleSearchGeneral();
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <div className="relative">
        <span className="material-symbols-outlined text-secondary text-xl absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          search
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.trim() && setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="form-input form-input-with-icon"
          autoComplete="off"
        />
      </div>

      {showDropdown && value.trim() && (
        <div className="absolute z-50 w-full mt-2 bg-surface border border-light rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-6 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-primary-color border-t-transparent"></div>
              <p className="text-secondary text-sm mt-2">Loading categories...</p>
            </div>
          ) : (
            <>
              {filteredCategories.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-secondary uppercase bg-surface-secondary border-b border-light sticky top-0 z-10">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        category
                      </span>
                      Doctor Categories
                    </span>
                  </div>
                  <div className="py-1">
                    {filteredCategories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleSelectCategory(category)}
                        className="w-full px-4 py-3 text-left hover:bg-surface-secondary transition-colors flex items-center gap-3 border-b border-light last:border-0 group"
                      >
                        <span className="material-symbols-outlined text-primary-color group-hover:scale-110 transition-transform">
                          medical_services
                        </span>
                        <span className="text-primary font-medium group-hover:text-primary-color transition-colors">
                          {category.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              {/* Always show "Search for..." option */}
              <button
                onClick={handleSearchGeneral}
                className="w-full px-4 py-3 text-left hover:bg-primary-alpha-10 transition-colors flex items-center gap-3 border-t-2 border-light bg-surface-secondary/50"
              >
                <span className="material-symbols-outlined text-primary-color">
                  manage_search
                </span>
                <div className="flex-1">
                  <div className="text-primary font-semibold">
                    Search for "{value}"
                  </div>
                  <div className="text-xs text-secondary mt-0.5">
                    Search in doctor names and other fields
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary text-sm">
                  arrow_forward
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}