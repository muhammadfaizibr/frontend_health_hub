import React from "react";
import Link from "next/link";

export default function PatientDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-surface border-r border-color min-h-screen sticky top-0 hidden md:block">
          <div className="p-4">
            <div className="flex items-center p-3 gap-3 mb-6">
              <span className="material-symbols-outlined text-primary-color text-2xl">
                person
              </span>
              <span className="text-xl font-bold text-primary">
                Patient Portal
              </span>
            </div>

            <nav className="flex flex-col gap-1">
              <Link
                href="/patient"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary bg-primary-color/10 border-l-4 border-primary-color transition-all duration-200 hover:bg-primary-color/15 hover:shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">dashboard</span>
                <span className="font-medium">Dashboard</span>
              </Link>

              <Link
                href="/patient/appointments"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">calendar_today</span>
                <span className="font-medium">Appointments</span>
              </Link>

              <Link
                href="/patient/find-doctor"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">search</span>
                <span className="font-medium">Find Doctor</span>
              </Link>

              <Link
                href="/patient/medical-records"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">medical_services</span>
                <span className="font-medium">Medical Records</span>
              </Link>

              <Link
                href="/patient/prescriptions"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">medication</span>
                <span className="font-medium">Prescriptions</span>
              </Link>

              <Link
                href="/patient/health-tracking"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">monitor_heart</span>
                <span className="font-medium">Health Tracking</span>
              </Link>

              <Link
                href="/patient/emergency"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">emergency</span>
                <span className="font-medium">Emergency Care</span>
              </Link>

              <div className="border-t border-color pt-4 mt-6">
                <Link
                  href="/patient/profile"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
                >
                  <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">person</span>
                  <span className="font-medium">Profile</span>
                </Link>
                <Link
                  href=""
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
                >
                  <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">arrow_back</span>
                  <span className="font-medium">Back to Main</span>
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 max-w-full overflow-x-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
