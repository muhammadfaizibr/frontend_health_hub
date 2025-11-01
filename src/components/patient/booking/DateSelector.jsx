"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { convertToDayOfWeek } from "@/lib/utils/global";

export default function DateSelector({
  selectedDate,
  onDateSelect,
  availabilitySlots
}) {
  const availableDates = useMemo(() => {
    if (!availabilitySlots?.length) {
      const dates = [];
      const today = new Date();
      
      for (let i = 1; i <= 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
      }
      
      return dates;
    }

    const uniqueDays = new Set(
      availabilitySlots
        .filter(slot => slot.day_of_week !== undefined)
        .map(slot => slot.day_of_week)
    );

    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const apiDay = convertToDayOfWeek(date.getDay());
      
      if (uniqueDays.has(apiDay)) {
        dates.push(date);
      }
    }
    
    return dates;
  }, [availabilitySlots]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFullDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isDateSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="card bg-surface p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary-color">calendar_today</span>
        <h2 className="text-xl font-semibold text-primary">Select Date</h2>
      </div>
      
      {availableDates.length === 0 ? (
        <div className="text-center py-8 text-secondary">
          <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
          <p>No available dates at this time</p>
          <p className="text-sm mt-1">Please check back later or contact the doctor's office</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableDates.slice(0, 12).map((date, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onDateSelect(date)}
                className={`
                  bg-card-light p-4 rounded-lg border transition-all hover:shadow-md
                  ${isDateSelected(date)
                    ? 'border-primary-color bg-primary-color/10 text-primary-color shadow-md'
                    : 'border-color hover:border-primary-color/50 text-secondary hover:text-primary'
                  }
                `}
              >
                <div className="text-sm font-medium">{formatDate(date)}</div>
              </button>
            ))}
          </div>
          
          {availableDates.length > 12 && (
            <p className="text-xs text-secondary text-center mt-3">
              Showing next 12 available dates
            </p>
          )}
          
          {selectedDate && (
            <div className="mt-4 p-3 border border-color rounded-lg">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-color text-sm">check_circle</span>
                <p className="text-sm text-secondary">
                  Selected: <span className="font-medium text-primary">
                    {formatFullDate(selectedDate)}
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