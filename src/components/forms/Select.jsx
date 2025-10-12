"use client";

import React, { memo, forwardRef } from "react";
import PropTypes from "prop-types";

export const Select = memo(forwardRef(({
  value,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  error,
  success,
  hint,
  placeholder,
  options = [],
  className = "",
  ...props
}, ref) => {
  const baseClasses = "form-input form-select w-full";
  const errorClasses = error ? "border-error" : "";
  const successClasses = success ? "border-success" : "";
  
  const selectClasses = [
    baseClasses,
    errorClasses,
    successClasses,
    className
  ].filter(Boolean).join(" ");

  return (
    <div className="form-group">
      <select
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
       
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}
      {hint && !error && !success && <p className="form-hint">{hint}</p>}
    </div>
  );
}));

Select.displayName = 'Select';

Select.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  hint: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

export default Select;