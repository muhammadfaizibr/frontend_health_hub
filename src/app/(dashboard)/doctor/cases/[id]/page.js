// app/doctor/cases/[id]/page.jsx
"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import CaseHeader from "@/components/patient/cases/CaseHeader";
import CaseAppointmentTabs from "@/components/patient/cases/CaseAppointmentTabs";
import AppointmentCard from "@/components/patient/appointments/AppointmentCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useQuery } from "@tanstack/react-query";
import { getDoctorCase, getDoctorAppointments } from "@/lib/api/services/doctor";

export default function DoctorCaseDetailPage({ params }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("all");

  const { data: caseData, isLoading: caseLoading, error: caseError, refetch: refetchCase } = useQuery({
    queryKey: ['doctor-case', id],
    queryFn: () => getDoctorCase(id),
  });

  const { data: appointmentsData, isLoading: appointmentsLoading, refetch: refetchAppointments } = useQuery({
    queryKey: ['doctor-case-appointments', id],
    queryFn: () => getDoctorAppointments({ case: id }),
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
          href="/doctor/cases" 
          className="text-secondary hover:text-primary transition-colors"
        >
          My Cases
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">chevron_right</span>
        <span className="text-primary font-medium">{caseData.title}</span>
      </nav>

      <CaseHeader caseData={caseData} onUpdate={refetchCase} isDoctor={true} />

      <div className="card bg-surface p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-primary">Appointments</h2>
            <p className="text-sm text-secondary mt-1">
              {appointmentCounts.all} total appointment{appointmentCounts.all !== 1 ? 's' : ''}
            </p>
          </div>
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
                  appointment={appointment}
                  showActions={false}
                  onUpdate={refetchAppointments}
                  isDoctor={true}
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
            />
          )}
        </div>
      </div>
    </div>
  );
}