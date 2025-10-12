"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function TranslatorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const patients = [
    {
      id: "P005",
      name: "Carlos Rodriguez",
      age: 45,
      gender: "Male",
      language: "Spanish",
      lastAppointment: "2024-01-15",
      nextAppointment: "2024-01-22",
      status: "active",
      totalAppointments: 8,
      lastRating: 5,
      emergencyContact: "Maria Rodriguez",
      emergencyPhone: "+1-555-0123",
      medicalHistory: ["Hypertension", "Diabetes"],
      currentMedications: ["Metformin", "Lisinopril"]
    },
    {
      id: "P006",
      name: "Aisha Patel",
      age: 32,
      gender: "Female",
      language: "Hindi",
      lastAppointment: "2024-01-15",
      nextAppointment: "2024-01-25",
      status: "active",
      totalAppointments: 5,
      lastRating: 4,
      emergencyContact: "Raj Patel",
      emergencyPhone: "+1-555-0124",
      medicalHistory: ["Migraine"],
      currentMedications: ["Sumatriptan"]
    },
    {
      id: "P007",
      name: "François Dubois",
      age: 58,
      gender: "Male",
      language: "French",
      lastAppointment: "2024-01-15",
      nextAppointment: "2024-01-20",
      status: "active",
      totalAppointments: 12,
      lastRating: 5,
      emergencyContact: "Marie Dubois",
      emergencyPhone: "+1-555-0125",
      medicalHistory: ["Heart Disease", "High Cholesterol"],
      currentMedications: ["Atorvastatin", "Aspirin"]
    },
    {
      id: "P008",
      name: "Maria Santos",
      age: 28,
      gender: "Female",
      language: "Spanish",
      lastAppointment: "2024-01-14",
      nextAppointment: "2024-01-28",
      status: "active",
      totalAppointments: 3,
      lastRating: 5,
      emergencyContact: "Jose Santos",
      emergencyPhone: "+1-555-0126",
      medicalHistory: ["Pregnancy"],
      currentMedications: ["Prenatal Vitamins"]
    },
    {
      id: "P009",
      name: "Ahmed Hassan",
      age: 41,
      gender: "Male",
      language: "Arabic",
      lastAppointment: "2024-01-13",
      nextAppointment: "2024-01-30",
      status: "active",
      totalAppointments: 6,
      lastRating: 4,
      emergencyContact: "Fatima Hassan",
      emergencyPhone: "+1-555-0127",
      medicalHistory: ["Knee Injury"],
      currentMedications: ["Ibuprofen"]
    }
  ];

  const languageOptions = [
    { value: "", label: "All Languages" },
    { value: "spanish", label: "Spanish" },
    { value: "hindi", label: "Hindi" },
    { value: "french", label: "French" },
    { value: "arabic", label: "Arabic" },
    { value: "mandarin", label: "Mandarin" }
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "badge badge-success",
      inactive: "badge badge-secondary"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`material-symbols-outlined text-sm ${
          i < rating ? 'text-warning' : 'text-secondary'
        }`}
      >
        star
      </span>
    ));
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = !languageFilter || patient.language.toLowerCase() === languageFilter;
    const matchesStatus = !statusFilter || patient.status === statusFilter;
    
    return matchesSearch && matchesLanguage && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Patient Management</h1>
          <p className="text-secondary mt-1">
            Manage your translation patients and their information
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
          <Select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            options={languageOptions}
            placeholder="Filter by language"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            placeholder="Filter by status"
          />
        </div>
      </div>

      {/* Patients List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="card bg-surface p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-primary-color/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-color text-2xl">
                  person
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-primary">
                    {patient.name}
                  </h3>
                  <span className={getStatusBadge(patient.status)}>
                    {patient.status}
                  </span>
                </div>
                <p className="text-sm text-secondary mb-1">
                  ID: {patient.id} • {patient.age} years old • {patient.gender}
                </p>
                <p className="text-sm text-secondary mb-2">
                  Language: {patient.language}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {getRatingStars(patient.lastRating)}
                  <span className="text-xs text-secondary ml-1">
                    ({patient.totalAppointments} appointments)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-secondary">Last Appointment:</p>
                  <p className="text-primary font-medium">
                    {new Date(patient.lastAppointment).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-secondary">Next Appointment:</p>
                  <p className="text-primary font-medium">
                    {new Date(patient.nextAppointment).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-secondary">Emergency Contact:</p>
                <p className="text-primary font-medium">
                  {patient.emergencyContact} - {patient.emergencyPhone}
                </p>
              </div>

              {patient.medicalHistory.length > 0 && (
                <div className="text-sm">
                  <p className="text-secondary mb-1">Medical History:</p>
                  <div className="flex flex-wrap gap-1">
                    {patient.medicalHistory.map((condition, index) => (
                      <span key={index} className="badge badge-info text-xs">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {patient.currentMedications.length > 0 && (
                <div className="text-sm">
                  <p className="text-secondary mb-1">Current Medications:</p>
                  <div className="flex flex-wrap gap-1">
                    {patient.currentMedications.map((medication, index) => (
                      <span key={index} className="badge badge-warning text-xs">
                        {medication}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm">
                <span className="material-symbols-outlined text-sm mr-1">
                  visibility
                </span>
                View Details
              </Button>
              <Button size="sm">
                <span className="material-symbols-outlined text-sm mr-1">
                  message
                </span>
                Contact
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-secondary mb-4">
            people
          </span>
          <h3 className="text-xl font-semibold text-primary mb-2">
            No patients found
          </h3>
          <p className="text-secondary">
            Try adjusting your search criteria or check back later for new patients.
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            people
          </span>
          <p className="text-sm text-secondary">Total Patients</p>
          <p className="text-2xl font-bold text-primary">{patients.length}</p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-success text-3xl mb-2">
            check_circle
          </span>
          <p className="text-sm text-secondary">Active Patients</p>
          <p className="text-2xl font-bold text-primary">
            {patients.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-info text-3xl mb-2">
            language
          </span>
          <p className="text-sm text-secondary">Languages</p>
          <p className="text-2xl font-bold text-primary">
            {new Set(patients.map(p => p.language)).size}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-warning text-3xl mb-2">
            star
          </span>
          <p className="text-sm text-secondary">Avg Rating</p>
          <p className="text-2xl font-bold text-primary">
            {(patients.reduce((sum, p) => sum + p.lastRating, 0) / patients.length).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
