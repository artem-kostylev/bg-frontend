import { http } from '@/app/lib';
import type { ActivitySearchFilter, ActivitySearchTicket } from '@/booking/types';

export type FetchActivitySearchPayload = {
    id: number;
    dates?: string[];
    option?: number;
    time?: string;
};

export type FetchActivitySearchResponse = {
    filters: ActivitySearchFilter[];
    tickets: ActivitySearchTicket[];
};

export const fetchActivitySearch = async (payload: FetchActivitySearchPayload) => {
    return await http<FetchActivitySearchResponse>(`activity/search`, {
        method: 'POST',
        body: payload,
    });
};
