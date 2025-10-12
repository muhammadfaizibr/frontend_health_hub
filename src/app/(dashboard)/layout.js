import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary">
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}