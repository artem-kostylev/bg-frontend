import { http } from '@/app/lib';
import type { Filters } from '@/app/types';

export type FetchNavigationPayload = {
    tour_type?: 'packages';
    status:
        | 'packages'
        | 'hotels'
        | 'accommodations'
        | 'tickets'
        | 'composition'
        | 'confirmation'
        | 'payment';
    filters: Filters;
    package_tour_id?: number;
    accommodations_unikey: string[];
    route_id?: string[];
    tour_id?: string[];
};

export const fetchNavigation = async (payload: FetchNavigationPayload) => {
    const response = await http(`tour/navigation`, { method: 'POST', body: payload });
    return response;
};
