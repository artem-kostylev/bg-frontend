export interface AccommodationRoom {
    accommodation_unikey: string;
    board: string;
    tourists: string[];
    id: number;
    name: string;
    view: string[];
    wishes: string[];
    order_accommodation_id: number;
}

export type Accommodation = {
    id: number;
    duration: number;
    hash_rooms: string;
    date_start: string;
    date_finish: string;
    name: string;
    rooms: AccommodationRoom[];
    location: { id: number; name: string; visa: boolean }[];
};
