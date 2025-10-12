"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { validateEmail } from "@/lib/utils";
import { ERROR_MESSAGES } from "@/constants";
import { authService } from "@/lib/api/services/auth";
import { useAuthStore } from "@/lib/store/auth-store";

export function RegisterForm({ onSuccess }) {
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient"
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
      if (apiError) {
        setApiError("");
      }
    },
    [errors, apiError]
  );

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
    } else if (formData.password.length < 8) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_TOO_SHORT;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = ERROR_MESSAGES.REQUIRED;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setApiError("");
    
    try {
      const { email, password, role } = formData;
      const response = await authService.register(email, password, role);
      
      if (response.success) {
        setUser(response.user);
        onSuccess(response.user.role);
      } else {
        setApiError(response.message || ERROR_MESSAGES.REGISTRATION_FAILED);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(error.message || ERROR_MESSAGES.REGISTRATION_FAILED);
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
        
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          disabled={isLoading}
          required
        />
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">I am a:</label>
          <div className="flex gap-4">
            {["patient", "doctor", "translator", "organization"].map((role) => (
              <label key={role} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={formData.role === role}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="form-radio"
                />
                <span className="text-sm capitalize">{role}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        Create Account
      </Button>
      
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
          Sign in
        </Link>
      </div>
    </form>
  );
}