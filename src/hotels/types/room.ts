import type { Image } from "@/app/types";

export type AvailableDateItem = {
    accommodation_unikey: string;
    accommodations_unikey?: string[];
    begin_date: string[];
    duration: number;
    price: number;
    index?: number;
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
