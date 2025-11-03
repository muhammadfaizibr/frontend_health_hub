// components/patient/appointments/AppointmentInfo.jsx
"use client";

import React from "react";
import { formatDate, formatTime } from "@/lib/utils/global";

export default function AppointmentInfo({ appointment, isDoctor = false }) {
  const caseData = appointment.case;
  const timeSlot = appointment.time_slot;
  const doctor = caseData?.doctor?.user;
  const doctorProfile = caseData?.doctor;
  const patient = caseData?.patient?.user;

  const infoItems = isDoctor ? [
    {
      icon: "person",
      label: "Patient",
      value: patient?.full_name || "N/A",
    },
    {
      icon: "email",
      label: "Patient Email",
      value: patient?.email || "N/A",
    },
    {
      icon: "phone",
      label: "Patient Phone",
      value: patient?.phone_number || "N/A",
    },
    {
      icon: "folder",
      label: "Case",
      value: caseData?.title || "Untitled Case",
    },
    {
      icon: "calendar_today",
      label: "Date",
      value: formatDate(timeSlot?.date),
    },
    {
      icon: "schedule",
      label: "Time",
      value: `${formatTime(timeSlot?.start_time)} - ${formatTime(timeSlot?.end_time)}`,
    },
  ] : [
    {
      icon: "person",
      label: "Doctor",
      value: `Dr. ${doctor?.full_name || "Not assigned"}`,
    },
    {
      icon: "medical_services",
      label: "Specialization",
      value: doctorProfile?.category?.name || "N/A",
    },
    {
      icon: "folder",
      label: "Case",
      value: caseData?.title || "Untitled Case",
    },
    {
      icon: "calendar_today",
      label: "Date",
      value: formatDate(timeSlot?.date),
    },
    {
      icon: "schedule",
      label: "Time",
      value: `${formatTime(timeSlot?.start_time)} - ${formatTime(timeSlot?.end_time)}`,
    },
    {
      icon: "payments",
      label: "Consultation Fee",
      value: doctorProfile?.consultation_fee 
        ? `Rs. ${doctorProfile.consultation_fee}` 
        : "N/A",
    },
  ];

  return (
    <div className="flex flex-col card bg-card-light p-6 gap-4">
      <h2 className="text-lg font-semibold text-primary mb-2">
        Appointment Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary mt-0.5">
              {item.icon}
            </span>
            <div>
              <p className="text-sm text-secondary">{item.label}</p>
              <p className="text-primary font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {appointment.notes && (
        <div className="mt-4 pt-4 border-t border-color">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary mt-0.5">
              description
            </span>
            <div className="flex-1">
              <p className="text-sm text-secondary mb-1">Notes</p>
              <p className="text-primary">{appointment.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}