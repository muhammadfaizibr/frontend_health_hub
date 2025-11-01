"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAppointments } from "@/lib/hooks/usePatients";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AppointmentCard from "@/components/patient/appointments/AppointmentCard";

export default function PatientAppointmentsPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("upcoming");
  
  const { appointments, isLoading, error, refetch } = useAppointments();

  const appointmentsList = appointments?.results || [];

  const getFilteredAppointments = () => {
    if (statusFilter === "all") return appointmentsList;
    return appointmentsList.filter(
      appt => appt.status.toLowerCase() === statusFilter.toLowerCase()
    );
  };

  const filteredAppointments = getFilteredAppointments();

  // Calculate status counts
  const statusCounts = {
    all: appointmentsList.length,
    upcoming: appointmentsList.filter(a => a.status.toLowerCase() === "upcoming").length,
    conducted: appointmentsList.filter(a => a.status.toLowerCase() === "conducted").length,
    cancelled: appointmentsList.filter(a => a.status.toLowerCase() === "cancelled").length,
  };

  // Define tabs with counts and icons
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
        description: "You don't have any scheduled appointments. Book an appointment with a doctor to get started.",
        actionLabel: "Browse Doctors",
        actionHref: "/patient/doctors"
      },
      conducted: {
        icon: "history",
        title: "No completed appointments",
        description: "Your completed appointments will appear here after your consultations.",
      },
      cancelled: {
        icon: "event_busy",
        title: "No cancelled appointments",
        description: "You haven't cancelled any appointments yet.",
      },
      all: {
        icon: "event_note",
        title: "No appointments found",
        description: "You haven't booked any appointments yet. Start by browsing available doctors.",
        actionLabel: "Browse Doctors",
        actionHref: "/patient/doctors"
      }
    };
    return configs[status] || configs.all;
  };

  const emptyConfig = getEmptyStateConfig(statusFilter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Appointments</h1>
          <p className="text-secondary mt-1">
            View and manage your medical appointments
          </p>
        </div>
        <Link href="/patient/doctors">
          <Button>
            <span className="material-symbols-outlined text-sm">add</span>
            Book Appointment
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
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

      {/* Tabs with Counts */}
      <Tabs
        tabs={tabs}
        activeTab={statusFilter}
        onChange={setStatusFilter}
        showCounts={true}
        variant="underline"
      />

      {/* Appointments List or Empty State */}
      <div className="flex flex-col gap-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onUpdate={refetch}
            />
          ))
        ) : (
          <EmptyState
            icon={emptyConfig.icon}
            title={emptyConfig.title}
            description={emptyConfig.description}
            actionLabel={emptyConfig.actionLabel}
            actionHref={emptyConfig.actionHref}
          />
        )}
      </div>
    </div>
  );
}