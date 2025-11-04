// components/translator/modals/TranslatorBasicInfoModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { useUpdateTranslatorProfile } from "@/lib/hooks/useTranslator";

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "PKR", label: "PKR (₨)" }
];

export default function TranslatorBasicInfoModal({ isOpen, onClose, user, profile }) {
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateTranslatorProfile();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "",
    bio: "",
    area_of_focus: "",
    currency: "USD",
    about: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && profile) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
        gender: user.gender || "",
        bio: user.bio || "",
        area_of_focus: profile.area_of_focus || "",
        currency: profile.currency || "USD",
        about: profile.about || ""
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
    
    if (!formData.first_name?.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name?.trim()) {
      newErrors.last_name = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      updateProfile(
        { profileId: profile.id, profileData: formData },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            setErrors({ submit: error.message || "Failed to update profile" });
          }
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Basic Information" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="alert alert-error">
            <span className="material-symbols-outlined">error</span>
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            error={errors.first_name}
            required
          />

          <Input
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            error={errors.last_name}
            required
          />
        </div>

        <Input
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <Input
          label="Area of Focus"
          name="area_of_focus"
          value={formData.area_of_focus}
          onChange={handleChange}
          placeholder="e.g., Medical Translation, Legal Translation"
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
          <label className="text-sm font-medium text-primary">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className="form-input"
            placeholder="Tell clients about your translation experience..."
          />
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-color">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isUpdating}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}