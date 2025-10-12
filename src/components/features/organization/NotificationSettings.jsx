import React from "react";
import PropTypes from "prop-types";
import { Toggle } from "@/components/forms/Toggle";

export const NotificationSettings = ({ notificationSettings, handleInputChange, isEditing }) => {
  const NotificationToggle = ({ label, description, field }) => (
    <div className="flex items-center justify-between py-3 border-b border-color last:border-0">
      <div>
        <p className="text-primary font-medium">{label}</p>
        <p className="text-secondary text-sm">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={notificationSettings[field]}
          onChange={(e) => handleInputChange("notifications", field, e.target.checked)}
          disabled={!isEditing}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-color/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-color"></div>
      </label>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Notification Preferences</h3>
        <div className="flex flex-col">
          <NotificationToggle
            label="Email Notifications"
            description="Receive important updates via email"
            field="emailNotifications"
          />
          <NotificationToggle
            label="SMS Notifications"
            description="Receive important updates via text message"
            field="smsNotifications"
          />
          <NotificationToggle
            label="Appointment Reminders"
            description="Get notified about upcoming appointments"
            field="appointmentReminders"
          />
          <NotificationToggle
            label="Low Credit Alerts"
            description="Get notified when credit balance is low"
            field="lowCreditAlerts"
          />
          <NotificationToggle
            label="Staff Updates"
            description="Notifications about staff changes and updates"
            field="staffUpdates"
          />
          <NotificationToggle
            label="Patient Updates"
            description="Notifications about patient activity"
            field="patientUpdates"
          />
          <NotificationToggle
            label="System Maintenance"
            description="Get notified about planned system maintenance"
            field="systemMaintenance"
          />
        </div>
      </div>
    </div>
  );
};

NotificationSettings.propTypes = {
  notificationSettings: PropTypes.shape({
    emailNotifications: PropTypes.bool,
    smsNotifications: PropTypes.bool,
    appointmentReminders: PropTypes.bool,
    lowCreditAlerts: PropTypes.bool,
    staffUpdates: PropTypes.bool,
    patientMessages: PropTypes.bool,
    systemMaintenance: PropTypes.bool
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired
};