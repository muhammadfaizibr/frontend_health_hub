// components/organization/modals/OrganizationInfoModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";

const SIZE_OPTIONS = [
  { value: "small", label: "Small (1-50 employees)" },
  { value: "medium", label: "Medium (51-200 employees)" },
  { value: "large", label: "Large (201+ employees)" }
];

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "PKR", label: "PKR (₨)" }
];

export default function OrganizationInfoModal({ isOpen, onClose, user, profile }) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    organization_name: "",
    registration_number: "",
    size: "",
    area_of_focus: "",
    about: "",
    phone_number: "",
    currency: "USD"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && profile) {
      setFormData({
        organization_name: profile.organization_name || "",
        registration_number: profile.registration_number || "",
        size: profile.size || "",
        area_of_focus: profile.area_of_focus || "",
        about: profile.about || "",
        phone_number: user.phone_number || "",
        currency: profile.currency || "USD"
      });
    }
  }, [user, profile, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.organization_name?.trim()) {
      newErrors.organization_name = "Organization name is required";
    }
    if (!formData.registration_number?.trim()) {
      newErrors.registration_number = "Registration number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsLoading(true);

    try {
      // API call to update organization profile
      console.log("Updating organization profile:", formData);
      // await updateOrganizationProfile(formData);
      
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ submit: error.message || "Failed to update profile" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Organization Profile" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="alert alert-error">
            <span className="material-symbols-outlined">error</span>
            {errors.submit}
          </div>
        )}

        <Input
          label="Organization Name"
          name="organization_name"
          value={formData.organization_name}
          onChange={handleChange}
          error={errors.organization_name}
          required
        />

        <Input
          label="Registration Number"
          name="registration_number"
          value={formData.registration_number}
          onChange={handleChange}
          error={errors.registration_number}
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Organization Size</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Size</option>
            {SIZE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <Input
          label="Area of Focus"
          name="area_of_focus"
          value={formData.area_of_focus}
          onChange={handleChange}
          placeholder="e.g., Healthcare, Education, Technology"
        />

        <Input
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="+1234567890"
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="form-input"
          >
            {CURRENCY_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">About Organization</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className="form-input"
            placeholder="Tell us about your organization..."
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
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}