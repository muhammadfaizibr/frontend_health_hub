"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import AppointmentTabs from "@/components/patient/appointments/AppointmentTabs";
import AppointmentCard from "@/components/patient/appointments/AppointmentCard";
import { useAppointments } from "@/lib/hooks/usePatients";

const EmptyState = ({ icon, title, description, actionLabel, actionHref }) => (
  <div className="flex flex-col gap-2 text-center py-12 items-center">
    <span className="material-symbols-outlined icon-3xl text-center text-secondary mb-4">
      {icon}
    </span>
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-secondary mb-4">{description}</p>
    {actionLabel && actionHref && (
      <Link href={actionHref}>
        <Button>
          <span className="material-symbols-outlined text-sm mr-2">add</span>
          {actionLabel}
        </Button>
      </Link>
    )}
  </div>
);

export default function PatientAppointmentsPage() {
  const { appointments: upcomingAppointments, isLoading: upcomingLoading } = 
    useAppointments({ status: 'confirmed' });
  
  const { appointments: cancelledAppointments, isLoading: cancelledLoading } = 
    useAppointments({ status: 'cancelled' });
  
  const { appointments: conductedAppointments, isLoading: conductedLoading } = 
    useAppointments({ status: 'conducted' });

  const upcomingList = upcomingAppointments?.results || [];
  const cancelledList = cancelledAppointments?.results || [];
  const conductedList = conductedAppointments?.results || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Appointments</h1>
          <p className="text-secondary mt-1">
            Manage your upcoming and past appointments
          </p>
        </div>
        <Link href="/patient/find-doctor">
          <Button>
            <span className="material-symbols-outlined text-sm mr-2">add</span>
            Book New Appointment
          </Button>
        </Link>
      </div>

      <AppointmentTabs 
        upcomingCount={upcomingList.length}
        conductedCount={conductedList.length}
        cancelledCount={cancelledList.length}
      >
        {(activeTab) => (
          <div className="flex flex-col gap-4 mt-4">
            {activeTab === "upcoming" && (
              upcomingList.length > 0 ? (
                upcomingList.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    showActions
                  />
                ))
              ) : (
                <EmptyState 
                  icon="calendar_today"
                  title="No upcoming appointments"
                  description="You don't have any upcoming appointments scheduled."
                  actionLabel="Book an Appointment"
                  actionHref="/patient/find-doctor"
                />
              )
            )}

            {activeTab === "conducted" && (
              conductedList.length > 0 ? (
                conductedList.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    showActions
                  />
                ))
              ) : (
                <EmptyState 
                  icon="calendar_today"
                  title="No past appointments"
                  description="You haven't had any appointments yet."
                  actionLabel="Book an Appointment"
                  actionHref="/patient/find-doctor"
                />
              )
            )}

            {activeTab === "cancelled" && (
              cancelledList.length > 0 ? (
                cancelledList.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    showActions={false}
                  />
                ))
              ) : (
                <EmptyState 
                  icon="history"
                  title="No cancelled appointments"
                  description="You haven't had any cancelled appointments yet."
                />
              )
            )}
          </div>
        )}
      </AppointmentTabs>
    </div>
  );
}