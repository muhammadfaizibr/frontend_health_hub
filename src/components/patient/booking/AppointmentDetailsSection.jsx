"use client";

import React from "react";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";
import { LANGUAGES } from "@/constants";
import { useCases } from "@/lib/hooks/usePatients";

export default function AppointmentDetailsSection({ 
  formData, 
  onInputChange,
  onCaseChange,
  caseIdFromUrl
}) {
  const { cases, isLoading: casesLoading } = useCases({ status: 'open' });
  const casesList = cases?.results || [];

  // Check if the case from URL exists in the fetched cases
  const caseExistsInList = caseIdFromUrl && casesList.some(c => c.id === caseIdFromUrl);
  
  // If case ID from URL exists, show only that case and disable selection
  const caseOptions = caseExistsInList 
    ? casesList
        .filter(c => c.id === caseIdFromUrl)
        .map(c => ({
          value: c.id,
          label: c.title,
          description: c.doctor?.user?.full_name 
            ? `Assigned to: ${c.doctor.user.full_name}` 
            : "No doctor assigned"
        }))
    : [
        { value: "", label: "Create new case (Auto-generated)" },
        ...casesList.map(c => ({
          value: c.id,
          label: c.title,
          description: c.doctor?.user?.full_name 
            ? `Assigned to: ${c.doctor.user.full_name}` 
            : "No doctor assigned"
        }))
      ];

  const showTranslatorInfo = formData.language !== "not-required";
  const isDisabled = caseExistsInList || casesLoading;

  return (
    <div className="card bg-surface p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary-color">description</span>
        <h2 className="text-xl font-semibold text-primary">Appointment Details</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Select Case {caseExistsInList ? "(Pre-selected)" : "(Optional)"}
          </label>
          <Select
            name="case"
            value={formData.case_id || ""}
            onChange={(e) => onCaseChange(e.target.value)}
            options={caseOptions}
            placeholder="Select a case or create new"
            disabled={isDisabled}
            hint={
              casesLoading 
                ? "Loading your cases..." 
                : caseExistsInList 
                ? "This case is pre-selected and cannot be changed"
                : undefined
            }
          />
          {formData.case_id ? (
            <div className="mt-2 p-2 bg-info/10 border border-info rounded-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-info text-sm mt-0.5">
                  info
                </span>
                <p className="text-xs text-info">
                  This appointment will be added to the selected case.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-2 p-2 bg-success/10 border border-success rounded-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-success text-sm mt-0.5">
                  add_circle
                </span>
                <p className="text-xs text-success">
                  A new case will be automatically created for this appointment.
                </p>
              </div>
            </div>
          )}
        </div>

        {!formData.case_id && (
          <>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Case Title (Optional)
              </label>
              <Input
                type="text"
                name="case_title"
                value={formData.case_title || ""}
                onChange={onInputChange}
                placeholder="e.g., Chronic Back Pain Treatment (auto-generated if left empty)"
                maxLength={255}
                hint="Leave empty to auto-generate from appointment date"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Case Description (Optional)
              </label>
              <Textarea
                name="case_description"
                value={formData.case_description || ""}
                onChange={onInputChange}
                placeholder="Describe your medical condition (will use reason for visit if left empty)..."
                rows={3}
                hint="Provide additional context for your medical case"
              />
            </div>
          </>
        )}

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
            <div className="mt-2 p-2 bg-info/10 border border-info rounded-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-info text-sm mt-0.5">
                  info
                </span>
                <p className="text-xs text-info">
                  A translator will be assigned to your appointment. This may take additional time to confirm.
                </p>
              </div>
            </div>
          )}
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
            hint="Help your doctor prepare for your appointment"
          />
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