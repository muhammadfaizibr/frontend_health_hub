import React from "react";
import PropTypes from "prop-types";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";

export const GeneralSettings = ({ organizationData, handleInputChange, isEditing }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Organization Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Organization Name"
            value={organizationData.organizationName}
            onChange={(e) => handleInputChange("organization", "organizationName", e.target.value)}
            disabled={!isEditing}
          />
          
          <Select
            label="Organization Size"
            value={organizationData.size}
            onChange={(e) => handleInputChange("organization", "size", e.target.value)}
            options={[
              { value: "Small (1-50 employees)", label: "Small (1-50 employees)" },
              { value: "Medium (50-200 employees)", label: "Medium (50-200 employees)" },
              { value: "Large (200+ employees)", label: "Large (200+ employees)" }
            ]}
            disabled={!isEditing}
          />
          
          <Input
            label="Registration Number"
            value={organizationData.registrationNumber}
            onChange={(e) => handleInputChange("organization", "registrationNumber", e.target.value)}
            disabled={!isEditing}
          />
          
          <Select
            label="Currency"
            value={organizationData.currency}
            onChange={(e) => handleInputChange("organization", "currency", e.target.value)}
            options={[
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
              { value: "GBP", label: "GBP" }
            ]}
            disabled={!isEditing}
          />
          
          <Input
            label="Address"
            value={organizationData.address}
            onChange={(e) => handleInputChange("organization", "address", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Phone"
            value={organizationData.phone}
            onChange={(e) => handleInputChange("organization", "phone", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Email"
            value={organizationData.email}
            onChange={(e) => handleInputChange("organization", "email", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Website"
            value={organizationData.website}
            onChange={(e) => handleInputChange("organization", "website", e.target.value)}
            disabled={!isEditing}
          />
        </div>
        
        <div className="mt-4">
          <Textarea
            label="About Organization"
            value={organizationData.about}
            onChange={(e) => handleInputChange("organization", "about", e.target.value)}
            rows={4}
            disabled={!isEditing}
          />
        </div>
        
        <div className="mt-4">
          <Textarea
            label="Area of Focus"
            value={organizationData.areaOfFocus}
            onChange={(e) => handleInputChange("organization", "areaOfFocus", e.target.value)}
            rows={3}
            disabled={!isEditing}
            hint="List the medical specialties and services your organization provides"
          />
        </div>
      </div>
    </div>
  );
};

GeneralSettings.propTypes = {
  organizationData: PropTypes.shape({
    organizationName: PropTypes.string,
    size: PropTypes.string,
    registrationNumber: PropTypes.string,
    currency: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    about: PropTypes.string,
    areaOfFocus: PropTypes.string
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired
};