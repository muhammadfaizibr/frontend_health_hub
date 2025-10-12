"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { validateEmail } from "@/lib/utils";
import { ERROR_MESSAGES } from "@/constants";
import { authService } from "@/lib/api/services/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import Link from "next/link";

export function LoginForm({ onSuccess }) {
  const setUser = useAuthStore((state) => state.setUser);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setApiError("");
    
    try {
      const { email, password } = formData;
      const response = await authService.login(email, password);
      
      if (response.success) {
        setUser(response.user);
        onSuccess(response.user.role);
      } else {
        setApiError(response.message || ERROR_MESSAGES.LOGIN_FAILED);
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError(error.message || ERROR_MESSAGES.LOGIN_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && (
        <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
          {apiError}
        </div>
      )}
      
      <div className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          disabled={isLoading}
          required
        />
        
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link href="/forgot-password" className="text-primary hover:text-primary-dark">
            Forgot your password?
          </Link>
        </div>
      </div>
      
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign in
      </Button>
      
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
          Sign up
        </Link>
      </div>
    </form>
  );
}