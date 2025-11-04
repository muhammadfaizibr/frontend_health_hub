// app/(organization)/organization/profile/page.jsx
"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { useOrganizationProfile } from "@/lib/hooks/useOrganization";
import ProfileSection from "@/components/profile/ProfileSection";
import ProfileInfoRow from "@/components/profile/ProfileInfoRow";
import { Button } from "@/components/ui/Button";
import OrganizationInfoModal from "@/components/organization/modals/OrganizationInfoModal";

export default function OrganizationProfilePage() {
  const user = useAuthStore((state) => state.user);
  const { data: profile, isLoading: profileLoading } = useOrganizationProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h1 className="text-3xl font-bold text-primary">Organization Profile</h1>
          <p className="text-secondary mt-1">Manage your organization information</p>
        </div>
      </div>

      {/* Organization Information */}
      <ProfileSection
        title="Organization Information"
        icon="business"
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
            label="Organization Name"
            value={profile?.organization_name}
            icon="business"
          />
          <ProfileInfoRow
            label="Registration Number"
            value={profile?.registration_number}
            icon="badge"
          />
          <ProfileInfoRow
            label="Organization Size"
            value={profile?.size?.replace(/_/g, " ")}
            icon="groups"
          />
          <ProfileInfoRow
            label="Area of Focus"
            value={profile?.area_of_focus}
            icon="work"
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

      {/* Contact Information */}
      <ProfileSection
        title="Contact Information"
        icon="contact_mail"
      >
        <div className="space-y-1">
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
        </div>
      </ProfileSection>

      {/* Credits & Statistics */}
      <ProfileSection
        title="Credits & Statistics"
        icon="analytics"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-primary-light">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-color text-3xl">
                account_balance_wallet
              </span>
              <div>
                <p className="text-sm text-secondary">Available Credits</p>
                <p className="text-2xl font-bold text-primary">
                  {profile?.current_credits_balance || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-surface-light">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-info text-3xl">
                calendar_month
              </span>
              <div>
                <p className="text-sm text-secondary">Total Appointments</p>
                <p className="text-2xl font-bold text-primary">
                  {profile?.total_appointments_processed || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-success/10">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-success text-3xl">
                payments
              </span>
              <div>
                <p className="text-sm text-secondary">Currency</p>
                <p className="text-2xl font-bold text-primary">
                  {profile?.currency || "USD"}
                </p>
              </div>
            </div>
          </div>
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
              <h3 className="font-medium text-primary">Billing Information</h3>
              <p className="text-sm text-secondary mt-1">Manage payment methods and billing details</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-light rounded-lg">
            <div>
              <h3 className="font-medium text-primary">Notification Preferences</h3>
              <p className="text-sm text-secondary mt-1">Configure how you receive updates</p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </div>
      </ProfileSection>

      <OrganizationInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        profile={profile}
      />
    </div>
  );
}