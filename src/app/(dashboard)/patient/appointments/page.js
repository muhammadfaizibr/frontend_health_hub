"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatDate, formatTime } from "@/lib/utils";

export default function PatientAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00",
      type: "in-person",
      status: "confirmed",
      location: "123 Medical Center Dr, New York, NY"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-18",
      time: "14:30",
      type: "telehealth",
      status: "confirmed",
      location: "Video Call"
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      date: "2024-01-10",
      time: "09:00",
      type: "in-person",
      status: "completed",
      location: "456 Health Plaza, New York, NY",
      notes: "Regular checkup, all good"
    },
    {
      id: 4,
      doctor: "Dr. David Wilson",
      specialty: "General Practice",
      date: "2024-01-05",
      time: "11:30",
      type: "telehealth",
      status: "completed",
      location: "Video Call",
      notes: "Follow-up consultation"
    }
  ];

  const handleCancelAppointment = (appointmentId) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      // Handle cancellation logic
      console.log("Cancelling appointment:", appointmentId);
    }
  };

  const handleRescheduleAppointment = (appointmentId) => {
    // Handle rescheduling logic
    console.log("Rescheduling appointment:", appointmentId);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: "badge badge-success",
      completed: "badge badge-info",
      cancelled: "badge badge-error",
      pending: "badge badge-warning"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const AppointmentCard = ({ appointment, showActions = true }) => (
    <div className="card bg-surface p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-primary">
              {appointment.doctor}
            </h3>
            <span className={getStatusBadge(appointment.status)}>
              {appointment.status}
            </span>
          </div>
          
          <p className="text-secondary">{appointment.specialty}</p>
          
          <div className="flex items-center gap-4 text-sm text-secondary">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                calendar_today
              </span>
              <span>{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              <span>{formatTime(appointment.time)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                {appointment.type === "telehealth" ? "video_call" : "location_on"}
              </span>
              <span className="capitalize">{appointment.type}</span>
            </div>
          </div>
          
          
          {appointment.notes && (
            <div className="mt-3 p-3 bg-surface-secondary rounded-lg">
              <p className="text-sm text-primary">
                <strong>Notes:</strong> {appointment.notes}
              </p>
            </div>
          )}
        </div>
        
        {showActions && appointment.status === "confirmed" && (
          <div className="flex justify-center gap-2 ml-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => handleRescheduleAppointment(appointment.id)}
            >
              Reschedule
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleCancelAppointment(appointment.id)}
              className="text-error border-error hover:bg-error hover:text-inverse"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Appointments</h1>
          <p className="text-secondary mt-1">
            Manage your upcoming and past appointments
          </p>
        </div>
        <Button>
          <span className="material-symbols-outlined text-sm mr-2">
            add
          </span>
          Book New Appointment
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-color">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "upcoming"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "past"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Past ({pastAppointments.length})
          </button>
        </nav>
      </div>

      {/* Appointments List */}
      <div className="flex flex-col gap-4">
        {activeTab === "upcoming" ? (
          upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                showActions={true}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-secondary mb-4">
                calendar_today
              </span>
              <h3 className="text-xl font-semibold text-primary">
                No upcoming appointments
              </h3>
              <p className="text-secondary mb-4">
                You don&apos;t have any upcoming appointments scheduled.
              </p>
              <Button>
                <span className="material-symbols-outlined text-sm mr-2">
                  add
                </span>
                Book an Appointment
              </Button>
            </div>
          )
        ) : (
          pastAppointments.length > 0 ? (
            pastAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                showActions={false}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-secondary mb-4">
                history
              </span>
              <h3 className="text-xl font-semibold text-primary">
                No past appointments
              </h3>
              <p className="text-secondary">
                You haven&apos;t had any appointments yet.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
