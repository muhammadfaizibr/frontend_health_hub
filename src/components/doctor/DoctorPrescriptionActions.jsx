// components/doctor/DoctorPrescriptionActions.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import CreatePrescriptionModal from "@/components/doctor/CreatePrescriptionModal";

export default function DoctorPrescriptionActions({ appointment, onSuccess }) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const canCreatePrescription = appointment?.status?.toLowerCase() === 'conducted';

  if (!canCreatePrescription) {
    return (
      <div className="bg-info/10 border border-info rounded-lg p-4">
        <p className="text-sm text-info">
          Prescriptions can only be created after the appointment is completed.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Manage Prescriptions</h3>
        <Button size="sm" onClick={() => setShowCreateModal(true)}>
          <span className="material-symbols-outlined text-sm">add</span>
          Create Prescription
        </Button>
      </div>

      {showCreateModal && (
        <CreatePrescriptionModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          appointment={appointment}
          onSuccess={() => {
            setShowCreateModal(false);
            onSuccess?.();
          }}
        />
      )}
    </>
  );
}