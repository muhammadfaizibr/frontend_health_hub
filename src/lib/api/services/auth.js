// lib/api/services/auth-service.js

import { apiGet, apiPost, apiPut } from "../utils/api-wrapper";
import { API_ENDPOINTS } from "../endpoints";
import { useAuthStore } from "@/lib/store/auth-store";
import Cookies from "js-cookie";

/**
 * Set authentication cookies
 * @param {string} accessToken - Access token
 * @param {string} refreshToken - Refresh token
 */
const setAuthCookies = (accessToken, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    expires: 30, // 30 days
    sameSite: "strict",
    secure: isProduction,
    path: "/",
  };

  // Set access token (30 days)
  Cookies.set("access_token", accessToken, cookieOptions);

  // Set refresh token (7 days)
  Cookies.set("refresh_token", refreshToken, {
    ...cookieOptions,
    expires: 7,
  });
};

/**
 * Clear authentication cookies
 */
const clearAuthCookies = () => {
  Cookies.remove("access_token", { path: "/" });
  Cookies.remove("refresh_token", { path: "/" });
};

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data with tokens
 */
export const login = async (email, password) => {
  const data = await apiPost(
    API_ENDPOINTS.AUTH.LOGIN,
    { email, password },
    {},
    "Login successful"
  );

  const { user, access_token, refresh_token } = data;

  // Store tokens in HTTP-only cookies for security
  setAuthCookies(access_token, refresh_token);

  // Store user data in Zustand store
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setAuthenticated(true);

  console.log("User role:", user.role);

  return data;
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - User data with tokens
 */
export const register = async (userData) => {
  const data = await apiPost(
    API_ENDPOINTS.AUTH.REGISTER,
    userData,
    {},
    "Registration successful"
  );

  const {
    user,
    access_token: accessToken,
    refresh_token: refreshToken,
  } = data;

  if (!user) {
    throw new Error("User data missing from response");
  }

  setAuthCookies(accessToken, refreshToken);

  const authState = useAuthStore.getState();
  authState.setUser(user);
  authState.setAuthenticated(true);

  return data;
};

/**
 * Logout current user
 * Clears tokens and user data
 */
export const logout = async () => {
  try {
    // Call logout endpoint to blacklist refresh token
    const refreshToken = Cookies.get("refresh_token");

    if (refreshToken) {
      await apiPost(
        API_ENDPOINTS.AUTH.LOGOUT,
        { refresh_token: refreshToken },
        {},
        "Logout successful"
      );
    }
  } catch (error) {
    console.error("❌ Logout API error:", error);
    // Continue with local cleanup even if API fails
  } finally {
    // Clear cookies
    clearAuthCookies();

    // Clear store
    useAuthStore.getState().logout();
  }
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} - User data
 */
export const getCurrentUser = async () => {
  try {
    const data = await apiGet(API_ENDPOINTS.AUTH.PROFILE);
    const user = data.user;

    // Update store with fresh user data
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setAuthenticated(true);

    return user;
  } catch (error) {
    // Clear invalid auth state
    clearAuthCookies();
    useAuthStore.getState().logout();

    throw error;
  }
};

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<Object>} - Response data
 */
export const forgetPassword = async (email) => {
  const data = await apiPost(
    API_ENDPOINTS.AUTH.FORGET_PASSWORD,
    { email },
    {},
    `Forget password email sent to: ${email}`
  );

  return data;
};

/**
 * Reset password with token
 * @param {Object} data - Password reset data
 * @returns {Promise<Object>} - Response data
 */
export const resetPassword = async (data) => {
  const response = await apiPost(
    API_ENDPOINTS.AUTH.RESET_PASSWORD,
    data,
    {},
    "Password reset successful"
  );

  return response;
};

/**
 * Change user password
 * @param {Object} data - Password change data
 * @returns {Promise<Object>} - Response data
 */
export const changePassword = async (data) => {
  const response = await apiPut(
    API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
    data,
    {},
    "Password changed successfully"
  );

  return response;
};

/**
 * Get access token from cookies
 * @returns {string|undefined} - Access token
 */
export const getAccessToken = () => {
  return Cookies.get("access_token");
};

/**
 * Get refresh token from cookies
 * @returns {string|undefined} - Refresh token
 */
export const getRefreshToken = () => {
  return Cookies.get("refresh_token");
};

/**
 * Check if user is authenticated
 * @returns {boolean} - Authentication status
 */
export const isAuthenticated = () => {
  return !!getAccessToken();
};

/**
 * Get user role from token
 * @returns {string|null} - User role or null
 */
export const getUserRole = () => {
  try {
    const token = getAccessToken();
    if (!token) return null;

    // Decode JWT payload
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    return payload.role?.toLowerCase() || null;
  } catch (error) {
    console.error("❌ Failed to get user role:", error);
    return null;
  }
};

// Export all functions as authService object for backward compatibility
export const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  forgetPassword,
  resetPassword,
  changePassword,
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  getUserRole,
};