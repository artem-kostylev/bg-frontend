import type { Image, Location } from '@/app/types';

type HotelInfo = {
    hotel_id: number;
    name: string;
    description: string;
    date_from: string;
    date_to: string;
    duration: number;
    images: Image[];
    location: Location[];
};

export type ReviewableHotel = HotelInfo & {
    order_id: number;
};

type ReviewStatus = {
    description: 'На проверке' | 'Опубликован' | 'Отклонен';
    key_name: 'NEW' | 'ACCEPTED' | 'REJECTED';
    value: 1 | 2 | 3;
};

export type AccountReview = HotelInfo & {
    review_id: number;
    created_at: string;
    status: ReviewStatus;
};
