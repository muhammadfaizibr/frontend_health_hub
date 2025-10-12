import React from "react";
import PropTypes from "prop-types";

export const HealthHistoryCard = ({ entry }) => {
  return (
    <div className="card bg-surface p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary-color/10 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-primary-color">
            medical_services
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary">{entry.event}</h3>
          <p className="text-secondary mb-2">{entry.notes}</p>
          <div className="flex items-center gap-4 text-sm text-secondary">
            <span>{entry.date}</span>
            <span>•</span>
            <span>{entry.doctor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

HealthHistoryCard.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    provider: PropTypes.string
  }).isRequired
};