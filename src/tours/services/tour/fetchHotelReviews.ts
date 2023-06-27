import { http } from '@/app/lib';
import type { ReviewRating } from '@/tours/types';
import { parseSortToString } from '@/tours/lib';

export type FetchHotelReviewsResponse = {
    reviews: ReviewRating[];
    has_next: boolean;
    total: number;
};

export const fetchHotelReviews = async (id: string | number, page: number, sortRaw: string) => {
    // TODO: Исправить это на бэке, привести к единому формату (пагинацию вынести из "meta")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, meta } = await http<any>(
        `reviews/hotels/${id}?page=${page}&${parseSortToString(sortRaw)}`
    );

    return {
        reviews: data,
        has_next: meta.pagination.current_page < meta.pagination.total_pages,
        total: meta.pagination.total,
    } as FetchHotelReviewsResponse;
};
