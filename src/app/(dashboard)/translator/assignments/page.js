import React from "react";
import { AssignmentFilters } from "@/components/features/translator/AssignmentFilters";
import { AssignmentList } from "@/components/features/translator/AssignmentList";

export default function TranslatorAssignmentsPage() {
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

      <AssignmentFilters 
        onFilterChange={(filters) => console.log("Filters changed:", filters)}
      />

      <AssignmentList 
        assignments={assignments}
        filters={{ searchTerm: "", statusFilter: "", languageFilter: "" }}
      />
    </div>
  );
}
