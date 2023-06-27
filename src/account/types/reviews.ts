import type { Review } from '@/tours/types';

export type ReviewableHotel = Review & {
    order_id: number;
};
