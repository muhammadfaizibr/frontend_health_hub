"use client";

import React from "react";
import Link from "next/link";

export default function OrganizationDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-surface border-r border-color min-h-screen sticky top-0 hidden md:block">
          <div className="p-4">
            <div className="flex items-center p-3 gap-3 mb-6">
              <span className="material-symbols-outlined text-primary-color text-2xl">
                business
              </span>
              <span className="text-xl font-bold text-primary">
                Organization Portal
              </span>
            </div>

            <nav className="flex flex-col gap-1">
              <Link
                href="/organization"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary bg-primary-color/10 border-l-4 border-primary-color transition-all duration-200 hover:bg-primary-color/15 hover:shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">dashboard</span>
                <span className="font-medium">Dashboard</span>
              </Link>

              <Link
                href="/organization/staff"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">people</span>
                <span className="font-medium">Staff Management</span>
              </Link>

              <Link
                href="/organization/patients"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">person</span>
                <span className="font-medium">Patient Management</span>
              </Link>

              <Link
                href="/organization/appointments"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">calendar_today</span>
                <span className="font-medium">Appointments</span>
              </Link>

              <Link
                href="/organization/credits"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">account_balance_wallet</span>
                <span className="font-medium">Credits & Billing</span>
              </Link>

              <Link
                href="/organization/analytics"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">analytics</span>
                <span className="font-medium">Analytics</span>
              </Link>

              <Link
                href="/organization/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
              >
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">settings</span>
                <span className="font-medium">Settings</span>
              </Link>

              <div className="border-t border-color pt-4 mt-6">
                <Link
                  href="/organization/profile"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-all duration-200 hover:shadow-sm group"
                >
                  <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200">business</span>
                  <span className="font-medium">Organization Profile</span>
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
        <main className="flex-1 p-4 md:p-8 max-w-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
