import React from "react";
import { Button } from "@/components/ui/Button";

export const QuickActions = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Quick Actions</h2>
        <div className="flex flex-col gap-3">
          <Button fullWidth variant="outline">
            <span className="material-symbols-outlined text-sm mr-2">upload</span>
            Upload Document
          </Button>
          <Button fullWidth variant="outline">
            <span className="material-symbols-outlined text-sm mr-2">print</span>
            Print Summary
          </Button>
          <Button fullWidth variant="outline">
            <span className="material-symbols-outlined text-sm mr-2">share</span>
            Share with Doctor
          </Button>
        </div>
      </div>

      <div className="card bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Health Summary</h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-secondary">Blood Type</span>
            <span className="font-semibold text-primary">O+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Allergies</span>
            <span className="font-semibold text-primary">None Known</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Last Physical</span>
            <span className="font-semibold text-primary">Jan 10, 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Emergency Contact</span>
            <span className="font-semibold text-primary">John Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
};