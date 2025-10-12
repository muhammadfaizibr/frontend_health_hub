"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function PatientPrescriptionsPage() {
  const [activeTab, setActiveTab] = useState("active");

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      doctor: "Dr. Sarah Johnson",
      prescribedDate: "2024-01-05",
      status: "active",
      refills: 3,
      nextRefill: "2024-02-05",
      instructions: "Take with food, preferably in the morning"
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      doctor: "Dr. Michael Chen",
      prescribedDate: "2024-01-03",
      status: "active",
      refills: 2,
      nextRefill: "2024-02-03",
      instructions: "Take with meals to reduce stomach upset"
    },
    {
      id: 3,
      medication: "Ibuprofen",
      dosage: "200mg",
      frequency: "As needed",
      doctor: "Dr. Emily Rodriguez",
      prescribedDate: "2023-12-20",
      status: "completed",
      refills: 0,
      nextRefill: null,
      instructions: "Take for pain relief, maximum 3 times per day"
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "badge badge-success",
      completed: "badge badge-info",
      expired: "badge badge-error",
      pending: "badge badge-warning"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const handleRefillRequest = (prescriptionId) => {
    alert(`Refill requested for prescription ${prescriptionId}`);
  };

  const PrescriptionCard = ({ prescription }) => (
    <div className="card bg-surface p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-primary">
              {prescription.medication}
            </h3>
            <span className={getStatusBadge(prescription.status)}>
              {prescription.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-secondary">Dosage</p>
              <p className="font-semibold text-primary">{prescription.dosage}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Frequency</p>
              <p className="font-semibold text-primary">{prescription.frequency}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Prescribed by</p>
              <p className="font-semibold text-primary">{prescription.doctor}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Prescribed Date</p>
              <p className="font-semibold text-primary">{prescription.prescribedDate}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-secondary mb-1">Instructions</p>
            <p className="text-primary">{prescription.instructions}</p>
          </div>
          
          {prescription.status === "active" && (
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-secondary">Refills remaining: </span>
                <span className="font-semibold text-primary">{prescription.refills}</span>
              </div>
              <div>
                <span className="text-secondary">Next refill: </span>
                <span className="font-semibold text-primary">{prescription.nextRefill}</span>
              </div>
            </div>
          )}
        </div>
        
        {prescription.status === "active" && prescription.refills > 0 && (
          <div className="ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRefillRequest(prescription.id)}
            >
              Request Refill
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Prescriptions</h1>
          <p className="text-secondary mt-1">
            Manage your medications and prescription refills
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <span className="material-symbols-outlined text-sm mr-2">add</span>
            Add Medication
          </Button>
          <Button>
            <span className="material-symbols-outlined text-sm mr-2">local_pharmacy</span>
            Find Pharmacy
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-color">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("active")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "active"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Active Prescriptions
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "all"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            All Prescriptions
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {activeTab === "active" ? (
          prescriptions.filter(p => p.status === "active").length > 0 ? (
            prescriptions
              .filter(p => p.status === "active")
              .map((prescription) => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))
          ) : (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-secondary mb-4">
                medication
              </span>
              <h3 className="text-xl font-semibold text-primary mb-2">
                No active prescriptions
              </h3>
              <p className="text-secondary">
                You don&apos;t have any active prescriptions at the moment.
              </p>
            </div>
          )
        ) : (
          prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <PrescriptionCard key={prescription.id} prescription={prescription} />
            ))
          ) : (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-secondary mb-4">
                medication
              </span>
              <h3 className="text-xl font-semibold text-primary mb-2">
                No prescriptions found
              </h3>
              <p className="text-secondary">
                You haven&apos;t been prescribed any medications yet.
              </p>
            </div>
          )
        )}
      </div>

      {/* Medication Reminders */}
      <div className="card bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Medication Reminders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 border border-color rounded-lg">
            <span className="material-symbols-outlined text-primary-color">
              schedule
            </span>
            <div>
              <p className="font-semibold text-primary">Morning Medications</p>
              <p className="text-sm text-secondary">Lisinopril 10mg - 8:00 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-color rounded-lg">
            <span className="material-symbols-outlined text-primary-color">
              schedule
            </span>
            <div>
              <p className="font-semibold text-primary">Evening Medications</p>
              <p className="text-sm text-secondary">Metformin 500mg - 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
