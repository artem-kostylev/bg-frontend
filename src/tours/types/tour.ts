import type { Hotel } from '@/tours/types';

export type ShortHotel = Hotel & {
    food: {
        id: number;
        name: string;
        description: string;
    }[];
};

export type TourIncluded = {
    flight_included?: boolean;
    transfer_included?: boolean;
    insurance_included?: boolean;
    excursion_included?: boolean;
    instant_booking?: boolean;
    accommodation_included?: boolean;
};

export type Tour = {
    hotel: ShortHotel;
    price: number;
} & TourIncluded;

export type TourType = 'hotel' | 'package';
