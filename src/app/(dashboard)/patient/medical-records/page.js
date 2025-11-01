// /patient/medical-records/page.js
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

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

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: "badge badge-success",
      active: "badge badge-primary",
      pending: "badge badge-warning",
      cancelled: "badge badge-error"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const getTypeIcon = (type) => {
    const icons = {
      "Lab Results": "science",
      "Imaging": "photo_camera",
      "Prescription": "medication",
      "Vaccination": "vaccines",
      "Procedure": "medical_services"
    };
    
    return icons[type] || "description";
  };

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
            <span className="material-symbols-outlined text-sm">download</span>
            Export Records
          </Button>
          <Button>
            <span className="material-symbols-outlined text-sm">share</span>
            Share Records
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-color">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "records"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            All Records
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "history"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Health History
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card bg-surface p-4 text-center">
                <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
                  science
                </span>
                <p className="text-sm text-secondary">Lab Results</p>
                <p className="text-2xl font-bold text-primary">12</p>
              </div>
              <div className="card bg-surface p-4 text-center">
                <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
                  photo_camera
                </span>
                <p className="text-sm text-secondary">Imaging</p>
                <p className="text-2xl font-bold text-primary">5</p>
              </div>
              <div className="card bg-surface p-4 text-center">
                <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
                  medication
                </span>
                <p className="text-sm text-secondary">Prescriptions</p>
                <p className="text-2xl font-bold text-primary">8</p>
              </div>
            </div>

            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Recent Records</h2>
              <div className="flex flex-col gap-4">
                {medicalRecords.slice(0, 3).map((record) => (
                  <div key={record.id} className="flex items-center gap-4 p-3 border border-color rounded-lg">
                    <span className="material-symbols-outlined text-primary-color">
                      {getTypeIcon(record.type)}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{record.title}</h3>
                      <p className="text-sm text-secondary">{record.description}</p>
                      <p className="text-xs text-tertiary">{record.date} • {record.doctor}</p>
                    </div>
                    <span className={getStatusBadge(record.status)}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-6">
            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <Button fullWidth variant="outline">
                  <span className="material-symbols-outlined text-sm">upload</span>
                  Upload Document
                </Button>
                <Button fullWidth variant="outline">
                  <span className="material-symbols-outlined text-sm">print</span>
                  Print Summary
                </Button>
                <Button fullWidth variant="outline">
                  <span className="material-symbols-outlined text-sm">share</span>
                  Share with Doctor
                </Button>
              </div>
            </div>

            <div className="card bg-surface p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Health Summary</h2>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-secondary">Blood Type</span>
                  <span className="font-semibold text-primary">O+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Allergies</span>
                  <span className="font-semibold text-primary">None Known</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Last Physical</span>
                  <span className="font-semibold text-primary">Jan 10, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Emergency Contact</span>
                  <span className="font-semibold text-primary">John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "records" && (
        <div className="flex flex-col gap-4">
          {medicalRecords.map((record) => (
            <div key={record.id} className="card bg-surface p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-color text-2xl">
                    {getTypeIcon(record.type)}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{record.title}</h3>
                    <p className="text-secondary mb-2">{record.description}</p>
                    <div className="flex items-center gap-4 text-sm text-secondary">
                      <span>{record.date}</span>
                      <span>•</span>
                      <span>{record.doctor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={getStatusBadge(record.status)}>
                    {record.status}
                  </span>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <div className="flex flex-col gap-4">
          {healthHistory.map((entry, index) => (
            <div key={index} className="card bg-surface p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-color/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary-color">
                    medical_services
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary">{entry.event}</h3>
                  <p className="text-secondary mb-2">{entry.notes}</p>
                  <div className="flex items-center gap-4 text-sm text-secondary">
                    <span>{entry.date}</span>
                    <span>•</span>
                    <span>{entry.doctor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
