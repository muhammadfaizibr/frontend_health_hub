import SectionCard from "./SectionCard";
import { formatDate, getEmploymentTypeLabel } from "@/lib/utils/global";

export default function ExperienceSection({ experience, loading }) {
  if (loading) return <SectionCard title="Experience" loading />;
  if (!experience?.length) return null;
  
  return (
    <SectionCard title="Experience">
      <div className="flex flex-col gap-4">
        {experience.map((exp) => (
          <div key={exp.id} className="border-b border-color pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary-color text-xl mt-1 flex-shrink-0">
                work
              </span>
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-primary">{exp.title}</h6>
                <p className="text-secondary text-sm">
                  {exp.company_or_organization} • {getEmploymentTypeLabel(exp.employment_type)}
                </p>
                {exp.location && (
                  <p className="text-tertiary text-xs">{exp.location}</p>
                )}
                <p className="text-tertiary text-xs mt-1">
                  {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                </p>
                {exp.description && (
                  <p className="text-secondary text-sm mt-2 whitespace-pre-line">
                    {exp.description}
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