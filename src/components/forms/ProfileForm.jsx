"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";

export function ProfileForm({ initialData, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialData);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(profileData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Organization Information</h3>
        <Button
          variant={isEditing ? "secondary" : "primary"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Organization Name"
            value={profileData.organizationName}
            onChange={(e) => handleInputChange("organizationName", e.target.value)}
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <Input
            label="Registration Number"
            value={profileData.registrationNumber}
            onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Textarea
            label="About"
            value={profileData.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            disabled={!isEditing}
            rows={4}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Input
            label="Area of Focus"
            value={profileData.areaOfFocus}
            onChange={(e) => handleInputChange("areaOfFocus", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Address"
            value={profileData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Phone"
            value={profileData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Website"
            value={profileData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Established Date"
            type="date"
            value={profileData.establishedDate}
            onChange={(e) => handleInputChange("establishedDate", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="License Number"
            value={profileData.licenseNumber}
            onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Accreditation"
            value={profileData.accreditation}
            onChange={(e) => handleInputChange("accreditation", e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Timezone"
            value={profileData.timezone}
            onChange={(e) => handleInputChange("timezone", e.target.value)}
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