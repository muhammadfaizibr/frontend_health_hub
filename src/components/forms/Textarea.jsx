"use client";

import React, { memo, forwardRef } from "react";
import PropTypes from "prop-types";

export const Textarea = memo(forwardRef(({
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  success,
  hint,
  placeholder,
  rows = 4,
  className = "",
  ...props
}, ref) => {
  const baseClasses = "form-input form-textarea w-full";
  const errorClasses = error ? "border-error" : "";
  const successClasses = success ? "border-success" : "";
  
  const textareaClasses = [
    baseClasses,
    errorClasses,
    successClasses,
    className
  ].filter(Boolean).join(" ");

  return (
    <div className="form-group">
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
       
        placeholder={placeholder}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}
      {hint && !error && !success && <p className="form-hint">{hint}</p>}
    </div>
  );
}));

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  hint: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  className: PropTypes.string,
};

export default Textarea;