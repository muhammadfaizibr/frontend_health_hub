"use client";

import React, { memo } from "react";
import Link from "next/link";
import { platformName } from "@/config/global";

export const Footer = memo(() => {
  return (
    <footer className="bg-primary border-t border-color">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-theme text-2xl">
                local_hospital
              </span>
              <span className="text-xl font-bold text-primary">
                {platformName}
              </span>
            </div>
            <p className="text-secondary mb-4 max-w-md">
              Connecting patients with healthcare providers for better health outcomes.
              Your trusted partner in healthcare.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined">facebook</span>
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined">twitter</span>
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined">linkedin</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/find-doctor" className="text-secondary hover:text-primary transition-colors">
                  Find Doctor
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="text-secondary hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-secondary hover:text-primary transition-colors">
                  Emergency
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Support</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/help" className="text-secondary hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-color mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-secondary">
              © 2024 {platformName}. All rights reserved.
            </p>
            <p className="text-sm text-secondary mt-2 md:mt-0">
              Made with ❤️ for better healthcare
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
