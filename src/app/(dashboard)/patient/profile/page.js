// app/(patient)/patient/profile/page.jsx
"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import ProfileSection from "@/components/profile/ProfileSection";
import ProfileInfoRow from "@/components/profile/ProfileInfoRow";
import { Button } from "@/components/ui/Button";
import PatientInfoModal from "@/components/patient/modal/PatientInfoModal";

export default function PatientProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Profile</h1>
          <p className="text-secondary mt-1">Manage your personal information</p>
        </div>
      </div>

      {/* Personal Information */}
      <ProfileSection
        title="Personal Information"
        icon="person"
        action={
          <Button
            variant="outline"
            size="sm"
            icon="edit"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </Button>
        }
      >
        <div className="space-y-1">
          <ProfileInfoRow
            label="Full Name"
            value={`${user?.first_name} ${user?.last_name}`}
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
          {user?.bio && (
            <ProfileInfoRow
              label="Bio"
              value={user?.bio}
              icon="description"
            />
          )}
        </div>
      </ProfileSection>

      {/* Emergency Contact */}
      <ProfileSection
        title="Emergency Contact"
        icon="emergency"
      >
        <div className="space-y-1">
          <ProfileInfoRow
            label="Contact Name"
            value={user?.patient_profile?.emergency_contact_name || "Not provided"}
            icon="person"
          />
          <ProfileInfoRow
            label="Contact Phone"
            value={user?.patient_profile?.emergency_contact_phone || "Not provided"}
            icon="phone"
          />
        </div>
      </ProfileSection>

      {/* Account Settings */}
      <ProfileSection
        title="Account Settings"
        icon="settings"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-light rounded-lg">
            <div>
              <h3 className="font-medium text-primary">Change Password</h3>
              <p className="text-sm text-secondary mt-1">Update your password regularly for security</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-light rounded-lg">
            <div>
              <h3 className="font-medium text-primary">Two-Factor Authentication</h3>
              <p className="text-sm text-secondary mt-1">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </div>
      </ProfileSection>

      <PatientInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
}