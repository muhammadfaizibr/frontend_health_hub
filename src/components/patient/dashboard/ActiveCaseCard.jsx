// components/patient/dashboard/ActiveCaseCard.jsx
import React from "react";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils/global";

export default function ActiveCaseCard({ caseItem, isDoctor = false }) {
  const doctor = caseItem.doctor?.user;
  const patient = caseItem.patient?.user;

  const caseLink = isDoctor 
    ? `/doctor/cases/${caseItem.id}` 
    : `/patient/cases/${caseItem.id}`;

  const displayName = isDoctor 
    ? patient?.full_name || "N/A"
    : doctor?.full_name || "Not assigned";

  const displayLabel = isDoctor ? "" : "Dr. ";

  return (
    <div className="border border-color rounded-lg p-3 hover:shadow-md transition-shadow bg-card-light">
      {/* Single Row Layout */}
      <div className="flex items-center justify-between gap-3">
        {/* Left: Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-primary text-sm truncate">
              {caseItem.title}
            </h3>
            <StatusBadge status={caseItem.status} />
          </div>
          
          <div className="flex flex-wrap items-center gap-1 text-xs text-secondary">
            <span className="truncate">{displayLabel}{displayName}</span>
            <span>•</span>
            <span>{caseItem.appointments_count} apt{caseItem.appointments_count !== 1 ? 's' : ''}</span>
            <span>•</span>
            <span>{formatDate(caseItem.updated_at)}</span>
          </div>
        </div>

        {/* Right: Action */}
        <Link 
          href={caseLink}
          className="text-primary hover:text-primary/80 shrink-0"
        >
          <span className="material-symbols-outlined text-lg">
            chevron_right
          </span>
        </Link>
      </div>
    </div>
  );
}