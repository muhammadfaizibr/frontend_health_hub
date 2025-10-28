export default function MedicationCard({ medication }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
      <span className="material-symbols-outlined text-primary-color">medication</span>
      <span className="text-primary font-medium">{medication}</span>
    </div>
  );
}