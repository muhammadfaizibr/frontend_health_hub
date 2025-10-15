"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { platformName } from "@/config/global";
import { validateName, validateEmail } from "@/lib/utils";
import { ERROR_MESSAGES } from "@/constants";
import { authService } from "@/lib/api/services/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { VALIDATION_RULES } from "@/constants";

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const role = authService.getUserRole();
        if (role) redirectToDashboard(role);
      }
    };
    checkAuth();
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value ?? "" 
      }));

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });

      if (apiError) setApiError("");
    },
    [apiError]
  );

  const validateForm = () => {
    const newErrors = {};

    const firstName = formData.first_name ?? "";
    if (firstName.trim() === "") {
      newErrors.first_name = ERROR_MESSAGES.REQUIRED;
    } else if (!validateName(firstName)) {
      newErrors.first_name = ERROR_MESSAGES.INVALID_NAME;
    } else if (firstName.length < VALIDATION_RULES.NAME_MIN_LENGTH){
      newErrors.first_name = ERROR_MESSAGES.NAME_TOO_SHORT;
    } else if (firstName.length > VALIDATION_RULES.NAME_MAX_LENGTH){
      newErrors.first_name = ERROR_MESSAGES.NAME_TOO_LONG;
    }

    const lastName = formData.last_name ?? "";
    if (lastName.trim() === "") {
      newErrors.last_name = ERROR_MESSAGES.REQUIRED;
    } else if (!validateName(lastName)) {
      newErrors.last_name = ERROR_MESSAGES.INVALID_NAME;
    } else if (lastName.length < VALIDATION_RULES.NAME_MIN_LENGTH){
      newErrors.last_name = ERROR_MESSAGES.NAME_TOO_SHORT;
    } else if (lastName.length > VALIDATION_RULES.NAME_MAX_LENGTH){
      newErrors.last_name = ERROR_MESSAGES.NAME_TOO_LONG;
    }
    
    const email = formData.email ?? "";
    if (email.trim() === "") {
      newErrors.email = ERROR_MESSAGES.REQUIRED;
    } else if (!validateEmail(email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    const password = formData.password ?? "";
    if (password.trim() === "") {
      newErrors.password = ERROR_MESSAGES.REQUIRED;
    }

    const confirmPassword = formData.confirm_password ?? "";
    if (confirmPassword.trim() === "") {
      newErrors.confirm_password = ERROR_MESSAGES.REQUIRED;
    } else if (password !== confirmPassword) {
      newErrors.confirm_password = ERROR_MESSAGES.PASSWORD_MISMATCH;
    }

    setErrors(newErrors);
    console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  };

  const redirectToDashboard = (role) => {
    const normalizedRole = role.toLowerCase();
    const dashboardMap = {
      doctor: "/doctor",
      patient: "/patient",
      translator: "/translator",
      organization: "/organization",
    };

    const path = dashboardMap[normalizedRole];
    if (path) {
      router.push(path);
    } else {
      setApiError("Invalid user role. Please contact support.");
      setIsLoading(false);
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      
      setApiError("");
      setErrors({});
      setEmailSent(false);

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await authService.register({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
        });

        setUser(response.user);

        const role = (response.user.role || "").toLowerCase();
        if (!role) throw new Error("User role not found");
        redirectToDashboard(role);
      } catch (error) {
        if (error.type === "validation" && error.errors) {
          // const fieldErrors = {};
          // Object.keys(error.errors).forEach((key) => {
          //   const errorValue = error.errors[key];
          //   fieldErrors[key] = Array.isArray(errorValue)
          //     ? errorValue[0]
          //     : errorValue;
          // });
          setErrors(error.errors);
        } else {
          setApiError(error.messages || ERROR_MESSAGES.LOGIN_FAILED);
        }
        setIsLoading(false);
      }
    },
    [formData, setUser, router]
  );

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col gap-8">
        <div className="text-center">
          <div className="flex justify-center">
            <span className="material-symbols-outlined text-primary-color text-4xl">
              person_add
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Sign up to join {platformName}
          </p>
        </div>

        <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          {apiError && (
            <div className="alert alert-error">
              <span className="material-symbols-outlined">error</span>
              {apiError}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Input
              name="first_name"
              type="text"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
              error={errors.first_name}
              icon="account"
              disabled={isLoading}
            />
            <Input
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
              error={errors.last_name}
              icon="account"
              disabled={isLoading}
            />
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
              autoComplete="new-password"
            />
            <Input
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              error={errors.confirm_password}
              icon="lock"
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-secondary">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary-color hover:text-primary-dark font-medium"
              >
                Log in here
              </Link>
            </p>
          </div>
        </form>

        <div className="text-center">
          <Link href="/" className="text-sm text-secondary hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}