// components/doctor/modals/CertificationModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { useCreateCertification, useUpdateCertification } from "@/lib/hooks/useBase";

export default function CertificationModal({ isOpen, onClose, certification }) {
  const { mutate: createCertification, isPending: isCreating } = useCreateCertification();
  const { mutate: updateCertification, isPending: isUpdating } = useUpdateCertification();
  
  const isEditMode = !!certification;
  const isLoading = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    title: "",
    issuing_organization: "",
    issue_date: "",
    expiration_date: "",
    credential_id: "",
    credential_url: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (certification) {
      setFormData({
        title: certification.title || "",
        issuing_organization: certification.issuing_organization || "",
        issue_date: certification.issue_date || "",
        expiration_date: certification.expiration_date || "",
        credential_id: certification.credential_id || "",
        credential_url: certification.credential_url || "",
        description: certification.description || ""
      });
    } else {
      setFormData({
        title: "",
        issuing_organization: "",
        issue_date: "",
        expiration_date: "",
        credential_id: "",
        credential_url: "",
        description: ""
      });
    }
  }, [certification, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    if (!formData.issuing_organization?.trim()) newErrors.issuing_organization = "Issuing organization is required";
    if (!formData.issue_date) newErrors.issue_date = "Issue date is required";
    
    if (formData.expiration_date && formData.issue_date && formData.expiration_date < formData.issue_date) {
      newErrors.expiration_date = "Expiration date cannot be before issue date";
    }

    if (formData.credential_url && !formData.credential_url.match(/^https?:\/\/.+/)) {
      newErrors.credential_url = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      if (isEditMode) {
        updateCertification(
          { certificationId: certification.id, certificationData: formData },
          {
            onSuccess: () => {
              onClose();
            },
            onError: (error) => {
              setErrors({ submit: error.message || "Failed to update certification" });
            }
          }
        );
      } else {
        createCertification(formData, {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            setErrors({ submit: error.message || "Failed to add certification" });
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
      title={isEditMode ? "Edit Certification" : "Add Certification"}
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
          label="Certification Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="e.g., Board Certified in Cardiology"
          required
        />

        <Input
          label="Issuing Organization"
          name="issuing_organization"
          value={formData.issuing_organization}
          onChange={handleChange}
          error={errors.issuing_organization}
          placeholder="e.g., American Board of Internal Medicine"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Issue Date"
            name="issue_date"
            type="date"
            value={formData.issue_date}
            onChange={handleChange}
            error={errors.issue_date}
            required
          />

          <Input
            label="Expiration Date"
            name="expiration_date"
            type="date"
            value={formData.expiration_date}
            onChange={handleChange}
            error={errors.expiration_date}
          />
        </div>

        <Input
          label="Credential ID"
          name="credential_id"
          value={formData.credential_id}
          onChange={handleChange}
          placeholder="e.g., ABC123456"
        />

        <Input
          label="Credential URL"
          name="credential_url"
          type="url"
          value={formData.credential_url}
          onChange={handleChange}
          error={errors.credential_url}
          placeholder="https://example.com/verify"
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="form-input"
            placeholder="Additional details about this certification..."
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
            {isEditMode ? "Update" : "Add"} Certification
          </Button>
        </div>
      </form>
    </Modal>
  );
}