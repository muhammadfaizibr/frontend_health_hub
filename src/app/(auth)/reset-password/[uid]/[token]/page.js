// app/(auth)/reset-password/[uid]/[token]/page.jsx

"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { platformName } from "@/config/global";
import { ERROR_MESSAGES } from "@/constants";
import { authService } from "@/lib/api/services/auth";

/**
 * Reset Password Page Component
 * Handles password reset with token verification
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const { uid, token } = params;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Check if user is already logged in on component mount
   */
  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const role = authService.getUserRole();

        if (role) {
          console.log("✅ User already logged in, redirecting to dashboard");
          redirectToDashboard(role);
        }
      }
    };

    checkAuth();
  }, []);

  /**
   * Validate token on mount
   */
  useEffect(() => {
    if (!uid || !token) {
      setApiError("Invalid reset link. Please request a new password reset.");
    }
  }, [uid, token]);

  /**
   * Handle input field changes
   */
  const handleInputChange = useCallback(
    (e) => {
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
    },
    [errors, apiError]
  );

  /**
   * Validate password strength
   * @param {string} password
   * @returns {string|null} - Error message or null if valid
   */
  const validatePassword = (password) => {
    if (!password) {
      return ERROR_MESSAGES.REQUIRED;
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return "Password must contain at least one special character (@$!%*?&)";
    }
    return null;
  };

  /**
   * Validate form fields
   * @returns {boolean} - Whether form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = ERROR_MESSAGES.REQUIRED;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      doctor: "/doctor",
      patient: "/patient",
      translator: "/translator",
      organization: "/organization",
    };

    const dashboardPath = dashboardMap[normalizedRole];

    if (dashboardPath) {
      router.push(dashboardPath);
    } else {
      setApiError("Invalid user role. Please contact support.");
      setIsLoading(false);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setApiError("");
      setErrors({});
      setResetSuccess(false);

      // Validate form
      if (!validateForm()) {
        return;
      }

      // Validate token exists
      if (!uid || !token) {
        setApiError("Invalid reset link. Please request a new password reset.");
        return;
      }

      setIsLoading(true);

      try {
        // Reset Password API call
        const response = await authService.resetPassword(
          {uid:uid,
          token: token,
          new_password: formData.password,
          confirm_new_password: formData.confirmPassword}
        );

        setResetSuccess(true);
        setIsLoading(false);

        console.log("✅ Password reset successful");

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
              if (error.type === "validation" && error.errors) {
                setErrors(error.errors);
              } else {
                setApiError(error.message || ERROR_MESSAGES.LOGIN_FAILED);
              }
              setIsLoading(false);
            }
          
    },
    [formData, uid, token, router, validateForm]
  );

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Toggle confirm password visibility
   */
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <span className="material-symbols-outlined text-primary-color text-4xl">
              lock_reset
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Enter your new password for {platformName}.
          </p>
        </div>

        {/* Reset Password Form */}
        <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Success Message */}
          {resetSuccess && (
            <div className="alert alert-success">
              <span className="material-symbols-outlined">check_circle</span>
              <div>
                <strong>Password reset successful!</strong>
                <p className="text-sm">Redirecting to login page...</p>
              </div>
            </div>
          )}

          {/* API Error Alert */}
          {(apiError || errors?.token) && (
            <div className="alert alert-error">
              <span className="material-symbols-outlined">error</span>
              {apiError || errors?.token}
            </div>
          )}

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* New Password Field */}
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.new_password}
                icon="lock"
                disabled={isLoading || resetSuccess}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                disabled={isLoading || resetSuccess}
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirm_new_password}
                icon="lock"
                disabled={isLoading || resetSuccess}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                disabled={isLoading || resetSuccess}
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-xl">
                  {showConfirmPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading || resetSuccess}
          >
            {isLoading
              ? "Resetting Password..."
              : resetSuccess
              ? "Password Reset!"
              : "Reset Password"}
          </Button>

          {/* Back to Login Link */}
          <div className="text-center">
            <p className="text-sm text-secondary">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-primary-color hover:text-primary-dark font-medium"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-sm text-secondary hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}