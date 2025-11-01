"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import EditCaseModal from "./EditCaseModal";

export default function CaseHeader({ caseData, onUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatStatus = (status) => {
    return status?.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Unknown";
  };

  return (
    <>
      <div className="card bg-surface p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-primary">{caseData.title}</h2>
              <Badge variant={caseData.status} size="lg">
                {formatStatus(caseData.status)}
              </Badge>
            </div>
            <p className="text-secondary">{caseData.description}</p>
          </div>

          <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit Case
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-color/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-color text-base">
                person
              </span>
            </div>
            <div>
              <p className="text-xs text-secondary">Assigned Doctor</p>
              <p className="font-medium text-primary">
                {caseData.doctor?.user?.full_name || "Not assigned"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-color/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-color text-base">
                calendar_today
              </span>
            </div>
            <div>
              <p className="text-xs text-secondary">Created On</p>
              <p className="font-medium text-primary">{formatDate(caseData.created_at)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-color/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-color text-base">
                event
              </span>
            </div>
            <div>
              <p className="text-xs text-secondary">Total Appointments</p>
              <p className="font-medium text-primary">{caseData.appointments_count || 0}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-color/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-color text-base">
                update
              </span>
            </div>
            <div>
              <p className="text-xs text-secondary">Last Updated</p>
              <p className="font-medium text-primary">{formatDate(caseData.updated_at)}</p>
            </div>
          </div>
        </div>
      </div>

      <EditCaseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        caseData={caseData}
        onUpdate={onUpdate}
      />
    </>
  );
}