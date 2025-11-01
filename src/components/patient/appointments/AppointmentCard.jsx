"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatTime } from "@/lib/utils/global";

export default function AppointmentCard({ appointment, showActions = false }) {
  const caseData = appointment.case;
  const timeSlot = appointment.time_slot;
  const doctor = caseData?.doctor?.user;
  const translator = appointment.translator;

  return (
    <div className="card bg-card-light p-4 hover:shadow-lg transition-shadow">
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
          <Badge variant={appointment.status}>
            {appointment.status_display}
          </Badge>
          <Badge variant={caseData?.status} size="sm">
            {caseData?.status}
          </Badge>
        </div>
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

      {appointment.is_translator_required && (
        <div className="flex items-center gap-2 text-sm bg-info/10 text-info rounded px-2 py-1 mb-2">
          <span className="material-symbols-outlined text-base">translate</span>
          <span>
            {translator 
              ? `Translator: ${translator.full_name}` 
              : `Translator: ${appointment.translator_status}`
            }
          </span>
        </div>
      )}

      {appointment.is_follow_up && (
        <div className="inline-flex items-center gap-1 text-xs bg-info/10 text-info rounded-full px-2 py-1 mb-2">
          <span className="material-symbols-outlined text-sm">repeat</span>
          <span>Follow-up</span>
        </div>
      )}

      {appointment.status === "Cancelled" && appointment.cancelled_by && (
        <div className="bg-error/10 rounded p-3 text-sm mb-3">
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

      <div className="pt-4 border-t border-color flex flex-wrap gap-2 items-center">
        <Link href={`/patient/appointments/${appointment.id}`}>
          <Button variant="outline" size="sm">
            <span className="material-symbols-outlined text-sm">visibility</span>
            View Details
          </Button>
        </Link>

        {showActions && appointment.status === "Confirmed" && (
          <>
            <Link href={`/patient/appointments/${appointment.id}/reschedule`}>
              <Button variant="outline" size="sm">
                <span className="material-symbols-outlined text-sm">edit</span>
                Reschedule
              </Button>
            </Link>

            <Button 
              variant="outline" 
              size="sm"
              className="border-error text-error hover:bg-error hover:text-inverse"
            >
              <span className="material-symbols-outlined text-sm">cancel</span>
              Cancel
            </Button>

            <Button size="sm" className="ml-auto">
              <span className="material-symbols-outlined text-sm">videocam</span>
              Join Call
            </Button>
          </>
        )}
      </div>
    </div>
  );
}