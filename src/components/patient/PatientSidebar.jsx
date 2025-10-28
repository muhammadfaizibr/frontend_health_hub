import React from "react";
import Link from "next/link";
import NavLink from "./NavLink";

export default function PatientSidebar() {
  const navItems = [
    { href: "/patient", icon: "dashboard", label: "Dashboard" },
    { href: "/patient/appointments", icon: "calendar_today", label: "Appointments" },
    { href: "/patient/find-doctor", icon: "search", label: "Find Doctor" },
    { href: "/patient/medical-records", icon: "medical_services", label: "Medical Records" },
    { href: "/patient/prescriptions", icon: "medication", label: "Prescriptions" },
    { href: "/patient/health-tracking", icon: "monitor_heart", label: "Health Tracking" },
    { href: "/patient/emergency", icon: "emergency", label: "Emergency Care" }
  ];

  const bottomNavItems = [
    { href: "/patient/profile", icon: "person", label: "Profile" },
    { href: "/", icon: "arrow_back", label: "Back to Main" }
  ];

  return (
    <aside className="bg-surface border-r border-color min-h-screen sticky top-0 hidden md:block">
      <div className="p-2">
        <nav className="flex flex-col gap-2 py-2">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}

          <div className="border-t border-color pt-4 mt-6">
            {bottomNavItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}