// lib/api/utils/response-handler.js

/**
 * Centralized response handler for API requests
 * @param {Object} response - Axios response object
 * @param {string} successMessage - Optional success message to log
 * @returns {any} - Response data
 */
export const handleApiResponse = (response, successMessage) => {
  if (successMessage) {
    console.log(`✅ ${successMessage}`);
  }

  return response.data;
};

/**
 * Handle response with specific data extraction
 * @param {Object} response - Axios response object
 * @param {string} dataKey - Key to extract from response.data
 * @param {string} successMessage - Optional success message to log
 * @returns {any} - Extracted data
 */
export const handleApiResponseWithKey = (
  response,
  dataKey,
  successMessage
) => {
  if (successMessage) {
    console.log(`✅ ${successMessage}`);
  }

  return dataKey ? response.data[dataKey] : response.data;
};