// app/(auth)/forget-password/page.jsx

"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { platformName } from "@/config/global";
import { validateEmail } from "@/lib/utils";
import { ERROR_MESSAGES } from "@/constants";
import { authService } from "@/lib/api/services/auth";
import { useAuthStore } from "@/lib/store/auth-store";

/**
 * Forget Password Page Component
 * Handles password reset email sending
 */
export default function ForgetPasswordPage() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
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
          console.log("✅ User already logged in, redirecting to dashboard");
          redirectToDashboard(role);
        }
      }
    };

    checkAuth();
  }, []);

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
      setEmailSent(false);
      
      // Validate form
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);

      try {
        // Forget Password API call
        const response = await authService.forgetPassword(formData.email);

        setEmailSent(true);
        setIsLoading(false);

        console.log("✅ Reset Password Email Sent. Please check your inbox.");
      } catch (error) {
        console.error("❌ Forget Password error:", error);
        setApiError(error.message || ERROR_MESSAGES.LOGIN_FAILED);
        setIsLoading(false);
      }
    },
    [formData, validateForm]
  );

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
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Enter your email to reset your password for {platformName}.
          </p>
        </div>

        {/* Forget Password Form */}
        <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Success Message */}
          {emailSent && (
            <div className="alert alert-success">
              <span className="material-symbols-outlined">check_circle</span>
              <div>
                <strong>Email sent successfully!</strong>
                <p className="text-sm">Please check your inbox for password reset instructions.</p>
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
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              icon="email"
              disabled={isLoading || emailSent}
              autoComplete="email"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading || emailSent}
          >
            {isLoading ? "Sending Request..." : emailSent ? "Email Sent" : "Send Reset Link"}
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