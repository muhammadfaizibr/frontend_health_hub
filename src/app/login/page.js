// app/(auth)/login/page.jsx

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { platformName } from "@/config/global";
import { authService } from "@/lib/api/services/auth";
import { LoginForm } from "@/components/forms/LoginForm";

/**
 * Login Page Component
 * Handles user authentication and role-based redirection
 */
export default function LoginPage() {
  const router = useRouter();

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
      'admin': '/admin'
    };
    
    const dashboardPath = dashboardMap[normalizedRole] || '/';
    router.push(dashboardPath);
  };

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
        <LoginForm onSuccess={redirectToDashboard} />

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