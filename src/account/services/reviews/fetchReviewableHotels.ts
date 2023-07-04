import { http } from '@/app/lib';
import type { ReviewableHotel } from '@/account/types';

export type FetchReviewableHotelsResponse = {
    data: ReviewableHotel[];
};

export const fetchReviewableHotels = async () => {
    const { data } = await http<FetchReviewableHotelsResponse>('reviews/hotels/has-no-reviews');
    return data;
};
