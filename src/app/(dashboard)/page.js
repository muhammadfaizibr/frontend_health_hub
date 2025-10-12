import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const roles = [
    {
      id: "patient",
      title: "Patient Dashboard",
      description: "Manage your appointments, medical records, and find healthcare providers.",
      icon: "person",
      href: "/patient",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: ["Book Appointments", "View Medical Records", "Find Doctors", "Health Tracking"]
    },
    {
      id: "doctor",
      title: "Doctor Dashboard",
      description: "Manage your patients, schedule, and medical practice efficiently.",
      icon: "medical_services",
      href: "/doctor",
      color: "text-green-600",
      bgColor: "bg-green-50",
      features: ["Patient Management", "Schedule Management", "Medical Records", "Prescriptions"]
    },
    {
      id: "translator",
      title: "Translator Dashboard",
      description: "Handle translation assignments and manage your translation services.",
      icon: "translate",
      href: "/translator",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: ["Translation Assignments", "Schedule Management", "Language Services", "Client Communication"]
    },
    {
      id: "organization",
      title: "Organization Dashboard",
      description: "Manage your healthcare organization, staff, and services.",
      icon: "business",
      href: "/organization",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      features: ["Staff Management", "Service Management", "Analytics", "Subscription Management"]
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Welcome to HealthConnect
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Choose your role to access the appropriate dashboard and manage your healthcare experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {roles.map((role) => (
          <div key={role.id} className="card bg-surface p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${role.bgColor}`}>
                <span className={`material-symbols-outlined text-2xl ${role.color}`}>
                  {role.icon}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {role.title}
                </h2>
                <p className="text-secondary mb-4">
                  {role.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-primary mb-2">Key Features:</p>
                  <ul className="flex flex-col text-sm text-secondary gap-1">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-success text-sm">
                          check_circle
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={role.href}>
                  <Button fullWidth>
                    Access {role.title}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

        <div className="text-center mt-8">
        <p className="text-secondary">
          Need help choosing? Contact our support team for assistance.
        </p>
        <div className="mt-4 flex gap-4 justify-center">
          <Link href="/login">
            <Button variant="outline">
              Login to Existing Account
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">
              Create New Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}