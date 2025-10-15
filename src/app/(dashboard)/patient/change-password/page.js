// app/(dashboard)/settings/change-password/page.jsx

"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { platformName } from "@/config/global";
import { ERROR_MESSAGES, VALIDATION_RULES } from "@/constants";
import { authService } from "@/lib/api/services/auth";
import { useAuth } from "@/lib/hooks/useAuth";

/**
 * Change Password Page Component
 * Allows authenticated users to change their password
 */
export default function ChangePasswordPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      // Clear API error and success message
      if (apiError) {
        setApiError("");
      }
      if (changeSuccess) {
        setChangeSuccess(false);
      }
    },
    [errors, apiError, changeSuccess]
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
    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
      return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
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

    // Current password validation
    if (!formData.currentPassword) {
      newErrors.currentPassword = ERROR_MESSAGES.REQUIRED;
    }

    // New password validation
    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      newErrors.newPassword = passwordError;
    }

    // Check if new password is same as current password
    if (formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = ERROR_MESSAGES.REQUIRED;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = ERROR_MESSAGES.PASSWORD_MISMATCH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setApiError("");
      setErrors({});
      setChangeSuccess(false);

      // Validate form
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);

      try {
        // Change Password API call
        await authService.changePassword({
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
          confirm_new_password: formData.confirmPassword,
        });

        setChangeSuccess(true);
        setIsLoading(false);

        // Clear form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        console.log("✅ Password changed successfully");

        // Optional: Auto-redirect after 3 seconds
        // setTimeout(() => {
        //   router.push("/settings");
        // }, 3000);
      } catch (error) {
        console.error("❌ Change Password error:", error);

        if (error.type === "validation" && error.errors) {
          setErrors(error.errors);
        } else {
          setApiError(
            error.message || "Failed to change password. Please try again."
          );
        }
        setIsLoading(false);
      }
    },
    [formData, validateForm]
  );

  /**
   * Toggle password visibility
   */
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

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
              vpn_key
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Change Password
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Update your password for {platformName}.
          </p>
          {user && (
            <p className="mt-1 text-xs text-secondary">
              Logged in as: <strong>{user.email}</strong>
            </p>
          )}
        </div>

        {/* Change Password Form */}
        <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Success Message */}
          {changeSuccess && (
            <div className="alert alert-success">
              <span className="material-symbols-outlined">check_circle</span>
              <div>
                <strong>Password changed successfully!</strong>
                <p className="text-sm">Your password has been updated.</p>
              </div>
            </div>
          )}

          {/* API Error Alert */}
          {apiError && (
            <div className="alert alert-error">
              <span className="material-symbols-outlined">error</span>
              {apiError}
            </div>
          )}

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Current Password Field */}
            <div className="relative">
              <Input
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                error={errors.current_password || errors.currentPassword}
                icon="lock"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={toggleCurrentPasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                disabled={isLoading}
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-xl">
                  {showCurrentPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <Input
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={formData.newPassword}
                onChange={handleInputChange}
                error={errors.new_password || errors.newPassword}
                icon="lock"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                disabled={isLoading}
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-xl">
                  {showNewPassword ? "visibility_off" : "visibility"}
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
                error={errors.confirm_new_password || errors.confirmPassword}
                icon="lock"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                disabled={isLoading}
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
            disabled={isLoading}
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </Button>

          {/* Back to Settings Link */}
          <div className="text-center">
            <p className="text-sm text-secondary">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-primary-color hover:text-primary-dark font-medium"
              >
                ← Back to Settings
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}