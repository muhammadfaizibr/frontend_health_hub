import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/Button";
import { MedicalRecordCard } from "./MedicalRecordCard";

export const MedicalRecordsSummary = ({ records }) => {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            science
          </span>
          <p className="text-sm text-secondary">Lab Results</p>
          <p className="text-2xl font-bold text-primary">12</p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            photo_camera
          </span>
          <p className="text-sm text-secondary">Imaging</p>
          <p className="text-2xl font-bold text-primary">5</p>
        </div>
        <div className="card bg-surface p-4 text-center">
          <span className="material-symbols-outlined text-primary-color text-3xl mb-2">
            medication
          </span>
          <p className="text-sm text-secondary">Prescriptions</p>
          <p className="text-2xl font-bold text-primary">8</p>
        </div>
      </div>

      <div className="card bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Recent Records</h2>
        <div className="flex flex-col gap-4">
          {records.slice(0, 3).map((record) => (
            <MedicalRecordCard key={record.id} record={record} />
          ))}
        </div>
      </div>
    </div>
  );
};

MedicalRecordsSummary.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string,
      date: PropTypes.string,
      doctor: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
};