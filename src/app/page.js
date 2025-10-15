"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { platformName, APP_CONFIG } from "@/config/global";

export default function HomePage() {

  const features = [
    {
      icon: "search",
      title: "Find Doctors",
      description: "Search and connect with qualified healthcare professionals in your area."
    },
    {
      icon: "calendar_today",
      title: "Book Appointments",
      description: "Schedule appointments online with your preferred doctors and specialists."
    },
    {
      icon: "video_call",
      title: "Telehealth",
      description: "Consult with doctors remotely through secure video calls."
    },
    {
      icon: "translate",
      title: "Translation Services",
      description: "Get medical consultations in your preferred language."
    },
    {
      icon: "medical_services",
      title: "Medical Records",
      description: "Keep track of your medical history and appointments in one place."
    },
    {
      icon: "emergency",
      title: "Emergency Care",
      description: "Quick access to emergency medical services when you need them most."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Doctors" },
    { number: "50,000+", label: "Happy Patients" },
    { number: "100+", label: "Medical Specialties" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-color to-primary-light text-inverse py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Connect with trusted healthcare providers and take control of your health journey with {platformName}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
                <Link href="">
                  <Button size="lg" className="bg-inverse text-primary-color hover:bg-inverse/90">
                    Go to Dashboard
                  </Button>
                </Link>
              )
                <>
                  <Link href="/register">
                    <Button size="lg" className="bg-inverse text-primary-color hover:bg-inverse/90">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="border-inverse text-inverse hover:bg-inverse hover:text-primary-color">
                      Sign In
                    </Button>
                  </Link>
                </>
            
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-color mb-2">
                  {stat.number}
                </div>
                <div className="text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose {platformName}?
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              We provide comprehensive healthcare solutions designed to make your medical journey seamless and stress-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-surface p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-color/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-primary-color text-2xl">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-color text-inverse">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients who trust {platformName} for their healthcare needs.
          </p>

            <Link href="/register">
              <Button size="lg" className="bg-inverse text-primary-color hover:bg-inverse/90">
                Create Your Account
              </Button>
            </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}