import React from "react";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";

export default function DoctorCard({ doctor }) {
  console.log("Doctor data in card:", doctor); // Debug log
  
  // Map backend data to frontend format
  const doctorData = {
    id: doctor.id,
    name: doctor.full_name || `${doctor.user?.first_name || ''} ${doctor.user?.last_name || ''}`.trim(),
    specialty: doctor.category_display || doctor.specialization || 'General Practice',
    location: doctor.user?.location || doctor.location || 'Location not specified',
    rating: doctor.average_rating || 0,
    reviewCount: doctor.total_reviews || 0,
    experience: doctor.years_of_experience || 0,
    isAvailable: doctor.is_available !== undefined ? doctor.is_available : true,
    isVerified: doctor.is_verified,
    image: doctor.profile_image || doctor.user?.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(doctor.full_name || 'Doctor') + '&background=0D8ABC&color=fff',
  };

  return (
    <div className="card bg-surface p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={doctorData.image}
            alt={doctorData.name}
            className="w-16 h-16 rounded-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150?text=Doctor';
            }}
          />
          {doctorData.isVerified && (
            <span 
              className="flex absolute -bottom-1 -right-1 bg-success text-white rounded-full p-1"
              title="Verified Doctor"
            >
              <span className="material-symbols-outlined text-xs">
                verified
              </span>
            </span>
          )}
        </div>
        
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-primary">
              Dr. {doctorData.name}
            </h3>
            <StatusBadge status={doctorData.isAvailable ? 'Available' : 'Busy'} />
          </div>
          
          <p className="text-secondary text-sm mb-1">
            {doctorData.specialty}
          </p>
          
          <p className="text-secondary text-xs mb-2">
            {doctorData.experience > 0 && (
              <>
                <span className="material-symbols-outlined icon-sm align-middle mr-1">
                  work
                </span>
                {doctorData.experience}+ years experience
              </>
            )}
          </p>
          
          <div className="flex items-center gap-2 mb-2">
            {doctorData.rating > 0 ? (
              <>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-warning text-sm">
                    star
                  </span>
                  <span className="text-sm font-medium text-primary ml-1">
                    {doctorData.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-secondary">
                  ({doctorData.reviewCount} review{doctorData.reviewCount !== 1 ? 's' : ''})
                </span>
              </>
            ) : (
              <span className="text-sm text-secondary">No reviews yet</span>
            )}
          </div>

          
          <div className="mt-auto flex flex-wrap flex-row gap-2">
            <Link
              href={`/patient/find-doctor/${doctor.id}`}
              className="flex-1 button button-primary text-center"
            >
              View Profile
            </Link>
            <Link
              href={`/patient/find-doctor/${doctor.id}/book-appointment`}
              className="flex-1 button button-outline text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

