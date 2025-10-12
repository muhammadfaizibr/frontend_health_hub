"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PatientDoctorProfilePage({ params }) {
  const doctorId = params.id;
  
  // Mock doctor data - in real app, fetch from API
  const doctor = {
    id: doctorId,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    location: "New York",
    rating: 4.8,
    reviewCount: 124,
    consultationFee: 150,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and has helped thousands of patients maintain heart health.",
    education: [
      "MD - Harvard Medical School",
      "Residency - Johns Hopkins Hospital",
      "Fellowship - Mayo Clinic"
    ],
    experience: "10+ years",
    languages: ["English", "Spanish"],
    qualifications: [
      "Board Certified in Cardiology",
      "Fellow of the American College of Cardiology",
      "Member of the American Heart Association"
    ],
    availability: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 3:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    }
  };

  const reviews = [
    {
      id: 1,
      patientName: "John Smith",
      rating: 5,
      comment: "Dr. Johnson is an excellent cardiologist. She took the time to explain everything clearly and made me feel comfortable throughout the process.",
      date: "2024-01-10"
    },
    {
      id: 2,
      patientName: "Maria Garcia",
      rating: 5,
      comment: "Very professional and knowledgeable. The appointment was on time and the consultation was thorough.",
      date: "2024-01-08"
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      rating: 4,
      comment: "Good doctor, but the wait time was a bit long. Overall satisfied with the care provided.",
      date: "2024-01-05"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/patient/find-doctor" className="text-secondary hover:text-primary">
          Find Doctor
        </Link>
        <span className="material-symbols-outlined text-secondary text-sm">
          chevron_right
        </span>
        <span className="text-primary">Dr. Sarah Johnson</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Main Content */}
  <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Doctor Header */}
          <div className="card bg-surface p-6">
            <div className="flex items-start gap-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-primary mb-2">
                  {doctor.name}
                </h1>
                <p className="text-lg text-secondary mb-2">
                  {doctor.specialty} • {doctor.location}
                </p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-warning text-sm">
                      star
                    </span>
                    <span className="text-sm font-medium text-primary ml-1">
                      {doctor.rating}
                    </span>
                  </div>
                  <span className="text-sm text-secondary">
                    ({doctor.reviewCount} reviews)
                  </span>
                  <span className={`badge ${doctor.isAvailable ? 'badge-success' : 'badge-error'}`}>
                    {doctor.isAvailable ? 'Available' : 'Busy'}
                  </span>
                </div>
                
                <div className="flex gap-4">
                  <Link href={`/dashboard/patient/find-doctor/${doctor.id}/book-appointment`}>
                    <Button>
                      Book Appointment
                    </Button>
                  </Link>
                  <Button variant="outline">
                    <span className="material-symbols-outlined text-sm mr-2">
                      favorite
                    </span>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">About</h2>
            <p className="text-secondary leading-relaxed">
              {doctor.bio}
            </p>
          </div>

          {/* Education */}
          <div className="card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Education</h2>
            <ul className="flex flex-col gap-2">
              {doctor.education.map((edu, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-color text-sm mt-1">
                    school
                  </span>
                  <span className="text-secondary">{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience & Qualifications */}
          <div className="card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Experience & Qualifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Experience</h3>
                <p className="text-secondary">{doctor.experience}</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Languages</h3>
                <p className="text-secondary">{doctor.languages.join(", ")}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold text-primary mb-2">Qualifications</h3>
              <ul className="flex flex-col gap-1">
                {doctor.qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-success text-sm mt-1">
                      check_circle
                    </span>
                    <span className="text-secondary">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reviews */}
          <div className="card bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Patient Reviews ({doctor.reviewCount})
            </h2>
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-color pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-primary">{review.patientName}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-sm ${
                            i < review.rating ? 'text-warning' : 'text-secondary'
                          }`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-secondary text-sm mb-2">{review.comment}</p>
                  <p className="text-xs text-tertiary">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Booking Card */}
          <div className="card bg-surface p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Book Appointment
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-secondary">Consultation Fee</p>
                <p className="text-2xl font-bold text-primary-color">
                  ${doctor.consultationFee}
                </p>
              </div>
              
              <Link href={`/dashboard/patient/find-doctor/${doctor.id}/book-appointment`}>
                <Button fullWidth>
                  Book Now
                </Button>
              </Link>
              
              <div className="text-center">
                <p className="text-sm text-secondary">
                  Available for both in-person and telehealth appointments
                </p>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="card bg-surface p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Availability
            </h3>
            <div className="flex flex-col gap-2">
              {Object.entries(doctor.availability).map(([day, time]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-sm text-secondary capitalize">
                    {day}
                  </span>
                  <span className="text-sm text-primary">
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="card bg-surface p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Contact Information
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">
                  location_on
                </span>
                <span className="text-sm text-secondary">
                  123 Medical Center Dr, New York, NY 10001
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">
                  phone
                </span>
                <span className="text-sm text-secondary">
                  (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">
                  email
                </span>
                <span className="text-sm text-secondary">
                  dr.johnson@healthconnect.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
