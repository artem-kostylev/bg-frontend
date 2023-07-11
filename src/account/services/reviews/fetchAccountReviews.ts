import { http } from '@/app/lib';
import type { Review } from '@/tours/types';

type FetchAccountReviewsPayload = {
    page: number;
};

export type FetchAccountReviewsResponse = {
    reviews: Review[];
    has_next: boolean;
};

export const fetchAccountReviews = async (payload: FetchAccountReviewsPayload) => {
    // TODO: Исправить это на бэке, привести к единому формату (пагинацию вынести из "meta")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, meta } = await http<any>(`reviews/hotels/has-reviews?page=${payload.page}`);

    return {
        reviews: data,
        has_next: meta.pagination.current_page < meta.pagination.total_pages,
    } as FetchAccountReviewsResponse;
};
