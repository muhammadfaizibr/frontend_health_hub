import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DoctorHeader({ doctor }) {
  const doctorImage = doctor.user?.profile_picture || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.user?.full_name || 'Doctor')}&size=96&background=random`;

  const doctorName = doctor.user?.full_name || 'Doctor';
  const specialty = doctor.specialization || 'General Practice';
  const category = doctor?.category_display || 'Medical Professional';
  const rating = doctor.average_rating?.toFixed(1) || 'N/A';
  const reviewCount = doctor.review_count || 0;

  return (
    <div className="card bg-surface p-6">
      <div className="flex items-start gap-6 flex-col flex-row">
        <img
          src={doctorImage}
          alt={doctorName}
          className="w-24 h-24 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-primary mb-2 break-words">
            {doctorName}
          </h1>
          <p className="text-md text-secondary mb-3">
            {specialty} • {category}
          </p>
          
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-warning text-sm">star</span>
              <span className="text-sm font-medium text-primary ml-1">{rating}</span>
            </div>
            <span className="text-sm text-secondary">({reviewCount} reviews)</span>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <Link href={`/patient/find-doctor/${doctor.id}/book-appointment`}>
              <Button>Book Appointment</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}