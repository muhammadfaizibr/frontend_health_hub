import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

export default function PrescriptionCard({ prescription, onRefillRequest }) {
  const isActive = prescription.status === "active";
  const hasRefills = prescription.refills > 0;
  const canRequestRefill = isActive && hasRefills && onRefillRequest;

  return (
    <div className="card bg-surface p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-primary">
              {prescription.medication}
            </h3>
            <StatusBadge status={prescription.status} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4">
            <div>
              <p className="text-sm text-secondary">Dosage</p>
              <p className="font-semibold text-primary">{prescription.dosage}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Frequency</p>
              <p className="font-semibold text-primary">{prescription.frequency}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Prescribed by</p>
              <p className="font-semibold text-primary">{prescription.doctor}</p>
            </div>
            <div>
              <p className="text-sm text-secondary">Prescribed Date</p>
              <p className="font-semibold text-primary">{prescription.prescribedDate}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-secondary mb-1">Instructions</p>
            <p className="text-primary">{prescription.instructions}</p>
          </div>
          
          {isActive && (
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-secondary">Refills remaining: </span>
                <span className="font-semibold text-primary">{prescription.refills}</span>
              </div>
              <div>
                <span className="text-secondary">Next refill: </span>
                <span className="font-semibold text-primary">{prescription.nextRefill}</span>
              </div>
            </div>
          )}
        </div>
        
        {canRequestRefill && (
          <div className="ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRefillRequest(prescription.id)}
            >
              Request Refill
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}