"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { GeneralSettings } from "@/components/features/organization/GeneralSettings";
import { BillingSettings } from "@/components/features/organization/BillingSettings";
import { NotificationSettings } from "@/components/features/organization/NotificationSettings";
import { TabNavigation } from "@/components/ui/TabNavigation";

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
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Organization Settings</h1>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Settings</Button>
          )}
        </div>
      </div>

      <TabNavigation 
        tabs={[
          { id: "general", label: "General" },
          { id: "billing", label: "Billing" },
          { id: "notifications", label: "Notifications" }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "general" && (
        <GeneralSettings 
          organizationData={organizationData} 
          isEditing={isEditing} 
          onInputChange={(field, value) => handleInputChange("organization", field, value)} 
        />
      )}
      
      {activeTab === "billing" && (
        <BillingSettings 
          billingSettings={billingSettings} 
          isEditing={isEditing} 
          onInputChange={(field, value) => handleInputChange("billing", field, value)} 
        />
      )}
      
      {activeTab === "notifications" && (
        <NotificationSettings 
          notificationSettings={notificationSettings} 
          isEditing={isEditing} 
          onInputChange={(field, value) => handleInputChange("notifications", field, value)} 
        />
      )}
    </div>
  );
}
