"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";

export default function CreateCaseForm({ onSubmit, onCancel, isSubmitting, isCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
    }
  };

  return (
    <form onSubmit={isSubmitting || isCreated ? () => {} : handleSubmit} className="card bg-surface p-6">
      <div className="flex flex-col gap-6">
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
            hint="Provide detailed information to help your doctor understand your condition"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting || isCreated}>
            Create Case
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel} 
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}