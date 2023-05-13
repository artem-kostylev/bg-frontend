import type { Location } from "@/app/types";

export type AccommodationRoom = {
    id: number;
    tourists: string[];
    accommodation_unikey: string;
    name: string;
    board: string;
    view: string[];
    group_id: number;
};

export type Accommodation = {
    id: number;
    name: string;
    location: Location[];
    date_start: string;
    date_finish: string;
    duration: number;
    rooms: AccommodationRoom[];
};
