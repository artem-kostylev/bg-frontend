import { http } from '@/app/lib';
import type {
    ActivitySearchFilter,
    ActivitySearchFilters,
    ActivitySearchTicket,
} from '@/booking/types';

export type FetchActivitySearchPayload = {
    id: number;
    dates: string[];
    date?: string;
    option?: number | string;
    time?: string;
};

export type FetchActivitySearchResponse = {
    filters: ActivitySearchFilter[];
    tickets: ActivitySearchTicket[];
    activity_item_id: number;
};

export const fetchActivitySearch = async (
    id: number,
    dates: string[],
    filters: ActivitySearchFilters
) => {
    const payload: FetchActivitySearchPayload = { id, dates };

    filters.date && (payload.date = filters.date);
    filters.time && (payload.time = filters.time);
    filters.option && (payload.option = filters.option);

    return await http<FetchActivitySearchResponse>(`activity/search`, {
        method: 'POST',
        body: payload,
    });
};
