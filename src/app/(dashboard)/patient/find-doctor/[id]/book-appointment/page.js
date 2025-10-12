"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";
import { APPOINTMENT_DURATIONS, LANGUAGES } from "@/constants";

export default function PatientBookAppointmentPage({ params }) {
  const router = useRouter();
  const doctorId = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    type: "in-person",
    duration: "30",
    language: "not-required",
    reason: "",
    specialRequests: ""
  });

  // Mock doctor data
  const doctor = {
    id: doctorId,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    consultationFee: 150
  };

  const appointmentTypes = [
    { value: "in-person", label: "In-person" },
    { value: "telehealth", label: "Telehealth" }
  ];

  const languageOptions = LANGUAGES;

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time for your appointment.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Appointment booked successfully!");
      router.push("/patient/appointments");
    }, 2000);
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const availableDates = getAvailableDates();

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/patient/find-doctor" className="text-secondary hover:text-primary">
          Find Doctor
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">
          chevron_right
        </span>
        <Link href={`/dashboard/patient/find-doctor/${doctorId}`} className="text-secondary hover:text-primary">
          Dr. Sarah Johnson
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">
          chevron_right
        </span>
        <span className="text-primary">Book Appointment</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Main Form */}
  <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">Book an Appointment</h1>
            <p className="text-secondary mt-1">with {doctor.name}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Date Selection */}
            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Select Date</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {availableDates.slice(0, 15).map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? 'border-primary-color bg-primary-color/10 text-primary-color'
                        : 'border-color hover:border-primary-color hover:bg-surface-secondary'
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {formatDate(date)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="card bg-surface p-6">
                <h2 className="text-xl font-semibold text-primary mb-4">
                  Select Time for {formatDate(selectedDate)}
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        selectedTime === time
                          ? 'border-primary-color bg-primary-color/10 text-primary-color'
                          : 'border-color hover:border-primary-color hover:bg-surface-secondary'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Appointment Details */}
            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Appointment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  options={appointmentTypes}
                  placeholder="Appointment Type"
                />

                <Select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  options={APPOINTMENT_DURATIONS}
                  placeholder="Duration"
                />

                <Select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  options={languageOptions}
                  placeholder="Language Preference"
                />
              </div>

              <div className="mt-4">
                  <Textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Reason for visit (optional)"
                  rows={3}
                />
              </div>

                <div className="mt-4">
                  <Textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Special requests or notes (optional)"
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!selectedDate || !selectedTime || isLoading}
              >
                {isLoading ? "Booking..." : "Book Appointment"}
              </Button>
              <Link href={`/dashboard/patient/find-doctor/${doctorId}`}>
                <Button variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Doctor Info */}
          <div className="card bg-surface p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {doctor.name}
                </h3>
                <p className="text-secondary">{doctor.specialty}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="text-secondary">Consultation Fee</span>
                <span className="font-semibold text-primary">
                  ${doctor.consultationFee}
                </span>
              </div>
              
              {selectedDate && selectedTime && (
                <>
                  <div className="flex justify-between">
                    <span className="text-secondary">Date</span>
                    <span className="font-semibold text-primary">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-secondary">Time</span>
                    <span className="font-semibold text-primary">
                      {selectedTime}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-secondary">Type</span>
                    <span className="font-semibold text-primary capitalize">
                      {formData.type}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-secondary">Duration</span>
                    <span className="font-semibold text-primary">
                      {formData.duration} minutes
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Preparation Notes */}
            <div className="card bg-surface p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Preparation
            </h3>
            <div className="flex flex-col gap-2 text-sm text-secondary">
              <p>• Arrive 15 minutes early</p>
              <p>• Bring your ID and insurance card</p>
              <p>• Bring any relevant medical records</p>
              <p>• List of current medications</p>
              {formData.type === "telehealth" && (
                <p>• Ensure good internet connection</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
