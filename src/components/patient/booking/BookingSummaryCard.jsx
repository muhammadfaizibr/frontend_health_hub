"use client";

import React, { useMemo } from "react";
import { formatTime, calculateDuration } from "@/lib/utils/global";

export default function BookingSummaryCard({
  doctor,
  selectedDate,
  selectedTimeSlot,
  formData,
  serviceFees
}) {
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const slotDuration = useMemo(() => {
    if (!selectedTimeSlot) return null;
    return calculateDuration(selectedTimeSlot.start_time, selectedTimeSlot.end_time);
  }, [selectedTimeSlot]);

  const doctorImage = doctor?.user?.profile_picture || 
    doctor?.profile_picture || 
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face";

  const showTranslator = formData.language !== "not-required";

  return (
    <div className="flex flex-col card bg-surface p-6 gap-4">
      <h3 className="text-lg font-semibold text-primary mb-4">Booking Summary</h3>

      <div className="flex items-center gap-4 pb-4 border-b border-color">
        <img
          src={doctorImage}
          alt={doctor?.user?.full_name || 'Doctor'}
          className="w-16 h-16 rounded-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face";
          }}
        />
        <div>
          <h4 className="text-base font-semibold text-primary">
            {doctor?.user?.full_name || 'Doctor'}
          </h4>
          <p className="text-sm text-secondary">
            {doctor?.specialization || doctor?.category || 'General Practice'}
          </p>
        </div>
      </div>
      
     {selectedDate && <div className="flex flex-col gap-3">
        
        {selectedDate && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary">Date</span>
            <span className="font-semibold text-primary text-right">
              {formatDate(selectedDate)}
            </span>
          </div>
        )}
        
        {selectedTimeSlot && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary">Time</span>
              <span className="font-semibold text-primary">
                {formatTime(selectedTimeSlot.start_time)} - {formatTime(selectedTimeSlot.end_time)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary">Duration</span>
              <span className="font-semibold text-primary">{slotDuration} minutes</span>
            </div>

            {showTranslator && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary">Translator</span>
                <span className="font-semibold text-primary">Required</span>
              </div>
            )}
          </>
        )}
      </div>}

      {!selectedDate && ( 
        <div className="p-3 bg-secondary rounded-lg text-center">
          <p className="text-sm text-secondary">
            Select a date and time to see full booking details
          </p>
        </div>
      )}
    </div>
  );
}