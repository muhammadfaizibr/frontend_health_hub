"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";

export default function OrganizationStaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const staffMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Doctor",
      specialty: "Cardiology",
      email: "sarah.johnson@healthorg.com",
      phone: "(555) 123-4567",
      status: "active",
      joinDate: "2023-01-15",
      lastActive: "2024-01-15",
      avatar: null
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Doctor",
      specialty: "Dermatology",
      email: "michael.chen@healthorg.com",
      phone: "(555) 234-5678",
      status: "active",
      joinDate: "2023-03-20",
      lastActive: "2024-01-14",
      avatar: null
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Translator",
      languages: ["Spanish", "English"],
      email: "maria.rodriguez@healthorg.com",
      phone: "(555) 345-6789",
      status: "active",
      joinDate: "2023-02-10",
      lastActive: "2024-01-15",
      avatar: null
    },
    {
      id: 4,
      name: "John Smith",
      role: "Admin",
      department: "Administration",
      email: "john.smith@healthorg.com",
      phone: "(555) 456-7890",
      status: "active",
      joinDate: "2022-11-05",
      lastActive: "2024-01-15",
      avatar: null
    },
    {
      id: 5,
      name: "Dr. Emily Davis",
      role: "Doctor",
      specialty: "Pediatrics",
      email: "emily.davis@healthorg.com",
      phone: "(555) 567-8901",
      status: "inactive",
      joinDate: "2023-06-01",
      lastActive: "2023-12-20",
      avatar: null
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "badge badge-success",
      inactive: "badge badge-error",
      pending: "badge badge-warning"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const getRoleIcon = (role) => {
    const icons = {
      Doctor: "medical_services",
      Translator: "translate",
      Admin: "admin_panel_settings",
      Nurse: "local_hospital"
    };
    return icons[role] || "person";
  };

  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const StaffCard = ({ member }) => (
    <div className="card bg-surface p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-color/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-color">
              {getRoleIcon(member.role)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary mb-1">
              {member.name}
            </h3>
            <p className="text-secondary text-sm mb-2">{member.role}</p>
            
            {member.specialty && (
              <p className="text-secondary text-sm mb-1">
                <span className="material-symbols-outlined text-xs inline mr-1">
                  medical_services
                </span>
                {member.specialty}
              </p>
            )}
            
            {member.languages && (
              <p className="text-secondary text-sm mb-1">
                <span className="material-symbols-outlined text-xs inline mr-1">
                  translate
                </span>
                {member.languages.join(", ")}
              </p>
            )}
            
            {member.department && (
              <p className="text-secondary text-sm mb-1">
                <span className="material-symbols-outlined text-xs inline mr-1">
                  business
                </span>
                {member.department}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-secondary mt-2">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">
                  email
                </span>
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">
                  phone
                </span>
                <span>{member.phone}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-secondary mt-2">
              <span>Joined: {member.joinDate}</span>
              <span>Last Active: {member.lastActive}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={getStatusBadge(member.status)}>
            {member.status}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 pt-4 border-t border-color">
        <Button size="sm">
          <span className="material-symbols-outlined text-sm mr-1">
            edit
          </span>
          Edit
        </Button>
        <Button variant="outline" size="sm">
          <span className="material-symbols-outlined text-sm mr-1">
            visibility
          </span>
          View Details
        </Button>
        <Button variant="outline" size="sm">
          <span className="material-symbols-outlined text-sm mr-1">
            message
          </span>
          Message
        </Button>
        {member.status === "active" ? (
          <Button variant="outline" size="sm" className="text-error border-error hover:bg-error hover:text-inverse">
            <span className="material-symbols-outlined text-sm mr-1">
              block
            </span>
            Deactivate
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="text-success border-success hover:bg-success hover:text-inverse">
            <span className="material-symbols-outlined text-sm mr-1">
              check_circle
            </span>
            Activate
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Staff Management</h1>
          <p className="text-secondary mt-1">
            Manage your organization's staff members
          </p>
        </div>
        <Button>
          <span className="material-symbols-outlined text-sm mr-2">person_add</span>
          Add Staff Member
        </Button>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search staff members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
          
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: "all", label: "All Roles" },
              { value: "Doctor", label: "Doctors" },
              { value: "Translator", label: "Translators" },
              { value: "Admin", label: "Administrators" },
              { value: "Nurse", label: "Nurses" }
            ]}
            placeholder="Filter by role"
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
          
          <Button fullWidth>
            <span className="material-symbols-outlined text-sm mr-2">filter_list</span>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Staff List */}
      <div className="flex flex-col gap-4">
        {filteredStaff.length > 0 ? (
          filteredStaff.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-secondary mb-4">
              people
            </span>
            <h3 className="text-xl font-semibold text-primary mb-2">
              No staff members found
            </h3>
            <p className="text-secondary">
              No staff members match your current search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            people
          </span>
          <p className="text-sm text-secondary">Total Staff</p>
          <p className="text-2xl font-bold text-primary">{staffMembers.length}</p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-success text-3xl mb-2">
            check_circle
          </span>
          <p className="text-sm text-secondary">Active</p>
          <p className="text-2xl font-bold text-primary">
            {staffMembers.filter(s => s.status === "active").length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            medical_services
          </span>
          <p className="text-sm text-secondary">Doctors</p>
          <p className="text-2xl font-bold text-primary">
            {staffMembers.filter(s => s.role === "Doctor").length}
          </p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-info text-3xl mb-2">
            translate
          </span>
          <p className="text-sm text-secondary">Translators</p>
          <p className="text-2xl font-bold text-primary">
            {staffMembers.filter(s => s.role === "Translator").length}
          </p>
        </div>
      </div>
    </div>
  );
}
