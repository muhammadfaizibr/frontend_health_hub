// components/translator/LanguageModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { useCreateTranslatorLanguage, useUpdateTranslatorLanguage } from "@/lib/hooks/useTranslator";

const PROFICIENCY_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "native", label: "Native" },
];

export default function LanguageModal({ 
  isOpen, 
  onClose, 
  language = null, 
  onSuccess 
}) {
  const toast = useToastContext();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createLanguageMutation = useCreateTranslatorLanguage();
  const updateLanguageMutation = useUpdateTranslatorLanguage();

  const [formData, setFormData] = useState({
    language_code: "",
    proficiency_level: "intermediate",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (language) {
      setFormData({
        language_code: language.language_code,
        proficiency_level: language.proficiency_level,
      });
    } else {
      setFormData({
        language_code: "",
        proficiency_level: "intermediate",
      });
    }
    setErrors({});
  }, [language, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.language_code.trim()) {
      newErrors.language_code = "Language code is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.language_code.trim())) {
      newErrors.language_code = "Language code must contain only letters";
    }

    if (!formData.proficiency_level) {
      newErrors.proficiency_level = "Proficiency level is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const parseErrorResponse = (error) => {
    if (!error?.response?.data) {
      return "Failed to save language. Please try again.";
    }

    const errorData = error.response.data;

    if (errorData.errors) {
      if (errorData.errors.non_field_errors && Array.isArray(errorData.errors.non_field_errors)) {
        return errorData.errors.non_field_errors[0];
      }

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

    if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
      return errorData.non_field_errors[0];
    }

    if (errorData.detail) {
      return errorData.detail;
    }

    if (errorData.error) {
      return errorData.error;
    }

    if (typeof errorData === 'string') {
      return errorData;
    }

    return "Failed to save language. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fix all validation errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const languageData = {
        language_code: formData.language_code.trim().toLowerCase(),
        proficiency_level: formData.proficiency_level,
      };

      if (language) {
        await updateLanguageMutation.mutateAsync({
          languageId: language.id,
          languageData
        });
        toast.success("Language updated successfully!");
      } else {
        await createLanguageMutation.mutateAsync(languageData);
        toast.success("Language added successfully!");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving language:", error);
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
                {language ? "Edit" : "Add"} Language
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
                Language Code *
              </label>
              <Input
                type="text"
                name="language_code"
                value={formData.language_code}
                onChange={handleChange}
                placeholder="e.g., en, es, fr, ar"
                disabled={isSubmitting || !!language}
                error={errors.language_code}
                maxLength={10}
              />
              {language && (
                <p className="text-xs text-secondary mt-1">
                  Language code cannot be changed. Delete and create a new entry if needed.
                </p>
              )}
              <p className="text-xs text-secondary mt-1">
                Use ISO 639-1 language codes (2-3 letters)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Proficiency Level *
              </label>
              <Select
                name="proficiency_level"
                value={formData.proficiency_level}
                onChange={handleChange}
                options={PROFICIENCY_OPTIONS}
                required
                disabled={isSubmitting}
                error={errors.proficiency_level}
              />
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
                {language ? "Update" : "Add"} Language
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}