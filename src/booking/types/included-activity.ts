import type { Image } from '@/app/types';

export type AllActivity = {
    id: number;
    name: string;
    status: string;
    type: string;
    price_type: string;
    price: number;
    date: string[];
    image: Image;
};

export type IncludedActivity = {
    price: number;
    icons: string[];
    tour_id: string[];
    tour_name: string;
    all_activities: AllActivity[];
    tour_description: string;
};

export type ActivityDetail = {
    id: number;
    name: string;
    short_description: string;
    description: string;
    included: string[];
    not_included: string[];
    duration: number;
    images: Image[];
};
