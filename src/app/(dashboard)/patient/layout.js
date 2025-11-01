import React from "react";
import PatientSidebar from "@/components/patient/PatientSidebar";

export default function PatientDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary">
      <div className="flex">
        <PatientSidebar />
        <main className="flex-1 p-4 md:p-8 max-w-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
