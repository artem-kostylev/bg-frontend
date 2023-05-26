import type { Image, Location } from '@/app/types';

export type HotelFood = {
    id: number;
    name: string;
    description: string;
};

export type HotelGeneral = {
    description: string;
};

export type HotelInfrastructure = {
    description: string;
    children: { name: string; values: string[] }[];
};

export type HotelServices = {
    children: { name: string; values: string[] }[];
};

export type HotelContacts = {
    name: string;
    values: string[];
};

export type Hotel = {
    id: number;
    name: string;
    stars?: number;
    rating: number;
    reviews: number;
    images: Image[];
    location: Location[];
    airport_remoteness?: number;
    beach_remoteness?: number;
    food?: HotelFood[];
    general?: HotelGeneral;
    infrastructure?: HotelInfrastructure;
    services?: HotelServices;
    contacts?: HotelContacts[];
};
