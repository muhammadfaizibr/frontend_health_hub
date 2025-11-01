"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProfile } from "@/lib/hooks/useDoctors";
import { useAvailabilitySlots, useServiceFees } from "@/lib/hooks/useBase";
import { useBookAppointment } from "@/lib/hooks/usePatients";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import AppointmentForm from "@/components/patient/booking/AppointmentForm";
import BookingSummaryCard from "@/components/patient/booking/BookingSummaryCard";
import PreparationNotesCard from "@/components/patient/booking/PreparationNotesCard";
import { useToastContext } from "@/lib/providers/ToastProvider";

export default function PatientBookAppointmentPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToastContext();
  const { id: doctorId } = use(params);
  
  // Get case ID from URL parameters
  const caseIdFromUrl = searchParams.get('case');
  
  // Validate UUID format
  const isValidUUID = (uuid) => {
    if (!uuid) return true; // null/undefined is valid (no case selected)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [formData, setFormData] = useState({
    case_id: caseIdFromUrl || "",
    case_title: "",
    case_description: "",
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

  // Show warning if case ID format is invalid - only run once on mount
  useEffect(() => {
    if (caseIdFromUrl && !isValidUUID(caseIdFromUrl)) {
      toast.error("Invalid case ID format in URL");
    }
  }, []); // Empty dependency array - only run once

  // Set case ID from URL on mount
  useEffect(() => {
    if (caseIdFromUrl && isValidUUID(caseIdFromUrl)) {
      setFormData(prev => ({
        ...prev,
        case_id: caseIdFromUrl
      }));
    }
  }, [caseIdFromUrl]);

  useEffect(() => {
    if (!selectedDuration && feesList.length > 0) {
      const firstActiveFee = feesList.find(fee => fee.is_active);
      if (firstActiveFee) {
        setSelectedDuration(firstActiveFee.duration);
      }
    }
  }, [feesList, selectedDuration]);

  const handleCaseChange = (caseId) => {
    // Prevent case change if case is pre-selected from URL
    if (caseIdFromUrl) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      case_id: caseId,
      case_title: caseId ? "" : prev.case_title,
      case_description: caseId ? "" : prev.case_description,
    }));
  };

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

    if (formData.case_id) {
      appointmentPayload.case_id = formData.case_id;
    } else {
      if (formData.case_title?.trim()) {
        appointmentPayload.case_title = formData.case_title.trim();
      }
      if (formData.case_description?.trim()) {
        appointmentPayload.case_description = formData.case_description.trim();
      }
    }

    bookAppointment(appointmentPayload, {
      onSuccess: (data) => {
        toast.success("Appointment booked successfully!");
        
        setTimeout(() => {
          if (data.case?.id) {
            router.push(`/patient/cases/${data.case.id}`);
          } else {
            router.push("/patient/appointments");
          }
        }, 1000);
      },
      onError: (error) => {
        // Handle specific field errors
        if (error?.errors) {
          if (error.errors.case_id) {
            toast.error(error.errors.case_id);
          } else if (error.errors.doctor_id) {
            toast.error(error.errors.doctor_id);
          } else if (error.errors.start_time) {
            toast.error(error.errors.start_time);
          } else if (error.errors.appointment_date) {
            toast.error(error.errors.appointment_date);
          } else {
            toast.error(error.message || "Failed to book appointment. Please try again.");
          }
        } else {
          toast.error(error.message || "Failed to book appointment. Please try again.");
        }
      }
    });
  };

  if (profileLoading || (shouldFetch && (slotsLoading || feesLoading))) {
    return <LoadingSpinner />;
  }

  if (profileError) {
    return (
      <ErrorBoundary 
        title="Error loading doctor profile"
        message={profileError.message}
        icon="error"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!doctor) {
    return (
      <ErrorBoundary 
        title="Doctor not found"
        message="The doctor profile you're looking for doesn't exist."
        icon="person_off"
        showRefresh={false}
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
            caseIdFromUrl={caseIdFromUrl}
            onDateSelect={setSelectedDate}
            onTimeSlotSelect={setSelectedTimeSlot}
            onDurationChange={setSelectedDuration}
            onFormDataChange={setFormData}
            onCaseChange={handleCaseChange}
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