// app/(auth)/login/page.jsx

"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { platformName } from "@/config/global";
import { validateEmail } from "@/lib/utils/global";
import { ERROR_MESSAGES } from "@/constants";
import { authService } from "@/lib/api/services/auth";
import { useAuthStore } from "@/lib/store/auth-store";

/**
 * Login Page Component
 * Handles user authentication and role-based redirection
 */
export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  /**
   * Check if user is already logged in on component mount
   */
  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const role = authService.getUserRole();
        
        if (role) {
          console.log('✅ User already logged in, redirecting to dashboard');
          redirectToDashboard(role);
        }
      }
    };

    checkAuth();
  }, []);

  /**
   * Handle input field changes
   */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // Clear API error
    if (apiError) {
      setApiError("");
    }
  }, [errors, apiError]);

  /**
   * Validate form fields
   * @returns {boolean} - Whether form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.REQUIRED;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = ERROR_MESSAGES.REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Redirect user to their role-based dashboard
   * @param {string} role - User role
   */
  const redirectToDashboard = (role) => {
    const normalizedRole = role.toLowerCase();
    
    const dashboardMap = {
      'doctor': '/doctor',
      'patient': '/patient',
      'translator': '/translator',
      'organization': '/organization',
    };

    const dashboardPath = dashboardMap[normalizedRole];
    
    if (dashboardPath) {
      router.push(dashboardPath);
    } else {
      setApiError('Invalid user role. Please contact support.');
      setIsLoading(false);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setApiError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Login API call
      const response = await authService.login(
        formData.email,
        formData.password
      );
      
      // Store user data
      setUser(response.user);

      // Get user role and redirect
      const role = (response.user.role || '').toLowerCase();
      
      if (!role) {
        throw new Error('User role not found');
      }

      console.log('✅ Login successful, redirecting to:', role, 'dashboard');

      // Redirect to appropriate dashboard
      redirectToDashboard(role);

    } catch (error) {
      console.error('❌ Login error:', error);
      setApiError(error.message || ERROR_MESSAGES.LOGIN_FAILED);
      setIsLoading(false);
    }
  }, [formData, setUser, validateForm]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <span className="material-symbols-outlined text-primary-color text-4xl">
              local_hospital
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Sign in to your {platformName} account
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* API Error Alert */}
          {apiError && (
            <div className="alert alert-error">
              <span className="material-symbols-outlined">error</span>
              {apiError}
            </div>
          )}

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              icon="email"
              disabled={isLoading}
              autoComplete="email"
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              icon="lock"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="form-checkbox"
                disabled={isLoading}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-secondary"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forget-password"
                className="text-primary-color hover:text-primary-dark"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-secondary">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary-color hover:text-primary-dark font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-secondary hover:text-primary"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}