// components/patient/modals/PatientInfoModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/auth-store";

export default function PatientInfoModal({ isOpen, onClose, user }) {
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "",
    bio: "",
    emergency_contact_name: "",
    emergency_contact_phone: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
        gender: user.gender || "",
        bio: user.bio || "",
        emergency_contact_name: user.patient_profile?.emergency_contact_name || "",
        emergency_contact_phone: user.patient_profile?.emergency_contact_phone || ""
      });
    }
  }, [user, isOpen]);

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

    setIsLoading(true);

    try {
      // API call to update profile
      console.log("Updating profile:", formData);
      // await updatePatientProfile(formData);
      
      // Update local state
      setUser({ ...user, ...formData });
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ submit: error.message || "Failed to update profile" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="lg">
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
          placeholder="+1234567890"
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
          <label className="text-sm font-medium text-primary">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="form-input"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="border-t border-color pt-4 mt-4">
          <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">emergency</span>
            Emergency Contact
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Contact Name"
              name="emergency_contact_name"
              value={formData.emergency_contact_name}
              onChange={handleChange}
              placeholder="Full name"
            />

            <Input
              label="Contact Phone"
              name="emergency_contact_phone"
              value={formData.emergency_contact_phone}
              onChange={handleChange}
              placeholder="+1234567890"
            />
          </div>
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