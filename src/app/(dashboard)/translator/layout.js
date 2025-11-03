// app/translator/layout.jsx
import React from "react";
import TranslatorSidebar from "@/components/translator/TranslatorSidebar";

export default function TranslatorDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary">
      <div className="flex">
        <TranslatorSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}