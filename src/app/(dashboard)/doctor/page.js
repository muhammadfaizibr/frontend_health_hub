// app/doctor/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import AppointmentCard from "@/components/patient/appointments/AppointmentCard";
import ActiveCaseCard from "@/components/patient/dashboard/ActiveCaseCard";
import { useQuery } from "@tanstack/react-query";
import { getDoctorAppointments, getDoctorCases } from "@/lib/api/services/doctor";
import { useAuthStore } from "@/lib/store/auth-store";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function DoctorDashboardPage() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = getUser();

  const { 
    data: appointmentsData, 
    isLoading: appointmentsLoading 
  } = useQuery({
    queryKey: ['doctor-dashboard-appointments'],
    queryFn: () => getDoctorAppointments({ status: 'confirmed' }),
    staleTime: 2 * 60 * 1000,
  });

  const { 
    data: casesData, 
    isLoading: casesLoading 
  } = useQuery({
    queryKey: ['doctor-dashboard-cases'],
    queryFn: () => getDoctorCases({ status: 'open' }),
    staleTime: 2 * 60 * 1000,
  });

  const { 
    data: allAppointmentsData 
  } = useQuery({
    queryKey: ['doctor-dashboard-stats'],
    queryFn: () => getDoctorAppointments(),
    staleTime: 5 * 60 * 1000,
  });

  const upcomingAppointments = appointmentsData?.results || [];
  const activeCasesList = casesData?.results || [];
  const allAppointments = allAppointmentsData?.results || [];

  // Calculate statistics
  const stats = {
    totalAppointments: allAppointments.length,
    upcomingAppointments: allAppointments.filter(a => 
      ['pending_confirmation', 'confirmed'].includes(a.status?.toLowerCase())
    ).length,
    completedToday: allAppointments.filter(a => {
      const today = new Date().toDateString();
      const appointmentDate = new Date(a.time_slot?.date).toDateString();
      return a.status?.toLowerCase() === 'conducted' && appointmentDate === today;
    }).length,
    activeCases: activeCasesList.length,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Welcome back, Dr. {user?.first_name || user?.full_name}!
          </h1>
          <p className="text-secondary mt-1">
            Here's your practice overview and upcoming consultations.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/doctor/schedule">
            <Button variant="outline">
              <span className="material-symbols-outlined text-sm">schedule</span>
              Manage Schedule
            </Button>
          </Link>
          <Link href="/doctor/appointments">
            <Button>
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              View All Appointments
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary mb-1">Total Appointments</p>
              <p className="text-2xl font-bold text-primary">{stats.totalAppointments}</p>
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
              <p className="text-2xl font-bold text-primary">{stats.upcomingAppointments}</p>
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
              <p className="text-sm text-secondary mb-1">Completed Today</p>
              <p className="text-2xl font-bold text-primary">{stats.completedToday}</p>
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
              <p className="text-sm text-secondary mb-1">Active Cases</p>
              <p className="text-2xl font-bold text-primary">{stats.activeCases}</p>
            </div>
            <div className="flex p-3 bg-warning/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-warning">
                folder_open
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        
        {/* Upcoming Appointments Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">

                {/* Today's Schedule Overview */}
      <div className="card bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Today's Schedule
        </h2>
        
        {appointmentsLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAppointments
              .filter(a => {
                const today = new Date().toDateString();
                const appointmentDate = new Date(a.time_slot?.date).toDateString();
                return appointmentDate === today;
              })
              .slice(0, 6)
              .map(appointment => (
                <Link key={appointment.id} href={`/doctor/appointments/${appointment.id}`}>
                  <div className="p-4 border border-color rounded-lg hover:bg-hover transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary text-sm">
                          {appointment.case?.patient?.user?.full_name || "N/A"}
                        </h4>
                        <p className="text-xs text-secondary">
                          {appointment.case?.title || "N/A"}
                        </p>
                      </div>
                      <div className="text-xs px-2 py-1 rounded bg-primary-color/10 text-primary-color">
                        {appointment.status_display}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>
                        {new Date(`1970-01-01T${appointment.time_slot?.start_time}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            
            {allAppointments.filter(a => {
              const today = new Date().toDateString();
              const appointmentDate = new Date(a.time_slot?.date).toDateString();
              return appointmentDate === today;
            }).length === 0 && (
              <div className="col-span-full text-center py-8 text-secondary">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                  event_available
                </span>
                <p>No appointments scheduled for today</p>
              </div>
            )}
          </div>
        )}
      </div>
                <div className="flex flex-col gap-4 card bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">
                Upcoming Appointments
              </h2>
              <Link href="/doctor/appointments">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>

            {appointmentsLoading ? (
              <div className="flex items-center justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="flex flex-col gap-4">
                {upcomingAppointments.slice(0, 3).map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    isDoctor={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-secondary">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                  calendar_today
                </span>
                <p>No upcoming appointments</p>
                <p className="text-sm mt-1">Your schedule is clear for now</p>
              </div>
            )}
          </div>

        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Active Cases Section */}
          <div className="flex flex-col gap-2 card bg-surface p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">
                Active Cases
              </h2>
              <Link href="/doctor/cases">
                <Button variant="ghost" size="sm">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Button>
              </Link>
            </div>
            
            {casesLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-color" />
              </div>
            ) : activeCasesList.length > 0 ? (
              <div className="flex flex-col gap-3">
                {activeCasesList.slice(0, 5).map(caseItem => (
                  <Link key={caseItem.id} href={`/doctor/cases/${caseItem.id}`}>
                    <ActiveCaseCard caseItem={caseItem} isDoctor={true} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-secondary">
                <span className="material-symbols-outlined text-3xl mb-2 opacity-50">
                  folder_open
                </span>
                <p className="text-sm">No active cases</p>
              </div>
            )}
          </div>

        </div>
      </div>


    </div>
  );
}