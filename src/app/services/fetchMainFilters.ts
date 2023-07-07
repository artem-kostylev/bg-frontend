import type { FiltersRaw, Filters } from '@/app/types';
import { http, parseFilters } from '@/app/lib';

export type FetchMainFiltersPayload = FiltersRaw;
export type FetchMainFiltersResponse = {
    data: Filters;
};

export const fetchMainFilters = async (payload: FetchMainFiltersPayload) => {
    const response = await http<FetchMainFiltersResponse>(`tour/filters`, {
        method: 'POST',
        body: { filters: parseFilters(payload) },
    });

    return response.data;
};
