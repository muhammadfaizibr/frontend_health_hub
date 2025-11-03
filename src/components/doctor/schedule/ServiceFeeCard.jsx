// components/doctor/schedule/ServiceFeeCard.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { useDeleteServiceFee } from "@/lib/hooks/useBase";
import { Modal } from "@/components/ui/Modal";

export default function ServiceFeeCard({ fee, onEdit, onUpdate }) {
  const toast = useToastContext();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteFeeMutation = useDeleteServiceFee();

  const handleDelete = async () => {
    try {
      await deleteFeeMutation.mutateAsync(fee.id);
      toast.success("Service fee deleted successfully");
      setShowDeleteConfirm(false);
      onUpdate?.();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Failed to delete fee");
    }
  };

  return (
    <>
      <div className="card bg-surface p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">
                payments
              </span>
              <h3 className="font-semibold text-xl text-primary">{fee.duration_display}</h3>
              {!fee.is_active && (
                <Badge variant="cancelled" size="sm">Inactive</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-color">
                {fee.currency} {fee.fee}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(fee)}
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
        title="Delete Service Fee"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-error text-2xl">warning</span>
            </div>
            <div className="flex-1">
              <p className="text-primary font-semibold mb-2">
                Are you sure you want to delete this service fee?
              </p>
              <p className="text-sm text-secondary">
                This will remove the {fee.duration_display} fee of {fee.currency} {fee.fee} from your pricing.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button 
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deleteFeeMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              variant="emergency"
              onClick={handleDelete}
              isLoading={deleteFeeMutation.isPending}
            >
              Delete Fee
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}