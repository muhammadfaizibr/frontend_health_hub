"use client";

import React from "react";
import PropTypes from "prop-types";

export const Badge = ({ 
  children, 
  variant = "default",
  size = "md",
  className = "" 
}) => {
  const getVariantClass = () => {
    const normalized = variant?.toLowerCase().replace(/\s+/g, '_') || "default";
    
    const variantMap = {
      // Generic variants
      default: "badge-secondary",
      primary: "badge-primary",
      success: "badge-success",
      error: "badge-error",
      warning: "badge-warning",
      info: "badge-info",
      
      // Case statuses
      open: "badge-info",
      in_progress: "badge-warning",
      closed: "badge-secondary",
      
      // Appointment statuses
      confirmed: "badge-success",
      pending: "badge-warning",
      cancelled: "badge-error",
      completed: "badge-info",
      conducted: "badge-info",
      
      // Generic statuses
      active: "badge-success",
      inactive: "badge-error",
      expired: "badge-error"
    };

    return variantMap[normalized] || "badge-secondary";
  };

  const getSizeClass = () => {
    const sizes = {
      sm: "text-2xs px-2 py-1",
      md: "text-xs px-3 py-1",
      lg: "text-sm px-4 py-2"
    };
    return sizes[size] || sizes.md;
  };

  return (
    <span className={`badge ${getVariantClass()} ${getSizeClass()} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string
};

export default Badge;