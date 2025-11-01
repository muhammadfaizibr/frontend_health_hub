"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CaseHeader from "@/components/patient/cases/CaseHeader";
import CaseAppointmentTabs from "@/components/patient/cases/CaseAppointmentTabs";
import AppointmentCard from "@/components/patient/appointments/AppointmentCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Button } from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/utils/api-wrapper";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export default function CaseDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("all");

  const { data: caseData, isLoading: caseLoading, error: caseError, refetch: refetchCase } = useQuery({
    queryKey: ['case', id],
    queryFn: () => apiGet(`${API_ENDPOINTS.PATIENT.CASES}${id}/`),
  });

  const { data: appointmentsData, isLoading: appointmentsLoading, refetch: refetchAppointments } = useQuery({
    queryKey: ['case-appointments', id],
    queryFn: () => apiGet(API_ENDPOINTS.PATIENT.APPOINTMENTS, { params: { case: id } }),
  });

  const appointments = appointmentsData?.results || [];

  const getFilteredAppointments = () => {
    if (activeTab === "all") return appointments;
    
    const statusMap = {
      upcoming: ["pending_confirmation", "confirmed"],
      conducted: ["conducted"],
      cancelled: ["cancelled"],
    };

    return appointments.filter(apt => 
      statusMap[activeTab]?.includes(apt.status.toLowerCase())
    );
  };

  const filteredAppointments = getFilteredAppointments();

  const appointmentCounts = {
    all: appointments.length,
    upcoming: appointments.filter(a => 
      ["pending_confirmation", "confirmed"].includes(a.status.toLowerCase())
    ).length,
    conducted: appointments.filter(a => a.status.toLowerCase() === "conducted").length,
    cancelled: appointments.filter(a => a.status.toLowerCase() === "cancelled").length,
  };

  const handleBookAppointment = () => {
    router.push(`/patient/find-doctor/${caseData?.doctor?.id}/book-appointment?case=${caseData?.id}`);
  };

  if (caseLoading) {
    return <LoadingSpinner />;
  }

  if (caseError) {
    return (
      <ErrorBoundary
        title="Error loading case"
        message={caseError.message || "Failed to load case details"}
        icon="error"
        onRetry={refetchCase}
      />
    );
  }

  if (!caseData) {
    return (
      <ErrorBoundary
        title="Case not found"
        message="The case you're looking for doesn't exist."
        icon="folder_off"
        showRefresh={false}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-sm">
        <Link 
          href="/patient/cases" 
          className="text-secondary hover:text-primary transition-colors"
        >
          My Cases
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">chevron_right</span>
        <span className="text-primary font-medium">{caseData.title}</span>
      </nav>

      <CaseHeader caseData={caseData} onUpdate={refetchCase} />

      <div className="card bg-surface p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-primary">Appointments</h2>
            <p className="text-sm text-secondary mt-1">
              {appointmentCounts.all} total appointment{appointmentCounts.all !== 1 ? 's' : ''}
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={handleBookAppointment}>
            <span className="material-symbols-outlined text-sm">add</span>
            Book Appointment
          </Button>
        </div>

        <CaseAppointmentTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={appointmentCounts}
        />

        <div className="flex flex-col gap-4 mt-6">
          {appointmentsLoading ? (
            <LoadingSpinner />
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                showActions
                onUpdate={refetchAppointments}
              />
            ))
          ) : (
            <EmptyState
              icon="calendar_today"
              title={`No ${activeTab === "all" ? "" : activeTab} appointments`}
              description={
                activeTab === "all"
                  ? "No appointments have been scheduled for this case yet."
                  : `No ${activeTab} appointments for this case.`
              }
              actionLabel={activeTab === "all" ? "Book First Appointment" : undefined}
              onAction={activeTab === "all" ? handleBookAppointment : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}