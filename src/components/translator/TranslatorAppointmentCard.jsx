// components/translator/TranslatorAppointmentCard.jsx
"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatTime } from "@/lib/utils/global";

export default function TranslatorAppointmentCard({ appointment }) {
  const caseData = appointment.case;
  const timeSlot = appointment.time_slot;
  const doctor = caseData?.doctor?.user;
  const patient = caseData?.patient?.user;

  return (
    <div className="card bg-surface p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-primary text-lg mb-1">
            {caseData?.title || "Untitled Case"}
          </h3>
          <div className="flex items-center gap-2 text-sm text-secondary flex-wrap">
            <span>Patient: {patient?.full_name || "N/A"}</span>
            <span>•</span>
            <span>Dr. {doctor?.full_name || "Not assigned"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary mt-1">
            <span>Appointment #{appointment.appointment_number}</span>
          </div>
        </div>

        <Badge variant={appointment.status}>
          {appointment.status_display}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-start gap-2 text-sm text-primary">
          <span className="material-symbols-outlined text-secondary text-base">
            calendar_today
          </span>
          <div>
            <div>{formatDate(timeSlot?.date)}</div>
            <div className="text-xs text-secondary">
              {formatTime(timeSlot?.start_time)} - {formatTime(timeSlot?.end_time)}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm text-primary">
          <span className="material-symbols-outlined text-secondary text-base">
            schedule
          </span>
          <div>
            <div>{timeSlot?.duration_display}</div>
            <div className="text-xs text-secondary">{timeSlot?.timezone || "UTC"}</div>
          </div>
        </div>
      </div>

      {appointment.translator_status && (
        <div className="flex items-center gap-2 text-sm bg-info/10 text-info rounded px-3 py-2 mb-2">
          <span className="material-symbols-outlined text-base">translate</span>
          <span>Status: {appointment.translator_status}</span>
        </div>
      )}

      {appointment.notes && (
        <div className="mt-3 pt-3 border-t border-color">
          <p className="text-sm text-secondary mb-1">Notes:</p>
          <p className="text-sm text-primary">{appointment.notes}</p>
        </div>
      )}
    </div>
  );
}