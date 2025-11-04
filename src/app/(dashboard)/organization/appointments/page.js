"use client";

import React, { useState } from "react";
import { useOrganizationAppointments } from "@/lib/hooks/useOrganization";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils/global";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";

export default function OrganizationAppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const { data: appointments, isLoading } = useOrganizationAppointments();

  const filteredAppointments = appointments?.filter(app => 
    statusFilter === 'all' || app.billing_status === statusFilter
  ) || [];

  const stats = {
    total: appointments?.length || 0,
    draft: appointments?.filter(a => a.billing_status === 'draft').length || 0,
    billed: appointments?.filter(a => a.billing_status === 'billed').length || 0,
    cancelled: appointments?.filter(a => a.billing_status === 'cancelled').length || 0,
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Appointments</h1>
        <p className="text-secondary mt-1">
          View all appointments linked to your organization
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card bg-surface p-4">
          <p className="text-sm text-secondary mb-1">Total</p>
          <p className="text-2xl font-bold text-primary">{stats.total}</p>
        </div>
        <div className="card bg-surface p-4">
          <p className="text-sm text-secondary mb-1">Draft</p>
          <p className="text-2xl font-bold text-warning">{stats.draft}</p>
        </div>
        <div className="card bg-surface p-4">
          <p className="text-sm text-secondary mb-1">Billed</p>
          <p className="text-2xl font-bold text-success">{stats.billed}</p>
        </div>
        <div className="card bg-surface p-4">
          <p className="text-sm text-secondary mb-1">Cancelled</p>
          <p className="text-2xl font-bold text-error">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'draft' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('draft')}
          >
            Draft
          </Button>
          <Button
            variant={statusFilter === 'billed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('billed')}
          >
            Billed
          </Button>
          <Button
            variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('cancelled')}
          >
            Cancelled
          </Button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="card bg-surface">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredAppointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-color">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                    Patient
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                    Doctor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                    Date & Time
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-secondary">
                    Billing
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-color hover:bg-hover">
                    <td className="py-3 px-4 text-sm text-primary">
                      {appointment.patient_name}
                    </td>
                    <td className="py-3 px-4 text-sm text-primary">
                      {appointment.doctor_name}
                    </td>
                    <td className="py-3 px-4 text-sm text-secondary">
                      <div>{formatDate(appointment.date)}</div>
                      <div className="text-xs">{formatTime(appointment.time)}</div>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">
                      {formatCurrency(appointment.total_amount, appointment.currency)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        appointment.status === 'confirmed'
                          ? 'bg-success/10 text-success'
                          : appointment.status === 'cancelled'
                          ? 'bg-error/10 text-error'
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        appointment.billing_status === 'billed'
                          ? 'bg-success/10 text-success'
                          : appointment.billing_status === 'cancelled'
                          ? 'bg-error/10 text-error'
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
          <div className="text-center py-12 text-secondary">
            <span className="material-symbols-outlined text-5xl mb-2 opacity-50">
              event_busy
            </span>
            <p>No appointments found</p>
          </div>
        )}
      </div>
    </div>
  );
}