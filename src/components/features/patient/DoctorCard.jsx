"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4">
      <div className="flex-shrink-0">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-primary">{doctor.name}</h3>
        <p className="text-secondary">{doctor.specialty}</p>
        <p className="text-sm text-secondary mb-2">{doctor.location}</p>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`material-symbols-outlined text-sm ${
                  i < Math.floor(doctor.rating) ? "text-warning" : "text-gray-300"
                }`}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-sm text-secondary">
            {doctor.rating} ({doctor.reviewCount} reviews)
          </span>
        </div>
        <p className="text-sm text-secondary mb-4">
          Consultation Fee: ${doctor.consultationFee}
        </p>
        <div className="flex gap-2">
          <Link href={`/patient/find-doctor/${doctor.id}`} passHref>
            <Button variant="primary">View Profile</Button>
          </Link>
          <Button
            variant={doctor.isAvailable ? "secondary" : "outline"}
            disabled={!doctor.isAvailable}
          >
            {doctor.isAvailable ? "Book Appointment" : "Not Available"}
          </Button>
        </div>
      </div>
    </div>
  );
}