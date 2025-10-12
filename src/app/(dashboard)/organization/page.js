import React from "react";
import { Button } from "@/components/ui/Button";

export default function OrganizationDashboardPage() {
  const stats = [
    {
      title: "Total Staff",
      value: "24",
      change: "+3 this month",
      icon: "people",
      color: "text-info"
    },
    {
      title: "Active Patients",
      value: "1,247",
      change: "+12% vs last month",
      icon: "person",
      color: "text-success"
    },
    {
      title: "Credits Balance",
      value: "$2,450",
      change: "-$150 this month",
      icon: "account_balance_wallet",
      color: "text-accent"
    },
    {
      title: "Appointments Today",
      value: "18",
      change: "3 pending",
      icon: "calendar_today",
      color: "text-warning"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "appointment",
      description: "New appointment booked with Dr. Sarah Johnson",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "staff",
      description: "Dr. Michael Chen joined the organization",
      time: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      type: "billing",
      description: "Credit package purchased - Professional Plan",
      time: "2 days ago",
      status: "completed"
    },
    {
      id: 4,
      type: "patient",
      description: "New patient registration - Maria Garcia",
      time: "3 days ago",
      status: "completed"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      time: "9:00 AM",
      type: "Follow-up",
      status: "confirmed"
    },
    {
      id: 2,
      patient: "Maria Garcia",
      doctor: "Dr. Michael Chen",
      time: "10:30 AM",
      type: "New Patient",
      status: "confirmed"
    },
    {
      id: 3,
      patient: "Robert Johnson",
      doctor: "Dr. Sarah Johnson",
      time: "2:00 PM",
      type: "Consultation",
      status: "pending"
    }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      appointment: "calendar_today",
      staff: "people",
      billing: "account_balance_wallet",
      patient: "person"
    };
    return icons[type] || "notifications";
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: "badge badge-success",
      pending: "badge badge-warning",
      cancelled: "badge badge-error"
    };
    
    return statusClasses[status] || "badge badge-secondary";
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Organization Dashboard</h1>
          <p className="text-secondary mt-1">
            Manage your healthcare organization efficiently
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <span className="material-symbols-outlined text-sm mr-2">download</span>
            Export Report
          </Button>
          <Button>
            <span className="material-symbols-outlined text-sm mr-2">add</span>
            Add Staff
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-surface p-4 md:p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-secondary text-sm mb-1 md:mb-2 font-medium">{stat.title}</p>
                <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-secondary">{stat.change}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`material-symbols-outlined text-3xl md:text-4xl ${stat.color} opacity-80`}>
                  {stat.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Recent Activities */}
        <div className="card bg-surface p-4 md:p-6 hover-lift">
          <h2 className="text-xl font-semibold text-primary mb-4 md:mb-6">Recent Activities</h2>
          <div className="flex flex-col gap-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 md:gap-4 p-3 rounded-lg hover:bg-surface-secondary transition-colors duration-200">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-color/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary-color text-sm">
                    {getActivityIcon(activity.type)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-primary text-sm font-medium">{activity.description}</p>
                  <p className="text-secondary text-xs mt-1">{activity.time}</p>
                </div>
                <span className={`${getStatusBadge(activity.status)} flex-shrink-0`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card bg-surface p-4 md:p-6 hover-lift">
          <h2 className="text-xl font-semibold text-primary mb-4 md:mb-6">Today's Appointments</h2>
          <div className="flex flex-col gap-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 md:p-4 bg-surface-secondary rounded-lg hover:bg-surface-secondary/80 transition-colors duration-200">
                <div className="flex-1 min-w-0">
                  <p className="text-primary font-semibold text-sm">{appointment.patient}</p>
                  <p className="text-secondary text-sm">{appointment.doctor}</p>
                  <p className="text-secondary text-xs mt-1">{appointment.time} • {appointment.type}</p>
                </div>
                <span className={`${getStatusBadge(appointment.status)} flex-shrink-0 ml-3`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-surface p-4 md:p-6 hover-lift">
        <h2 className="text-xl font-semibold text-primary mb-4 md:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Button variant="outline" className="h-20 md:h-24 flex-col hover-scale">
            <span className="material-symbols-outlined text-2xl md:text-3xl mb-2 md:mb-3 text-primary-color">person_add</span>
            <span className="font-medium">Add Staff Member</span>
          </Button>
          <Button variant="outline" className="h-20 md:h-24 flex-col hover-scale">
            <span className="material-symbols-outlined text-2xl md:text-3xl mb-2 md:mb-3 text-primary-color">calendar_today</span>
            <span className="font-medium">Schedule Appointment</span>
          </Button>
          <Button variant="outline" className="h-20 md:h-24 flex-col hover-scale">
            <span className="material-symbols-outlined text-2xl md:text-3xl mb-2 md:mb-3 text-primary-color">account_balance_wallet</span>
            <span className="font-medium">Manage Credits</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
