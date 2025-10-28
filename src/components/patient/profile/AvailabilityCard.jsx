import { getDayName, formatTime, groupSlotsByDay } from "@/lib/utils/global";

export default function AvailabilityCard({ availabilitySlots, loading }) {
  if (loading) {
    return (
      <div className="card bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Availability</h3>
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-color" />
        </div>
      </div>
    );
  }
  
  if (!availabilitySlots?.length) return null;
  
  const groupedSlots = groupSlotsByDay(availabilitySlots);
  
  return (
    <div className="flex flex-col card bg-surface p-6 gap-4">
      <h3 className="text-lg font-semibold text-primary mb-4">Weekly Availability</h3>
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3, 4, 5, 6].map((day) => {
          const daySlots = groupedSlots[day] || [];
          
          return (
            <div key={day} className="flex justify-between items-start py-2 border-b border-color last:border-b-0">
              <span className="text-sm text-secondary font-medium min-w-[80px]">
                {getDayName(day)}
              </span>
              <div className="flex-1 text-right">
                {daySlots.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {daySlots.map((slot, idx) => (
                      <span key={idx} className="text-sm text-primary">
                        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-tertiary italic">Closed</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}