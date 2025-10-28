"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProfile } from "@/lib/hooks/useDoctors";
import { useAvailabilitySlots, useServiceFees } from "@/lib/hooks/useBase";
import { useBookAppointment } from "@/lib/hooks/usePatients";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorState from "@/components/ui/ErrorBoundary";
import AppointmentForm from "@/components/patient/booking/AppointmentForm";
import BookingSummaryCard from "@/components/patient/booking/BookingSummaryCard";
import PreparationNotesCard from "@/components/patient/booking/PreparationNotesCard";
import { useToastContext } from "@/lib/providers/ToastProvider";

export default function PatientBookAppointmentPage({ params }) {
  const router = useRouter();
  const toast = useToastContext();

  const { id: doctorId } = use(params);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [formData, setFormData] = useState({
    language: "not-required",
    reason: "",
    specialRequests: ""
  });

  const { profile: doctor, isLoading: profileLoading, error: profileError } = useProfile(doctorId);
  
  const doctorUserId = doctor?.user?.id;
  const shouldFetch = !!doctorUserId;
  
  const { availabilitySlots, isLoading: slotsLoading } = useAvailabilitySlots(
    { user: doctorUserId, is_active: true }, 
    shouldFetch
  );
  
  const { serviceFees, isLoading: feesLoading } = useServiceFees(
    { user: doctorUserId, is_active: true }, 
    shouldFetch
  );
  
  const { mutate: bookAppointment, isPending: isBooking } = useBookAppointment();
  
  const slotsList = availabilitySlots?.results || [];
  const feesList = serviceFees?.results || [];

  useEffect(() => {
    if (!selectedDuration && feesList.length > 0) {
      const firstActiveFee = feesList.find(fee => fee.is_active);
      if (firstActiveFee) {
        setSelectedDuration(firstActiveFee.duration);
      }
    }
  }, [feesList, selectedDuration]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast.error("Please select an appointment date");
      return;
    }

    if (!selectedDuration) {
      toast.error("Please select an appointment duration");
      return;
    }

    if (!selectedTimeSlot) {
      toast.error("Please select an appointment time");
      return;
    }

    if (!formData.reason.trim()) {
      toast.error("Please provide a reason for your visit");
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const appointmentPayload = {
      doctor_id: doctor.id,
      appointment_date: formattedDate,
      start_time: selectedTimeSlot.start_time,
      duration: selectedDuration,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      reason_for_visit: formData.reason.trim(),
      special_requests: formData.specialRequests.trim() || undefined,
      is_translator_required: formData.language !== "not-required",
      language_preference: formData.language !== "not-required" ? formData.language : undefined,
      is_follow_up: false
    };

    console.log("Booking appointment:", appointmentPayload);

    bookAppointment(appointmentPayload, {
      onSuccess: (data) => {
        console.log("Appointment booked successfully:", data);
        toast.success("Appointment booked successfully!");
        
        setTimeout(() => {
          router.push("/patient/appointments");
        }, 1000);
      },
      onError: (error) => {
        console.error("Error booking appointment:", error);
        let errorMessage = "Failed to book appointment. Please try again.";
        toast.error(error?.errors?.start_time || errorMessage);
      }
    });
  };

  if (profileLoading || (shouldFetch && (slotsLoading || feesLoading))) {
    return <LoadingSpinner />;
  }

  if (profileError) {
    return (
      <ErrorState 
        title="Error loading doctor profile"
        message={profileError.message}
        icon="error"
      />
    );
  }

  if (!doctor) {
    return (
      <ErrorState 
        title="Doctor not found"
        message="The doctor profile you're looking for doesn't exist."
        icon="person_off"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-sm">
        <Link 
          href="/patient/find-doctor" 
          className="text-secondary hover:text-primary transition-colors"
        >
          Find Doctor
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">chevron_right</span>
        <Link 
          href={`/patient/find-doctor/${doctorId}`} 
          className="text-secondary hover:text-primary transition-colors"
        >
          {doctor.user?.full_name}
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">chevron_right</span>
        <span className="text-primary font-medium">Book Appointment</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">Book an Appointment</h1>
            <p className="text-secondary mt-1">with {doctor.user?.full_name}</p>
          </div>

          <AppointmentForm
            doctor={doctor}
            availabilitySlots={slotsList}
            serviceFees={feesList}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            selectedDuration={selectedDuration}
            formData={formData}
            isLoading={isBooking}
            onDateSelect={setSelectedDate}
            onTimeSlotSelect={setSelectedTimeSlot}
            onDurationChange={setSelectedDuration}
            onFormDataChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => router.push(`/patient/find-doctor/${doctorId}`)}
          />
        </div>

        <div className="flex flex-col gap-6">
          <BookingSummaryCard
            doctor={doctor}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            selectedDuration={selectedDuration}
            formData={formData}
            serviceFees={feesList}
          />
          <PreparationNotesCard />
        </div>
      </div>
    </div>
  );
}