import React, { useState, useCallback } from "react";
import { DoctorSearchFilters } from "@/components/features/patient/DoctorSearchFilters";
import { DoctorCard } from "@/components/features/patient/DoctorCard";

export default function PatientFindDoctorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    specialty: "",
    location: ""
  });

  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      location: "New York",
      rating: 4.8,
      reviewCount: 124,
      consultationFee: 150,
      isAvailable: true,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      location: "Los Angeles",
      rating: 4.9,
      reviewCount: 89,
      consultationFee: 120,
      isAvailable: true,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      location: "Chicago",
      rating: 4.7,
      reviewCount: 156,
      consultationFee: 100,
      isAvailable: false,
      image: "https://images.unsplash.com/photo-1594824388852-8a7b1a0b0b0b?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setDoctors(mockDoctors);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Find a Doctor</h1>
        <p className="text-secondary mt-1">
          Search for qualified healthcare professionals in your area
        </p>
      </div>

      <DoctorSearchFilters onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {doctors.length > 0 ? (
            doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-secondary mb-4">
                search_off
              </span>
              <h3 className="text-xl font-semibold text-primary mb-2">
                No doctors found
              </h3>
              <p className="text-secondary">
                Try adjusting your search criteria or check back later.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}