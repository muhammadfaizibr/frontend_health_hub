"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import DateSelector from "./DateSelector";
import TimeSlotSelector from "./TimeSlotSelector";
import AppointmentDetailsSection from "./AppointmentDetailsSection";

export default function AppointmentForm({
  doctor,
  availabilitySlots,
  serviceFees,
  selectedDate,
  selectedTimeSlot,
  selectedDuration,
  formData,
  isLoading,
  caseIdFromUrl,
  onDateSelect,
  onTimeSlotSelect,
  onDurationChange,
  onFormDataChange,
  onCaseChange,
  onSubmit,
  onCancel
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = 
    selectedDate && 
    selectedTimeSlot && 
    selectedDuration && 
    formData.reason.trim() && 
    !isLoading;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <DateSelector
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        availabilitySlots={availabilitySlots}
      />

      <TimeSlotSelector
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        onTimeSlotSelect={onTimeSlotSelect}
        availabilitySlots={availabilitySlots}
        serviceFees={serviceFees}
        selectedDuration={selectedDuration}
        onDurationChange={onDurationChange}
      />

      <AppointmentDetailsSection
        formData={formData}
        onInputChange={handleInputChange}
        onCaseChange={onCaseChange}
        caseIdFromUrl={caseIdFromUrl}
      />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} disabled={!isFormValid}>
          {isLoading ? "Booking..." : "Book Appointment"}
        </Button>
      </div>
    </form>
  );
}