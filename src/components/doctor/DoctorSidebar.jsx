// components/doctor/DoctorSidebar.jsx
import React from "react";
import NavLink from "@/components/ui/NavLink";
export default function DoctorSidebar() {
  const navItems = [
    { href: "/doctor", icon: "dashboard", label: "Dashboard" },
    { href: "/doctor/appointments", icon: "calendar_today", label: "Appointments" },
    { href: "/doctor/cases", icon: "folder_open", label: "Cases" },
    { href: "/doctor/patients", icon: "people", label: "Patients" },
    { href: "/doctor/schedule", icon: "schedule", label: "Schedule" }
  ];

  const bottomNavItems = [
    { href: "/doctor/profile", icon: "person", label: "Profile" },
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