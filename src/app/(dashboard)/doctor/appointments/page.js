// app/doctor/appointments/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AppointmentCard from "@/components/patient/appointments/AppointmentCard";
import { useQuery } from "@tanstack/react-query";
import { getDoctorAppointments } from "@/lib/api/services/doctor";

export default function DoctorAppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState("upcoming");
  
  const { data: appointments, isLoading, error, refetch } = useQuery({
    queryKey: ['doctor-appointments'],
    queryFn: () => getDoctorAppointments(),
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });

  const appointmentsList = appointments?.results || [];

  const getFilteredAppointments = () => {
    if (statusFilter === "all") return appointmentsList;
    return appointmentsList.filter(
      appt => appt.status.toLowerCase() === statusFilter.toLowerCase()
    );
  };

  const filteredAppointments = getFilteredAppointments();

  const statusCounts = {
    all: appointmentsList.length,
    upcoming: appointmentsList.filter(a => a.status.toLowerCase() === "upcoming").length,
    conducted: appointmentsList.filter(a => a.status.toLowerCase() === "conducted").length,
    cancelled: appointmentsList.filter(a => a.status.toLowerCase() === "cancelled").length,
  };

  const tabs = [
    { 
      id: "upcoming", 
      label: "Upcoming", 
      count: statusCounts.upcoming,
      icon: "calendar_today"
    },
    { 
      id: "conducted", 
      label: "Completed", 
      count: statusCounts.conducted,
      icon: "check_circle"
    },
    { 
      id: "cancelled", 
      label: "Cancelled", 
      count: statusCounts.cancelled,
      icon: "cancel"
    },
    { 
      id: "all", 
      label: "All", 
      count: statusCounts.all,
      icon: "list"
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  const getEmptyStateConfig = (status) => {
    const configs = {
      upcoming: {
        icon: "event_available",
        title: "No upcoming appointments",
        description: "You don't have any scheduled appointments with patients.",
      },
      conducted: {
        icon: "history",
        title: "No completed appointments",
        description: "Your completed consultations will appear here.",
      },
      cancelled: {
        icon: "event_busy",
        title: "No cancelled appointments",
        description: "No appointments have been cancelled yet.",
      },
      all: {
        icon: "event_note",
        title: "No appointments found",
        description: "You don't have any appointments yet.",
      }
    };
    return configs[status] || configs.all;
  };

  const emptyConfig = getEmptyStateConfig(statusFilter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Appointments</h1>
          <p className="text-secondary mt-1">
            View and manage patient appointments
          </p>
        </div>
      </div>

      {appointmentsList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">Total</p>
                <p className="text-2xl font-bold text-primary">{statusCounts.all}</p>
              </div>
              <div className="flex p-3 bg-primary-color/10 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-primary-color">
                  event_note
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">Upcoming</p>
                <p className="text-2xl font-bold text-primary">{statusCounts.upcoming}</p>
              </div>
              <div className="flex p-3 bg-blue-500/10 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-blue-500">
                  calendar_today
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">Completed</p>
                <p className="text-2xl font-bold text-primary">{statusCounts.conducted}</p>
              </div>
              <div className="flex p-3 bg-success/10 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-success">
                  check_circle
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">Cancelled</p>
                <p className="text-2xl font-bold text-primary">{statusCounts.cancelled}</p>
              </div>
              <div className="flex p-3 bg-error/10 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-error">
                  cancel
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs
        tabs={tabs}
        activeTab={statusFilter}
        onChange={setStatusFilter}
        showCounts={true}
        variant="underline"
      />

      <div className="flex flex-col gap-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
              <AppointmentCard
                appointment={appointment}
                showActions={false}
                onUpdate={refetch}
                isDoctor={true}
              />
          ))
        ) : (
          <EmptyState
            icon={emptyConfig.icon}
            title={emptyConfig.title}
            description={emptyConfig.description}
          />
        )}
      </div>
    </div>
  );
}