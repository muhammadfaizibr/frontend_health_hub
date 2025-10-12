import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/Button";

export const MedicalRecordCard = ({ record, detailed = false }) => {
  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: "badge badge-success",
      active: "badge badge-primary",
      pending: "badge badge-warning",
      cancelled: "badge badge-error"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  const getTypeIcon = (type) => {
    const icons = {
      "Lab Results": "science",
      "Imaging": "photo_camera",
      "Prescription": "medication",
      "Vaccination": "vaccines",
      "Procedure": "medical_services"
    };
    
    return icons[type] || "description";
  };

  if (detailed) {
    return (
      <div className="card bg-surface p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary-color text-2xl">
              {getTypeIcon(record.type)}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-primary">{record.title}</h3>
              <p className="text-secondary mb-2">{record.description}</p>
              <div className="flex items-center gap-4 text-sm text-secondary">
                <span>{record.date}</span>
                <span>•</span>
                <span>{record.doctor}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={getStatusBadge(record.status)}>
              {record.status}
            </span>
            <Button variant="outline" size="sm">
              View
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-3 border border-color rounded-lg">
      <span className="material-symbols-outlined text-primary-color">
        {getTypeIcon(record.type)}
      </span>
      <div className="flex-1">
        <h3 className="font-semibold text-primary">{record.title}</h3>
        <p className="text-sm text-secondary">{record.description}</p>
        <p className="text-xs text-tertiary">{record.date} • {record.doctor}</p>
      </div>
      <span className={getStatusBadge(record.status)}>
        {record.status}
      </span>
    </div>
  );
};

MedicalRecordCard.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string,
    doctor: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  detailed: PropTypes.bool
};

MedicalRecordCard.defaultProps = {
  detailed: false
};