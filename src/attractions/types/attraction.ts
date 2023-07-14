import type { Image, Location } from '@/app/types';

export type AttractionName = 'locations-id' | 'attractions-id' | 'activities-id';

// TODO: сделать, чтобы с бэкенда везде приходил только name (вместо title в одном месте), привести к единому формату
export type ShortAttraction = {
    id: number;
    image: Image;
    name?: string;
    title?: string;
    count?: number;
};

export type Attraction = {
    id: number;
    description: string;
    images: Image[];
    location: Location[];
    name: string;
    additional_description?: string;
    location_id?: number;
};
