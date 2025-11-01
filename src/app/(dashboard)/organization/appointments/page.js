"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function OrganizationAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const todayAppointments = [
    {
      id: 1,
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      time: "9:00 AM",
      type: "Follow-up",
      status: "confirmed",
      duration: "30 min",
      room: "Room 101",
      translator: "Maria Rodriguez",
      notes: "Regular checkup"
    },
    {
      id: 2,
      patient: "Maria Garcia",
      doctor: "Dr. Michael Chen",
      time: "10:30 AM",
      type: "New Patient",
      status: "confirmed",
      duration: "45 min",
      room: "Room 102",
      translator: null,
      notes: "Initial consultation"
    },
    {
      id: 3,
      patient: "Robert Johnson",
      doctor: "Dr. Sarah Johnson",
      time: "2:00 PM",
      type: "Consultation",
      status: "pending",
      duration: "30 min",
      room: "Room 101",
      translator: null,
      notes: "Follow-up consultation"
    },
    {
      id: 4,
      patient: "Sarah Wilson",
      doctor: "Dr. Emily Davis",
      time: "3:30 PM",
      type: "Visit",
      status: "completed",
      duration: "30 min",
      room: "Room 103",
      translator: null,
      notes: "Prenatal checkup"
    }
  ];

  const upcomingAppointments = [
    {
      id: 5,
      patient: "Michael Brown",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-16",
      time: "9:30 AM",
      type: "Follow-up",
      status: "confirmed",
      duration: "30 min",
      room: "Room 101",
      translator: null
    },
    {
      id: 6,
      patient: "Lisa Davis",
      doctor: "Dr. Michael Chen",
      date: "2024-01-17",
      time: "11:00 AM",
      type: "Consultation",
      status: "confirmed",
      duration: "45 min",
      room: "Room 102",
      translator: "Maria Rodriguez"
    }
  ];

  const pastAppointments = [
    {
      id: 7,
      patient: "David Lee",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-14",
      time: "10:00 AM",
      type: "Visit",
      status: "completed",
      duration: "30 min",
      room: "Room 101",
      translator: null,
      notes: "Annual physical",
      diagnosis: "Healthy",
      prescription: "None"
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: "badge badge-success",
      pending: "badge badge-warning",
      completed: "badge badge-info",
      cancelled: "badge badge-error",
      no_show: "badge badge-secondary"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const getTypeBadge = (type) => {
    const typeClasses = {
      "new-patient": "badge badge-primary",
      "follow-up": "badge badge-info",
      "consultation": "badge badge-warning",
      "visit": "badge badge-success"
    };
    
    return typeClasses[type.toLowerCase().replace(" ", "-")] || "badge badge-secondary";
  };

  const filteredAppointments = () => {
    let appointments = [];
    
    switch (activeTab) {
      case "today":
        appointments = todayAppointments;
        break;
      case "upcoming":
        appointments = upcomingAppointments;
        break;
      case "past":
        appointments = pastAppointments;
        break;
      default:
        appointments = todayAppointments;
    }

    return appointments.filter(appointment => {
      const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const AppointmentCard = ({ appointment }) => (
    <div className="card bg-surface p-4 md:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex flex-1 gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-primary">
              {appointment.patient}
            </h3>
            <span className={getStatusBadge(appointment.status)}>
              {appointment.status}
            </span>
            <span className={getTypeBadge(appointment.type)}>
              {appointment.type}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-secondary text-sm mb-1">
                <span className="material-symbols-outlined text-xs inline mr-1">
                  medical_services
                </span>
                {appointment.doctor}
              </p>
              <p className="text-secondary text-sm mb-1">
                <span className="material-symbols-outlined text-xs inline mr-1">
                  schedule
                </span>
                {appointment.time} • {appointment.duration}
              </p>
              {appointment.date && (
                <p className="text-secondary text-sm mb-1">
                  <span className="material-symbols-outlined text-xs inline mr-1">
                    calendar_today
                  </span>
                  {appointment.date}
                </p>
              )}
            </div>
            
            <div>
              <p className="text-secondary text-sm mb-1">
                <span className="material-symbols-outlined text-xs inline mr-1">
                  room
                </span>
                {appointment.room}
              </p>
              {appointment.translator && (
                <p className="text-secondary text-sm mb-1">
                  <span className="material-symbols-outlined text-xs inline mr-1">
                    translate
                  </span>
                  {appointment.translator}
                </p>
              )}
              {appointment.notes && (
                <p className="text-secondary text-sm mb-1">
                  <span className="material-symbols-outlined text-xs inline mr-1">
                    note
                  </span>
                  {appointment.notes}
                </p>
              )}
            </div>
          </div>
          
          {(appointment.diagnosis || appointment.prescription) && activeTab === "past" && (
            <div className="mt-3 flex flex-col gap-2">
              {appointment.diagnosis && (
                <p className="text-sm text-primary">
                  <strong>Diagnosis:</strong> {appointment.diagnosis}
                </p>
              )}
              {appointment.prescription && (
                <p className="text-sm text-primary">
                  <strong>Prescription:</strong> {appointment.prescription}
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          {appointment.status === "confirmed" && (
            <>
              <Button size="sm">
                <span className="material-symbols-outlined text-sm">
                  medical_services
                </span>
                Start Visit
              </Button>
              <Button variant="outline" size="sm">
                Check In
              </Button>
            </>
          )}
          
          {appointment.status === "pending" && (
            <>
              <Button size="sm">
                <span className="material-symbols-outlined text-sm">
                  check
                </span>
                Confirm
              </Button>
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
            </>
          )}
          
          {appointment.status === "completed" && (
            <>
              <Button variant="outline" size="sm">
                <span className="material-symbols-outlined text-sm">
                  visibility
                </span>
                View Notes
              </Button>
              <Button variant="outline" size="sm">
                Add Notes
              </Button>
            </>
          )}
          
          {appointment.status !== "completed" && appointment.status !== "cancelled" && (
            <Button
              variant="outline"
              size="sm"
              className="text-error border-error hover:bg-error hover:text-inverse"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Appointments</h1>
          <p className="text-secondary mt-1">
            Manage organization appointments and consultations
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <span className="material-symbols-outlined text-sm">sync</span>
            Sync Calendar
          </Button>
          <Button>
            <span className="material-symbols-outlined text-sm">add</span>
            Schedule Appointment
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search patients or doctors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
          
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "confirmed", label: "Confirmed" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" }
            ]}
            placeholder="Filter by status"
          />
          
          <Button fullWidth>
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-color">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("today")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "today"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Today ({todayAppointments.length})
          </button>
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
        {filteredAppointments().length > 0 ? (
          filteredAppointments().map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-secondary mb-4">
              calendar_today
            </span>
            <h3 className="text-xl font-semibold text-primary mb-2">
              No appointments found
            </h3>
            <p className="text-secondary">
              {activeTab === "today" ? "No appointments scheduled for today." :
               activeTab === "upcoming" ? "No upcoming appointments." :
               "No past appointments found."}
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="card bg-surface p-3 md:p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            calendar_today
          </span>
          <p className="text-sm text-secondary">Today's Appointments</p>
          <p className="text-2xl font-bold text-primary">{todayAppointments.length}</p>
        </div>
        <div className="card bg-surface p-3 md:p-4 text-center">
          <span className="material-symbols-outlined text-info text-3xl mb-2">
            schedule
          </span>
          <p className="text-sm text-secondary">Upcoming</p>
          <p className="text-2xl font-bold text-primary">{upcomingAppointments.length}</p>
        </div>
        <div className="card bg-surface p-3 md:p-4 text-center">
          <span className="material-symbols-outlined text-success text-3xl mb-2">
            check_circle
          </span>
          <p className="text-sm text-secondary">Completed Today</p>
          <p className="text-2xl font-bold text-primary">
            {todayAppointments.filter(a => a.status === "completed").length}
          </p>
        </div>
        <div className="card bg-surface p-3 md:p-4 text-center">
          <span className="material-symbols-outlined text-warning text-3xl mb-2">
            hourglass_empty
          </span>
          <p className="text-sm text-secondary">Pending</p>
          <p className="text-2xl font-bold text-primary">
            {todayAppointments.filter(a => a.status === "pending").length}
          </p>
        </div>
      </div>
    </div>
  );
}
