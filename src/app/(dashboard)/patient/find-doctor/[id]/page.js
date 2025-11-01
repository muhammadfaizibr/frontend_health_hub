"use client";

import React, { use } from "react";
import Link from "next/link";
import { useProfile, useDoctorReviews } from "@/lib/hooks/useDoctors";
import { 
  useEducation, 
  useExperience, 
  useCertifications, 
  useAvailabilitySlots, 
  useServiceFees 
} from "@/lib/hooks/useBase";
import DoctorHeader from "@/components/patient/profile/DoctorHeader";
import AboutSection from "@/components/patient/profile/AboutSection";
import EducationSection from "@/components/patient/profile/EducationSection";
import ExperienceSection from "@/components/patient/profile/ExperienceSection";
import CertificationsSection from "@/components/patient/profile/CertificationsSection";
import ReviewsSection from "@/components/patient/profile/ReviewsSection";
import ConsultationFeesCard from "@/components/patient/profile/ConsultationFeesCard";
import AvailabilityCard from "@/components/patient/profile/AvailabilityCard";
import ProfessionalDetailsCard from "@/components/patient/profile/ProfessionalDetailsCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function PatientDoctorProfilePage({ params }) {
  const { id: doctorId } = use(params);
  
  const { profile: doctor, isLoading: profileLoading, error: profileError } = useProfile(doctorId);
  
  const doctorUserId = doctor?.user?.id;
  const shouldFetch = !!doctorUserId;
  
  const { education, isLoading: educationLoading } = useEducation({ user: doctorUserId }, shouldFetch);
  const { experience, isLoading: experienceLoading } = useExperience({ user: doctorUserId }, shouldFetch);
  const { certifications, isLoading: certificationsLoading } = useCertifications({ user: doctorUserId }, shouldFetch);
  const { availabilitySlots, isLoading: slotsLoading } = useAvailabilitySlots(
    { user: doctorUserId, is_active: true }, 
    shouldFetch
  );
  const { serviceFees, isLoading: feesLoading } = useServiceFees(
    { user: doctorUserId, is_active: true }, 
    shouldFetch
  );
  
  const { reviews, isLoading: reviewsLoading, error: reviewsError } = useDoctorReviews(doctorId);

  const educationList = education?.results || [];
  const experienceList = experience?.results || [];
  const certificationsList = certifications?.results || [];
  const slotsList = availabilitySlots?.results || [];

  if (profileLoading) return <LoadingSpinner />;

  if (profileError) {
    return (
      <ErrorBoundary 
        title="Error loading doctor profile"
        message={profileError.message}
        icon="error"
      />
    );
  }

  if (!doctor) {
    return (
      <ErrorBoundary 
        title="Doctor not found"
        message="The doctor profile you're looking for doesn't exist."
        icon="person_off"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/patient/find-doctor" className="text-secondary hover:text-primary transition-colors">
          Find Doctor
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">chevron_right</span>
        <span className="text-primary font-medium">{doctor.user?.full_name || 'Doctor Profile'}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <DoctorHeader doctor={doctor} />
          <AboutSection bio={doctor?.about} />
          <EducationSection education={educationList} loading={educationLoading} />
          <ExperienceSection experience={experienceList} loading={experienceLoading} />
          <CertificationsSection certifications={certificationsList} loading={certificationsLoading} />
          <ReviewsSection 
            reviews={reviews}
            reviewCount={reviews?.results?.length || 0}
            loading={reviewsLoading}
            error={reviewsError}
          />
        </div>

        <div className="flex flex-col gap-6">
          <ConsultationFeesCard 
            loading={feesLoading}
            doctorId={doctor?.id}
          />
          <AvailabilityCard availabilitySlots={slotsList} loading={slotsLoading} />
          <ProfessionalDetailsCard doctor={doctor} />
        </div>
      </div>
    </div>
  );
}