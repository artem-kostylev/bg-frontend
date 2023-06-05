import { http } from '@/app/lib/http';
import type { Filters } from '@/app/types';
import type { Activity, TicketInfo } from '@/booking/types';

export type FetchActivitySearchResponse = {
    activity_item_id: number;
    filters: {
        allowed: string[];
        key: string;
        type: string;
        value: string;
        options: {
            label: string;
            value: string;
        }[];
    }[];
    tickets: TicketInfo[];
};

export const fetchActivitySearch = async (
    filters: Filters,
    activity: Activity,
    status?: string
) => {
    if (status === 'include') return;

    return await http<FetchActivitySearchResponse>('activity/search', {
        body: {
            id: activity.id,
            dates: activity.date,
            ...filters,
        },
        method: 'post',
    });
};
