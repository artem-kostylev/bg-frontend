import type { Room } from '@/booking/types';
import type { Hotel } from '@/tours/types';

export type AlternativeRoom = Room & { tour_id: number };

export type AlternativeHotel = Hotel & {
    food: {
        id: number;
        name: string;
        description: string;
    }[];
    total_price: number;
    rooms: AlternativeRoom[];
};
