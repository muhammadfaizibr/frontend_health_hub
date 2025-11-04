// app/(doctor)/doctor/profile/page.jsx
"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { useMyProfile } from "@/lib/hooks/useDoctors";
import { 
  useEducation, 
  useExperience, 
  useCertifications,
  useMyAvailability,
  useMyFees 
} from "@/lib/hooks/useBase";
import ProfileSection from "@/components/profile/ProfileSection";
import ProfileInfoRow from "@/components/profile/ProfileInfoRow";
import ListItemCard from "@/components/profile/ListItemCard";
import EmptyState from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import BasicInfoModal from "@/components/doctor/modals/BasicInfoModal";
import EducationModal from "@/components/doctor/modals/EducationModal";
import ExperienceModal from "@/components/doctor/modals/ExperienceModal";
import CertificationModal from "@/components/doctor/modals/CertificationModal";
import AvailabilityModal from "@/components/doctor/modals/AvailabilityModal";
import ServiceFeeModal from "@/components/doctor/modals/ServiceFeeModal";

export default function DoctorProfilePage() {
  const user = useAuthStore((state) => state.user);
  const { profile, isLoading: profileLoading } = useMyProfile();
  const { education, isLoading: educationLoading } = useEducation();
  const { experience, isLoading: experienceLoading } = useExperience();
  const { certifications, isLoading: certificationsLoading } = useCertifications();
  const { availability, isLoading: availabilityLoading } = useMyAvailability();
  const { fees, isLoading: feesLoading } = useMyFees();

  console.log(experience, 'experience')


  const [modals, setModals] = useState({
    basicInfo: false,
    education: false,
    experience: false,
    certification: false,
    availability: false,
    serviceFee: false
  });

  const [selectedItems, setSelectedItems] = useState({
    education: null,
    experience: null,
    certification: null,
    availability: null,
    serviceFee: null
  });

  const openModal = (modalName, item = null) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
    if (item) {
      setSelectedItems(prev => ({ ...prev, [modalName]: item }));
    }
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setSelectedItems(prev => ({ ...prev, [modalName]: null }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  const getDayName = (dayNum) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNum];
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color mx-auto mb-4"></div>
          <p className="text-secondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Doctor Profile</h1>
          <p className="text-secondary mt-1">Manage your professional information</p>
        </div>
        {profile?.is_verified && (
          <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-lg">
            <span className="material-symbols-outlined">verified</span>
            <span className="font-medium">Verified</span>
          </div>
        )}
      </div>

      {/* Basic Information */}
      <ProfileSection
        title="Basic Information"
        icon="person"
        action={
          <Button
            variant="outline"
            size="sm"
            icon="edit"
            onClick={() => openModal('basicInfo')}
          >
            Edit
          </Button>
        }
      >
        <div className="space-y-1">
          <ProfileInfoRow
            label="Full Name"
            value={`Dr. ${user?.first_name} ${user?.last_name}`}
            icon="badge"
          />
          <ProfileInfoRow
            label="Email"
            value={user?.email}
            icon="email"
          />
          <ProfileInfoRow
            label="Phone"
            value={user?.phone_number}
            icon="phone"
          />
          <ProfileInfoRow
            label="Gender"
            value={user?.gender === "M" ? "Male" : user?.gender === "F" ? "Female" : "Not specified"}
            icon="wc"
          />
          <ProfileInfoRow
            label="Category"
            value={profile?.category?.replace(/_/g, " ")}
            icon="category"
          />
          <ProfileInfoRow
            label="Specialization"
            value={profile?.specialization}
            icon="medical_services"
          />
          <ProfileInfoRow
            label="Years of Experience"
            value={`${profile?.years_of_experience || 0} years`}
            icon="work_history"
          />
          <ProfileInfoRow
            label="License Number"
            value={profile?.license_number}
            icon="card_membership"
          />
          <ProfileInfoRow
            label="Location"
            value={profile?.location}
            icon="location_on"
          />
          {profile?.about && (
            <ProfileInfoRow
              label="About"
              value={profile?.about}
              icon="description"
            />
          )}
        </div>
      </ProfileSection>

      {/* Education */}
      <ProfileSection
        title="Education"
        icon="school"
        action={
          <Button
            variant="outline"
            size="sm"
            icon="add"
            onClick={() => openModal('education')}
          >
            Add Education
          </Button>
        }
      >
        {educationLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color mx-auto"></div>
          </div>
        ) : education && education?.results?.length > 0 ? (
          <div className="space-y-3">
            {education?.results?.map((edu) => (
              <ListItemCard
                key={edu.id}
                icon="school"
                title={`${edu.degree} in ${edu.field}`}
                subtitle={edu.school}
                details={[
                  `${formatDate(edu.start_date)} - ${formatDate(edu.end_date)}`,
                  edu.grade && `Grade: ${edu.grade}`,
                  edu.description
                ].filter(Boolean)}
                onEdit={() => openModal('education', edu)}
                onDelete={() => {
                  if (confirm("Are you sure you want to delete this education record?")) {
                    // Handle delete
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="school"
            title="No education records"
            description="Add your educational background to showcase your qualifications."
            actionLabel="Add Education"
            onAction={() => openModal('education')}
          />
        )}
      </ProfileSection>

      {/* Experience */}
      <ProfileSection
        title="Work Experience"
        icon="work"
        action={
          <Button
            variant="outline"
            size="sm"
            icon="add"
            onClick={() => openModal('experience')}
          >
            Add Experience
          </Button>
        }
      >
        {experienceLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color mx-auto"></div>
          </div>
        ) : experience && experience?.results?.length > 0 ? (
          <div className="space-y-3">
            {experience?.results?.map((exp) => (
              <ListItemCard
                key={exp.id}
                icon="work"
                title={exp.title}
                subtitle={exp.company_or_organization}
                details={[
                  `${formatDate(exp.start_date)} - ${formatDate(exp.end_date)}`,
                  exp.employment_type?.replace(/_/g, " ").toUpperCase(),
                  exp.location,
                  exp.description
                ].filter(Boolean)}
                onEdit={() => openModal('experience', exp)}
                onDelete={() => {
                  if (confirm("Are you sure you want to delete this experience?")) {
                    // Handle delete
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="work"
            title="No work experience"
            description="Add your professional experience to build credibility."
            actionLabel="Add Experience"
            onAction={() => openModal('experience')}
          />
        )}
      </ProfileSection>

      {/* Certifications */}
      <ProfileSection
        title="Certifications & Licenses"
        icon="verified"
        action={
          <Button
            variant="outline"
            size="sm"
            icon="add"
            onClick={() => openModal('certification')}
          >
            Add Certification
          </Button>
        }
      >
        {certificationsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color mx-auto"></div>
          </div>
        ) : certifications && certifications?.results?.length > 0 ? (
          <div className="space-y-3">
            {certifications?.results?.map((cert) => (
              <ListItemCard
                key={cert.id}
                icon="verified"
                title={cert.title}
                subtitle={cert.issuing_organization}
                details={[
                  `Issued: ${formatDate(cert.issue_date)}`,
                  cert.expiration_date && `Expires: ${formatDate(cert.expiration_date)}`,
                  cert.credential_id && `ID: ${cert.credential_id}`,
                  cert.description
                ].filter(Boolean)}
                onEdit={() => openModal('certification', cert)}
                onDelete={() => {
                  if (confirm("Are you sure you want to delete this certification?")) {
                    // Handle delete
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="verified"
            title="No certifications"
            description="Add your professional certifications and licenses."
            actionLabel="Add Certification"
            onAction={() => openModal('certification')}
          />
        )}
      </ProfileSection>

      {/* Availability Schedule */}
      <ProfileSection
        title="Availability Schedule"
        icon="schedule"
        action={
          <Button
            variant="outline"
            size="sm"
            icon="add"
            onClick={() => openModal('availability')}
          >
            Add Slot
          </Button>
        }
      >
        {availabilityLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color mx-auto"></div>
          </div>
        ) : availability && availability.length > 0 ? (
          <div className="space-y-3">
            {availability.map((slot) => (
              <ListItemCard
                key={slot.id}
                icon="schedule"
                title={getDayName(slot.day_of_week)}
                subtitle={`${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`}
                details={[
                  slot.is_active ? "Active" : "Inactive"
                ]}
                onEdit={() => openModal('availability', slot)}
                onDelete={() => {
                  if (confirm("Are you sure you want to delete this availability slot?")) {
                    // Handle delete
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="schedule"
            title="No availability slots"
            description="Set your weekly availability for appointments."
            actionLabel="Add Availability"
            onAction={() => openModal('availability')}
          />
        )}
      </ProfileSection>

      {/* Service Fees */}
      <ProfileSection
        title="Service Fees"
        icon="payments"
        action={
          <Button
            variant="outline"
            size="sm"
            icon="add"
            onClick={() => openModal('serviceFee')}
          >
            Add Fee
          </Button>
        }
      >
        {feesLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color mx-auto"></div>
          </div>
        ) : fees && fees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fees.map((fee) => (
              <div key={fee.id} className="card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-color">schedule</span>
                    <span className="font-semibold text-primary">{fee.duration} minutes</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="edit"
                      onClick={() => openModal('serviceFee', fee)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="delete"
                      className="text-error hover:text-error"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this fee?")) {
                          // Handle delete
                        }
                      }}
                    />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary-color">
                  {fee.currency} {fee.fee}
                </p>
                <p className="text-sm text-secondary mt-1">
                  {fee.is_active ? "Active" : "Inactive"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="payments"
            title="No service fees"
            description="Set your consultation fees for different durations."
            actionLabel="Add Fee"
            onAction={() => openModal('serviceFee')}
          />
        )}
      </ProfileSection>

      {/* Modals */}
      <BasicInfoModal
        isOpen={modals.basicInfo}
        onClose={() => closeModal('basicInfo')}
        user={user}
        profile={profile}
      />

      <EducationModal
        isOpen={modals.education}
        onClose={() => closeModal('education')}
        education={selectedItems.education}
      />

      <ExperienceModal
        isOpen={modals.experience}
        onClose={() => closeModal('experience')}
        experience={selectedItems.experience}
      />

      <CertificationModal
        isOpen={modals.certification}
        onClose={() => closeModal('certification')}
        certification={selectedItems.certification}
      />

      <AvailabilityModal
        isOpen={modals.availability}
        onClose={() => closeModal('availability')}
        slot={selectedItems.availability}
      />

      <ServiceFeeModal
        isOpen={modals.serviceFee}
        onClose={() => closeModal('serviceFee')}
        fee={selectedItems.serviceFee}
      />
    </div>
  );
}