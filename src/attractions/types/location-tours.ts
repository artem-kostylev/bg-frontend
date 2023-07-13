import type { Image, Filters } from '@/app/types';

export type LocationTours = {
    preset_name: string;
    image: Image[];
    preset_filters: Filters;
    best_price: number;
};
