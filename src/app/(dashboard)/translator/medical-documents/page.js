"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function TranslatorMedicalDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const documents = [
    {
      id: 1,
      title: "Consent Form",
      patient: "Carlos Rodriguez",
      patientId: "P005",
      language: "Spanish",
      status: "completed",
      date: "2024-01-15",
      caseId: "C001",
      doctor: "Dr. Sarah Johnson",
      fileType: "PDF",
      wordCount: 450,
      completedAt: "2024-01-15 14:30",
      priority: "high",
      estimatedTime: "2 hours",
      actualTime: "1.5 hours"
    },
    {
      id: 2,
      title: "Discharge Instructions",
      patient: "Aisha Patel",
      patientId: "P006",
      language: "Hindi",
      status: "pending",
      date: "2024-01-15",
      caseId: "C002",
      doctor: "Dr. Michael Chen",
      fileType: "DOCX",
      wordCount: 320,
      estimatedCompletion: "2024-01-15 16:00",
      priority: "medium",
      estimatedTime: "1.5 hours",
      actualTime: null
    },
    {
      id: 3,
      title: "Lab Results",
      patient: "François Dubois",
      patientId: "P007",
      language: "French",
      status: "in_progress",
      date: "2024-01-15",
      caseId: "C003",
      doctor: "Dr. Emily Rodriguez",
      fileType: "PDF",
      wordCount: 280,
      progress: 65,
      priority: "low",
      estimatedTime: "1 hour",
      actualTime: null
    },
    {
      id: 4,
      title: "Prescription Instructions",
      patient: "Maria Santos",
      patientId: "P008",
      language: "Spanish",
      status: "completed",
      date: "2024-01-14",
      caseId: "C004",
      doctor: "Dr. Lisa Martinez",
      fileType: "PDF",
      wordCount: 180,
      completedAt: "2024-01-14 11:45",
      priority: "medium",
      estimatedTime: "45 minutes",
      actualTime: "30 minutes"
    },
    {
      id: 5,
      title: "Medical History Form",
      patient: "Ahmed Hassan",
      patientId: "P009",
      language: "Arabic",
      status: "pending",
      date: "2024-01-13",
      caseId: "C005",
      doctor: "Dr. James Wilson",
      fileType: "DOCX",
      wordCount: 520,
      estimatedCompletion: "2024-01-16 10:00",
      priority: "high",
      estimatedTime: "3 hours",
      actualTime: null
    }
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
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
      pending: "badge badge-warning",
      in_progress: "badge badge-info",
      completed: "badge badge-success"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      high: "badge badge-error",
      medium: "badge badge-warning",
      low: "badge badge-info"
    };
    
    return priorityClasses[priority] || "badge badge-secondary";
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || doc.status === statusFilter;
    const matchesLanguage = !languageFilter || doc.language.toLowerCase() === languageFilter;
    
    return matchesSearch && matchesStatus && matchesLanguage;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Medical Documents</h1>
          <p className="text-secondary mt-1">
            Manage translation of medical documents and forms
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search documents..."
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

      {/* Documents List */}
      <div className="flex flex-col gap-4">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="card bg-surface p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-primary">
                    {doc.title}
                  </h3>
                  <span className={getStatusBadge(doc.status)}>
                    {doc.status.replace('_', ' ')}
                  </span>
                  <span className={getPriorityBadge(doc.priority)}>
                    {doc.priority}
                  </span>
                </div>
                <p className="text-secondary text-sm mb-2">
                  Patient: {doc.patient} ({doc.patientId}) • Dr. {doc.doctor}
                </p>
                <p className="text-secondary text-sm mb-2">
                  Language: {doc.language} • Case: {doc.caseId} • {doc.fileType} • {doc.wordCount} words
                </p>
                <p className="text-secondary text-sm">
                  Date: {new Date(doc.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-secondary">
                  Est. Time: {doc.estimatedTime}
                </p>
                {doc.actualTime && (
                  <p className="text-sm text-secondary">
                    Actual: {doc.actualTime}
                  </p>
                )}
              </div>
            </div>

            {doc.status === 'in_progress' && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-secondary">Progress:</span>
                  <span className="text-sm text-primary font-medium">{doc.progress}%</span>
                </div>
                <div className="w-full bg-surface-secondary rounded-full h-2">
                  <div 
                    className="bg-primary-color h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${doc.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {doc.status === 'completed' && (
              <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-sm text-success font-medium">
                  Completed on {new Date(doc.completedAt).toLocaleString()}
                </p>
              </div>
            )}

            {doc.status === 'pending' && (
              <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm text-warning font-medium">
                  Estimated completion: {new Date(doc.estimatedCompletion).toLocaleString()}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              {doc.status === 'pending' && (
                <Button size="sm">
                  <span className="material-symbols-outlined text-sm mr-1">
                    edit
                  </span>
                  Start Translation
                </Button>
              )}
              {doc.status === 'in_progress' && (
                <Button size="sm">
                  <span className="material-symbols-outlined text-sm mr-1">
                    edit
                  </span>
                  Continue
                </Button>
              )}
              {doc.status === 'completed' && (
                <Button variant="outline" size="sm">
                  <span className="material-symbols-outlined text-sm mr-1">
                    download
                  </span>
                  Download
                </Button>
              )}
              <Button variant="outline" size="sm">
                <span className="material-symbols-outlined text-sm mr-1">
                  visibility
                </span>
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-secondary mb-4">
            description
          </span>
          <h3 className="text-xl font-semibold text-primary mb-2">
            No documents found
          </h3>
          <p className="text-secondary">
            Try adjusting your search criteria or check back later for new documents.
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            description
          </span>
          <p className="text-sm text-secondary">Total Documents</p>
          <p className="text-2xl font-bold text-primary">{documents.length}</p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-warning text-3xl mb-2">
            pending
          </span>
          <p className="text-sm text-secondary">Pending</p>
          <p className="text-2xl font-bold text-primary">
            {documents.filter(d => d.status === 'pending').length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-info text-3xl mb-2">
            work
          </span>
          <p className="text-sm text-secondary">In Progress</p>
          <p className="text-2xl font-bold text-primary">
            {documents.filter(d => d.status === 'in_progress').length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-success text-3xl mb-2">
            check_circle
          </span>
          <p className="text-sm text-secondary">Completed</p>
          <p className="text-2xl font-bold text-primary">
            {documents.filter(d => d.status === 'completed').length}
          </p>
        </div>
      </div>
    </div>
  );
}
