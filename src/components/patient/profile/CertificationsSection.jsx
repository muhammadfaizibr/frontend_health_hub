import SectionCard from "./SectionCard";
import { formatDate } from "@/lib/utils/global";

export default function CertificationsSection({ certifications, loading }) {
  if (loading) return <SectionCard title="Certifications & Licenses" loading />;
  if (!certifications?.length) return null;
  
  return (
    <SectionCard title="Certifications & Licenses">
      <div className="flex flex-col gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="border-b border-color pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-success text-xl mt-1 flex-shrink-0">
                verified
              </span>
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-primary">{cert.title}</h6>
                <p className="text-secondary text-sm">{cert.issuing_organization}</p>
                <p className="text-tertiary text-xs mt-1">
                  Issued: {formatDate(cert.issue_date)}
                  {cert.expiration_date && ` • Expires: ${formatDate(cert.expiration_date)}`}
                </p>
                {cert.credential_id && (
                  <p className="text-secondary text-xs mt-1">
                    Credential ID: {cert.credential_id}
                  </p>
                )}
                {cert.credential_url && (
                  <a 
                    href={cert.credential_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-color text-xs hover:underline mt-1 inline-block"
                  >
                    View Credential →
                  </a>
                )}
                {cert.description && (
                  <p className="text-secondary text-sm mt-2 whitespace-pre-line">
                    {cert.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}