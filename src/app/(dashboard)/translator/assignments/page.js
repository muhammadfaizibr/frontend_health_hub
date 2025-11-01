"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function TranslatorAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const assignments = [
    {
      id: 1,
      patient: "Carlos Rodriguez",
      patientId: "P005",
      appointment: "Cardiologist Consultation",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "45 min",
      language: "Spanish",
      type: "In-person",
      status: "scheduled",
      doctor: "Dr. Sarah Johnson",
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
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "30 min",
      language: "Hindi",
      type: "Telehealth",
      status: "scheduled",
      doctor: "Dr. Michael Chen",
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
      date: "2024-01-15",
      time: "3:30 PM",
      duration: "60 min",
      language: "French",
      type: "In-person",
      status: "scheduled",
      doctor: "Dr. Emily Rodriguez",
      hospital: "St. Mary's Hospital",
      caseId: "C003",
      reason: "Pre-operative assessment",
      isEmergency: false,
      room: "Room 312"
    },
    {
      id: 4,
      patient: "Maria Santos",
      patientId: "P008",
      appointment: "Pediatric Checkup",
      date: "2024-01-14",
      time: "9:00 AM",
      duration: "30 min",
      language: "Spanish",
      type: "In-person",
      status: "completed",
      doctor: "Dr. Lisa Martinez",
      hospital: "Children's Hospital",
      caseId: "C004",
      reason: "Routine checkup",
      isEmergency: false,
      room: "Room 101",
      rating: 5,
      feedback: "Excellent translation service"
    },
    {
      id: 5,
      patient: "Ahmed Hassan",
      patientId: "P009",
      appointment: "Orthopedics Consultation",
      date: "2024-01-13",
      time: "11:00 AM",
      duration: "45 min",
      language: "Arabic",
      type: "In-person",
      status: "completed",
      doctor: "Dr. James Wilson",
      hospital: "City General Hospital",
      caseId: "C005",
      reason: "Knee pain evaluation",
      isEmergency: false,
      room: "Room 203",
      rating: 4,
      feedback: "Professional and accurate"
    }
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "scheduled", label: "Scheduled" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const languageOptions = [
    { value: "", label: "All Languages" },
    { value: "spanish", label: "Spanish" },
    { value: "hindi", label: "Hindi" },
    { value: "french", label: "French" },
    { value: "arabic", label: "Arabic" },
    { value: "mandarin", label: "Mandarin" }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      scheduled: "badge badge-info",
      completed: "badge badge-success",
      cancelled: "badge badge-error"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.appointment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || assignment.status === statusFilter;
    const matchesLanguage = !languageFilter || assignment.language.toLowerCase() === languageFilter;
    
    return matchesSearch && matchesStatus && matchesLanguage;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Translation Assignments</h1>
          <p className="text-secondary mt-1">
            Manage your translation assignments and track your progress
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            placeholder="Filter by status"
          />
          <Select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            options={languageOptions}
            placeholder="Filter by language"
          />
        </div>
      </div>

      {/* Assignments List */}
      <div className="flex flex-col gap-4">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="card bg-surface p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {assignment.patient} ({assignment.patientId})
                </h3>
                <p className="text-secondary text-lg mb-2">
                  {assignment.appointment}
                </p>
                <div className="flex items-center gap-4 text-sm text-secondary mb-2">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    <span>{assignment.date} at {assignment.time}</span>
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
                <p className="text-sm text-secondary mb-2">
                  Dr. {assignment.doctor} • {assignment.hospital}
                </p>
                <p className="text-xs text-secondary mb-2">
                  Reason: {assignment.reason} • Case: {assignment.caseId}
                </p>
                <div className="flex items-center gap-2">
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
                {assignment.rating && (
                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`material-symbols-outlined text-sm ${
                          i < assignment.rating ? 'text-warning' : 'text-secondary'
                        }`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              {assignment.status === 'scheduled' && (
                <>
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
                </>
              )}
              {assignment.status === 'completed' && (
                <Button variant="outline" size="sm">
                  <span className="material-symbols-outlined text-sm">
                    visibility
                  </span>
                  View Details
                </Button>
              )}
            </div>
            
            {assignment.feedback && (
              <div className="mt-4 p-3 bg-surface-secondary rounded-lg">
                <p className="text-sm text-secondary italic">
                  &quot;{assignment.feedback}&quot;
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-secondary mb-4">
            assignment
          </span>
          <h3 className="text-xl font-semibold text-primary mb-2">
            No assignments found
          </h3>
          <p className="text-secondary">
            Try adjusting your search criteria or check back later for new assignments.
          </p>
        </div>
      )}
    </div>
  );
}
