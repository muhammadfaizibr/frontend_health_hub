"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import AppointmentCard from "@/components/patient/appointments/AppointmentCard";
import ActiveCaseCard from "@/components/patient/dashboard/ActiveCaseCard";
import { useAppointments, useCases } from '@/lib/hooks/usePatients';
import { getCurrentUser } from "@/lib/api/services/auth";
import { useAuthStore } from "@/lib/store/auth-store";

export default function PatientDashboardPage() {
  const { appointments, isLoading: appointmentsLoading } = useAppointments({ status: 'confirmed' });
  const { cases: activeCases, isLoading: casesLoading } = useCases({ status: 'open' });

  const upcomingAppointments = appointments?.results || [];
  const activeCasesList = activeCases?.results || [];
  const getUser = useAuthStore((state) => state.getUser);  

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Welcome back, {getUser()?.first_name}!
          </h1>
          <p className="text-secondary mt-1">
            Here's your health overview and upcoming appointments.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/patient/emergency">
            <Button variant="outline" className="text-error border-error hover:bg-error hover:text-inverse">
              <span className="material-symbols-outlined text-sm mr-2">emergency</span>
              Emergency
            </Button>
          </Link>
          <Link href="/patient/find-doctor">
            <Button>
              <span className="material-symbols-outlined text-sm mr-2">add</span>
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4 card bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">
                Upcoming Appointments
              </h2>
              <Link href="/patient/appointments">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>

            {appointmentsLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color" />
              </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="flex flex-col gap-4">
                {upcomingAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} showActions />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-secondary">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">calendar_today</span>
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Active Cases
            </h2>
            
            {casesLoading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-color" />
              </div>
            ) : activeCasesList.length > 0 ? (
              <div className="flex flex-col gap-3">
                {activeCasesList.map(caseItem => (
                  <ActiveCaseCard key={caseItem.id} caseItem={caseItem} />
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-secondary">
                <p className="text-sm">No active cases</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}