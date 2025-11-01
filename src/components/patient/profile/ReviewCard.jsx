"use client";

const RatingStars = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`material-symbols-outlined text-sm ${
          i < rating ? 'text-warning' : 'text-secondary'
        }`}
      >
        star
      </span>
    ))}
  </div>
);

export function ReviewCard({ review }) {
  return (
    <div className="bg-card-light border-b border-color pb-4 last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-primary">{review.patientName}</h4>
        <RatingStars rating={review.rating} />
      </div>
      <p className="text-secondary text-sm mb-2">{review.comment}</p>
      <p className="text-xs text-tertiary">{review.date}</p>
    </div>
  );
}