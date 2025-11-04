// components/translator/modals/LanguageModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { 
  useCreateTranslatorLanguage, 
  useUpdateTranslatorLanguage 
} from "@/lib/hooks/useTranslator";

const PROFICIENCY_LEVELS = [
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "advanced", label: "Advanced" },
  { value: "intermediate", label: "Intermediate" },
  { value: "basic", label: "Basic" }
];

export default function LanguageModal({ isOpen, onClose, language }) {
  const { mutate: createLanguage, isPending: isCreating } = useCreateTranslatorLanguage();
  const { mutate: updateLanguage, isPending: isUpdating } = useUpdateTranslatorLanguage();
  
  const isEditMode = !!language;
  const isLoading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    language_code: "",
    language_name: "",
    proficiency_level: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (language) {
      setFormData({
        language_code: language.language_code || "",
        language_name: language.language_name || "",
        proficiency_level: language.proficiency_level || ""
      });
    } else {
      setFormData({
        language_code: "",
        language_name: "",
        proficiency_level: ""
      });
    }
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
    
    if (!formData.language_code?.trim()) newErrors.language_code = "Language code is required";
    if (!formData.language_name?.trim()) newErrors.language_name = "Language name is required";
    if (!formData.proficiency_level) newErrors.proficiency_level = "Proficiency level is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      if (isEditMode) {
        updateLanguage(
          { languageId: language.id, languageData: formData },
          {
            onSuccess: () => {
              onClose();
            },
            onError: (error) => {
              setErrors({ submit: error.message || "Failed to update language" });
            }
          }
        );
      } else {
        createLanguage(formData, {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            setErrors({ submit: error.message || "Failed to add language" });
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
      title={isEditMode ? "Edit Language" : "Add Language"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="alert alert-error">
            <span className="material-symbols-outlined">error</span>
            {errors.submit}
          </div>
        )}

        <Input
          label="Language Name"
          name="language_name"
          value={formData.language_name}
          onChange={handleChange}
          error={errors.language_name}
          placeholder="e.g., English"
          required
        />

        <Input
          label="Language Code"
          name="language_code"
          value={formData.language_code}
          onChange={handleChange}
          error={errors.language_code}
          placeholder="e.g., en, ar, ur-PK"
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Proficiency Level *</label>
          <select
            name="proficiency_level"
            value={formData.proficiency_level}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Level</option>
            {PROFICIENCY_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>))}
          </select>
          {errors.proficiency_level && (
            <p className="text-error text-sm">{errors.proficiency_level}</p>
          )}
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
            {isEditMode ? "Update" : "Add"} Language
          </Button>
        </div>
      </form>
    </Modal>
  );
}