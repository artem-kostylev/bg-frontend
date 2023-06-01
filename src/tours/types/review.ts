import type { Ratings } from '@/tours/types';

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

export type ReviewStatus = {
    description: 'На проверке' | 'Опубликован' | 'Отклонен';
    key_name: 'NEW' | 'ACCEPTED' | 'REJECTED';
    value: 0 | 1 | 2;
};

export type Review = {
    review_id: number;
    hotel_id: number;
    user: ReviewCreator;
    ratings: Ratings;
    average_rating: string;
    comments: ReviewComments;
    status: ReviewStatus;
    date_from: string;
    date_to: string;
    duration: number;
    created_at: string;
};
