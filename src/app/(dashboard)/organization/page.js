"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useOrganizationProfile, useOrganizationAppointments } from "@/lib/hooks/useOrganization";
import { formatCurrency } from "@/lib/utils/global";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function OrganizationDashboard() {
  const { data: profile, isLoading: profileLoading } = useOrganizationProfile();
  const { data: appointments, isLoading: appointmentsLoading } = useOrganizationAppointments();

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const stats = {
    currentBalance: profile?.current_credits_balance || 0,
    totalPurchased: profile?.total_credits_purchased || 0,
    totalAppointments: profile?.total_appointments_processed || 0,
    activeAppointments: appointments?.filter(a => 
      ['pending_confirmation', 'confirmed'].includes(a.status?.toLowerCase())
    ).length || 0,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Organization Dashboard
          </h1>
          <p className="text-secondary mt-1">
            Manage your credits and monitor appointments
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/organization/purchase-credits">
            <Button>
              <span className="material-symbols-outlined text-sm">add_card</span>
              Purchase Credits
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(stats.currentBalance, 'PKR')}
              </p>
            </div>
            <div className="flex p-3 bg-success/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-success">
                account_balance_wallet
              </span>
            </div>
          </div>
        </div>

        <div className="card bg-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary mb-1">Total Purchased</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(stats.totalPurchased, 'PKR')}
              </p>
            </div>
            <div className="flex p-3 bg-primary-color/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-primary-color">
                trending_up
              </span>
            </div>
          </div>
        </div>

        <div className="card bg-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary mb-1">Total Appointments</p>
              <p className="text-2xl font-bold text-primary">{stats.totalAppointments}</p>
            </div>
            <div className="flex p-3 bg-blue-500/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-blue-500">
                event_note
              </span>
            </div>
          </div>
        </div>

        <div className="card bg-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary mb-1">Active Appointments</p>
              <p className="text-2xl font-bold text-primary">{stats.activeAppointments}</p>
            </div>
            <div className="flex p-3 bg-warning/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-warning">
                calendar_today
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/organization/purchase-credits">
          <div className="card bg-surface p-6 hover:bg-hover transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-primary-color mb-2">
              add_shopping_cart
            </span>
            <h3 className="font-semibold text-primary mb-1">Purchase Credits</h3>
            <p className="text-sm text-secondary">Buy credit packages for appointments</p>
          </div>
        </Link>

        <Link href="/organization/transactions">
          <div className="card bg-surface p-6 hover:bg-hover transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-blue-500 mb-2">
              receipt_long
            </span>
            <h3 className="font-semibold text-primary mb-1">View Transactions</h3>
            <p className="text-sm text-secondary">Check your purchase history</p>
          </div>
        </Link>

        <Link href="/organization/appointments">
          <div className="card bg-surface p-6 hover:bg-hover transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-success mb-2">
              event_available
            </span>
            <h3 className="font-semibold text-primary mb-1">Appointments</h3>
            <p className="text-sm text-secondary">View linked appointments</p>
          </div>
        </Link>
      </div>

      {/* Recent Appointments */}
      <div className="card bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">Recent Appointments</h2>
          <Link href="/organization/appointments">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>

        {appointmentsLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : appointments && appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-color">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-secondary">Patient</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-secondary">Doctor</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-secondary">Date</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-secondary">Amount</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-secondary">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((appointment) => (
                  <tr key={appointment.id} className="border-b border-color hover:bg-hover">
                    <td className="py-3 px-2 text-sm text-primary">{appointment.patient_name}</td>
                    <td className="py-3 px-2 text-sm text-primary">{appointment.doctor_name}</td>
                    <td className="py-3 px-2 text-sm text-secondary">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 text-sm text-primary">
                      {formatCurrency(appointment.total_amount, 'PKR')}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        appointment.billing_status === 'billed' 
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {appointment.billing_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-secondary">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
              event_busy
            </span>
            <p>No appointments yet</p>
          </div>
        )}
      </div>
    </div>
  );
}