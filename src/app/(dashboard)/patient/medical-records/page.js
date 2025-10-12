"use client";

import React, { useState } from "react";
import { TabNavigation } from "@/components/ui/TabNavigation";
import { MedicalRecordCard } from "@/components/features/patient/MedicalRecordCard";
import { HealthHistoryCard } from "@/components/features/patient/HealthHistoryCard";
import { MedicalRecordsSummary } from "@/components/features/patient/MedicalRecordsSummary";
import { QuickActions } from "@/components/features/patient/QuickActions";

export default function PatientMedicalRecordsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const medicalRecords = [
    {
      id: 1,
      type: "Lab Results",
      title: "Blood Test Results",
      date: "2024-01-10",
      doctor: "Dr. Sarah Johnson",
      status: "completed",
      description: "Complete blood count and metabolic panel"
    },
    {
      id: 2,
      type: "Imaging",
      title: "Chest X-Ray",
      date: "2024-01-08",
      doctor: "Dr. Michael Chen",
      status: "completed",
      description: "Routine chest X-ray examination"
    },
    {
      id: 3,
      type: "Prescription",
      title: "Medication Prescription",
      date: "2024-01-05",
      doctor: "Dr. Emily Rodriguez",
      status: "active",
      description: "Prescription for blood pressure medication"
    }
  ];

  const healthHistory = [
    {
      date: "2024-01-10",
      event: "Annual Physical Exam",
      doctor: "Dr. Sarah Johnson",
      notes: "All vitals normal, recommended regular exercise"
    },
    {
      date: "2023-12-15",
      event: "Flu Vaccination",
      doctor: "Dr. Michael Chen",
      notes: "Seasonal flu vaccine administered"
    },
    {
      date: "2023-11-20",
      event: "Dental Cleaning",
      doctor: "Dr. Emily Rodriguez",
      notes: "Regular dental checkup and cleaning"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Medical Records</h1>
          <p className="text-secondary mt-1">
            View and manage your medical history and records
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <span className="material-symbols-outlined text-sm mr-2">download</span>
            Export Records
          </Button>
          <Button>
            <span className="material-symbols-outlined text-sm mr-2">share</span>
            Share Records
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <TabNavigation 
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "records", label: "Records" },
          { id: "history", label: "History" }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MedicalRecordsSummary records={medicalRecords} />
          <QuickActions />
        </div>
      )}

      {activeTab === "records" && (
        <div className="flex flex-col gap-4">
          {medicalRecords.map((record) => (
            <MedicalRecordCard key={record.id} record={record} detailed />
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <div className="flex flex-col gap-4">
          {healthHistory.map((entry, index) => (
            <HealthHistoryCard key={index} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
