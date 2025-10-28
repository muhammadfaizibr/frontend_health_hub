"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatDate, formatTime } from "@/lib/utils/global";

export default function AppointmentCard({ appointment, showActions = false }) {
  // Extract data from the nested structure
  const caseData = appointment.case;
  const timeSlot = appointment.time_slot;
  const doctor = caseData?.doctor?.user;
  const translator = appointment.translator;

  return (
    <div className="border border-color rounded-lg p-4 hover:shadow-md transition-shadow bg-card-light">
      {/* Header Section - Compact */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-primary text-lg mb-1">
            {caseData?.title || "Untitled Case"}
          </h3>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <span>Dr. {doctor?.full_name || "Not assigned"}</span>
            <span>•</span>
            <span>Appointment #{appointment.appointment_number}</span>
          </div>
        </div>

        <div className="text-right flex flex-col items-end gap-1">
          <StatusBadge status={appointment.status_display} />
          <span className="text-xs text-secondary">{caseData?.status}</span>
        </div>
      </div>

      {/* Main Info - Grid Layout for Compact Display */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-primary">
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

        {/* Duration & Timezone */}
        <div className="flex items-center gap-2 text-sm text-primary">
          <span className="material-symbols-outlined text-secondary text-base">
            schedule
          </span>
          <div>
            <div>{timeSlot?.duration_display}</div>
            <div className="text-xs text-secondary">{timeSlot?.timezone || "UTC"}</div>
          </div>
        </div>
      </div>

      {/* Important Info - Only show if present */}
      <div className="space-y-2">
        {/* Translator Status */}
        {appointment.is_translator_required && (
          <div className="flex items-center gap-2 text-sm text-info bg-info/5 rounded px-2 py-1">
            <span className="material-symbols-outlined text-base">translate</span>
            <span>
              {translator 
                ? `Translator: ${translator.full_name}` 
                : `Translator: ${appointment.translator_status}`
              }
            </span>
          </div>
        )}

        {/* Follow-up Badge */}
        {appointment.is_follow_up && (
          <div className="inline-flex items-center gap-1 text-xs text-info bg-info/10 rounded-full px-2 py-1">
            <span className="material-symbols-outlined text-sm">repeat</span>
            <span>Follow-up</span>
          </div>
        )}
      </div>

      {/* Cancellation Info - Compact */}
      {appointment.status === "Cancelled" && appointment.cancelled_by && (
        <div className="mt-3 bg-error/10 rounded p-3 text-sm">
          <div className="font-medium text-error mb-1">
            Cancelled by {appointment.cancelled_by.full_name}
          </div>
          {appointment.cancellation_reason && (
            <div className="text-error/80">
              Reason: {appointment.cancellation_reason}
            </div>
          )}
          {appointment.cancelled_at && (
            <div className="text-xs text-secondary mt-1">
              {formatDate(appointment.cancelled_at)} at {formatTime(appointment.cancelled_at)}
            </div>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-4 pt-4 border-t border-color flex flex-wrap gap-2 items-center">
        {/* View Full Details Link */}
        <Link
          href={`/patient/appointments/${appointment.id}`}
          className="button button-outline text-sm flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm"></span>
          View Details
        </Link>

        {/* Action Buttons for Confirmed Appointments */}
        {showActions && appointment.status === "Confirmed" && (
          <>
            <Link
              href={`/patient/appointments/${appointment.id}/reschedule`}
              className="button button-outline text-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Reschedule
            </Link>

            <button className="button button-outline text-error border-error hover:bg-error hover:text-inverse text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">cancel</span>
              Cancel
            </button>

            <button className="button button-primary text-sm flex items-center gap-1 ml-auto">
              <span className="material-symbols-outlined text-sm">videocam</span>
              Join Call
            </button>
          </>
        )}
      </div>
    </div>
  );
}