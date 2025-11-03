// components/patient/appointments/ReportsSection.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import CreateReportModal from "@/components/patient/appointments/CreateReportModal";
import { useDownloadFile } from "@/lib/hooks/useFiles";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { formatDate, formatTime } from "@/lib/utils/global";

const EmptyState = ({ icon, title, description, actionLabel, onAction, showAction = true }) => (
  <div className="flex flex-col gap-2 text-center py-12 items-center">
    <span className="material-symbols-outlined icon-lg text-secondary mb-4">
      {icon}
    </span>
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-secondary mb-4">{description}</p>
    {showAction && actionLabel && onAction && (
      <Button onClick={onAction}>
        <span className="material-symbols-outlined text-sm">add</span>
        {actionLabel}
      </Button>
    )}
  </div>
);

const ReportCard = ({ report }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const downloadFileMutation = useDownloadFile();
  const toast = useToastContext();

  const getReportIcon = (type) => {
    const icons = {
      lab_result: "science",
      imaging: "radio_button_checked",
      consultation_note: "description",
      discharge_summary: "assignment",
      other: "lab_profile",
    };
    return icons[type] || "lab_profile";
  };

  const getReportTypeDisplay = (type) => {
    const displays = {
      lab_result: "Lab Result",
      imaging: "Imaging",
      consultation_note: "Consultation Note",
      discharge_summary: "Discharge Summary",
      other: "Other",
    };
    return displays[type] || type;
  };

  const handleDownload = async () => {
    if (!report.file?.id) {
      toast.error("File not found");
      return;
    }

    try {
      await downloadFileMutation.mutateAsync(report.file.id);
      toast.success("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="flex flex-col card bg-card-light overflow-hidden gap-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover:bg-hover transition-colors"
      >
        <div className="flex items-start gap-3 text-left flex-1">
          <span className="material-symbols-outlined text-primary mt-0.5">
            {getReportIcon(report.report_type)}
          </span>
          <div className="flex-1">
            <h3 className="font-semibold text-primary text-lg">{report.title}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-secondary">
              <span>{getReportTypeDisplay(report.report_type)}</span>
              <span>•</span>
              <span>{formatDate(report.created_at)}</span>
              {report.file?.file_size_display && (
                <>
                  <span>•</span>
                  <span>{report.file.file_size_display}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <span className={`material-symbols-outlined text-secondary transition-transform ${
          isExpanded ? 'rotate-180' : ''
        }`}>
          expand_more
        </span>
      </button>

      {isExpanded && (
        <div className="border-t pt-4 border-color bg-hover/30">
          {report.description && (
            <div className="mb-4">
              <p className="text-sm font-medium text-primary mb-1">Description:</p>
              <p className="text-sm text-secondary">{report.description}</p>
            </div>
          )}

          {report.file && (
            <div className="mb-4">
              <Button
                onClick={handleDownload}
                size="sm"
                isLoading={downloadFileMutation.isPending}
                disabled={downloadFileMutation.isPending}
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download Report
              </Button>
              {report.file.original_filename && (
                <p className="text-xs text-secondary mt-2">
                  File: {report.file.original_filename}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-secondary pt-4 border-t border-color">
            <span>Uploaded by: {report.uploaded_by?.full_name || 'N/A'}</span>
            <span>{formatDate(report.created_at)} at {formatTime(report.created_at)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ReportsSection({ 
  appointment, 
  reports = [], 
  isLoading, 
  onUpdate,
  isDoctor = false 
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  const reportsList = Array.isArray(reports) ? reports : [];

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">
            Medical Reports ({reportsList.length})
          </h3>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <span className="material-symbols-outlined text-sm">add</span>
            Upload Report
          </Button>
        </div>

        {reportsList.length === 0 ? (
          <EmptyState
            icon="lab_profile"
            title="No reports yet"
            description="No medical reports have been uploaded for this appointment."
            actionLabel="Upload First Report"
            onAction={() => setShowCreateModal(true)}
            showAction={true}
          />
        ) : (
          <div className="space-y-3">
            {reportsList.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateReportModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          appointment={appointment}
          onSuccess={() => {
            setShowCreateModal(false);
            onUpdate?.();
          }}
        />
      )}
    </>
  );
}