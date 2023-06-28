import type { Ratings } from '@/tours/types';
import type { Image, Location } from '@/app/types';

// TODO: Поменять на бэкенде date_from на date_start и date_to на date_finish (чтобы везде был одинаковый формат)
export type HotelInfo = {
    hotel_id: number;
    name: string;
    date_from: string;
    date_to: string;
    duration: number;
    description?: string;
    images?: Image[];
    location?: Location[];
};

export type ReviewStatus = {
    description: 'На проверке' | 'Опубликован' | 'Отклонен';
    key_name: 'NEW' | 'ACCEPTED' | 'REJECTED';
    value: 0 | 1 | 2;
};

export type Review = HotelInfo & {
    review_id?: number;
    status?: ReviewStatus;
    created_at?: string;
};

export type ReviewCreator = {
    name: string;
    surname: string;
    id: number;
};

export type ReviewComments = {
    comment: string | null;
    liked: string | null;
    disliked: string | null;
};

export type ReviewRating = Review & {
    user: ReviewCreator;
    ratings: Ratings;
    average_rating: string;
    comments: ReviewComments;
};
