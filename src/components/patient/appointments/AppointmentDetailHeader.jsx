"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { useCancelAppointment } from "@/lib/hooks/usePatients";
import { formatDate, formatTime } from "@/lib/utils/global";
import { Modal } from "@/components/ui/Modal";

export default function AppointmentDetailHeader({ appointment, onUpdate }) {
  const { addToast } = useToastContext();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const cancelAppointmentMutation = useCancelAppointment();

  const canCancel = ['pending_confirmation', 'confirmed'].includes(
    appointment.status?.toLowerCase()
  );

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = async () => {
    try {
      await cancelAppointmentMutation.mutateAsync(appointment.id);
      addToast("Appointment cancelled successfully", "success");
      setShowCancelConfirm(false);
      onUpdate?.();
    } catch (error) {
      addToast(error?.response?.data?.detail || "Failed to cancel appointment", "error");
    }
  };

  const caseData = appointment.case;
  const timeSlot = appointment.time_slot;
  const doctor = caseData?.doctor?.user;

  return (
    <div className="card bg-surface p-4">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="text-2xl font-bold text-primary">
              {caseData?.title || "Untitled Case"}
            </h2>
            <Badge variant={appointment.status}>
              {appointment.status_display}
            </Badge>
            <Badge variant={caseData?.status} size="sm">
              {caseData?.status}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-secondary">
            <span>Dr. {doctor?.full_name || "Not assigned"}</span>
            <span>•</span>
            <span>Appointment #{appointment.appointment_number}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-base text-secondary">
                calendar_today
              </span>
              <div className="text-primary">
                <div className="font-medium">{formatDate(timeSlot?.date)}</div>
                <div className="text-xs text-secondary">
                  {formatTime(timeSlot?.start_time)} - {formatTime(timeSlot?.end_time)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-base text-secondary">
                schedule
              </span>
              <div className="text-primary">
                <div className="font-medium">{timeSlot?.duration_display}</div>
                <div className="text-xs text-secondary">{timeSlot?.timezone || "UTC"}</div>
              </div>
            </div>
          </div>

          {appointment.is_translator_required && (
            <div className="flex items-center gap-2 text-sm bg-info/10 text-info rounded px-3 py-2">
              <span className="material-symbols-outlined text-base">translate</span>
              <span>
                {appointment.translator 
                  ? `Translator: ${appointment.translator.full_name}` 
                  : `Translator: ${appointment.translator_status}`
                }
              </span>
            </div>
          )}

          {appointment.is_follow_up && (
            <div className="inline-flex items-center gap-1 text-xs bg-info/10 text-info rounded-full px-3 py-1 w-fit">
              <span className="material-symbols-outlined text-sm">repeat</span>
              <span>Follow-up Appointment</span>
            </div>
          )}

          {appointment.status?.toLowerCase() === "cancelled" && appointment.cancelled_by && (
            <div className="bg-error/10 rounded p-3 text-sm">
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
        </div>

        <div className="flex gap-2">
          {canCancel && (
            <Button 
              variant="emergency" 
              size="sm"
              onClick={handleCancelClick}
            >
              <span className="material-symbols-outlined text-sm">cancel</span>
              Cancel Appointment
            </Button>
          )}
        </div>
      </div>

      {/* Cancellation Confirmation Modal */}
      <Modal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        title="Cancel Appointment"
        size="sm"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-error text-2xl">warning</span>
            </div>
            <div className="flex-1">
              <p className="text-primary font-semibold mb-2">
                Are you sure you want to cancel this appointment?
              </p>
              <p className="text-sm text-secondary leading-relaxed">
                This action cannot be undone. The patient and doctor will be notified of the cancellation.
              </p>
            </div>
          </div>

          <div className="bg-surface-secondary rounded-lg p-4 border border-color">
            <div className="font-semibold text-primary mb-2">
              {caseData?.title || "Untitled Case"}
            </div>
            <div className="text-sm text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-base">schedule</span>
              <span>{formatDate(timeSlot?.date)} at {formatTime(timeSlot?.start_time)}</span>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button 
              variant="outline"
              onClick={() => setShowCancelConfirm(false)}
              disabled={cancelAppointmentMutation.isPending}
            >
              Keep Appointment
            </Button>
            <Button 
              variant="emergency"
              onClick={handleCancelConfirm}
              isLoading={cancelAppointmentMutation.isPending}
            >
              <span className="material-symbols-outlined text-base">cancel</span>
              Yes, Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}