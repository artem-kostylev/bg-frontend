import { http } from '@/app/lib';
import type { HotelRating } from '@/tours/types';

type FetchHotelRatingResponse = {
    data: HotelRating;
};

export const fetchHotelRating = async (id: string | number) => {
    // TODO: Исправить это на бэке, привести к единому формату (убрать "meta")
    const response = await http<FetchHotelRatingResponse>(`ratings/hotels/${id}`);
    return response.data;
};
