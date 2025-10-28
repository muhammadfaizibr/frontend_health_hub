export default function SectionCard({ title, children, loading = false }) {
  return (
    <div className="flex flex-col gap-4 card bg-surface p-6">
      <h2 className="text-xl font-semibold text-primary mb-4">{title}</h2>
      {loading ? (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-color" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}