import type { Image } from "@/app/types";

export type AvailableDateItem = {
    accommodation_unikey: string;
    begin_date: [string, string];
    duration: number;
    price: number;
};

export type AvailableDate = {
    begin_date: string;
    items: AvailableDateItem[];
};

export type Food = {
    id: number;
    name: string;
    price: number;
    dates: AvailableDate[];
};

export type Room = {
    id: number;
    name: string;
    food: Food[];
    size: number;
    images: Image[];
};