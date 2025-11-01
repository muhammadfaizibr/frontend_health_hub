"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function TranslatorDashboardPage() {
  // Translator profile data aligned with backend models
  const translatorProfile = {
    firstName: "John",
    lastName: "Interpreter",
    email: "john.interpreter@healthhub.com",
    phone: "+1-555-0123",
    countryCode: "+1",
    bio: "Professional medical translator with 8+ years of experience in healthcare settings. Specialized in Spanish, French, and Hindi medical terminology.",
    isActive: true,
    timezone: "America/New_York",
    languages: ["Spanish", "French", "Hindi", "Arabic", "Mandarin"],
    certifications: [
      {
        title: "Certified Medical Interpreter (CMI)",
        issuingOrganization: "National Board of Certification for Medical Interpreters",
        issueDate: "2020-03-15",
        expirationDate: "2025-03-15"
      },
      {
        title: "Healthcare Interpreter Certificate",
        issuingOrganization: "International Medical Interpreters Association",
        issueDate: "2019-06-20",
        expirationDate: "2024-06-20"
      }
    ],
    experience: [
      {
        title: "Senior Medical Translator",
        employmentType: "Full Time",
        company: "HealthHub Medical Center",
        startDate: "2020-01-15",
        endDate: null,
        location: "New York, NY"
      },
      {
        title: "Medical Interpreter",
        employmentType: "Part Time",
        company: "City General Hospital",
        startDate: "2018-03-01",
        endDate: "2019-12-31",
        location: "New York, NY"
      }
    ]
  };

  const todaysAssignments = [
    {
      id: 1,
      patient: "Carlos Rodriguez",
      patientId: "P005",
      appointment: "Cardiologist Consultation",
      time: "10:00 AM",
      duration: "45 min",
      language: "Spanish",
      type: "In-person",
      status: "scheduled",
      doctor: "Dr. Sarah Johnson",
      doctorId: "D003",
      hospital: "New York Medical Center",
      caseId: "C001",
      reason: "Chest pain evaluation",
      isEmergency: false,
      room: "Room 205"
    },
    {
      id: 2,
      patient: "Aisha Patel",
      patientId: "P006",
      appointment: "MRI Scan Discussion",
      time: "2:00 PM",
      duration: "30 min",
      language: "Hindi",
      type: "Telehealth",
      status: "scheduled",
      doctor: "Dr. Michael Chen",
      doctorId: "D004",
      hospital: "Virtual Consultation",
      caseId: "C002",
      reason: "MRI results review",
      isEmergency: false,
      room: "Virtual Room 1"
    },
    {
      id: 3,
      patient: "François Dubois",
      patientId: "P007",
      appointment: "Pre-surgery Consultation",
      time: "3:30 PM",
      duration: "60 min",
      language: "French",
      type: "In-person",
      status: "scheduled",
      doctor: "Dr. Emily Rodriguez",
      doctorId: "D005",
      hospital: "St. Mary's Hospital",
      caseId: "C003",
      reason: "Pre-operative assessment",
      isEmergency: false,
      room: "Room 312"
    }
  ];

  const recentAssignments = [
    {
      id: 4,
      patient: "Maria Santos",
      patientId: "P008",
      appointment: "Pediatric Checkup",
      date: "2024-01-14",
      status: "completed",
      rating: 5,
      feedback: "Excellent translation service",
      language: "Spanish",
      doctor: "Dr. Lisa Martinez",
      caseId: "C004",
      duration: "30 min"
    },
    {
      id: 5,
      patient: "Ahmed Hassan",
      patientId: "P009",
      appointment: "Orthopedics Consultation",
      date: "2024-01-13",
      status: "completed",
      rating: 4,
      feedback: "Professional and accurate",
      language: "Arabic",
      doctor: "Dr. James Wilson",
      caseId: "C005",
      duration: "45 min"
    },
    {
      id: 6,
      patient: "Chen Wei",
      patientId: "P010",
      appointment: "Dermatology Visit",
      date: "2024-01-12",
      status: "completed",
      rating: 5,
      feedback: "Very helpful communication",
      language: "Mandarin",
      doctor: "Dr. Sarah Kim",
      caseId: "C006",
      duration: "25 min"
    }
  ];

  const translatedDocuments = [
    {
      id: 1,
      document: "Consent Form",
      patient: "Carlos Rodriguez",
      patientId: "P005",
      language: "Spanish",
      status: "completed",
      date: "2024-01-15",
      caseId: "C001",
      doctor: "Dr. Sarah Johnson",
      fileType: "PDF",
      wordCount: 450,
      completedAt: "2024-01-15 14:30"
    },
    {
      id: 2,
      document: "Discharge Instructions",
      patient: "Aisha Patel",
      patientId: "P006",
      language: "Hindi",
      status: "pending",
      date: "2024-01-15",
      caseId: "C002",
      doctor: "Dr. Michael Chen",
      fileType: "DOCX",
      wordCount: 320,
      estimatedCompletion: "2024-01-15 16:00"
    },
    {
      id: 3,
      document: "Lab Results",
      patient: "François Dubois",
      patientId: "P007",
      language: "French",
      status: "in_progress",
      date: "2024-01-15",
      caseId: "C003",
      doctor: "Dr. Emily Rodriguez",
      fileType: "PDF",
      wordCount: 280,
      progress: 65
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      scheduled: "badge badge-info",
      completed: "badge badge-success",
      pending: "badge badge-warning",
      in_progress: "badge badge-primary",
      cancelled: "badge badge-error"
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

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      high: "badge badge-error",
      medium: "badge badge-warning",
      low: "badge badge-info"
    };
    
    return priorityClasses[priority] || "badge badge-secondary";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Translator Dashboard
          </h1>
          <p className="text-secondary mt-1">
            Welcome back, {translatorProfile.firstName} {translatorProfile.lastName}! Here are your translation assignments and activities.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/translator/assignments">
            <Button variant="outline">
              <span className="material-symbols-outlined text-sm">assignment</span>
              View All Assignments
            </Button>
          </Link>
          <Link href="/translator/schedule">
            <Button>
              <span className="material-symbols-outlined text-sm">schedule</span>
              Manage Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* Translator Profile Summary */}
      <div className="card bg-surface p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-primary-color/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-color text-2xl">
              translate
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-primary mb-2">
              {translatorProfile.firstName} {translatorProfile.lastName}
            </h2>
            <p className="text-secondary text-sm mb-3">{translatorProfile.bio}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {translatorProfile.languages.map((language, index) => (
                <span key={index} className="badge badge-info text-xs">
                  {language}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-secondary">
              <span>Email: {translatorProfile.email}</span>
              <span>Phone: {translatorProfile.phone}</span>
              <span>Timezone: {translatorProfile.timezone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-surface p-4">
          <div className="text-center">
            <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
              assignment
            </span>
            <p className="text-sm text-secondary">Today's Assignments</p>
            <p className="text-2xl font-bold text-primary">3</p>
          </div>
        </div>
        <div className="card bg-surface p-4">
          <div className="text-center">
            <span className="material-symbols-outlined text-success text-3xl mb-2">
              check_circle
            </span>
            <p className="text-sm text-secondary">Completed This Week</p>
            <p className="text-2xl font-bold text-primary">12</p>
          </div>
        </div>
        <div className="card bg-surface p-4">
          <div className="text-center">
            <span className="material-symbols-outlined text-info text-3xl mb-2">
              language
            </span>
            <p className="text-sm text-secondary">Languages Supported</p>
            <p className="text-2xl font-bold text-primary">5</p>
          </div>
        </div>
        <div className="card bg-surface p-4">
          <div className="text-center">
            <span className="material-symbols-outlined text-warning text-3xl mb-2">
              star
            </span>
            <p className="text-sm text-secondary">Average Rating</p>
            <p className="text-2xl font-bold text-primary">4.7</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Assignments */}
        <div className="lg:col-span-2">
          <div className="card bg-surface p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">
                Today's Assignments
              </h2>
              <Link href="/translator/assignments">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {todaysAssignments.map((assignment) => (
                <div key={assignment.id} className="border border-color rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">
                        {assignment.patient} ({assignment.patientId})
                      </h3>
                      <p className="text-secondary text-sm mb-1">
                        {assignment.appointment}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-secondary mb-2">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            schedule
                          </span>
                          <span>{assignment.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            timer
                          </span>
                          <span>{assignment.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            language
                          </span>
                          <span>{assignment.language}</span>
                        </div>
                      </div>
                      <p className="text-sm text-secondary">
                        Dr. {assignment.doctor} • {assignment.hospital}
                      </p>
                      <p className="text-xs text-secondary mb-2">
                        Reason: {assignment.reason} • Case: {assignment.caseId}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-secondary italic">
                          {assignment.type}
                        </span>
                        <span className="text-xs text-secondary">
                          Room: {assignment.room}
                        </span>
                        {assignment.isEmergency && (
                          <span className="badge badge-error text-xs">Emergency</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={getStatusBadge(assignment.status)}>
                        {assignment.status}
                      </span>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm">
                          <span className="material-symbols-outlined text-sm">
                            meeting_room
                          </span>
                          Join
                        </Button>
                        <Button variant="outline" size="sm">
                          <span className="material-symbols-outlined text-sm">
                            info
                          </span>
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Translations */}
          <div className="card bg-surface p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">
                Document Translations
              </h2>
              <Link href="/translator/medical-documents">
                <Button variant="outline" size=" sm">View All</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {translatedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium text-primary">{doc.document}</h4>
                    <p className="text-sm text-secondary">
                      {doc.patient} ({doc.patientId}) • {doc.language} • {doc.date}
                    </p>
                    <p className="text-xs text-secondary">
                      Case: {doc.caseId} • Dr. {doc.doctor} • {doc.fileType} • {doc.wordCount} words
                    </p>
                    {doc.status === 'in_progress' && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-secondary">Progress:</span>
                          <div className="flex-1 bg-surface-secondary rounded-full h-2">
                            <div 
                              className="bg-primary-color h-2 rounded-full" 
                              style={{ width: `${doc.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-secondary">{doc.progress}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={getStatusBadge(doc.status)}>
                      {doc.status.replace('_', ' ')}
                    </span>
                    {doc.status === 'pending' && (
                      <Button size="sm">
                        <span className="material-symbols-outlined text-sm">
                          edit
                        </span>
                        Start
                      </Button>
                    )}
                    {doc.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <span className="material-symbols-outlined text-sm">
                          download
                        </span>
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Recent Activity */}
        <div className="flex flex-col gap-6">
          {/* Recent Assignments */}
          <div className="card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Recent Assignments
            </h2>
            <div className="flex flex-col gap-3">
              {recentAssignments.map((assignment) => (
                <div key={assignment.id} className="border-b border-color pb-3 last:border-b-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-primary">{assignment.patient}</h4>
                    <div className="flex">
                      {getRatingStars(assignment.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-secondary mb-1">
                    {assignment.appointment}
                  </p>
                  <p className="text-xs text-tertiary mb-1">
                    {assignment.date} • {assignment.language} • {assignment.duration}
                  </p>
                  <p className="text-xs text-secondary mb-1">
                    Dr. {assignment.doctor} • Case: {assignment.caseId}
                  </p>
                  {assignment.feedback && (
                    <p className="text-xs text-secondary italic">
                      &quot;{assignment.feedback}&quot;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/translator/assignments"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
              >
               /<span className="material-symbols-outlined text-primary-color">
                  assignment
                </span>
                <span>View Assignments</span>
              </Link>
              <Link
                href="/translator/schedule"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-primary-color">
                  schedule
                </span>
                <span>Update Schedule</span>
              </Link>
              <Link
                href="/translator/languages"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-primary-color">
                  language
                </span>
                <span>Manage Languages</span>
              </Link>
              <Link
                href="/translator/certifications"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-primary-color">
                  verified_user
                </span>
                <span>Update Certifications</span>
              </Link>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Performance This Month
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary text-sm">Assignments Completed</span>
                <span className="font-medium text-primary">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary text-sm">Average Rating</span>
                <span className="font-medium text-warning">4.7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary text-sm">Response Time</span>
                <span className="font-medium text-success">2.3 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary text-sm">No-Show Rate</span>
                <span className="font-medium text-error">3.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}