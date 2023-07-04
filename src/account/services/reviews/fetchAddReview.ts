import { http } from '@/app/lib';
import type { Ratings, ReviewComments } from '@/tours/types';

export type FetchAddReviewPayload = {
    hotel_id: number;
    order_id: number;
    ratings: Ratings;
    comments: ReviewComments;
};

export const fetchAddReview = async (payload: FetchAddReviewPayload) => {
    await http('reviews/hotels', {
        method: 'POST',
        body: payload,
    });
};
