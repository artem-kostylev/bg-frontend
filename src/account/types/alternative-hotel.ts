import type { Room } from '@/booking/types';
import type { Room as RoomInfo } from '@/tours/types';
import type { ShortHotel } from '@/tours/types';

export type AlternativeRoom = Room & { tour_id: number; group_id: number };

export type AlternativeHotel = ShortHotel & {
    total_price: number;
    rooms: AlternativeRoom[];
};

export type AlternativeHotelInfoRoom = RoomInfo & { tour_id: number; group_id: number };

export type AlternativeHotelInfo = {
    id: number;
    total_price: number;
    rooms: AlternativeHotelInfoRoom[];
};
