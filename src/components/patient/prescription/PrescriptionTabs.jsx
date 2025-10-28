"use client";

import React, { useState } from "react";

export default function PrescriptionTabs({ children }) {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <>
      <div className="border-b border-color">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("active")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "active"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            Active Prescriptions
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "all"
                ? "border-primary-color text-primary-color"
                : "border-transparent text-secondary hover:text-primary hover:border-color"
            }`}
          >
            All Prescriptions
          </button>
        </nav>
      </div>
      {children(activeTab)}
    </>
  );
}