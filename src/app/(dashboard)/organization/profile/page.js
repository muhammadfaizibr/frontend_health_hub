"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { ContactInfoForm } from "@/components/forms/ContactInfoForm";
import { TabNavigation } from "@/components/ui/TabNavigation";

export default function OrganizationProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    organizationName: "HealthConnect Medical Center",
    about: "A comprehensive healthcare organization providing quality medical services to our community. We are committed to delivering exceptional patient care through innovative medical practices and compassionate service.",
    areaOfFocus: "General Medicine, Cardiology, Dermatology, Pediatrics, Internal Medicine",
    registrationNumber: "HC-2024-001",
    currentCreditsBalance: 545,
    currency: "USD",
    timezone: "America/New_York",
    address: "123 Medical Center Dr, New York, NY 10001",
    phone: "(555) 123-4567",
    email: "info@healthconnect.com",
    website: "https://healthconnect.com",
    establishedDate: "2020-01-15",
    licenseNumber: "MED-2020-001",
    accreditation: "Joint Commission Accredited",
    services: [
      "Primary Care",
      "Specialty Consultations",
      "Emergency Services",
      "Telehealth",
      "Laboratory Services",
      "Imaging Services"
    ]
  });

  const [contactInfo, setContactInfo] = useState({
    primaryContact: "Dr. Sarah Johnson",
    primaryContactEmail: "sarah.johnson@healthconnect.com",
    primaryContactPhone: "(555) 123-4567",
    billingContact: "John Smith",
    billingContactEmail: "billing@healthconnect.com",
    billingContactPhone: "(555) 123-4568",
    emergencyContact: "Emergency Services",
    emergencyContactPhone: "(555) 911-0000"
  });

  const handleInputChange = (section, field, value) => {
    if (section === "profile") {
      setProfileData(prev => ({ ...prev, [field]: value }));
    } else if (section === "contact") {
      setContactInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Saving profile...");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
  };

  const ProfileTab = () => (
    <div className="flex flex-col gap-6">
      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Organization Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Organization Name"
            value={profileData.organizationName}
            onChange={(e) => handleInputChange("profile", "organizationName", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Registration Number"
            value={profileData.registrationNumber}
            onChange={(e) => handleInputChange("profile", "registrationNumber", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="License Number"
            value={profileData.licenseNumber}
            onChange={(e) => handleInputChange("profile", "licenseNumber", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Accreditation"
            value={profileData.accreditation}
            onChange={(e) => handleInputChange("profile", "accreditation", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Established Date"
            value={profileData.establishedDate}
            onChange={(e) => handleInputChange("profile", "establishedDate", e.target.value)}
            type="date"
            disabled={!isEditing}
          />
          
          <Input
            label="Website"
            value={profileData.website}
            onChange={(e) => handleInputChange("profile", "website", e.target.value)}
            disabled={!isEditing}
          />
        </div>
        
        <div className="mt-4">
          <Textarea
            label="About Organization"
            value={profileData.about}
            onChange={(e) => handleInputChange("profile", "about", e.target.value)}
            rows={4}
            disabled={!isEditing}
          />
        </div>
        
        <div className="mt-4">
          <Textarea
            label="Area of Focus"
            value={profileData.areaOfFocus}
            onChange={(e) => handleInputChange("profile", "areaOfFocus", e.target.value)}
            rows={3}
            disabled={!isEditing}
            hint="List the medical specialties and services your organization provides"
          />
        </div>
      </div>

      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Services Offered</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {profileData.services.map((service, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-success text-sm">
                check_circle
              </span>
              <span className="text-primary">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactTab = () => (
    <div className="flex flex-col gap-6">
      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Address"
            value={profileData.address}
            onChange={(e) => handleInputChange("profile", "address", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Phone"
            value={profileData.phone}
            onChange={(e) => handleInputChange("profile", "phone", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Email"
            value={profileData.email}
            onChange={(e) => handleInputChange("profile", "email", e.target.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Timezone"
            value={profileData.timezone}
            onChange={(e) => handleInputChange("profile", "timezone", e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Key Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-primary font-medium mb-3">Primary Contact</h4>
            <div className="flex flex-col gap-3">
              <Input
                label="Name"
                value={contactInfo.primaryContact}
                onChange={(e) => handleInputChange("contact", "primaryContact", e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Email"
                value={contactInfo.primaryContactEmail}
                onChange={(e) => handleInputChange("contact", "primaryContactEmail", e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Phone"
                value={contactInfo.primaryContactPhone}
                onChange={(e) => handleInputChange("contact", "primaryContactPhone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-primary font-medium mb-3">Billing Contact</h4>
            <div className="flex flex-col gap-3">
              <Input
                label="Name"
                value={contactInfo.billingContact}
                onChange={(e) => handleInputChange("contact", "billingContact", e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Email"
                value={contactInfo.billingContactEmail}
                onChange={(e) => handleInputChange("contact", "billingContactEmail", e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Phone"
                value={contactInfo.billingContactPhone}
                onChange={(e) => handleInputChange("contact", "billingContactPhone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BillingTab = () => (
    <div className="flex flex-col gap-6">
      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Billing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface-secondary rounded-lg">
            <p className="text-secondary text-sm mb-1">Current Credits Balance</p>
            <p className="text-2xl font-bold text-primary">${profileData.currentCreditsBalance}</p>
          </div>
          
          <div className="p-4 bg-surface-secondary rounded-lg">
            <p className="text-secondary text-sm mb-1">Currency</p>
            <p className="text-2xl font-bold text-primary">{profileData.currency}</p>
          </div>
        </div>
      </div>

      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Payment Methods</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-color">
                credit_card
              </span>
              <div>
                <p className="text-primary font-medium">Visa ending in 4242</p>
                <p className="text-secondary text-sm">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-color">
                account_balance
              </span>
              <div>
                <p className="text-primary font-medium">Bank Account ending in 1234</p>
                <p className="text-secondary text-sm">Chase Bank</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Organization Profile</h1>
          <p className="text-secondary mt-1">
            Manage your organization's profile and information
          </p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <span className="material-symbols-outlined text-sm mr-2">edit</span>
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Organization Header */}
      <div className="card bg-surface p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-primary-color/10 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-color text-4xl">
              business
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {profileData.organizationName}
            </h2>
            <p className="text-secondary mb-2">{profileData.about}</p>
            <div className="flex items-center gap-4 text-sm text-secondary">
              <span>
                <span className="material-symbols-outlined text-xs inline mr-1">
                  location_on
                </span>
                {profileData.address}
              </span>
              <span>
                <span className="material-symbols-outlined text-xs inline mr-1">
                  phone
                </span>
                {profileData.phone}
              </span>
              <span>
                <span className="material-symbols-outlined text-xs inline mr-1">
                  email
                </span>
                {profileData.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-color">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "profile"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "contact"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Contact Information
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "billing"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Billing
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <ProfileTab />}
      {activeTab === "contact" && <ContactTab />}
      {activeTab === "billing" && <BillingTab />}
    </div>
  );
}
