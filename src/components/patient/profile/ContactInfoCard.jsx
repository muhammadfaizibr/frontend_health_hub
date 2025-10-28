export default function ContactInfoCard({ doctor }) {
  const hasContactInfo = doctor.clinic_address || doctor.user?.phone || doctor.user?.email;
  
  if (!hasContactInfo) return null;
  
  const contactItems = [
    {
      icon: "location_on",
      value: doctor.clinic_address,
      className: "break-words"
    },
    {
      icon: "phone",
      value: doctor.user?.phone,
      className: ""
    },
    {
      icon: "email",
      value: doctor.user?.email,
      className: "break-all"
    }
  ].filter(item => item.value);
  
  return (
    <div className="card bg-surface p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Contact Information
      </h3>
      <div className="flex flex-col gap-3">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary text-sm mt-0.5 flex-shrink-0">
              {item.icon}
            </span>
            <span className={`text-sm text-secondary ${item.className}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}