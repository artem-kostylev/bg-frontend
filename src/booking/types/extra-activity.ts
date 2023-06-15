import type { Image } from '@/app/types';

export type ExtraActivity = {
    id: number;
    type: string;
    price_type: 'per_person';
    date: string;
    time: string;
    duration: number;
    option: string;
    name: string;
    description: string;
    image: Image;
    items_id: number;
    ticket: { price_type: 'adult' | 'child'; qty: number }[];
    price: number;
};
