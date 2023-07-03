import { http } from '@/app/lib';
import type { ReviewRating } from '@/tours/types';

export type FetchAccountReviewResponse = {
    data: ReviewRating;
};

export const fetchAccountReview = async (review_id: number) => {
    const { data } = await http<FetchAccountReviewResponse>(
        `reviews/hotels/has-reviews/${review_id}`
    );
    return data;
};
