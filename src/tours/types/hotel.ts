import type { Image, Location } from "@/app/types";

export type HotelFood = {
    id: number;
    name: string;
    description: string;
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
    food: HotelFood[];
};
