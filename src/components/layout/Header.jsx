"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { platformName } from "@/config/global";

export const Header = memo(() => {
  return (
    <header className="bg-surface border-b border-color">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-theme text-2xl">
              local_hospital
            </span>
            <span className="text-xl font-bold text-primary">
              {platformName}
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-secondary hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/find-doctor" className="text-secondary hover:text-primary transition-colors">
              Find Doctor
            </Link>
            <Link href="/about" className="text-secondary hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-secondary hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
