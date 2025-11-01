"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/forms/Textarea";
import { useToastContext } from "@/lib/providers/ToastProvider";
import { useCreateDoctorReview } from "@/lib/hooks/useDoctors";

const REVIEW_SUGGESTIONS = [
  "Very professional and caring",
  "Excellent diagnosis and treatment",
  "Great listener and communicator",
  "Thorough and knowledgeable",
  "Highly recommend this doctor",
  "Quick and efficient service",
  "Made me feel comfortable",
  "Clear explanations and guidance",
];

const RATING_LABELS = {
  1: { text: "Poor", color: "text-red-500" },
  2: { text: "Fair", color: "text-orange-500" },
  3: { text: "Good", color: "text-yellow-500" },
  4: { text: "Very Good", color: "text-blue-500" },
  5: { text: "Excellent", color: "text-green-500" },
};

function StarRating({ rating, hoveredRating, onRate, onHover, onLeave, readOnly = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= (hoveredRating || rating);
          return (
            <Button
              key={star}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => !readOnly && onRate(star)}
              onMouseEnter={() => !readOnly && onHover(star)}
              onMouseLeave={() => !readOnly && onLeave()}
              disabled={readOnly}
              className={`p-1 transition-all duration-200 ${
                readOnly ? "cursor-default" : "hover:scale-110"
              }`}
            >
              <span
                className={`material-symbols-outlined icon-lg transition-colors ${
                  isActive ? "text-warning" : "text-border"
                }`}
                style={{ 
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" 
                }}
              >
                star
              </span>
            </Button>
          );
        })}
      </div>
      
      {(hoveredRating || rating) > 0 && (
        <div className="flex items-center gap-2 ml-2">
          <span className={`text-sm font-medium ${RATING_LABELS[hoveredRating || rating]?.color}`}>
            {RATING_LABELS[hoveredRating || rating]?.text}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ReviewSection({ appointment, existingReview, hasReview, onReviewSubmit }) {
  const toast = useToastContext();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const doctor = appointment.case?.doctor?.user;
  const doctorId = appointment.case?.doctor?.id;

  const { createReview, isCreating } = useCreateDoctorReview();

  // Set initial state based on existing review
  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating || 0);
      setComment(existingReview.comment || "");
      setShowForm(false);
    } else {
      setShowForm(!hasReview);
    }
  }, [existingReview, hasReview]);

  const handleSuggestionClick = (suggestion) => {
    setComment(prev => {
      const newComment = prev ? `${prev} ${suggestion}` : suggestion;
      return newComment.slice(0, 500);
    });
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Please write at least 10 characters in your review");
      return;
    }

    createReview(
      {
        doctor_id: doctorId,
        appointment_id: appointment.id,
        status: 'published',
        rating,
        comment: comment.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully!");
          setShowForm(false);
          onReviewSubmit?.();
        },
        onError: (error) => {
          console.error("Error submitting review:", error);
          const errorMessage = error?.response?.data?.appointment?.[0] 
            || error?.response?.data?.doctor?.[0]
            || error?.response?.data?.detail 
            || "Failed to submit review";
          toast.error(errorMessage);
        },
      }
    );
  };

  // Display existing published review
  if (existingReview && existingReview.status === 'published' && !showForm) {
    return (
      <div className="bg-card-light card bg-surface p-6 border-l-4 border-primary-color">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-color">
                rate_review
              </span>
              Your Review
            </h2>
            <p className="text-xs text-secondary mt-1">
              Submitted on {new Date(existingReview.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
            Published
          </span>
        </div>
        
        <StarRating
          rating={existingReview.rating}
          hoveredRating={0}
          onRate={() => {}}
          onHover={() => {}}
          onLeave={() => {}}
          readOnly={true}
        />
        
        {existingReview.comment && (
          <div className="bg-secondary mt-4 p-4 bg-hover rounded-lg">
            <p className="text-secondary italic">"{existingReview.comment}"</p>
          </div>
        )}
      </div>
    );
  }

  // Don't show form if review already exists
  if (hasReview && !showForm) {
    return null;
  }

  return (
    <div className="bg-card-light card bg-surface p-6">
      <div className="flex items-start gap-3 mb-6">
        <div className="flex p-2 bg-primary-color/10 rounded-lg">
          <span className="material-symbols-outlined text-2xl text-primary-color">
            rate_review
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-primary">
            Rate Your Experience
          </h2>
          <p className="text-sm text-secondary mt-1">
            Help others by sharing your experience with Dr. {doctor?.full_name || "the doctor"}
          </p>
        </div>
      </div>

      {/* Star Rating Section */}
      <div className="mb-6 p-4 bg-hover rounded-lg">
        <StarRating
          rating={rating}
          hoveredRating={hoveredRating}
          onRate={setRating}
          onHover={setHoveredRating}
          onLeave={() => setHoveredRating(0)}
        />
      </div>

      {/* Quick Suggestions */}
      {rating > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-primary mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">
              tips_and_updates
            </span>
            Quick Suggestions
          </label>
          <div className="flex flex-wrap gap-2">
            {REVIEW_SUGGESTIONS.map((suggestion, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-sm hover:bg-primary-color hover:text-white transition-all duration-200"
              >
                + {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Comment Section */}
      {rating > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-primary mb-2">
            Share your detailed experience
          </label>
          <Textarea
            value={comment}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 500) {
                setComment(value);
              }
            }}
            placeholder="Tell us more about your experience with the doctor. What did you like? How was the treatment? (Minimum 10 characters)"
            rows={5}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-xs ${
              comment.length < 10 
                ? "text-error" 
                : comment.length >= 500 
                ? "text-warning" 
                : "text-secondary"
            }`}>
              {comment.length < 10 
                ? `${10 - comment.length} more characters required`
                : `${comment.length} / 500 characters`
              }
            </span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <Button
          onClick={handleSubmitReview}
          disabled={rating === 0 || comment.trim().length < 10}
          isLoading={isCreating}
          className="flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">
            send
          </span>
          Submit Review
        </Button>
      </div>

    </div>
  );
}