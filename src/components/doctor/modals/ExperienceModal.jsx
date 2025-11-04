// components/doctor/modals/ExperienceModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { useCreateExperience, useUpdateExperience } from "@/lib/hooks/useBase";

const EMPLOYMENT_TYPES = [
  { value: "house_job", label: "House Job" },
  { value: "part_time", label: "Part Time" },
  { value: "full_time", label: "Full Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" }
];

export default function ExperienceModal({ isOpen, onClose, experience }) {
  const { mutate: createExperience, isPending: isCreating } = useCreateExperience();
  const { mutate: updateExperience, isPending: isUpdating } = useUpdateExperience();
  
  const isEditMode = !!experience;
  const isLoading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    title: "",
    employment_type: "",
    company_or_organization: "",
    location: "",
    start_date: "",
    end_date: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title || "",
        employment_type: experience.employment_type || "",
        company_or_organization: experience.company_or_organization || "",
        location: experience.location || "",
        start_date: experience.start_date || "",
        end_date: experience.end_date || "",
        description: experience.description || ""
      });
    } else {
      setFormData({
        title: "",
        employment_type: "",
        company_or_organization: "",
        location: "",
        start_date: "",
        end_date: "",
        description: ""
      });
    }
  }, [experience, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title?.trim()) newErrors.title = "Job title is required";
    if (!formData.employment_type) newErrors.employment_type = "Employment type is required";
    if (!formData.company_or_organization?.trim()) newErrors.company_or_organization = "Organization is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    
    if (formData.end_date && formData.start_date && formData.end_date < formData.start_date) {
      newErrors.end_date = "End date cannot be before start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      if (isEditMode) {
        updateExperience(
          { experienceId: experience.id, experienceData: formData },
          {
            onSuccess: () => {
              onClose();
            },
            onError: (error) => {
              setErrors({ submit: error.message || "Failed to update experience" });
            }
          }
        );
      } else {
        createExperience(formData, {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            setErrors({ submit: error.message || "Failed to add experience" });
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
      title={isEditMode ? "Edit Experience" : "Add Experience"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="alert alert-error">
            <span className="material-symbols-outlined">error</span>
            {errors.submit}
          </div>
        )}

        <Input
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="e.g., Senior Cardiologist"
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Employment Type *</label>
          <select
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Type</option>
            {EMPLOYMENT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.employment_type && (
            <p className="text-error text-sm">{errors.employment_type}</p>
          )}
        </div>

        <Input
          label="Company/Organization"
          name="company_or_organization"
          value={formData.company_or_organization}
          onChange={handleChange}
          error={errors.company_or_organization}
          placeholder="e.g., City General Hospital"
          required
        />

        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., New York, USA"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
            error={errors.start_date}
            required
          />

          <Input
            label="End Date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleChange}
            error={errors.end_date}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="form-input"
            placeholder="Describe your responsibilities and achievements..."
          />
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
            {isEditMode ? "Update" : "Add"} Experience
          </Button>
        </div>
      </form>
    </Modal>
  );
}