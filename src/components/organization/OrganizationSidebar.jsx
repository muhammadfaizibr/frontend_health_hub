// components/organization/OrganizationSidebar.jsx
"use client";

import React from "react";
import NavLink from "@/components/ui/NavLink";
import { useAuthStore } from "@/lib/store/auth-store";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/services/auth";

export default function OrganizationSidebar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { href: "/organization", icon: "dashboard", label: "Dashboard" },
    { href: "/organization/appointments", icon: "calendar_today", label: "Appointments" },
    { href: "/organization/transactions", icon: "payments", label: "Transactions" },
    { href: "/organization/purchase-credits", icon: "account_balance_wallet", label: "Credits & Billing" },
  ];

  const bottomNavItems = [
    { href: "/organization/profile", icon: "business", label: "Organization Profile" },
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
            
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-3 p-2 rounded-sm transition-all duration-200 group text-secondary hover:text-primary hover:bg-surface-secondary hover:shadow-sm"
            >
              <span className="material-symbols-outlined text-md">logout</span>
             
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}