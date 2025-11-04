// components/doctor/DeletePaymentMethodModal.jsx
"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useDeletePaymentMethod } from "@/lib/hooks/useBilling";
import { toast } from "react-hot-toast";

export default function DeletePaymentMethodModal({ 
  isOpen, 
  onClose, 
  paymentMethod,
  onSuccess 
}) {
  const { mutateAsync: deletePaymentMethod, isPending } = useDeletePaymentMethod();

  const handleDelete = async () => {
    if (!paymentMethod) return;

    try {
      await deletePaymentMethod(paymentMethod.id);
      toast.success('Payment method deleted successfully');
      onSuccess?.();
      onClose();
    } catch (error) {
      const errorMessage = error?.response?.data?.detail 
        || error.message 
        || 'Failed to delete payment method';
      toast.error(errorMessage);
    }
  };

  if (!paymentMethod) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Payment Method"
      size="sm"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-error text-2xl">warning</span>
          </div>
          <div className="flex-1">
            <p className="text-primary font-semibold mb-2">
              Are you sure you want to delete this payment method?
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              This action cannot be undone. You won't be able to receive payouts to this account anymore.
            </p>
          </div>
        </div>

        <div className="bg-surface-secondary rounded-lg p-4 border border-color">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary-color">
              account_balance
            </span>
            <div className="font-semibold text-primary">
              {paymentMethod.metadata?.bank_name || 'Bank Account'}
            </div>
          </div>
          <div className="text-sm text-secondary space-y-1 ml-9">
            <p>Account: {paymentMethod.metadata?.account_number || 'N/A'}</p>
            <p>Title: {paymentMethod.metadata?.account_title || 'N/A'}</p>
            {paymentMethod.metadata?.iban && (
              <p>IBAN: {paymentMethod.metadata.iban}</p>
            )}
          </div>
        </div>

        {paymentMethod.is_default && (
          <div className="bg-warning/10 rounded-lg p-3 border border-warning/20">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-warning text-xl">info</span>
              <p className="text-sm text-warning">
                This is your default payment method. Consider setting another payment method as default before deleting this one.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end pt-2">
          <Button 
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button 
            variant="emergency"
            onClick={handleDelete}
            isLoading={isPending}
            disabled={isPending}
          >
            <span className="material-symbols-outlined text-base">delete</span>
            Yes, Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}