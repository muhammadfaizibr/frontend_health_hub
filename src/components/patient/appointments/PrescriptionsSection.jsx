"use client";

import React, { useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

const PrescriptionCard = ({ prescription }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col card bg-surface overflow-hidden gap-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover:bg-hover transition-colors"
      >
        <div className="flex items-start gap-3 text-left flex-1">
          <span className="material-symbols-outlined text-primary mt-1">
            medication
          </span>
          <div className="flex-1">
            <h3 className="font-semibold text-primary text-lg">{prescription.title}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-secondary flex-wrap">
              <span>
                {prescription.items?.length || 0} medicine{prescription.items?.length !== 1 ? 's' : ''}
              </span>
              <span>•</span>
              <span>Duration: {prescription.course_duration_days} days</span>
              <span>•</span>
              <span>
                {new Date(prescription.start_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <span className={`material-symbols-outlined text-secondary transition-transform ${
          isExpanded ? 'rotate-180' : ''
        }`}>
          expand_more
        </span>
      </button>

      {isExpanded && (
        <div className="pt-4 border-t border-color bg-hover/30">
          {prescription.instructions && (
            <div className="mb-4 p-3 bg-info/10 border border-info rounded-lg">
              <p className="text-sm font-medium text-info mb-1">General Instructions:</p>
              <p className="text-sm text-info/80">{prescription.instructions}</p>
            </div>
          )}

          <div className="space-y-3">
            {prescription.items?.map((item, index) => (
              <div key={item.id} className="p-3 bg-surface rounded-lg border border-color">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-primary text-lg">{item.medicine_name}</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-secondary">
                          schedule
                        </span>
                        <span className="text-secondary">
                          Frequency: <span className="text-primary font-medium">{item.frequency}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-secondary">
                          medication
                        </span>
                        <span className="text-secondary">
                          Dosage: <span className="text-primary font-medium">{item.dosage_amount}</span>
                        </span>
                      </div>
                      {item.instructions && (
                        <div className="flex items-start gap-2 mt-2">
                          <span className="material-symbols-outlined text-sm text-secondary mt-0.5">
                            info
                          </span>
                          <span className="text-secondary text-xs">{item.instructions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {prescription.created_by && (
            <div className="mt-4 pt-4 border-t border-color flex items-center justify-between text-xs text-secondary">
              <span>Prescribed by: Dr. {prescription.created_by.full_name}</span>
              <span>{new Date(prescription.created_at).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function PrescriptionsSection({ 
  appointmentId, 
  prescriptions, 
  isLoading 
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <EmptyState
        icon="medication"
        title="No prescriptions yet"
        description="No prescriptions have been issued for this appointment."
      />
    );
  }

  return (
    <div className="space-y-4">
      {prescriptions.map((prescription) => (
        <PrescriptionCard key={prescription.id} prescription={prescription} />
      ))}
    </div>
  );
}