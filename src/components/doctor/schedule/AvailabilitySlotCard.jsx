// components/doctor/schedule/AvailabilitySlotCard.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { useDeleteAvailabilitySlot } from "@/lib/hooks/useBase";
import { Modal } from "@/components/ui/Modal";

export default function AvailabilitySlotCard({ slot, onEdit, onUpdate }) {
  const toast = useToastContext();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteSlotMutation = useDeleteAvailabilitySlot();

  const formatTime = (time) => {
    if (!time) return "N/A";
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleDelete = async () => {
    try {
      await deleteSlotMutation.mutateAsync(slot.id);
      toast.success("Availability slot deleted successfully");
      setShowDeleteConfirm(false);
      onUpdate?.();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to delete slot");
    }
  };

  return (
    <>
      <div className="card bg-surface p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">
                calendar_today
              </span>
              <h3 className="font-semibold text-xl text-primary">{slot.day_name}</h3>
              {!slot.is_active && (
                <Badge variant="cancelled" size="sm">Inactive</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-secondary">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(slot)}
              className="p-2"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-error hover:bg-error/10"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Availability Slot"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-error text-2xl">warning</span>
            </div>
            <div className="flex-1">
              <p className="text-primary font-semibold mb-2">
                Are you sure you want to delete this availability slot?
              </p>
              <p className="text-sm text-secondary">
                This will remove {slot.day_name} {formatTime(slot.start_time)} - {formatTime(slot.end_time)} from your schedule.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button 
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deleteSlotMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              variant="emergency"
              onClick={handleDelete}
              isLoading={deleteSlotMutation.isPending}
            >
              Delete Slot
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}