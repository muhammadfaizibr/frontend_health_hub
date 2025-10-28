"use client";

import React from "react";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";
import { LANGUAGES } from "@/constants";

const APPOINTMENT_TYPES = [
  { value: "in-person", label: "In-person" },
  { value: "telehealth", label: "Telehealth" }
];

export default function AppointmentDetailsSection({ formData, onInputChange }) {
  const showTranslatorInfo = formData.language !== "not-required";

  return (
    <div className="card bg-surface p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary-color">description</span>
        <h2 className="text-xl font-semibold text-primary">Appointment Details</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Language Preference
            </label>
            <Select
              name="language"
              value={formData.language}
              onChange={onInputChange}
              options={LANGUAGES}
              placeholder="Select language"
            />
            {showTranslatorInfo && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-sm mt-0.5">
                    info
                  </span>
                  <p className="text-xs text-blue-700">
                    A translator will be assigned to your appointment. This may take additional time to confirm.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Reason for Visit *
          </label>
          <Textarea
            name="reason"
            value={formData.reason}
            onChange={onInputChange}
            placeholder="Please describe the reason for your visit..."
            rows={3}
            required
          />
          <p className="text-xs text-secondary mt-1">
            Help your doctor prepare for your appointment
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Special Requests or Notes
          </label>
          <Textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={onInputChange}
            placeholder="Any special accommodations or additional information..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}