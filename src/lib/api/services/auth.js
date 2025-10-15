// lib/api/services/auth.js

import { ApiError } from "next/dist/server/api-utils";
import { apiClient } from "../axios";
import { API_ENDPOINTS } from "../endpoints";
import { useAuthStore } from "@/lib/store/auth-store";
import Cookies from "js-cookie";

/**
 * Authentication Service
 * Handles all authentication-related API calls and token management
 */
class AuthService {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data with tokens
   */
  async login(email, password) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      const { user, access_token, refresh_token } = response.data;

      // Store tokens in HTTP-only cookies for security
      this._setAuthCookies(access_token, refresh_token);

      // Store user data in Zustand store
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setAuthenticated(true);

      console.log("✅ Login successful, user role:", user.role);

      return response.data;
    } catch (error) {
      console.error("❌ Login failed:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      throw new Error(message);
    }
  }
  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - User data with tokens
   */
  async register(userData) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );

      const {
        user,
        access_token: accessToken,
        refresh_token: refreshToken,
      } = response.data;

      if (!user) {
        throw new Error("User data missing from response");
      }

      this._setAuthCookies(accessToken, refreshToken);

      const authState = useAuthStore.getState();
      authState.setUser(user);
      authState.setAuthenticated(true);

      return response.data;
    } catch (error) {
      console.error("❌ Registration failed:", error);

      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        throw { type: "validation", errors: backendErrors };
      }

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";

      throw new Error(message);
    }
  }

  /**
   * Logout current user
   * Clears tokens and user data
   */
  async logout() {
    try {
      // Call logout endpoint to blacklist refresh token
      const refreshToken = Cookies.get("refresh_token");

      if (refreshToken) {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {
          refresh_token: refreshToken,
        });
      }
    } catch (error) {
      console.error("❌ Logout API error:", error);
      // Continue with local cleanup even if API fails
    } finally {
      // Clear cookies
      this._clearAuthCookies();

      // Clear store
      useAuthStore.getState().logout();

      console.log("✅ Logout successful");
    }
  }

  /**
   * Get current authenticated user
   * @returns {Promise<Object>} - User data
   */
  async getCurrentUser() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      const user = response.data.user;

      // Update store with fresh user data
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setAuthenticated(true);

      return user;
    } catch (error) {
      console.error("❌ Get current user failed:", error);

      // Clear invalid auth state
      this._clearAuthCookies();
      useAuthStore.getState().logout();

      throw error;
    }
  }

  /**
   * Get access token from cookies
   * @returns {string|undefined} - Access token
   */
  getAccessToken() {
    return Cookies.get("access_token");
  }

  /**
   * Get refresh token from cookies
   * @returns {string|undefined} - Refresh token
   */
  getRefreshToken() {
    return Cookies.get("refresh_token");
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} - Authentication status
   */
  isAuthenticated() {
    return !!this.getAccessToken();
  }

  /**
   * Get user role from token
   * @returns {string|null} - User role or null
   */
  getUserRole() {
    try {
      const token = this.getAccessToken();
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
  }

// Fix for authService.forgetPassword method
async forgetPassword(email) {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGET_PASSWORD, {
      email,
    });

    console.log("✅ Forget password email sent to:", email);

    return response.data;
  } catch (error) {
    console.error("❌ Forget password failed:", error);

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to send reset email. Please try again.";
    throw new Error(message);
  }
}

// In your authService

async resetPassword(data) {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);

    console.log("✅ Password reset successful");

    return response.data;
  } catch (error) {
      console.error("❌ Reset password failed:", error);

      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        throw { type: "validation", errors: backendErrors };
      }

      const message =
        error.response?.data?.message || 
        error.response?.data?.error ||
      "Failed to reset password. The link may have expired.";

      throw new Error(message);
    }
  }

// In lib/api/services/auth.js - Add this method to the AuthService class

/**
 * Change user password
 * @param {Object} data - Password change data
 * @returns {Promise<Object>} - Response data
 */
async changePassword(data) {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      data
    );

    console.log("✅ Password changed successfully");

    return response.data;
  } catch (error) {
    console.error("❌ Change password failed:", error);

    const backendErrors = error.response?.data?.errors;
    if (backendErrors) {
      throw { type: "validation", errors: backendErrors };
    }

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to change password. Please check your current password.";

    throw new Error(message);
  }
}

  /**
   * Private: Set authentication cookies
   * @param {string} accessToken - Access token
   * @param {string} refreshToken - Refresh token
   */
  _setAuthCookies(accessToken, refreshToken) {
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
  }

  /**
   * Private: Clear authentication cookies
   */
  _clearAuthCookies() {
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
  }
}

// Export singleton instance
export const authService = new AuthService();
