"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppointment, usePrescriptions, useReports } from "@/lib/hooks/usePatients";
import { useAppointmentReview } from "@/lib/hooks/useDoctors";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Tabs } from "@/components/ui/Tabs";
import AppointmentDetailHeader from "@/components/patient/appointments/AppointmentDetailHeader";
import AppointmentInfo from "@/components/patient/appointments/AppointmentInfo";
import ReviewSection from "@/components/patient/appointments/ReviewSection";
import PrescriptionsSection from "@/components/patient/appointments/PrescriptionsSection";
import ReportsSection from "@/components/patient/appointments/ReportsSection";

export default function AppointmentDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("details");

  const { appointment, isLoading, error, refetch } = useAppointment(id);
  
  const { 
    prescriptions = [], 
    isLoading: prescriptionsLoading,
    refetch: refetchPrescriptions 
  } = usePrescriptions({ appointment: id });

  const { 
    reports, 
    isLoading: reportsLoading,
    refetch: refetchReports 
  } = useReports({ appointment: id });

  // Fetch appointment review
  const { 
    review, 
    hasReview, 
    isLoading: reviewLoading,
    refetch: refetchReview 
  } = useAppointmentReview(id, appointment?.status?.toLowerCase() === 'conducted');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBoundary
        title="Error loading appointment"
        message={error.message || "Failed to load appointment details"}
        icon="error"
        onRetry={refetch}
      />
    );
  }

  if (!appointment) {
    return (
      <ErrorBoundary
        title="Appointment not found"
        message="The appointment you're looking for doesn't exist."
        icon="event_busy"
        showRefresh={false}
      />
    );
  }

  const prescriptionsCount = Array.isArray(prescriptions?.results) 
    ? prescriptions.results.length 
    : 0;
  const reportsCount = Array.isArray(reports?.results) 
    ? reports.results.length 
    : 0;

  const tabs = [
    { id: "details", label: "Details", icon: "info" },
    { 
      id: "prescriptions", 
      label: "Prescriptions", 
      icon: "medication",
      count: prescriptionsCount 
    },
    { 
      id: "reports", 
      label: "Reports", 
      icon: "lab_profile",
      count: reportsCount 
    },
  ];

  const handleReviewSubmit = () => {
    refetch();
    refetchReview();
  };

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-sm">
        <Link 
          href="/patient/appointments" 
          className="text-secondary hover:text-primary transition-colors"
        >
          My Appointments
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">
          chevron_right
        </span>
        <span className="text-primary font-medium">Appointment Details</span>
      </nav>

      <AppointmentDetailHeader 
        appointment={appointment} 
        onUpdate={refetch}
      />

      <div className="flex card bg-surface flex-col gap-4">
        <div className="border-b border-color">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            showCounts={true}
            variant="underline"
          />
        </div>

        <div>
          {activeTab === "details" && (
            <div className="flex flex-col gap-6">
              <AppointmentInfo appointment={appointment} />
              
              {appointment?.status?.toLowerCase() === 'conducted' && (
                reviewLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <ReviewSection 
                    appointment={appointment}
                    existingReview={review}
                    hasReview={hasReview}
                    onReviewSubmit={handleReviewSubmit}
                  />
                )
              )}
            </div>
          )}

          {activeTab === "prescriptions" && (
            <PrescriptionsSection
              appointmentId={id}
              prescriptions={prescriptions?.results || []}
              isLoading={prescriptionsLoading}
              onUpdate={refetchPrescriptions}
            />
          )}

          {activeTab === "reports" && (
            <ReportsSection
              appointment={appointment}
              reports={reports?.results || []}
              isLoading={reportsLoading}
              onUpdate={refetchReports}
            />
          )}
        </div>
      </div>
    </div>
  );
}