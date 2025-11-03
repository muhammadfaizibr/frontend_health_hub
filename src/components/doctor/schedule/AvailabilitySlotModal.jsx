// components/doctor/schedule/AvailabilitySlotModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { useCreateAvailabilitySlot, useUpdateAvailabilitySlot } from "@/lib/hooks/useBase";

const DAY_OPTIONS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export default function AvailabilitySlotModal({ 
  isOpen, 
  onClose, 
  slot = null, 
  onSuccess 
}) {
  const toast = useToastContext();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createSlotMutation = useCreateAvailabilitySlot();
  const updateSlotMutation = useUpdateAvailabilitySlot();

  const [formData, setFormData] = useState({
    day_of_week: "",
    start_time: "",
    end_time: "",
    is_active: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (slot) {
      setFormData({
        day_of_week: slot.day_of_week,
        start_time: slot.start_time,
        end_time: slot.end_time,
        is_active: slot.is_active,
      });
    } else {
      setFormData({
        day_of_week: "",
        start_time: "",
        end_time: "",
        is_active: true,
      });
    }
    setErrors({});
  }, [slot, isOpen]);

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

    if (formData.day_of_week === "") {
      newErrors.day_of_week = "Day of week is required";
    }

    if (!formData.start_time) {
      newErrors.start_time = "Start time is required";
    }

    if (!formData.end_time) {
      newErrors.end_time = "End time is required";
    }

    if (formData.start_time && formData.end_time && formData.start_time >= formData.end_time) {
      newErrors.end_time = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const parseErrorResponse = (error) => {
    console.log('Full error object:', error);
    console.log('Error.response:', error?.response);
    console.log('Error.response.data:', error?.response?.data);
    
    // Try different possible error locations
    const errorData = error?.response?.data || error?.data || error;
    
    console.log('Parsed errorData:', errorData);

    // Handle validation errors with nested errors object
    if (errorData?.errors?.non_field_errors && Array.isArray(errorData.errors.non_field_errors)) {
      return errorData.errors.non_field_errors[0];
    }

    // Handle field-specific errors within errors object
    if (errorData?.errors) {
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
    if (errorData?.non_field_errors && Array.isArray(errorData.non_field_errors)) {
      return errorData.non_field_errors[0];
    }

    // Handle detail message
    if (errorData?.detail) {
      return errorData.detail;
    }

    // Handle error message
    if (errorData?.error) {
      return errorData.error;
    }

    // Handle message field
    if (errorData?.message) {
      return errorData.message;
    }

    // Handle string response
    if (typeof errorData === 'string') {
      return errorData;
    }

    return "Failed to save availability slot. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fix all validation errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const slotData = {
        day_of_week: parseInt(formData.day_of_week),
        start_time: formData.start_time,
        end_time: formData.end_time,
        is_active: formData.is_active,
      };

      if (slot) {
        await updateSlotMutation.mutateAsync({
          slotId: slot.id,
          slotData
        });
        toast.success("Availability slot updated successfully!");
      } else {
        await createSlotMutation.mutateAsync(slotData);
        toast.success("Availability slot created successfully!");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving availability slot:", error);
      console.error("Error type:", error?.constructor?.name);
      console.error("Error keys:", error ? Object.keys(error) : 'no error');
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
                {slot ? "Edit" : "Add"} Availability Slot
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
                Day of Week *
              </label>
              <Select
                name="day_of_week"
                value={formData.day_of_week}
                onChange={handleChange}
                options={DAY_OPTIONS}
                required
                disabled={isSubmitting}
                error={errors.day_of_week}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Start Time *
              </label>
              <Input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                disabled={isSubmitting}
                error={errors.start_time}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                End Time *
              </label>
              <Input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                disabled={isSubmitting}
                error={errors.end_time}
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
                {slot ? "Update" : "Create"} Slot
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}