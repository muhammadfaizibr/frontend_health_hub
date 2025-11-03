// app/translator/page.jsx
"use client";

import React, { use, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import TranslatorAppointmentCard from "@/components/translator/TranslatorAppointmentCard";
import { useTranslatorProfile, useTranslatorAppointments } from "@/lib/hooks/useTranslator";
import { useAuthStore } from "@/lib/store/auth-store";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function TranslatorDashboardPage() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = getUser();

  console.log(user, 'user')

  // const { profile, isLoading: profileLoading } = useTranslatorProfile();

  const translatorId = useMemo(() => user?.id, [user]);

  const { 
    appointments: appointmentsData, 
    isLoading: appointmentsLoading 
  } = useTranslatorAppointments(translatorId, { 
    ordering: '-time_slot__date'
  });

  const appointments = appointmentsData?.results || [];

  // Calculate statistics
  const stats = {
    totalAssignments: appointments.length,
    upcoming: appointments.filter(a => 
      ['pending_confirmation', 'confirmed'].includes(a.status?.toLowerCase())
    ).length,
    completed: appointments.filter(a => 
      a.status?.toLowerCase() === 'conducted'
    ).length,
    today: appointments.filter(a => {
      const today = new Date().toDateString();
      const appointmentDate = new Date(a.time_slot?.date).toDateString();
      return appointmentDate === today;
    }).length,
  };

  const upcomingAppointments = appointments
    .filter(a => ['pending_confirmation', 'confirmed'].includes(a.status?.toLowerCase()))
    .slice(0, 5);

  const isLoading = !user || appointmentsLoading;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Welcome back, {user?.first_name || user?.full_name}!
          </h1>
          <p className="text-secondary mt-1">
            Here's your translation assignment overview
          </p>
        </div>
        <Link href="/translator/assignments">
          <Button>
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            View All Assignments
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary mb-1">Total Assignments</p>
              <p className="text-2xl font-bold text-primary">{stats.totalAssignments}</p>
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
              <p className="text-2xl font-bold text-primary">{stats.upcoming}</p>
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
              <p className="text-2xl font-bold text-primary">{stats.completed}</p>
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
              <p className="text-sm text-secondary mb-1">Today</p>
              <p className="text-2xl font-bold text-primary">{stats.today}</p>
            </div>
            <div className="flex p-3 bg-warning/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-warning">
                today
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="flex flex-col gap-4 card bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">
            Upcoming Assignments
          </h2>
          <Link href="/translator/appointments">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : upcomingAppointments.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upcomingAppointments.map(appointment => (
              <TranslatorAppointmentCard 
                key={appointment.id} 
                appointment={appointment}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondary">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
              calendar_today
            </span>
            <p>No upcoming translation assignments</p>
            <p className="text-sm mt-1">Your schedule is clear for now</p>
          </div>
        )}
      </div>

      {/* Quick Info */}
      <div className="card bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Quick Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-hover rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-primary-color">
                info
              </span>
              <h3 className="font-semibold text-primary">Your Role</h3>
            </div>
            <p className="text-sm text-secondary">
              You are assigned as a translator to help facilitate communication between patients and doctors during appointments.
            </p>
          </div>

          <div className="p-4 bg-hover rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-primary-color">
                schedule
              </span>
              <h3 className="font-semibold text-primary">Availability</h3>
            </div>
            <p className="text-sm text-secondary">
              Make sure to check your upcoming assignments and be available at the scheduled times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}