// components/patient/appointments/AppointmentCard.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatTime } from "@/lib/utils/global";
import { useJoinAppointment } from "@/lib/hooks/usePatients";
import { toast } from "react-hot-toast";

export default function AppointmentCard({ 
  appointment, 
  showActions = false, 
  onUpdate,
  isDoctor = false,
  isTranslator = false
}) {
  const caseData = appointment.case;
  const timeSlot = appointment.time_slot;
  const doctor = caseData?.doctor?.user;
  const patient = caseData?.patient?.user;
  const translator = appointment.translator;
  const [isJoinEnabled, setIsJoinEnabled] = useState(appointment.is_join_enabled);

  const { mutateAsync: joinAppointment, isPending: isJoining } = useJoinAppointment();

  const appointmentLink = isDoctor 
    ? `/doctor/appointments/${appointment.id}` 
    : isTranslator
    ? `/translator/appointments/${appointment.id}`
    : `/patient/appointments/${appointment.id}`;

  // Check join button status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setIsJoinEnabled(checkJoinEnabled());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [appointment]);

  const checkJoinEnabled = () => {
    if (!timeSlot) return false;
    
    const appointmentDate = new Date(`${timeSlot.date}T${timeSlot.start_time}`);
    const now = new Date();
    const enableTime = new Date(appointmentDate.getTime() - 5 * 60000); // 5 mins before
    const disableTime = new Date(appointmentDate.getTime() + 10 * 60000); // 10 mins after
    
    return enableTime <= now && now <= disableTime;
  };

const handleJoinCall = async () => {
  console.log('test ')
  console.log('appointment.id', appointment.id)
  try {
    let participantType = 'patient';
    if (isDoctor) participantType = 'doctor';
    else if (isTranslator) participantType = 'translator';

    // Pass as an object matching the mutationFn parameters
    await joinAppointment({ 
      appointmentId: appointment.id, 
      participantType 
    });

    // Open meeting link in new tab
    window.open(appointment.meeting_link, '_blank');
    
    toast.success('Joined appointment successfully');
    onUpdate?.();
  } catch (error) {
    console.log(error)
    toast.error(error.message || 'Failed to join appointment');
  }
};

  const getJoinedStatus = () => {
    const statuses = [];
    if (appointment.patient_joined) statuses.push('Patient joined');
    if (appointment.doctor_joined) statuses.push('Doctor joined');
    if (appointment.translator_joined && appointment.is_translator_required) {
      statuses.push('Translator joined');
    }
    return statuses.length > 0 ? statuses.join(', ') : null;
  };

  const hasUserJoined = () => {
    if (isDoctor) return appointment.doctor_joined;
    if (isTranslator) return appointment.translator_joined;
    return appointment.patient_joined;
  };

  return (
    <div className="card bg-card-light p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-primary text-lg mb-1">
            {caseData?.title || "Untitled Case"}
          </h3>
          <div className="flex items-center gap-2 text-sm text-secondary">
            {isDoctor ? (
              <>
                <span>Patient: {patient?.full_name || "N/A"}</span>
                <span>•</span>
              </>
            ) : isTranslator ? (
              <>
                <span>Patient: {patient?.full_name || "N/A"}</span>
                <span>•</span>
                <span>Dr. {doctor?.full_name || "Not assigned"}</span>
                <span>•</span>
              </>
            ) : (
              <>
                <span>Dr. {doctor?.full_name || "Not assigned"}</span>
                <span>•</span>
              </>
            )}
            <span>Appointment #{appointment.appointment_number}</span>
          </div>
        </div>

        <div className="text-right flex flex-col items-end gap-1">
          <Badge variant={appointment.status}>
            {appointment.join_status_display || appointment.status_display}
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

      {getJoinedStatus() && (
        <div className="bg-success/10 text-success rounded px-3 py-2 text-sm mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{getJoinedStatus()}</span>
          </div>
        </div>
      )}

      {appointment.status === "cancelled" && appointment.cancelled_by && (
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
        <Link href={appointmentLink}>
          <Button variant="outline" size="sm">
            <span className="material-symbols-outlined text-sm">visibility</span>
            View Details
          </Button>
        </Link>

        {!isDoctor && !isTranslator && showActions && appointment.status === "confirmed" && (
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
          </>
        )}

        {(appointment.status === "confirmed" || appointment.status === "in_progress") && (
          <Button 
            size="sm" 
            className="ml-auto"
            disabled={!isJoinEnabled || hasUserJoined() || isJoining}
            onClick={handleJoinCall}
          >
            {isJoining ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                Joining...
              </>
            ) : hasUserJoined() ? (
              <>
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Joined
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">videocam</span>
                Join Call
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}