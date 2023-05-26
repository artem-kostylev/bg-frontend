export type Accommodation = {
    date_start: string;
    date_finish: string;
    duration: number;
    hash_rooms: string;
    id: number;
    location: { id: number; name: string; visa: boolean }[];
    name: string;
    rooms: RoomCard[];
};

export interface RoomCard {
    accommodation_unikey: string;
    board: string;
    tourists: string[];
    id: number;
    name: string;
    view: string[];
    wishes: string[];
    order_accommodation_id: number;
}
