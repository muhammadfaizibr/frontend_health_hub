// app/doctor/appointments/[id]/page.jsx
"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Tabs } from "@/components/ui/Tabs";
import AppointmentDetailHeader from "@/components/patient/appointments/AppointmentDetailHeader";
import AppointmentInfo from "@/components/patient/appointments/AppointmentInfo";
import DoctorPrescriptionSection from "@/components/doctor/DoctorPrescriptionSection";
import ReportsSection from "@/components/patient/appointments/ReportsSection";
import { useQuery } from "@tanstack/react-query";
import { getDoctorAppointment, getPrescriptions } from "@/lib/api/services/doctor";
import { getReports } from "@/lib/api/services/patient";

export default function DoctorAppointmentDetailPage({ params }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("details");

  const { data: appointment, isLoading, error, refetch } = useQuery({
    queryKey: ['doctor-appointment', id],
    queryFn: () => getDoctorAppointment(id),
    enabled: !!id,
  });
  
  const { 
    data: prescriptions, 
    isLoading: prescriptionsLoading,
    refetch: refetchPrescriptions 
  } = useQuery({
    queryKey: ['doctor-appointment-prescriptions', id],
    queryFn: () => getPrescriptions({ appointment: id }),
    enabled: !!id,
  });

  const { 
    data: reports, 
    isLoading: reportsLoading,
    refetch: refetchReports 
  } = useQuery({
    queryKey: ['doctor-appointment-reports', id],
    queryFn: () => getReports({ appointment: id }),
    enabled: !!id,
  });

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

  const prescriptionsCount = prescriptions?.results?.length || 0;
  const reportsCount = reports?.results?.length || 0;

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

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-sm">
        <Link 
          href="/doctor/appointments" 
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
        isDoctor={true}
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
            <AppointmentInfo appointment={appointment} isDoctor={true} />
          )}

          {activeTab === "prescriptions" && (
            <DoctorPrescriptionSection
              appointment={appointment}
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
              isDoctor={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}