"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export function AssignmentList({ assignments, filters }) {
  const [filteredAssignments, setFilteredAssignments] = useState(assignments);
  
  useEffect(() => {
    let filtered = [...assignments];
    
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        assignment => 
          assignment.patient.toLowerCase().includes(searchLower) ||
          assignment.appointment.toLowerCase().includes(searchLower) ||
          assignment.doctor.toLowerCase().includes(searchLower) ||
          assignment.hospital.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.statusFilter) {
      filtered = filtered.filter(
        assignment => assignment.status === filters.statusFilter
      );
    }
    
    if (filters.languageFilter) {
      filtered = filtered.filter(
        assignment => assignment.language === filters.languageFilter
      );
    }
    
    setFilteredAssignments(filtered);
  }, [assignments, filters]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Patient</th>
            <th className="py-3 px-4 text-left">Appointment</th>
            <th className="py-3 px-4 text-left">Date & Time</th>
            <th className="py-3 px-4 text-left">Language</th>
            <th className="py-3 px-4 text-left">Type</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredAssignments.map((assignment) => (
            <tr key={assignment.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="font-medium">{assignment.patient}</div>
                <div className="text-sm text-gray-500">ID: {assignment.patientId}</div>
              </td>
              <td className="py-3 px-4">
                <div>{assignment.appointment}</div>
                <div className="text-sm text-gray-500">{assignment.doctor}</div>
              </td>
              <td className="py-3 px-4">
                <div>{assignment.date}</div>
                <div className="text-sm text-gray-500">{assignment.time} ({assignment.duration})</div>
              </td>
              <td className="py-3 px-4">{assignment.language}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  assignment.type === "In-person" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-purple-100 text-purple-800"
                }`}>
                  {assignment.type}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  assignment.status === "scheduled" 
                    ? "bg-green-100 text-green-800" 
                    : assignment.status === "completed"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => console.log(`View details for assignment ${assignment.id}`)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}