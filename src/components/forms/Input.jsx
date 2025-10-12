"use client";

import React, { memo, forwardRef } from "react";
import PropTypes from "prop-types";

export const Input = memo(forwardRef(({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  success,
  hint,
  icon,
  className = "",
  ...props
}, ref) => {
  const baseClasses = "form-input w-full";
  const iconClasses = icon ? "form-input-with-icon pl-12" : "";
  const errorClasses = error ? "border-error" : "";
  const successClasses = success ? "border-success" : "";
  
  const inputClasses = [
    baseClasses,
    iconClasses,
    errorClasses,
    successClasses,
    className
  ].filter(Boolean).join(" ");

  return (
    <div className="form-group">
      <div className="relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
         
          className={inputClasses}
          {...props}
        />
        {icon && (
          <span className="material-symbols-outlined form-icon">
            {icon}
          </span>
        )}
      </div>
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}
      {hint && !error && !success && <p className="form-hint">{hint}</p>}
    </div>
  );
})); // Added semicolon here

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  hint: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default Input;