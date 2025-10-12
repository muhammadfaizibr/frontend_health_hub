"use client";

import React, { memo, useCallback } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import PropTypes from "prop-types";

export const Button = memo(({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  // Base button classes
  const baseClasses = "button gap-2 relative overflow-hidden";
  
  // Variant classes
  const variantClasses = {
    primary: "button-primary",
    secondary: "button-secondary", 
    outline: "button-outline",
    ghost: "button-ghost",
    link: "button-link",
    emergency: "button-emergency",
    social: "button-social"
  };

  // Size classes
  const sizeClasses = {
    sm: "button-sm",
    md: "",
    lg: "button-lg", 
    xl: "button-xl"
  };

  // Build className string
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    (isLoading || disabled) ? "button-disabled" : "",
    className
  ].filter(Boolean).join(" ");

  const handleClick = useCallback((e) => {
    if (isLoading || disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  }, [isLoading, disabled, onClick]);

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary", 
    "secondary", 
    "outline", 
    "ghost", 
    "link", 
    "emergency", 
    "social"
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
