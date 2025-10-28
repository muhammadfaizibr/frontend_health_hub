import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ConsultationFeesCard({ 
  loading, 
  doctorId 
}) {
  return (
    <div className="flex flex-col card bg-surface p-6 gap-4">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Book an Appointment
      </h3>
      
      <Link href={`/patient/find-doctor/${doctorId}/book-appointment`}>
        <Button fullWidth>Book Appointment</Button>
      </Link>
      
      <div className="text-center">
        <p className="text-xs text-secondary">
          Available only for telehealth
        </p>
      </div>
    </div>
  );
}