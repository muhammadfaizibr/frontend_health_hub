"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function OrganizationPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");

  const patients = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      age: 45,
      gender: "Male",
      status: "active",
      assignedDoctor: "Dr. Sarah Johnson",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-20",
      medicalHistory: ["Hypertension", "Diabetes Type 2"],
      emergencyContact: "Jane Smith",
      emergencyPhone: "(555) 123-4568"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "(555) 234-5678",
      age: 38,
      gender: "Female",
      status: "active",
      assignedDoctor: "Dr. Michael Chen",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-01-25",
      medicalHistory: ["Allergies", "Asthma"],
      emergencyContact: "Carlos Garcia",
      emergencyPhone: "(555) 234-5679"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@email.com",
      phone: "(555) 345-6789",
      age: 52,
      gender: "Male",
      status: "inactive",
      assignedDoctor: "Dr. Sarah Johnson",
      lastVisit: "2023-12-15",
      nextAppointment: null,
      medicalHistory: ["High Cholesterol"],
      emergencyContact: "Linda Johnson",
      emergencyPhone: "(555) 345-6790"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "(555) 456-7890",
      age: 29,
      gender: "Female",
      status: "active",
      assignedDoctor: "Dr. Emily Davis",
      lastVisit: "2024-01-14",
      nextAppointment: "2024-01-22",
      medicalHistory: ["Pregnancy"],
      emergencyContact: "Mike Wilson",
      emergencyPhone: "(555) 456-7891"
    }
  ];

  const doctors = [
    { value: "all", label: "All Doctors" },
    { value: "Dr. Sarah Johnson", label: "Dr. Sarah Johnson" },
    { value: "Dr. Michael Chen", label: "Dr. Michael Chen" },
    { value: "Dr. Emily Davis", label: "Dr. Emily Davis" }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "badge badge-success",
      inactive: "badge badge-error",
      pending: "badge badge-warning"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    const matchesDoctor = doctorFilter === "all" || patient.assignedDoctor === doctorFilter;
    
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const PatientCard = ({ patient }) => (
    <div className="card bg-surface p-4 md:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-color/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-color">
              person
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary mb-1">
              {patient.name}
            </h3>
            <p className="text-secondary text-sm mb-2">
              {patient.age} years old • {patient.gender}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-secondary text-sm mb-1">
                  <span className="material-symbols-outlined text-xs inline mr-1">
                    email
                  </span>
                  {patient.email}
                </p>
                <p className="text-secondary text-sm mb-1">
                  <span className="material-symbols-outlined text-xs inline mr-1">
                    phone
                  </span>
                  {patient.phone}
                </p>
                <p className="text-secondary text-sm mb-1">
                  <span className="material-symbols-outlined text-xs inline mr-1">
                    medical_services
                  </span>
                  {patient.assignedDoctor}
                </p>
              </div>
              
              <div>
                <p className="text-secondary text-sm mb-1">
                  <span className="material-symbols-outlined text-xs inline mr-1">
                    calendar_today
                  </span>
                  Last Visit: {patient.lastVisit}
                </p>
                {patient.nextAppointment && (
                  <p className="text-secondary text-sm mb-1">
                    <span className="material-symbols-outlined text-xs inline mr-1">
                      schedule
                    </span>
                    Next: {patient.nextAppointment}
                  </p>
                )}
                <p className="text-secondary text-sm mb-1">
                  <span className="material-symbols-outlined text-xs inline mr-1">
                    emergency
                  </span>
                  {patient.emergencyContact} - {patient.emergencyPhone}
                </p>
              </div>
            </div>
            
            {patient.medicalHistory.length > 0 && (
              <div className="mb-3">
                <p className="text-secondary text-sm mb-1">Medical History:</p>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalHistory.map((condition, index) => (
                    <span key={index} className="badge badge-outline text-xs">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={getStatusBadge(patient.status)}>
            {patient.status}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 pt-4 border-t border-color">
        <Button size="sm">
          <span className="material-symbols-outlined text-sm">
            visibility
          </span>
          View Profile
        </Button>
        <Button variant="outline" size="sm">
          <span className="material-symbols-outlined text-sm">
            calendar_today
          </span>
          Schedule Appointment
        </Button>
        <Button variant="outline" size="sm">
          <span className="material-symbols-outlined text-sm">
            medical_services
          </span>
          Medical Records
        </Button>
        <Button variant="outline" size="sm">
          <span className="material-symbols-outlined text-sm">
            message
          </span>
          Message
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Patient Management</h1>
          <p className="text-secondary mt-1">
            Manage your organization's patients
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <span className="material-symbols-outlined text-sm">download</span>
            Export List
          </Button>
          <Button>
            <span className="material-symbols-outlined text-sm">person_add</span>
            Add Patient
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
          
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "pending", label: "Pending" }
            ]}
            placeholder="Filter by status"
          />
          
          <Select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            options={doctors}
            placeholder="Filter by doctor"
          />
          
          <Button fullWidth>
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Patients List */}
      <div className="flex flex-col gap-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-secondary mb-4">
              person
            </span>
            <h3 className="text-xl font-semibold text-primary mb-2">
              No patients found
            </h3>
            <p className="text-secondary">
              No patients match your current search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="card bg-surface p-3 md:p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            person
          </span>
          <p className="text-sm text-secondary">Total Patients</p>
          <p className="text-2xl font-bold text-primary">{patients.length}</p>
        </div>
        <div className="card bg-surface p-3 md:p-4 text-center">
          <span className="material-symbols-outlined text-success text-3xl mb-2">
            check_circle
          </span>
          <p className="text-sm text-secondary">Active</p>
          <p className="text-2xl font-bold text-primary">
            {patients.filter(p => p.status === "active").length}
          </p>
        </div>
        <div className="card bg-surface p-3 md:p-4 text-center">
          <span className="material-symbols-outlined text-info text-3xl mb-2">
            calendar_today
          </span>
          <p className="text-sm text-secondary">With Appointments</p>
          <p className="text-2xl font-bold text-primary">
            {patients.filter(p => p.nextAppointment).length}
          </p>
        </div>
        <div className="card bg-surface p-3 md:p-4 text-center">
          <span className="material-symbols-outlined text-warning text-3xl mb-2">
            medical_services
          </span>
          <p className="text-sm text-secondary">With Medical History</p>
          <p className="text-2xl font-bold text-primary">
            {patients.filter(p => p.medicalHistory.length > 0).length}
          </p>
        </div>
      </div>
    </div>
  );
}
