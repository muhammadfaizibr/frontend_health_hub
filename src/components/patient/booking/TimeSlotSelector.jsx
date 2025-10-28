"use client";

import React, { useMemo } from "react";
import { convertToDayOfWeek, formatTime } from "@/lib/utils/global";

function generateTimeSlots(availabilitySlot, durationMinutes) {
  const slots = [];
  const [startHour, startMinute] = availabilitySlot.start_time.split(':').map(Number);
  const [endHour, endMinute] = availabilitySlot.end_time.split(':').map(Number);
  
  const startTimeMinutes = startHour * 60 + startMinute;
  const endTimeMinutes = endHour * 60 + endMinute;
  
  for (let time = startTimeMinutes; time + durationMinutes <= endTimeMinutes; time += durationMinutes) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const endTime = time + durationMinutes;
    const endHours = Math.floor(endTime / 60);
    const endMinutes = endTime % 60;
    
    slots.push({
      id: `${availabilitySlot.id}-${time}`,
      availabilitySlotId: availabilitySlot.id,
      start_time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`,
      end_time: `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}:00`,
      duration: durationMinutes
    });
  }
  
  return slots;
}

export default function TimeSlotSelector({
  selectedDate,
  selectedTimeSlot,
  onTimeSlotSelect,
  availabilitySlots,
  serviceFees,
  selectedDuration,
  onDurationChange
}) {
  const durationOptions = useMemo(() => {
    if (!serviceFees?.length) return [];
    
    return serviceFees
      .filter(fee => fee.is_active)
      .map(fee => ({
        value: fee.duration,
        label: fee.duration_display,
        fee: fee.fee,
        currency: fee.currency,
        id: fee.id
      }))
      .sort((a, b) => a.value - b.value);
  }, [serviceFees]);

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !availabilitySlots || !selectedDuration) return [];

    const apiDay = convertToDayOfWeek(selectedDate.getDay());
    
    const daySlots = availabilitySlots
      .filter(slot => slot.day_of_week === apiDay && slot.is_active)
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
    
    const generatedSlots = [];
    daySlots.forEach(slot => {
      const slots = generateTimeSlots(slot, selectedDuration);
      generatedSlots.push(...slots);
    });
    
    return generatedSlots;
  }, [selectedDate, availabilitySlots, selectedDuration]);

  const selectedServiceFee = useMemo(() => {
    if (!selectedDuration || !serviceFees?.length) return null;
    return serviceFees.find(f => f.duration === selectedDuration && f.is_active);
  }, [selectedDuration, serviceFees]);

  const isSlotSelected = (slot) => {
    return selectedTimeSlot && 
           selectedTimeSlot.start_time === slot.start_time && 
           selectedTimeSlot.end_time === slot.end_time;
  };

  if (!selectedDate) {
    return (
      <div className="card bg-surface p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary-color">schedule</span>
          <h2 className="text-xl font-semibold text-primary">Select Time</h2>
        </div>
        <div className="text-center py-8 text-secondary">
          <span className="material-symbols-outlined icon-2xl mb-2 opacity-50">schedule</span>
          <p>Please select a date first</p>
        </div>
      </div>
    );
  }

  if (durationOptions.length === 0) {
    return (
      <div className="card bg-surface p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary-color">schedule</span>
          <h2 className="text-xl font-semibold text-primary">Select Duration & Time</h2>
        </div>
        <div className="text-center py-8 text-secondary">
          <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
          <p>No duration options available</p>
          <p className="text-sm mt-1">The doctor hasn't set up service fees yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-surface p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary-color">schedule</span>
        <h2 className="text-xl font-semibold text-primary">Select Duration & Time</h2>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-primary mb-3">
          Appointment Duration *
        </label>
        <div className={`grid gap-3 ${
          durationOptions.length === 1 ? 'grid-cols-1' :
          durationOptions.length === 2 ? 'grid-cols-2' :
          durationOptions.length === 3 ? 'grid-cols-3' :
          'grid-cols-2 sm:grid-cols-4'
        }`}>
          {durationOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                onDurationChange(option.value);
                onTimeSlotSelect(null);
              }}
              className={`
                p-3 rounded-lg border-1 transition-all hover:shadow-md
                ${selectedDuration === option.value
                  ? 'border-primary-color bg-primary-color/10 text-primary-color shadow-md'
                  : 'border-color hover:border-primary-color/50 text-secondary'
                }
              `}
            >
              <div className="text-sm font-medium">{option.label}</div>
              <div className="text-xs mt-1 opacity-75">
                {option.currency} {option.fee}
              </div>
            </button>
          ))}
        </div>
        {selectedServiceFee && (
          <div className="mt-3 p-3 border border-color rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary">
                Consultation fee ({selectedServiceFee.duration_display}):
              </span>
              <span className="text-sm font-semibold text-primary">
                {selectedServiceFee.currency} {selectedServiceFee.fee}
              </span>
            </div>
          </div>
        )}
      </div>

      {!selectedDuration ? (
        <div className="text-center py-8 text-secondary">
          <span className="material-symbols-outlined text-4xl mb-2 opacity-50">timer</span>
          <p>Please select an appointment duration</p>
        </div>
      ) : availableTimeSlots.length === 0 ? (
        <div className="text-center py-8 text-secondary">
          <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
          <p>No available time slots for this date and duration</p>
          <p className="text-sm mt-1">Please select a different date or duration</p>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium text-primary">
              Available Time Slots
            </label>
            <p className="text-xs text-secondary mt-1">
              {availableTimeSlots.length} slots available for {selectedServiceFee?.duration_display || `${selectedDuration} minute`} appointments
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-2">
            {availableTimeSlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => onTimeSlotSelect(slot)}
                className={`
                  p-3 rounded-lg border-1 transition-all text-left hover:shadow-md
                  ${isSlotSelected(slot)
                    ? 'border-primary-color bg-primary-color/10 shadow-md'
                    : 'border-color hover:border-primary-color/50'
                  }
                `}
              >
                <div className={`text-sm font-medium ${
                  isSlotSelected(slot) ? 'text-primary-color' : 'text-primary'
                }`}>
                  {formatTime(slot.start_time)}
                </div>
                <div className="text-xs text-secondary mt-0.5">
                  to {formatTime(slot.end_time)}
                </div>
              </button>
            ))}
          </div>
          
          {selectedTimeSlot && (
            <div className="mt-4 p-3 border border-color rounded-lg">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-color text-sm">check_circle</span>
                <p className="text-sm text-secondary">
                  Selected: <span className="font-medium text-primary">
                    {formatTime(selectedTimeSlot.start_time)} - {formatTime(selectedTimeSlot.end_time)}
                    {' '}({selectedServiceFee?.duration_display || `${selectedDuration} minutes`})
                  </span>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}