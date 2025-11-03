// app/translator/appointments/page.jsx
"use client";

import React, { useState, useMemo } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import TranslatorAppointmentCard from "@/components/translator/TranslatorAppointmentCard";
import { useTranslatorAppointments } from "@/lib/hooks/useTranslator";
import { useAuthStore } from "@/lib/store/auth-store";

export default function TranslatorAppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState("upcoming");
  
  const getUser = useAuthStore((state) => state.getUser);
  const user = getUser();
  const translatorId = useMemo(() => user?.id, [user]);

  const { 
    appointments: appointmentsData, 
    isLoading: appointmentsLoading, 
    error, 
    refetch 
  } = useTranslatorAppointments(translatorId, { 
    ordering: '-time_slot__date'
  });

  const appointmentsList = appointmentsData?.results || [];

  const getFilteredAppointments = () => {
    if (statusFilter === "all") return appointmentsList;
    
    const statusMap = {
      upcoming: ["pending_confirmation", "confirmed"],
      completed: ["conducted"],
      cancelled: ["cancelled"],
    };

    return appointmentsList.filter(appt => 
      statusMap[statusFilter]?.includes(appt.status?.toLowerCase())
    );
  };

  const filteredAppointments = getFilteredAppointments();

  const statusCounts = {
    all: appointmentsList.length,
    upcoming: appointmentsList.filter(a => 
      ["pending_confirmation", "confirmed"].includes(a.status?.toLowerCase())
    ).length,
    completed: appointmentsList.filter(a => 
      a.status?.toLowerCase() === "conducted"
    ).length,
    cancelled: appointmentsList.filter(a => 
      a.status?.toLowerCase() === "cancelled"
    ).length,
  };

  const tabs = [
    { 
      id: "upcoming", 
      label: "Upcoming", 
      count: statusCounts.upcoming,
      icon: "calendar_today"
    },
    { 
      id: "completed", 
      label: "Completed", 
      count: statusCounts.completed,
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

  const isLoading = !user || appointmentsLoading;

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
        title: "No upcoming assignments",
        description: "You don't have any scheduled translation assignments.",
      },
      completed: {
        icon: "history",
        title: "No completed assignments",
        description: "Your completed translation sessions will appear here.",
      },
      cancelled: {
        icon: "event_busy",
        title: "No cancelled assignments",
        description: "No assignments have been cancelled.",
      },
      all: {
        icon: "event_note",
        title: "No assignments found",
        description: "You haven't been assigned to any appointments yet.",
      }
    };
    return configs[status] || configs.all;
  };

  const emptyConfig = getEmptyStateConfig(statusFilter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Assignments</h1>
          <p className="text-secondary mt-1">
            View and manage your translation assignments
          </p>
        </div>
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
                  assignment
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
                <p className="text-2xl font-bold text-primary">{statusCounts.completed}</p>
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

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={statusFilter}
        onChange={setStatusFilter}
        showCounts={true}
        variant="underline"
      />

      {/* Appointments List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <TranslatorAppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState
              icon={emptyConfig.icon}
              title={emptyConfig.title}
              description={emptyConfig.description}
            />
          </div>
        )}
      </div>
    </div>
  );
}