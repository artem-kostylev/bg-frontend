import type { Image, Location } from '@/app/types';

export type Attraction = {
    id: number;
    description: string;
    images: Image[];
    location: Location[];
    name: string;
};
