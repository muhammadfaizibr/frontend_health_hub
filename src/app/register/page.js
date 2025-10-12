// app/(auth)/register/page.jsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { platformName } from "@/config/global";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

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
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Join {platformName} today
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm onSuccess={redirectToDashboard} />
        
        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-color hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}