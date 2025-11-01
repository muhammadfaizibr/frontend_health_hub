"use client";

import React from "react";
import PropTypes from "prop-types";

export const Tabs = ({ 
  tabs, 
  activeTab, 
  onChange,
  showCounts = false,
  variant = "underline",
  className = "" 
}) => {
  const getVariantClasses = () => {
    if (variant === "pills") {
      return {
        container: "flex gap-2",
        button: (isActive) => `
          px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
          ${isActive
            ? "text-inverse bg-primary-color shadow-md"
            : "text-secondary hover:bg-surface-secondary hover:text-primary"
          }
        `
      };
    }
    
    // Default: underline variant
    return {
      container: "border-b border-color flex gap-2 sm:gap-4 md:gap-8",
      button: (isActive) => `
        py-2 sm:py-3 px-2 sm:px-4 border-b-2 font-medium text-sm 
        transition-all whitespace-nowrap -mb-px
        ${isActive
          ? "border-primary-color text-primary-color"
          : "border-transparent text-secondary hover:text-primary hover:border-color"
        }
      `
    };
  };

  const variantClasses = getVariantClasses();

  return (
    <div className={`${variantClasses.container} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          disabled={tab.disabled}
          className={`
            ${variantClasses.button(activeTab === tab.id)}
            ${tab.disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {tab.label}
          {showCounts && tab.count !== undefined && (
            <span className={`ml-2 ${activeTab === tab.id ? "opacity-90" : "opacity-60"}`}>
              ({tab.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number,
      disabled: PropTypes.bool
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showCounts: PropTypes.bool,
  variant: PropTypes.oneOf(["underline", "pills"]),
  className: PropTypes.string
};

export default Tabs;