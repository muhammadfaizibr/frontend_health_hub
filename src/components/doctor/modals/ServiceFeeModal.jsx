// components/doctor/modals/ServiceFeeModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { useCreateServiceFee, useUpdateServiceFee } from "@/lib/hooks/useBase";

const DURATION_OPTIONS = [
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 45, label: "45 minutes" },
  { value: 60, label: "60 minutes" }
];

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "PKR", label: "PKR (₨)" }
];

export default function ServiceFeeModal({ isOpen, onClose, fee }) {
  const { mutate: createFee, isPending: isCreating } = useCreateServiceFee();
  const { mutate: updateFee, isPending: isUpdating } = useUpdateServiceFee();
  
  const isEditMode = !!fee;
  const isLoading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    duration: "",
    fee: "",
    currency: "USD",
    is_active: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (fee) {
      setFormData({
        duration: fee.duration?.toString() || "",
        fee: fee.fee || "",
        currency: fee.currency || "USD",
        is_active: fee.is_active ?? true
      });
    } else {
      setFormData({
        duration: "",
        fee: "",
        currency: "USD",
        is_active: true
      });
    }
  }, [fee, isOpen]);

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
    
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.fee) newErrors.fee = "Fee is required";
    if (formData.fee && (isNaN(formData.fee) || parseFloat(formData.fee) <= 0)) {
      newErrors.fee = "Fee must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    const submitData = {
      ...formData,
      duration: parseInt(formData.duration),
      fee: parseFloat(formData.fee)
    };

    try {
      if (isEditMode) {
        updateFee(
          { feeId: fee.id, feeData: submitData },
          {
            onSuccess: () => {
              onClose();
            },
            onError: (error) => {
              setErrors({ submit: error.message || "Failed to update fee" });
            }
          }
        );
      } else {
        createFee(submitData, {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            setErrors({ submit: error.message || "Failed to add fee" });
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
      title={isEditMode ? "Edit Service Fee" : "Add Service Fee"}
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
          <label className="text-sm font-medium text-primary">Duration *</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Duration</option>
            {DURATION_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.duration && (
            <p className="text-error text-sm">{errors.duration}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Fee Amount"
            name="fee"
            type="number"
            step="0.01"
            min="0"
            value={formData.fee}
            onChange={handleChange}
            error={errors.fee}
            placeholder="0.00"
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-primary">Currency *</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="form-input"
              required
            >
              {CURRENCY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
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
            {isEditMode ? "Update" : "Add"} Fee
          </Button>
        </div>
      </form>
    </Modal>
  );
}