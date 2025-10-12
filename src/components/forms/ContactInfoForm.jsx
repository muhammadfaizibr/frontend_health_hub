"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";

export function ContactInfoForm({ initialData, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState(initialData);

  const handleInputChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(contactInfo);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <Button
          variant={isEditing ? "secondary" : "primary"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? "Save Changes" : "Edit Contacts"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Primary Contact"
            value={contactInfo.primaryContact}
            onChange={(e) => handleInputChange("primaryContact", e.target.value)}
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <Input
            label="Primary Contact Email"
            type="email"
            value={contactInfo.primaryContactEmail}
            onChange={(e) => handleInputChange("primaryContactEmail", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Primary Contact Phone"
            value={contactInfo.primaryContactPhone}
            onChange={(e) => handleInputChange("primaryContactPhone", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Billing Contact"
            value={contactInfo.billingContact}
            onChange={(e) => handleInputChange("billingContact", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Billing Contact Email"
            type="email"
            value={contactInfo.billingContactEmail}
            onChange={(e) => handleInputChange("billingContactEmail", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Billing Contact Phone"
            value={contactInfo.billingContactPhone}
            onChange={(e) => handleInputChange("billingContactPhone", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Emergency Contact"
            value={contactInfo.emergencyContact}
            onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Emergency Contact Phone"
            value={contactInfo.emergencyContactPhone}
            onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}