"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export function AssignmentCard({ assignment }) {
  const getStatusBadge = (status) => {
    const statusClasses = {
      scheduled: "badge badge-info",
      completed: "badge badge-success",
      cancelled: "badge badge-error"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  return (
    <div className="card bg-surface p-6">
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
              <span className="material-symbols-outlined text-sm mr-1">
                meeting_room
              </span>
              Join
            </Button>
            <Button variant="outline" size="sm">
              <span className="material-symbols-outlined text-sm mr-1">
                info
              </span>
              Details
            </Button>
          </>
        )}
        {assignment.status === 'completed' && (
          <Button variant="outline" size="sm">
            <span className="material-symbols-outlined text-sm mr-1">
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
  );
}