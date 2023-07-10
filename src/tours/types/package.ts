import type { Image, Location } from '@/app/types';
import type { TourIncluded } from '@/tours/types';

export type TourPackage = {
    id: number;
    name: string;
    price: number;
    images: Image[];
    location: Location[];
    description?: string;
} & TourIncluded;
