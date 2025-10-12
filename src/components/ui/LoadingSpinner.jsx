"use client";

import React, { memo } from "react";
import PropTypes from "prop-types";

export const LoadingSpinner = memo(({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className={`spinner ${sizeClasses[size]} ${className}`}>
      <div className="spinner-inner"></div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  className: PropTypes.string,
};

export default LoadingSpinner;
