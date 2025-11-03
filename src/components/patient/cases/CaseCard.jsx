// components/patient/cases/CaseCard.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import EditCaseModal from "./EditCaseModal";

export default function CaseCard({ caseData, onUpdate, isDoctor = false }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatStatus = (status) => {
    return status?.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Unknown";
  };

  const caseLink = isDoctor 
    ? `/doctor/cases/${caseData.id}` 
    : `/patient/cases/${caseData.id}`;

  return (
    <>
      <div className="card bg-surface p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col flex-1 min-w-0 gap-2">
            <div className="flex items-center gap-3 mb-2">
              <Link href={caseLink}>
                <h3 className="text-lg font-semibold text-primary hover:text-primary-color transition-colors">
                  {caseData.title}
                </h3>
              </Link>
              <Badge variant={caseData.status}>
                {formatStatus(caseData.status)}
              </Badge>
            </div>

            <p className="text-sm text-secondary mb-4 line-clamp-2">
              {caseData.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {isDoctor ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-secondary text-base">
                    person
                  </span>
                  <div>
                    <p className="text-xs text-secondary">Patient</p>
                    <p className="font-medium text-primary">
                      {caseData.patient?.user?.full_name || "N/A"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-secondary text-base">
                    person
                  </span>
                  <div>
                    <p className="text-xs text-secondary">Doctor</p>
                    <p className="font-medium text-primary">
                      {caseData.doctor?.user?.full_name || "Not assigned"}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-secondary text-base">
                  calendar_today
                </span>
                <div>
                  <p className="text-xs text-secondary">Created</p>
                  <p className="font-medium text-primary">
                    {formatDate(caseData.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-secondary text-base">
                  event
                </span>
                <div>
                  <p className="text-xs text-secondary">Appointments</p>
                  <p className="font-medium text-primary">
                    {caseData.appointments_count || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {!isDoctor && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
                className="p-2"
              >
                <span className="material-symbols-outlined text-base">edit</span>
              </Button>
            )}
            <Link href={caseLink}>
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {!isDoctor && (
        <EditCaseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          caseData={caseData}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}