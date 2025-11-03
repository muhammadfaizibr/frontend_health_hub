"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, icon, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center justify-center gap-3 p-2 rounded-sm transition-all duration-200 group ${
        isActive
          ? "text-primary bg-primary-color/10 border-l-4 border-primary-color hover:bg-primary-color/15 hover:shadow-sm"
          : "text-secondary hover:text-primary hover:bg-surface-secondary hover:shadow-sm"
      }`}
    >
      <span className={`material-symbols-outlined text-md ${!isActive && "group-hover:scale-110 transition-transform duration-200"}`}>
        {icon}
      </span>
      {/* <span className="font-medium">{label}</span> */}
    </Link>
  );
}