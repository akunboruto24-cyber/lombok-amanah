import type { Review } from '@/types/database';

const userReviews = new Map<string, Review[]>();
const MAX_REVIEWS_PER_TOUR = 200;

export function addReview(tourId: string, review: Omit<Review, 'id' | 'created_at' | 'is_approved' | 'booking_id'>): Review {
  const list = userReviews.get(tourId) || [];
  const newReview: Review = {
    id: `rev-user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    booking_id: null,
    is_approved: true,
    created_at: new Date().toISOString(),
    ...review,
  };
  list.unshift(newReview);
  if (list.length > MAX_REVIEWS_PER_TOUR) list.length = MAX_REVIEWS_PER_TOUR;
  userReviews.set(tourId, list);
  return newReview;
}

export function getReviewsForTour(tourId: string): Review[] {
  return userReviews.get(tourId) || [];
}

export function getAllUserReviews(): Review[] {
  const all: Review[] = [];
  for (const list of userReviews.values()) all.push(...list);
  return all;
}
