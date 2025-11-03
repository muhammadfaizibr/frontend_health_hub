// components/doctor/schedule/ServiceFeeModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { useCreateServiceFee, useUpdateServiceFee } from "@/lib/hooks/useBase";

const DURATION_OPTIONS = [
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 45, label: "45 minutes" },
  { value: 60, label: "60 minutes" },
];

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "PKR", label: "PKR (Rs)" },
];

export default function ServiceFeeModal({ 
  isOpen, 
  onClose, 
  fee = null, 
  onSuccess 
}) {
  const toast = useToastContext();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createFeeMutation = useCreateServiceFee();
  const updateFeeMutation = useUpdateServiceFee();

  const [formData, setFormData] = useState({
    duration: "",
    fee: "",
    currency: "USD",
    is_active: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (fee) {
      setFormData({
        duration: fee.duration,
        fee: fee.fee,
        currency: fee.currency,
        is_active: fee.is_active,
      });
    } else {
      setFormData({
        duration: "",
        fee: "",
        currency: "USD",
        is_active: true,
      });
    }
    setErrors({});
  }, [fee, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    }

    if (!formData.fee) {
      newErrors.fee = "Fee is required";
    } else if (parseFloat(formData.fee) <= 0) {
      newErrors.fee = "Fee must be greater than zero";
    }

    if (!formData.currency) {
      newErrors.currency = "Currency is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const parseErrorResponse = (error) => {
    if (!error?.response?.data) {
      return "Failed to save service fee. Please try again.";
    }

    const errorData = error.response.data;

    // Handle validation errors with errors object
    if (errorData.errors) {
      // Check for non_field_errors (like duplicate duration)
      if (errorData.errors.non_field_errors && Array.isArray(errorData.errors.non_field_errors)) {
        return errorData.errors.non_field_errors[0];
      }

      // Check for field-specific errors
      const fieldErrors = [];
      Object.keys(errorData.errors).forEach(field => {
        if (field !== 'non_field_errors' && Array.isArray(errorData.errors[field])) {
          fieldErrors.push(`${field}: ${errorData.errors[field][0]}`);
        }
      });

      if (fieldErrors.length > 0) {
        return fieldErrors.join(', ');
      }
    }

    // Handle non_field_errors at root level
    if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
      return errorData.non_field_errors[0];
    }

    // Handle detail message
    if (errorData.detail) {
      return errorData.detail;
    }

    // Handle error message
    if (errorData.error) {
      return errorData.error;
    }

    // Handle string response
    if (typeof errorData === 'string') {
      return errorData;
    }

    return "Failed to save service fee. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fix all validation errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const feeData = {
        duration: parseInt(formData.duration),
        fee: parseFloat(formData.fee),
        currency: formData.currency,
        is_active: formData.is_active,
      };

      if (fee) {
        await updateFeeMutation.mutateAsync({
          feeId: fee.id,
          feeData
        });
        toast.success("Service fee updated successfully!");
      } else {
        await createFeeMutation.mutateAsync(feeData);
        toast.success("Service fee created successfully!");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving service fee:", error);
      const errorMessage = parseErrorResponse(error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
          <div className="p-6 border-b border-color sticky top-0 bg-surface z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">
                {fee ? "Edit" : "Add"} Service Fee
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2"
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Duration *
              </label>
              <Select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                options={DURATION_OPTIONS}
                required
                disabled={isSubmitting || !!fee}
                error={errors.duration}
              />
              {fee && (
                <p className="text-xs text-secondary mt-1">
                  Duration cannot be changed. Delete and create a new fee if needed.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Fee Amount *
              </label>
              <Input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                disabled={isSubmitting}
                error={errors.fee}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Currency *
              </label>
              <Select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                options={CURRENCY_OPTIONS}
                required
                disabled={isSubmitting}
                error={errors.currency}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-4 h-4 text-primary-color bg-surface border-color rounded focus:ring-primary-color"
              />
              <label htmlFor="is_active" className="text-sm text-primary cursor-pointer">
                Active
              </label>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t border-color">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose} 
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                isLoading={isSubmitting} 
                disabled={isSubmitting}
              >
                {fee ? "Update" : "Create"} Fee
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}