// components/doctor/CreatePrescriptionModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { createPrescription, addPrescriptionItems } from "@/lib/api/services/doctor";
import { formatDate } from "@/lib/utils/global";

export default function CreatePrescriptionModal({ 
  isOpen, 
  onClose, 
  appointment, 
  onSuccess 
}) {
  const toast = useToastContext();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    start_date: new Date().toISOString().split('T')[0],
    course_duration_days: 7,
    items: [
      {
        medicine_name: "",
        frequency: "",
        dosage_amount: "",
        instructions: ""
      }
    ]
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        instructions: "",
        start_date: new Date().toISOString().split('T')[0],
        course_duration_days: 7,
        items: [
          {
            medicine_name: "",
            frequency: "",
            dosage_amount: "",
            instructions: ""
          }
        ]
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData(prev => ({ ...prev, items: newItems }));

    if (errors[`items.${index}.${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`items.${index}.${field}`];
      setErrors(newErrors);
    }
  };

  const addMedicineItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          medicine_name: "",
          frequency: "",
          dosage_amount: "",
          instructions: ""
        }
      ]
    }));
  };

  const removeMedicineItem = (index) => {
    if (formData.items.length === 1) {
      toast.error("At least one medicine is required");
      return;
    }
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Prescription title is required";
    }

    if (!formData.start_date) {
      newErrors.start_date = "Start date is required";
    }

    if (formData.course_duration_days < 1 || formData.course_duration_days > 365) {
      newErrors.course_duration_days = "Duration must be between 1 and 365 days";
    }

    formData.items.forEach((item, index) => {
      if (!item.medicine_name.trim()) {
        newErrors[`items.${index}.medicine_name`] = "Medicine name is required";
      }
      if (!item.frequency.trim()) {
        newErrors[`items.${index}.frequency`] = "Frequency is required";
      }
      if (!item.dosage_amount.trim()) {
        newErrors[`items.${index}.dosage_amount`] = "Dosage is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fix all validation errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const prescriptionData = {
        case_id: appointment.case.id,
        appointment_id: appointment.id,
        title: formData.title.trim(),
        instructions: formData.instructions.trim(),
        start_date: formData.start_date,
        course_duration_days: parseInt(formData.course_duration_days),
      };

      const prescription = await createPrescription(prescriptionData);

      if (prescription?.id) {
        const items = formData.items.map(item => ({
          medicine_name: item.medicine_name.trim(),
          frequency: item.frequency.trim(),
          dosage_amount: item.dosage_amount.trim(),
          instructions: item.instructions.trim()
        }));

        await addPrescriptionItems(prescription.id, items);
      }

      toast.success("Prescription created successfully!");
      onSuccess?.();
    } catch (error) {
      console.error("Error creating prescription:", error);
      
      let errorMessage = "Failed to create prescription. Please try again.";
      
      if (error?.response?.data) {
        const errorData = error.response.data;
        if (errorData.title) {
          errorMessage = `Title: ${errorData.title[0]}`;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      }
      
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
        <div className="bg-surface rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
          <div className="p-6 border-b border-color sticky top-0 bg-surface z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Create Prescription</h2>
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

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
            <div className="bg-hover p-4 rounded-lg">
              <p className="text-sm text-secondary mb-2">
                This prescription will be attached to:
              </p>
              <p className="text-sm font-medium text-primary">
                Patient: {appointment.case?.patient?.user?.full_name || "N/A"}
              </p>
              <p className="text-sm font-medium text-primary">
                Case: {appointment.case?.title || "N/A"}
              </p>
              <p className="text-sm font-medium text-primary">
                Appointment: {formatDate(appointment.time_slot?.date)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Prescription Title *
                </label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Post-consultation Medication"
                  disabled={isSubmitting}
                  error={errors.title}
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Start Date *
                </label>
                <Input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={errors.start_date}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Course Duration (Days) *
              </label>
              <Input
                type="number"
                name="course_duration_days"
                value={formData.course_duration_days}
                onChange={handleChange}
                placeholder="7"
                min="1"
                max="365"
                disabled={isSubmitting}
                error={errors.course_duration_days}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                General Instructions (Optional)
              </label>
              <Textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Add general instructions for the prescription..."
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            <div className="border-t border-color pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary">Medicines</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMedicineItem}
                  disabled={isSubmitting}
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Medicine
                </Button>
              </div>

              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="p-4 border border-color rounded-lg bg-hover/30">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-primary">Medicine {index + 1}</h4>
                      {formData.items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedicineItem(index)}
                          disabled={isSubmitting}
                          className="text-error hover:bg-error/10"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Medicine Name *
                        </label>
                        <Input
                          type="text"
                          value={item.medicine_name}
                          onChange={(e) => handleItemChange(index, 'medicine_name', e.target.value)}
                          placeholder="e.g., Paracetamol"
                          disabled={isSubmitting}
                          error={errors[`items.${index}.medicine_name`]}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Dosage *
                        </label>
                        <Input
                          type="text"
                          value={item.dosage_amount}
                          onChange={(e) => handleItemChange(index, 'dosage_amount', e.target.value)}
                          placeholder="e.g., 500mg or 2 tablets"
                          disabled={isSubmitting}
                          error={errors[`items.${index}.dosage_amount`]}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Frequency *
                        </label>
                        <Input
                          type="text"
                          value={item.frequency}
                          onChange={(e) => handleItemChange(index, 'frequency', e.target.value)}
                          placeholder="e.g., Twice daily, Every 6 hours"
                          disabled={isSubmitting}
                          error={errors[`items.${index}.frequency`]}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Instructions (Optional)
                        </label>
                        <Input
                          type="text"
                          value={item.instructions}
                          onChange={(e) => handleItemChange(index, 'instructions', e.target.value)}
                          placeholder="e.g., Take with food"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-end border-t border-color pt-6">
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
                Create Prescription
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}