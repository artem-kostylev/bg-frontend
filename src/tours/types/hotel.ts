import type { Image, Location } from '@/app/types';

export type HotelFood = {
    boarding_type: string[];
    board: { name: string; time: string[]; type: string }[];
    restaurants_and_bars: string;
};

export type HotelGeneral = {
    description: string;
    children: { name: string; value: string }[];
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
    rating: string;
    reviews: number;
    address: string | null;
    images: Image[];
    location: Location[];
    airport_remoteness?: number;
    beach_remoteness?: number | null;
    food?: HotelFood[];
    general?: HotelGeneral;
    infrastructure?: HotelInfrastructure;
    services?: HotelServices;
    contacts?: HotelContacts[];
};
