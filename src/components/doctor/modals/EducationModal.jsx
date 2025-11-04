// components/doctor/modals/EducationModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { useCreateEducation, useUpdateEducation } from "@/lib/hooks/useBase";

export default function EducationModal({ isOpen, onClose, education }) {
  const { mutate: createEducation, isPending: isCreating } = useCreateEducation();
  const { mutate: updateEducation, isPending: isUpdating } = useUpdateEducation();
  
  const isEditMode = !!education;
  const isLoading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    field: "",
    grade: "",
    start_date: "",
    end_date: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (education) {
      setFormData({
        school: education.school || "",
        degree: education.degree || "",
        field: education.field || "",
        grade: education.grade || "",
        start_date: education.start_date || "",
        end_date: education.end_date || "",
        description: education.description || ""
      });
    } else {
      setFormData({
        school: "",
        degree: "",
        field: "",
        grade: "",
        start_date: "",
        end_date: "",
        description: ""
      });
    }
  }, [education, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.school?.trim()) newErrors.school = "School is required";
    if (!formData.degree?.trim()) newErrors.degree = "Degree is required";
    if (!formData.field?.trim()) newErrors.field = "Field of study is required";
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
        updateEducation(
          { educationId: education.id, educationData: formData },
          {
            onSuccess: () => {
              onClose();
            },
            onError: (error) => {
              setErrors({ submit: error.message || "Failed to update education" });
            }
          }
        );
      } else {
        createEducation(formData, {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            setErrors({ submit: error.message || "Failed to add education" });
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
      title={isEditMode ? "Edit Education" : "Add Education"}
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
          label="School/University"
          name="school"
          value={formData.school}
          onChange={handleChange}
          error={errors.school}
          placeholder="e.g., Harvard Medical School"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            error={errors.degree}
            placeholder="e.g., MBBS, MD"
            required
          />

          <Input
            label="Field of Study"
            name="field"
            value={formData.field}
            onChange={handleChange}
            error={errors.field}
            placeholder="e.g., Medicine"
            required
          />
        </div>

        <Input
          label="Grade/GPA"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="e.g., 3.8/4.0"
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
            rows={3}
            className="form-input"
            placeholder="Additional details about your education..."
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
            {isEditMode ? "Update" : "Add"} Education
          </Button>
        </div>
      </form>
    </Modal>
  );
}