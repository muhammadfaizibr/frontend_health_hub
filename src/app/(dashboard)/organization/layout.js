// app/organization/layout.jsx
"use client";

import React from "react";
import OrganizationSidebar from "@/components/organization/OrganizationSidebar";

export default function OrganizationDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary">
      <div className="flex">
        <OrganizationSidebar />
        <main className="flex-1 p-4 md:p-8 max-w-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}