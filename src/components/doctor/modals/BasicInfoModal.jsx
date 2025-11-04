// components/doctor/modals/BasicInfoModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { useUpdateProfile } from "@/lib/hooks/useDoctors";

const DOCTOR_CATEGORIES = [
  { value: "general_practitioner", label: "General Practitioner" },
  { value: "pediatrician", label: "Pediatrician" },
  { value: "cardiologist", label: "Cardiologist" },
  { value: "dermatologist", label: "Dermatologist" },
  { value: "psychiatrist", label: "Psychiatrist" },
  { value: "orthopedic", label: "Orthopedic Surgeon" },
  { value: "gynecologist", label: "Gynecologist" },
  { value: "neurologist", label: "Neurologist" },
  { value: "ophthalmologist", label: "Ophthalmologist" },
  { value: "ent_specialist", label: "ENT Specialist" },
];

export default function BasicInfoModal({ isOpen, onClose, user, profile }) {
  const { updateProfile, isUpdating } = useUpdateProfile();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "",
    bio: "",
    category: "",
    specialization: "",
    years_of_experience: "",
    license_number: "",
    location: "",
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
        category: profile.category || "",
        specialization: profile.specialization || "",
        years_of_experience: profile.years_of_experience || "",
        license_number: profile.license_number || "",
        location: profile.location || "",
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
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (formData.years_of_experience && (isNaN(formData.years_of_experience) || formData.years_of_experience < 0)) {
      newErrors.years_of_experience = "Please enter a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await updateProfile({
        profileId: profile.id,
        profileData: formData
      });
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ submit: error.message || "Failed to update profile" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Basic Information" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
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
          error={errors.phone_number}
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

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Category</option>
            {DOCTOR_CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-error text-sm">{errors.category}</p>
          )}
        </div>

        <Input
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="e.g., Interventional Cardiology"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Years of Experience"
            name="years_of_experience"
            type="number"
            value={formData.years_of_experience}
            onChange={handleChange}
            error={errors.years_of_experience}
            min="0"
          />

          <Input
            label="License Number"
            name="license_number"
            value={formData.license_number}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City, Country"
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className="form-input"
            placeholder="Tell patients about yourself..."
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