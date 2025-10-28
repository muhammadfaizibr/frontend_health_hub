import SectionCard from "./SectionCard";

const RatingStars = ({ rating }) => (
  <div className="flex items-center flex-shrink-0">
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

export default function ReviewsSection({ reviews, reviewCount, loading, error }) {
  const formatReviewDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  console.log(reviews, 'reviews in ReviewsSection');

  return (
    <SectionCard title={`Patient Reviews (${reviewCount || 0})`}>
      {loading ? (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-color" />
        </div>
      ) : error ? (
        <p className="text-secondary text-sm">Unable to load reviews</p>
      ) : reviews?.results?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reviews?.results?.map((review) => (
            <div key={review.id} className="border-b border-color pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2 gap-4">
                <h6 className="font-semibold text-primary truncate">
                  {review.patient?.full_name || 'Anonymous'}
                </h6>
                <RatingStars rating={review.rating} />
              </div>
              <p className="text-secondary text-sm mb-2 leading-relaxed">
                {review.comment}
              </p>
              <p className="text-xs text-tertiary">
                {formatReviewDate(review.created_at)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-secondary text-sm">No reviews yet</p>
      )}
    </SectionCard>
  );
}