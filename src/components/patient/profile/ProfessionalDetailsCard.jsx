export default function ProfessionalDetailsCard({ doctor }) {
  const details = [
    {
      label: "Experience",
      value: doctor.years_of_experience ? `${doctor.years_of_experience}+ years` : null
    },
    {
      label: "License No.",
      value: doctor.license_number
    },
    {
      label: "Specialty",
      value: doctor.category?.name
    }
  ].filter(item => item.value);
  
  if (details.length === 0) return null;
  
  return (
    <div className="flex flex-col card bg-surface p-6 gap-4">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Professional Details
      </h3>
      <div className="flex flex-col gap-3">
        {details.map((detail, index) => (
          <div 
            key={index} 
            className={`flex justify-between items-center py-2 ${
              index < details.length - 1 ? 'border-b border-color' : ''
            }`}
          >
            <span className="text-sm text-secondary">{detail.label}</span>
            <span className="text-sm text-primary font-medium">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}