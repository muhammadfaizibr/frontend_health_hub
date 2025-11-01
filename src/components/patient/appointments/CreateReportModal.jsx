"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Textarea } from "@/components/forms/Textarea";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { useUploadFile } from "@/lib/hooks/useFiles";
import { apiPost } from "@/lib/api/utils/api-wrapper";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { formatDate, formatTime } from "@/lib/utils/global";

const REPORT_TYPES = [
  { value: "lab_result", label: "Lab Result" },
  { value: "imaging", label: "Imaging" },
  { value: "consultation_note", label: "Consultation Note" },
  { value: "discharge_summary", label: "Discharge Summary" },
  { value: "other", label: "Other" },
];

export default function CreateReportModal({ 
  isOpen, 
  onClose, 
  appointment, 
  onSuccess 
}) {
  const toast = useToastContext();
  const uploadFileMutation = useUploadFile();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState(null);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    report_type: "lab_result",
    file: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        description: "",
        report_type: "lab_result",
        file: null,
      });
      setUploadedFileId(null);
      setIsFileUploading(false);
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size should not exceed 10MB");
      return;
    }

    setFormData({ ...formData, file });
    setIsFileUploading(true);
    setUploadedFileId(null);

    try {
      const fileFormData = new FormData();
      fileFormData.append("file", file);
      fileFormData.append("file_type", "report");
      fileFormData.append("case", appointment.case.id);

      const fileResponse = await uploadFileMutation.mutateAsync(fileFormData);
      
      setUploadedFileId(fileResponse.id);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(
        error?.response?.data?.detail || error?.message || "Failed to upload file"
      );
      setFormData({ ...formData, file: null });
      e.target.value = "";
    } finally {
      setIsFileUploading(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Report title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!uploadedFileId) {
      newErrors.file = "Please upload a file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    if (!uploadedFileId) {
      toast.error("Please wait for file upload to complete");
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData = {
        case_id: appointment.case.id,
        appointment_id: appointment.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        report_type: formData.report_type,
        file_id: uploadedFileId,
      };

      await apiPost(
        API_ENDPOINTS.PATIENT.REPORTS,
        reportData,
        {},
        'Report created successfully'
      );

      toast.success("Report created successfully!");
      onSuccess?.();
    } catch (error) {
      console.error("Error creating report:", error);
      
      let errorMessage = "Failed to create report. Please try again.";
      
      if (error?.response?.data) {
        const errorData = error.response.data;
        if (errorData.title) {
          errorMessage = `Title: ${errorData.title[0]}`;
        } else if (errorData.file_id) {
          errorMessage = `File: ${errorData.file_id[0]}`;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !isFileUploading) {
      onClose();
    }
  };

  const getAppointmentInfo = () => {
    if (!appointment?.time_slot) {
      return { date: "N/A", time: "N/A" };
    }
    
    const { date, start_time, end_time } = appointment.time_slot;
    
    return {
      date: date ? formatDate(date) : "N/A",
      time: start_time && end_time 
        ? `${formatTime(start_time)} - ${formatTime(end_time)}` 
        : "N/A"
    };
  };

  const appointmentInfo = getAppointmentInfo();
  const isSubmitDisabled = !uploadedFileId || isFileUploading || isSubmitting;

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
          <div className="p-6 border-b border-color sticky top-0 bg-surface z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Upload Medical Report</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                disabled={isSubmitting || isFileUploading}
                className="p-2"
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Report Title *
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Blood Test Results"
                disabled={isSubmitting}
                error={errors.title}
                maxLength={255}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Report Type *
              </label>
              <Select
                name="report_type"
                value={formData.report_type}
                onChange={handleChange}
                options={REPORT_TYPES}
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Description (Optional)
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add any additional notes about this report..."
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Upload File *
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isFileUploading 
                  ? 'border-primary bg-hover' 
                  : uploadedFileId 
                    ? 'border-success bg-success/10'
                    : errors.file
                      ? 'border-error'
                      : 'border-color hover:border-primary'
              }`}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                  id="report-file"
                  disabled={isSubmitting || isFileUploading}
                />
                <label
                  htmlFor="report-file"
                  className={`cursor-pointer flex flex-col items-center gap-3 ${
                    (isSubmitting || isFileUploading) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isFileUploading ? (
                    <>
                      <span className="material-symbols-outlined text-5xl text-primary animate-spin">
                        progress_activity
                      </span>
                      <span className="text-sm text-primary font-medium">
                        Uploading file...
                      </span>
                    </>
                  ) : uploadedFileId ? (
                    <>
                      <span className="material-symbols-outlined text-5xl text-success">
                        check_circle
                      </span>
                      <span className="text-sm text-primary font-medium">
                        {formData.file?.name}
                      </span>
                      <span className="text-xs text-success">
                        File uploaded successfully! Click to change file.
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-5xl text-secondary">
                        cloud_upload
                      </span>
                      <span className="text-sm text-primary font-medium">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-secondary">
                        PDF, JPG, PNG, DOC (Max 10MB)
                      </span>
                    </>
                  )}
                </label>
              </div>
              {errors.file && (
                <p className="text-sm text-error mt-1">{errors.file}</p>
              )}
            </div>

            <div className="bg-surface-secondary p-4 bg-hover rounded-lg">
              <p className="text-sm text-secondary mb-2">
                This report will be attached to:
              </p>
              <p className="text-sm font-medium text-primary">
                Case: {appointment.case?.title || "N/A"}
              </p>
              <p className="text-sm font-medium text-primary">
                Appointment: {appointmentInfo.date} at {appointmentInfo.time}
              </p>
            </div>

            <div className="flex gap-4 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose} 
                disabled={isSubmitting || isFileUploading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                isLoading={isSubmitting} 
                disabled={isSubmitDisabled}
              >
                Create Report
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}