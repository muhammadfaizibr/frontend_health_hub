import SectionCard from "./SectionCard";

export default function AboutSection({ bio }) {
  if (!bio) return null;
  
  return (
    <SectionCard title="About">
      <p className="text-secondary leading-relaxed whitespace-pre-line">{bio}</p>
    </SectionCard>
  );
}