import { http } from '@/app/lib';
import { parseFilters } from '@/app/lib';
import type { Tour } from '@/tours/types';
import type { FiltersRaw, Filters } from '@/app/types';

export type FetchRecommendedHotelsResponse = {
    children: Tour[];
    filters: Filters;
};

export const fetchRecommendedHotels = async (query: FiltersRaw) => {
    // TODO: Исправить формат на бэке
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>('location/hotels', {
        method: 'POST',
        body: {
            filters: parseFilters(query),
        },
    });

    return response as FetchRecommendedHotelsResponse;
};
