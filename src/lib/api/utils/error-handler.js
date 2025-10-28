// lib/api/utils/error-handler.js

/**
 * Centralized error handler for API requests
 * @param {Error} error - The error object from axios
 * @param {string} defaultMessage - Default error message if none found
 * @returns {Error} - Formatted error object
 */
export const handleApiError = (error, defaultMessage = "An error occurred") => {
  console.error("❌ API Error:", error);

  // Check for validation errors from backend
  const backendErrors = error.response?.data?.errors;
  if (backendErrors) {
    throw {
      type: "validation",
      errors: backendErrors,
    };
  }

  // Extract error message from various possible locations
  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    defaultMessage;

  throw new Error(message);
};

/**
 * Check if error is a validation error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  return error.type === "validation" && error.errors;
};