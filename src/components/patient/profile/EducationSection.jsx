import SectionCard from "./SectionCard";
import { formatDate } from "@/lib/utils/global";

export default function EducationSection({ education, loading }) {
  if (loading) return <SectionCard title="Education" loading />;
  if (!education?.length) return null;
  
  return (
    <SectionCard title="Education">
      <div className="flex flex-col gap-4">
        {education.map((edu) => (
          <div key={edu.id} className="border-b border-color pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary-color text-xl mt-1 flex-shrink-0">
                school
              </span>
              <div className="flex-1 min-w-0">
                <h6 className="font-semibold text-primary">
                  {edu.degree} in {edu.field}
                </h6>
                <p className="text-secondary text-sm">{edu.school}</p>
                <p className="text-tertiary text-xs mt-1">
                  {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                </p>
                {edu.grade && (
                  <p className="text-secondary text-sm mt-1">Grade: {edu.grade}</p>
                )}
                {edu.description && (
                  <p className="text-secondary text-sm mt-2 whitespace-pre-line">
                    {edu.description}
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