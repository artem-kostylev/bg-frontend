import type { HotelFood } from '@/tours/types';

export const formatFood = (food: HotelFood[]) => {
    return food.map(item => item.name).join(', ');
};

export const parseSort = (sortRaw: string) => {
    const [key, value] = sortRaw.split(':');

    return { [key]: { order: value } };
};
