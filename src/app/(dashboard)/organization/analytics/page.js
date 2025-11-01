"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/forms/Select";

export default function OrganizationAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("appointments");

  const analyticsData = {
    summary: {
      totalPatients: 1247,
      activePatients: 1189,
      totalStaff: 24,
      totalAppointments: 2847,
      completedAppointments: 2654,
      cancelledAppointments: 142,
      noShowAppointments: 51,
      totalRevenue: 142350,
      creditsUsed: 2847,
      creditsRemaining: 545
    },
    monthlyTrends: [
      { month: "Jan", appointments: 245, patients: 189, revenue: 12250, credits: 245 },
      { month: "Feb", appointments: 267, patients: 201, revenue: 13350, credits: 267 },
      { month: "Mar", appointments: 289, patients: 218, revenue: 14450, credits: 289 },
      { month: "Apr", appointments: 312, patients: 234, revenue: 15600, credits: 312 },
      { month: "May", appointments: 298, patients: 225, revenue: 14900, credits: 298 },
      { month: "Jun", appointments: 324, patients: 245, revenue: 16200, credits: 324 }
    ],
    staffPerformance: [
      { name: "Dr. Sarah Johnson", appointments: 156, patients: 89, rating: 4.8, revenue: 18750 },
      { name: "Dr. Michael Chen", appointments: 142, patients: 78, rating: 4.6, revenue: 17100 },
      { name: "Dr. Emily Davis", appointments: 134, patients: 72, rating: 4.7, revenue: 16080 },
      { name: "Maria Rodriguez", appointments: 98, patients: 45, rating: 4.9, revenue: 11760 }
    ],
    patientDemographics: {
      ageGroups: [
        { age: "18-30", count: 187, percentage: 15 },
        { age: "31-45", count: 312, percentage: 25 },
        { age: "46-60", count: 436, percentage: 35 },
        { age: "60+", count: 312, percentage: 25 }
      ],
      genderDistribution: [
        { gender: "Male", count: 623, percentage: 50 },
        { gender: "Female", count: 624, percentage: 50 }
      ]
    },
    appointmentTypes: [
      { type: "New Patient", count: 569, percentage: 20 },
      { type: "Follow-up", count: 1139, percentage: 40 },
      { type: "Consultation", count: 569, percentage: 20 },
      { type: "Emergency", count: 284, percentage: 10 },
      { type: "Telehealth", count: 284, percentage: 10 }
    ],
    topSpecialties: [
      { specialty: "Cardiology", appointments: 456, revenue: 54720 },
      { specialty: "Dermatology", appointments: 342, revenue: 41040 },
      { specialty: "Pediatrics", appointments: 298, revenue: 35760 },
      { specialty: "General Practice", appointments: 267, revenue: 32040 },
      { specialty: "Internal Medicine", appointments: 234, revenue: 28080 }
    ],
    creditsUsage: {
      daily: [12, 15, 18, 14, 16, 19, 13],
      weekly: [85, 92, 78, 96, 88, 94, 89],
      monthly: [320, 345, 298, 367, 312, 389, 334]
    }
  };

  const timeRangeOptions = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "3months", label: "Last 3 months" },
    { value: "6months", label: "Last 6 months" },
    { value: "1year", label: "Last year" }
  ];

  const metricOptions = [
    { value: "appointments", label: "Appointments" },
    { value: "patients", label: "Patients" },
    { value: "revenue", label: "Revenue" },
    { value: "credits", label: "Credits Usage" }
  ];

  const StatCard = ({ title, value, change, icon, color = "primary" }) => (
    <div className="card bg-surface p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-secondary text-sm mb-1">{title}</p>
          <p className={`text-2xl font-bold text-${color}`}>{value}</p>
          {change && (
            <p className={`text-sm ${change.includes('+') ? 'text-success' : 'text-error'}`}>
              {change}
            </p>
          )}
        </div>
        <span className={`material-symbols-outlined text-${color} text-3xl`}>
          {icon}
        </span>
      </div>
    </div>
  );

  const ProgressBar = ({ percentage, color = "primary-color" }) => (
    <div className="w-full bg-surface-secondary rounded-full h-2">
      <div 
        className={`bg-${color} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Analytics & Reports</h1>
          <p className="text-secondary mt-1">
            Track your organization's performance and insights
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <span className="material-symbols-outlined text-sm">download</span>
            Export Report
          </Button>
          <Button>
            <span className="material-symbols-outlined text-sm">refresh</span>
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-surface p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            options={timeRangeOptions}
            placeholder="Select time range"
            label="Time Range"
          />
          
          <Select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            options={metricOptions}
            placeholder="Select metric"
            label="Primary Metric"
          />
          
          <div className="flex items-end">
            <Button fullWidth>
              <span className="material-symbols-outlined text-sm">settings</span>
              Customize Report
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={analyticsData.summary.totalPatients.toLocaleString()}
          change="+12% vs last month"
          icon="people"
          color="primary-color"
        />
        <StatCard
          title="Total Appointments"
          value={analyticsData.summary.totalAppointments.toLocaleString()}
          change="+8% vs last month"
          icon="calendar_today"
          color="success"
        />
        <StatCard
          title="Total Revenue"
          value={`$${analyticsData.summary.totalRevenue.toLocaleString()}`}
          change="+15% vs last month"
          icon="account_balance_wallet"
          color="info"
        />
        <StatCard
          title="Credits Used"
          value={analyticsData.summary.creditsUsed.toLocaleString()}
          change="+5% vs last month"
          icon="credit_card"
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Monthly Trends</h2>
          <div className="flex flex-col gap-4">
            {analyticsData.monthlyTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-primary font-medium">{trend.month}</span>
                    <span className="text-secondary text-sm">{trend.appointments} appointments</span>
                  </div>
                  <ProgressBar percentage={(trend.appointments / 324) * 100} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Performance */}
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Staff Performance</h2>
          <div className="flex flex-col gap-4">
            {analyticsData.staffPerformance.map((staff, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-primary font-medium">{staff.name}</span>
                    <span className="text-secondary text-sm">{staff.appointments} appointments</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-secondary">
                    <span>{staff.patients} patients</span>
                    <span>Rating: {staff.rating}/5</span>
                    <span>${staff.revenue.toLocaleString()}</span>
                  </div>
                  <ProgressBar percentage={(staff.appointments / 156) * 100} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Demographics - Age */}
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Age Distribution</h2>
          <div className="flex flex-col gap-3">
            {analyticsData.patientDemographics.ageGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-secondary text-sm">{group.age}</span>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-medium">{group.count}</span>
                  <span className="text-secondary text-xs">({group.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Types */}
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Appointment Types</h2>
          <div className="flex flex-col gap-3">
            {analyticsData.appointmentTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-primary font-medium text-sm">{type.type}</span>
                    <span className="text-secondary text-xs">{type.count} ({type.percentage}%)</span>
                  </div>
                  <ProgressBar percentage={type.percentage} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Specialties */}
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Top Specialties</h2>
          <div className="flex flex-col gap-3">
            {analyticsData.topSpecialties.map((specialty, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="text-primary font-medium text-sm">{specialty.specialty}</span>
                  <div className="flex justify-between items-center text-xs text-secondary mt-1">
                    <span>{specialty.appointments} appointments</span>
                    <span>${specialty.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Credits Usage Analytics */}
      <div className="card bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Credits Usage Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-color mb-1">
              {analyticsData.creditsUsage.daily[analyticsData.creditsUsage.daily.length - 1]}
            </div>
            <div className="text-secondary text-sm">Credits Used Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {analyticsData.creditsUsage.weekly[analyticsData.creditsUsage.weekly.length - 1]}
            </div>
            <div className="text-secondary text-sm">Credits Used This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-info mb-1">
              {analyticsData.creditsUsage.monthly[analyticsData.creditsUsage.monthly.length - 1]}
            </div>
            <div className="text-secondary text-sm">Credits Used This Month</div>
          </div>
        </div>
      </div>

      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Revenue Overview</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-secondary">This Month</span>
              <span className="text-xl font-bold text-primary">${analyticsData.summary.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-2">
              {analyticsData.monthlyTrends.slice(-3).map((trend, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-secondary text-sm">{trend.month}</span>
                  <span className="text-primary">${trend.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Organization Health</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-secondary">Active Patients</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-success">{analyticsData.summary.activePatients}</span>
                <span className="text-success text-sm">95%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary">Completion Rate</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-info">93%</span>
                <span className="text-info text-sm">+2%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary">No-Show Rate</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-warning">1.8%</span>
                <span className="text-warning text-sm">-0.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
