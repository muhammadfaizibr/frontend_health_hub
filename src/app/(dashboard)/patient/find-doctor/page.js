    "use client";

    import React, { useState, useCallback } from "react";
    import { Button } from "@/components/ui/Button";
    import { Input } from "@/components/forms/Input";
    import { Select } from "@/components/forms/Select";
    import { MEDICAL_SPECIALTIES } from "@/constants";

    export default function PatientFindDoctorPage() {
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedSpecialty, setSelectedSpecialty] = useState("");
      const [selectedLocation, setSelectedLocation] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [doctors, setDoctors] = useState([]);

      const debouncedSearchTerm = "" + searchTerm.trim().toLowerCase();

      const specialtyOptions = [
        { value: "", label: "All Specialties" },
        ...MEDICAL_SPECIALTIES.map(specialty => ({
          value: specialty.toLowerCase(),
          label: specialty
        }))
      ];

      const locationOptions = [
        { value: "", label: "All Locations" },
        { value: "new-york", label: "New York" },
        { value: "los-angeles", label: "Los Angeles" },
        { value: "chicago", label: "Chicago" },
        { value: "houston", label: "Houston" },
        { value: "phoenix", label: "Phoenix" }
      ];

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

      const handleSearch = useCallback(async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setDoctors(mockDoctors);
          setIsLoading(false);
        }, 1000);
      }, []);

      React.useEffect(() => {
        if (debouncedSearchTerm || selectedSpecialty || selectedLocation) {
          handleSearch();
        }
      }, [debouncedSearchTerm, selectedSpecialty, selectedLocation, handleSearch]);

      return (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">Find a Doctor</h1>
            <p className="text-secondary mt-1">
              Search for qualified healthcare professionals in your area
            </p>
          </div>

          {/* Search Filters */}
          <div className="card bg-surface p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search by name or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon="search"
              />
              
              <Select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                options={specialtyOptions}
                placeholder="Select specialty"
              />
              
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                options={locationOptions}
                placeholder="Select location"
              />
              
              <Button
                onClick={handleSearch}
                isLoading={isLoading}
                fullWidth
              >
                Search
              </Button>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
                <p className="text-secondary mt-2">Searching for doctors...</p>
              </div>
            ) : doctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-6xl text-secondary mb-4">
                  search_off
                </span>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  No doctors found
                </h3>
                <p className="text-secondary">
                  Try adjusting your search criteria or browse all doctors
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Doctor Card Component
    function DoctorCard({ doctor }) {
      return (
        <div className="card bg-surface p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-primary">
                {doctor.name}
              </h3>
              <span className={`badge ${doctor.isAvailable ? 'badge-success' : 'badge-error'}`}>
                  {doctor.isAvailable ? 'Available' : 'Busy'}
                </span>
              </div>
              <p className="text-secondary text-sm mb-2">
                {doctor.specialty} • {doctor.location}
              </p>
              
              <div className="flex items-center gap-2 mb-2">
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
              </div>
              
              <div className="mt-4 flex flex-row flex-basis-100 gap-2">
      <a
        href={`/dashboard/patient/find-doctor/${doctor.id}`}
        className="flex-1 button button-primary text-center"
      >
        View Profile
      </a>
      <a
        href={`/dashboard/patient/find-doctor/${doctor.id}/book-appointment`}
        className="flex-1 button button-outline text-center"
      >
        Book Now
      </a>
    </div>

            </div>
          </div>
        </div>
      );
    }
