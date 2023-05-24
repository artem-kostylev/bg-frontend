import type { HotelFood } from '@/tours/types';

export const formatFood = (food: HotelFood[]) => {
    return food.map(item => item.name).join(', ');
};
