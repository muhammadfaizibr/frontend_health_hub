// components/doctor/modals/AvailabilityModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { useCreateAvailabilitySlot, useUpdateAvailabilitySlot } from "@/lib/hooks/useBase";

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" }
];

export default function AvailabilityModal({ isOpen, onClose, slot }) {
  const { mutate: createSlot, isPending: isCreating } = useCreateAvailabilitySlot();
  const { mutate: updateSlot, isPending: isUpdating } = useUpdateAvailabilitySlot();
  
  const isEditMode = !!slot;
  const isLoading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    day_of_week: "",
    start_time: "",
    end_time: "",
    is_active: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (slot) {
      setFormData({
        day_of_week: slot.day_of_week?.toString() || "",
        start_time: slot.start_time || "",
        end_time: slot.end_time || "",
        is_active: slot.is_active ?? true
      });
    } else {
      setFormData({
        day_of_week: "",
        start_time: "",
        end_time: "",
        is_active: true
      });
    }
  }, [slot, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (formData.day_of_week === "") newErrors.day_of_week = "Day is required";
    if (!formData.start_time) newErrors.start_time = "Start time is required";
    if (!formData.end_time) newErrors.end_time = "End time is required";
    
    if (formData.start_time && formData.end_time && formData.start_time >= formData.end_time) {
      newErrors.end_time = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    const submitData = {
      ...formData,
      day_of_week: parseInt(formData.day_of_week)
    };

    try {
      if (isEditMode) {
        updateSlot(
          { slotId: slot.id, slotData: submitData },
          {
            onSuccess: () => {
              onClose();
            },
            onError: (error) => {
              setErrors({ submit: error.message || "Failed to update availability" });
            }
          }
        );
      } else {
        createSlot(submitData, {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            setErrors({ submit: error.message || "Failed to add availability" });
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEditMode ? "Edit Availability Slot" : "Add Availability Slot"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="alert alert-error">
            <span className="material-symbols-outlined">error</span>
            {errors.submit}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Day of Week *</label>
          <select
            name="day_of_week"
            value={formData.day_of_week}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Day</option>
            {DAYS_OF_WEEK.map(day => (
              <option key={day.value} value={day.value}>{day.label}</option>
            ))}
          </select>
          {errors.day_of_week && (
            <p className="text-error text-sm">{errors.day_of_week}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Time"
            name="start_time"
            type="time"
            value={formData.start_time}
            onChange={handleChange}
            error={errors.start_time}
            required
          />

          <Input
            label="End Time"
            name="end_time"
            type="time"
            value={formData.end_time}
            onChange={handleChange}
            error={errors.end_time}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="form-checkbox"
          />
          <label htmlFor="is_active" className="text-sm text-primary cursor-pointer">
            Active
          </label>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-color">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {isEditMode ? "Update" : "Add"} Slot
          </Button>
        </div>
      </form>
    </Modal>
  );
}