import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PatientDashboardPage() {
  const patientProfile = {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    age: 45,
    gender: "Male",
    emergencyContact: "Jane Smith",
    emergencyPhone: "(555) 123-4568",
    medicalHistory: ["Hypertension", "Diabetes Type 2"],
    currentMedications: ["Lisinopril 10mg", "Metformin 500mg"],
    allergies: ["Penicillin", "Shellfish"]
  };

  const upcomingAppointments = [
    {
      id: 1,
      caseId: "CASE-001",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Follow-up",
      status: "Confirmed",
      reason: "Blood pressure monitoring",
      isTranslatorRequired: false,
      translator: null,
      location: "123 Medical Center Dr, New York, NY"
    },
    {
      id: 2,
      caseId: "CASE-002",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-18",
      time: "2:30 PM",
      type: "New Patient",
      status: "Confirmed",
      reason: "Skin consultation",
      isTranslatorRequired: true,
      translator: "Maria Rodriguez",
      location: "Video Call"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "appointment",
      title: "Appointment with Dr. Sarah Johnson completed",
      date: "2024-01-10",
      status: "completed",
      caseId: "CASE-001"
    },
    {
      id: 2,
      type: "prescription",
      title: "Prescription refill approved - Lisinopril",
      date: "2024-01-08",
      status: "completed",
      prescriptionId: "RX-001"
    },
    {
      id: 3,
      type: "record",
      title: "Lab results uploaded - Blood work",
      date: "2024-01-05",
      status: "completed",
      reportId: "RPT-001"
    },
    {
      id: 4,
      type: "case",
      title: "New case created - Hypertension management",
      date: "2024-01-03",
      status: "completed",
      caseId: "CASE-001"
    }
  ];

  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", status: "normal", trend: "stable" },
    { label: "Heart Rate", value: "72 bpm", status: "normal", trend: "stable" },
    { label: "Weight", value: "70 kg", status: "stable", trend: "decreasing" },
    { label: "Blood Sugar", value: "95 mg/dL", status: "normal", trend: "stable" }
  ];

  const activeCases = [
    {
      id: "CASE-001",
      title: "Hypertension Management",
      doctor: "Dr. Sarah Johnson",
      status: "In Progress",
      createdDate: "2024-01-03",
      lastUpdate: "2024-01-10",
      description: "Managing high blood pressure with medication and lifestyle changes"
    },
    {
      id: "CASE-002",
      title: "Skin Condition Consultation",
      doctor: "Dr. Michael Chen",
      status: "Open",
      createdDate: "2024-01-15",
      lastUpdate: "2024-01-15",
      description: "Initial consultation for skin condition evaluation"
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      "Confirmed": "badge badge-success",
      "Pending": "badge badge-warning",
      "Completed": "badge badge-info",
      "Cancelled": "badge badge-error",
      "In Progress": "badge badge-primary",
      "Open": "badge badge-info"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "increasing":
        return <span className="text-error text-xs">↗</span>;
      case "decreasing":
        return <span className="text-success text-xs">↘</span>;
      case "stable":
        return <span className="text-secondary text-xs">→</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Welcome back, {patientProfile.firstName}!
          </h1>
          <p className="text-secondary mt-1">
            Here&apos;s your health overview and upcoming appointments.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/patient/emergency">
            <Button variant="outline" className="text-error border-error hover:bg-error hover:text-inverse">
              <span className="material-symbols-outlined text-sm mr-2">emergency</span>
              Emergency
            </Button>
          </Link>
          <Link href="/patient/find-doctor">
            <Button>
              <span className="material-symbols-outlined text-sm mr-2">add</span>
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="card bg-surface p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">
                Upcoming Appointments
              </h2>
              <Link href="/patient/appointments">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-color rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">
                        {appointment.doctor}
                      </h3>
                      <p className="text-secondary text-sm">
                        {appointment.specialty}
                      </p>
                      <p className="text-secondary text-sm">
                        {appointment.date} at {appointment.time}
                      </p>
                      <p className="text-secondary text-sm">
                        Reason: {appointment.reason}
                      </p>
                      {appointment.isTranslatorRequired && appointment.translator && (
                        <p className="text-info text-sm">
                          <span className="material-symbols-outlined text-xs inline mr-1">
                            translate
                          </span>
                          Translator: {appointment.translator}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="badge badge-primary">
                        {appointment.type}
                      </span>
                      <p className="text-xs text-secondary mt-1">
                        {appointment.status}
                      </p>
                      <p className="text-xs text-secondary">
                        {appointment.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="flex flex-col gap-6">
          {/* Active Cases */}
          <div className="card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Active Cases
            </h2>
            <div className="flex flex-col gap-3">
              {activeCases.map((caseItem) => (
                <div key={caseItem.id} className="border border-color rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-primary text-sm">
                      {caseItem.title}
                    </h3>
                    <span className={getStatusBadge(caseItem.status)}>
                      {caseItem.status}
                    </span>
                  </div>
                  <p className="text-secondary text-xs mb-2">
                    {caseItem.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-secondary">
                    <span>Dr. {caseItem.doctor.split(' ')[2]}</span>
                    <span>Updated: {caseItem.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
      {/* Current Medications */}
      {patientProfile.currentMedications.length > 0 && (
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Current Medications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientProfile.currentMedications.map((medication, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                <span className="material-symbols-outlined text-primary-color">
                  medication
                </span>
                <span className="text-primary font-medium">{medication}</span>
              </div>
            ))}
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
