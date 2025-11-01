"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { apiPut } from "@/lib/api/utils/api-wrapper";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export default function EditCaseModal({ isOpen, onClose, caseData, onUpdate }) {
  const toast = useToastContext();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && caseData) {
      setFormData({
        title: caseData.title || "",
        description: caseData.description || "",
      });
      setErrors({});
    }
  }, [isOpen, caseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Case title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.trim().length > 255) {
      newErrors.title = "Title must not exceed 255 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await apiPut(
        `${API_ENDPOINTS.PATIENT.CASES}${caseData.id}/`,
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
        },
        {},
        'Case updated successfully'
      );

      toast.success("Case updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating case:", error);
      
      let errorMessage = "Failed to update case. Please try again.";
      
      if (error?.response?.data) {
        const errorData = error.response.data;
        if (errorData.title) {
          errorMessage = `Title: ${errorData.title[0]}`;
        } else if (errorData.description) {
          errorMessage = `Description: ${errorData.description[0]}`;
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
        <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
          <div className="p-6 border-b border-color sticky top-0 bg-surface z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Edit Case</h2>
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
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Case Title *
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Chronic Back Pain Treatment"
                disabled={isSubmitting}
                error={errors.title}
                hint={`${formData.title.length}/255 characters`}
                maxLength={255}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Description *
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your medical condition, symptoms, and any relevant history..."
                rows={6}
                disabled={isSubmitting}
                error={errors.description}
              />
            </div>

            <div className="flex gap-4 justify-end">
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
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}