"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CreateCaseForm from "@/components/patient/cases/CreateCaseForm";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { apiPost } from "@/lib/api/utils/api-wrapper";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export default function CreateCasePage() {
  const router = useRouter();
  const toast = useToastContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      const response = await apiPost(
        API_ENDPOINTS.PATIENT.CASES,
        formData,
        'Case created successfully'
      );

      toast.success("Medical case created successfully!");
      
      setTimeout(() => {
        router.push(`/patient/cases/${response.id}`);
      }, 1000);
    } catch (error) {
      console.error("Error creating case:", error);
      
      let errorMessage = "Failed to create case. Please try again.";
      
      if (error?.response?.data) {
        const errorData = error.response.data;
        if (errorData.title) {
          errorMessage = `Title: ${errorData.title[0]}`;
        } else if (errorData.description) {
          errorMessage = `Description: ${errorData.description[0]}`;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      setIsCreated(true)
    }
  };

  const handleCancel = () => {
    router.push("/patient/cases");
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-sm">
        <Link 
          href="/patient/cases" 
          className="text-secondary hover:text-primary transition-colors"
        >
          My Cases
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">chevron_right</span>
        <span className="text-primary font-medium">Create New Case</span>
      </nav>

      <div>
        <h1 className="text-3xl font-bold text-primary">Create New Medical Case</h1>
        <p className="text-secondary mt-1">
          Create a new case to organize your appointments and medical records
        </p>
      </div>

      <CreateCaseForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isCreated={isCreated}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}