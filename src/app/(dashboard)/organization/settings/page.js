"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";

export default function OrganizationSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);

  const [organizationData, setOrganizationData] = useState({
    organizationName: "HealthConnect Medical Center",
    size: "Medium (50-200 employees)",
    about: "A comprehensive healthcare organization providing quality medical services to our community.",
    areaOfFocus: "General Medicine, Cardiology, Dermatology, Pediatrics",
    registrationNumber: "HC-2024-001",
    currentCreditsBalance: 545,
    currency: "USD",
    timezone: "America/New_York",
    address: "123 Medical Center Dr, New York, NY 10001",
    phone: "(555) 123-4567",
    email: "info@healthconnect.com",
    website: "https://healthconnect.com"
  });

  const [billingSettings, setBillingSettings] = useState({
    autoRenewal: true,
    lowCreditAlert: 100,
    creditAlertEmail: "admin@healthconnect.com",
    billingCycle: "Monthly",
    paymentMethod: "Credit Card",
    taxId: "12-3456789"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    lowCreditAlerts: true,
    staffUpdates: true,
    patientUpdates: false,
    systemMaintenance: true
  });

  const handleInputChange = (section, field, value) => {
    if (section === "organization") {
      setOrganizationData(prev => ({ ...prev, [field]: value }));
    } else if (section === "billing") {
      setBillingSettings(prev => ({ ...prev, [field]: value }));
    } else if (section === "notifications") {
      setNotificationSettings(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Saving settings...");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
  };

  const GeneralSettingsTab = () => (
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

  const BillingSettingsTab = () => (
    <div className="flex flex-col gap-6">
      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Billing & Payment Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Auto Renewal</p>
              <p className="text-secondary text-sm">Automatically purchase credits when balance is low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={billingSettings.autoRenewal}
                onChange={(e) => handleInputChange("billing", "autoRenewal", e.target.checked)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-color/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-color"></div>
            </label>
          </div>
          
          <Input
            label="Low Credit Alert Threshold"
            value={billingSettings.lowCreditAlert}
            onChange={(e) => handleInputChange("billing", "lowCreditAlert", e.target.value)}
            type="number"
            disabled={!isEditing}
            hint="Get notified when credits fall below this amount"
          />
          
          <Input
            label="Credit Alert Email"
            value={billingSettings.creditAlertEmail}
            onChange={(e) => handleInputChange("billing", "creditAlertEmail", e.target.value)}
            disabled={!isEditing}
          />
          
          <Select
            label="Billing Cycle"
            value={billingSettings.billingCycle}
            onChange={(e) => handleInputChange("billing", "billingCycle", e.target.value)}
            options={[
              { value: "Monthly", label: "Monthly" },
              { value: "Quarterly", label: "Quarterly" },
              { value: "Annually", label: "Annually" }
            ]}
            disabled={!isEditing}
          />
          
          <Select
            label="Payment Method"
            value={billingSettings.paymentMethod}
            onChange={(e) => handleInputChange("billing", "paymentMethod", e.target.value)}
            options={[
              { value: "Credit Card", label: "Credit Card" },
              { value: "Bank Transfer", label: "Bank Transfer" },
              { value: "PayPal", label: "PayPal" }
            ]}
            disabled={!isEditing}
          />
          
          <Input
            label="Tax ID"
            value={billingSettings.taxId}
            onChange={(e) => handleInputChange("billing", "taxId", e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const NotificationSettingsTab = () => (
    <div className="flex flex-col gap-6">
      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Notification Preferences</h3>
        <div className="flex flex-col gap-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-primary font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-secondary text-sm">
                  {key === "emailNotifications" && "Receive notifications via email"}
                  {key === "smsNotifications" && "Receive notifications via SMS"}
                  {key === "appointmentReminders" && "Get reminders for upcoming appointments"}
                  {key === "lowCreditAlerts" && "Get alerts when credits are running low"}
                  {key === "staffUpdates" && "Get notified about staff changes"}
                  {key === "patientUpdates" && "Get notified about patient activities"}
                  {key === "systemMaintenance" && "Get notified about system maintenance"}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleInputChange("notifications", key, e.target.checked)}
                  disabled={!isEditing}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-color/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-color"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Organization Settings</h1>
          <p className="text-secondary mt-1">
            Manage your organization's settings and preferences
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
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Settings
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-color">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("general")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "general"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "billing"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Billing & Payment
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "notifications"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Notifications
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "general" && <GeneralSettingsTab />}
      {activeTab === "billing" && <BillingSettingsTab />}
      {activeTab === "notifications" && <NotificationSettingsTab />}
    </div>
  );
}
