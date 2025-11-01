"use client";

import React, { useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { formatTime } from "@/lib/utils/global";
import { useCases } from "@/lib/hooks/usePatients";

export default function BookingSummaryCard({
  doctor,
  selectedDate,
  selectedTimeSlot,
  selectedDuration,
  formData,
  serviceFees
}) {
  const { cases } = useCases({ status: 'open' });
  const casesList = cases?.results || [];

  const selectedCase = useMemo(() => {
    if (!formData.case_id) return null;
    return casesList.find(c => c.id === formData.case_id);
  }, [formData.case_id, casesList]);

  const selectedServiceFee = useMemo(() => {
    if (!selectedDuration || !serviceFees?.length) return null;
    return serviceFees.find(f => f.duration === selectedDuration && f.is_active);
  }, [selectedDuration, serviceFees]);

  const formatDate = (date) => {
    if (!date) return "Not selected";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex card bg-surface p-6 gap-4 flex-col">
      <h2 className="text-xl font-semibold text-primary mb-4">Booking Summary</h2>

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 pb-4 border-b border-color">
          <div className="w-12 h-12 rounded-full bg-primary-color/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary-color">
              person
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-secondary">Doctor</p>
            <p className="font-semibold text-primary">{doctor?.user?.full_name}</p>
            <p className="text-sm text-secondary">{doctor?.specialization}</p>
          </div>
        </div>

        {selectedCase && (
          <div className="flex items-start gap-3 pb-4 border-b border-color">
            <div className="w-12 h-12 rounded-full bg-primary-color/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary-color">
                folder
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-secondary">Case</p>
              <p className="font-semibold text-primary">{selectedCase.title}</p>
              {selectedCase.doctor && (
                <p className="text-xs text-secondary mt-1">
                  With {selectedCase.doctor.user.full_name}
                </p>
              )}
            </div>
          </div>
        )}

        {!formData.case_id && (formData.case_title || formData.case_description) && (
          <div className="flex items-start gap-3 pb-4 border-b border-color">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-success">
                add_circle
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-secondary">New Case</p>
              <p className="font-semibold text-primary">
                {formData.case_title || "Auto-generated title"}
              </p>
              {formData.case_description && (
                <p className="text-xs text-secondary mt-1 line-clamp-2">
                  {formData.case_description}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-start gap-3 pb-4 border-b border-color">
          <div className="w-12 h-12 rounded-full bg-primary-color/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary-color">
              calendar_today
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-secondary">Date</p>
            <p className="font-semibold text-primary">{formatDate(selectedDate)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 pb-4 border-b border-color">
          <div className="w-12 h-12 rounded-full bg-primary-color/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary-color">
              schedule
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-secondary">Time</p>
            <p className="font-semibold text-primary">
              {selectedTimeSlot 
                ? `${formatTime(selectedTimeSlot.start_time)} - ${formatTime(selectedTimeSlot.end_time)}`
                : "Not selected"
              }
            </p>
            {selectedDuration && (
              <p className="text-sm text-secondary">
                {selectedServiceFee?.duration_display || `${selectedDuration} minutes`}
              </p>
            )}
          </div>
        </div>

        {formData.language !== "not-required" && (
          <div className="p-3 bg-info/10 border border-info rounded-lg">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-info text-sm mt-0.5">
                translate
              </span>
              <p className="text-xs text-info">
                Translator service requested
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}