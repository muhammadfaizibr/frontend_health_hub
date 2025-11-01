import { apiClient } from "../axios";
import { handleApiError } from "./error-handler";
import { handleApiResponse } from "./response-handler";

/**
 * Wrapper for GET requests
 */
export const apiGet = async (endpoint, config = {}, successMessage = null) => {
  try {
    console.log(endpoint, 'endpoint');
    const response = await apiClient.get(endpoint, config);
    console.log(response, 'response');
    return handleApiResponse(response, successMessage);
  } catch (error) {
    handleApiError(error, "GET request failed");
  }
};

/**
 * Wrapper for POST requests
 */
export const apiPost = async (
  endpoint,
  data = {},
  config = {},
  successMessage = null
) => {
  try {
    const response = await apiClient.post(endpoint, data, config);
    return handleApiResponse(response, successMessage);
  } catch (error) {
    handleApiError(error, "POST request failed");
  }
};

/**
 * Wrapper for PUT requests
 */
export const apiPut = async (
  endpoint,
  data = {},
  config = {},
  successMessage = null
) => {
  try {
    const response = await apiClient.put(endpoint, data, config);
    return handleApiResponse(response, successMessage);
  } catch (error) {
    handleApiError(error, "PUT request failed");
  }
};

/**
 * Wrapper for PATCH requests
 */
export const apiPatch = async (
  endpoint,
  data = {},
  config = {},
  successMessage = null
) => {
  try {
    const response = await apiClient.patch(endpoint, data, config);
    return handleApiResponse(response, successMessage);
  } catch (error) {
    handleApiError(error, "PATCH request failed");
  }
};

/**
 * Wrapper for DELETE requests
 */
export const apiDelete = async (
  endpoint,
  config = {},
  successMessage = null
) => {
  try {
    const response = await apiClient.delete(endpoint, config);
    return handleApiResponse(response, successMessage);
  } catch (error) {
    handleApiError(error, "DELETE request failed");
  }
};