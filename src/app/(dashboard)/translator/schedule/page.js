"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function TranslatorSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState("week");

  const scheduleData = [
    {
      id: 1,
      date: "2024-01-15",
      time: "09:00",
      duration: 60,
      patient: "Carlos Rodriguez",
      appointment: "Cardiologist Consultation",
      language: "Spanish",
      type: "In-person",
      status: "scheduled",
      doctor: "Dr. Sarah Johnson",
      room: "Room 205"
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "10:30",
      duration: 45,
      patient: "Aisha Patel",
      appointment: "MRI Scan Discussion",
      language: "Hindi",
      type: "Telehealth",
      status: "scheduled",
      doctor: "Dr. Michael Chen",
      room: "Virtual Room 1"
    },
    {
      id: 3,
      date: "2024-01-15",
      time: "14:00",
      duration: 60,
      patient: "François Dubois",
      appointment: "Pre-surgery Consultation",
      language: "French",
      type: "In-person",
      status: "scheduled",
      doctor: "Dr. Emily Rodriguez",
      room: "Room 312"
    },
    {
      id: 4,
      date: "2024-01-16",
      time: "09:30",
      duration: 30,
      patient: "Maria Santos",
      appointment: "Pediatric Checkup",
      language: "Spanish",
      type: "In-person",
      status: "scheduled",
      doctor: "Dr. Lisa Martinez",
      room: "Room 101"
    },
    {
      id: 5,
      date: "2024-01-16",
      time: "11:00",
      duration: 45,
      patient: "Ahmed Hassan",
      appointment: "Orthopedics Consultation",
      language: "Arabic",
      type: "In-person",
      status: "scheduled",
      doctor: "Dr. James Wilson",
      room: "Room 203"
    }
  ];

  const viewModeOptions = [
    { value: "day", label: "Day View" },
    { value: "week", label: "Week View" },
    { value: "month", label: "Month View" }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      scheduled: "badge badge-info",
      completed: "badge badge-success",
      cancelled: "badge badge-error"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredSchedule = scheduleData.filter(item => 
    item.date === selectedDate || viewMode !== "day"
  );

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const hasAppointment = filteredSchedule.some(item => item.time === time);
        slots.push({
          time,
          hasAppointment,
          appointment: filteredSchedule.find(item => item.time === time)
        });
      }
    }
    return slots;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Schedule Management</h1>
          <p className="text-secondary mt-1">
            Manage your translation schedule and availability
          </p>
        </div>
      </div>

      {/* Schedule Controls */}
      <div className="card bg-surface p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            label="Select Date"
          />
          <Select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            options={viewModeOptions}
            label="View Mode"
          />
          <div className="flex items-end">
            <Button fullWidth>
              <span className="material-symbols-outlined text-sm">add</span>
              Add Time Slot
            </Button>
          </div>
        </div>
      </div>

      {/* Schedule View */}
      {viewMode === "day" && (
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Schedule for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          
          <div className="flex flex-col gap-2">
            {getTimeSlots().map((slot) => (
              <div key={slot.time} className="flex items-center gap-4 p-3 border border-color rounded-lg">
                <div className="w-20 text-sm font-medium text-primary">
                  {formatTime(slot.time)}
                </div>
                <div className="flex-1">
                  {slot.hasAppointment ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary">
                          {slot.appointment.patient}
                        </h4>
                        <p className="text-sm text-secondary">
                          {slot.appointment.appointment} • {slot.appointment.language}
                        </p>
                        <p className="text-xs text-secondary">
                          Dr. {slot.appointment.doctor} • {slot.appointment.room}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={getStatusBadge(slot.appointment.status)}>
                          {slot.appointment.status}
                        </span>
                        <p className="text-xs text-secondary mt-1">
                          {slot.appointment.duration} min
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-secondary text-sm">
                      Available
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === "week" && (
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Weekly Schedule
          </h2>
          
          <div className="flex flex-col gap-4">
            {filteredSchedule.map((appointment) => (
              <div key={appointment.id} className="flex items-center gap-4 p-4 border border-color rounded-lg">
                <div className="w-24 text-sm font-medium text-primary">
                  {new Date(appointment.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="w-20 text-sm text-secondary">
                  {formatTime(appointment.time)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-primary">
                    {appointment.patient}
                  </h4>
                  <p className="text-sm text-secondary">
                    {appointment.appointment} • {appointment.language}
                  </p>
                  <p className="text-xs text-secondary">
                    Dr. {appointment.doctor} • {appointment.room}
                  </p>
                </div>
                <div className="text-right">
                  <span className={getStatusBadge(appointment.status)}>
                    {appointment.status}
                  </span>
                  <p className="text-xs text-secondary mt-1">
                    {appointment.duration} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === "month" && (
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Monthly Overview
          </h2>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-secondary p-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-4xl text-secondary mb-2">
              calendar_month
            </span>
            <p className="text-secondary">
              Monthly calendar view coming soon
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            schedule
          </span>
          <p className="text-sm text-secondary">Today's Appointments</p>
          <p className="text-2xl font-bold text-primary">
            {filteredSchedule.filter(item => item.date === new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-success text-3xl mb-2">
            check_circle
          </span>
          <p className="text-sm text-secondary">Completed This Week</p>
          <p className="text-2xl font-bold text-primary">12</p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-info text-3xl mb-2">
            language
          </span>
          <p className="text-sm text-secondary">Languages Used</p>
          <p className="text-2xl font-bold text-primary">5</p>
        </div>
      </div>
    </div>
  );
}
