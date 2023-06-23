import type { FiltersRaw } from '@/app/types';
import { http, parseFilters } from '@/app/lib';
import type { Navigation } from '@/app/types';

export type FetchNavigationQuery = FiltersRaw & {
    tour_type?: 'package' | 'classic';
    package_tour_id?: number;
    accommodations_unikey?: string[];
    route_id?: string[];
    tour_id?: string[];
    hotel_ids?: number[];
};

export type FetchNavigationResponse = Navigation[];

export const fetchNavigation = async (
    name: string,
    params: { id: string },
    query: FetchNavigationQuery
) => {
    const { package_tour_id, tour_type, accommodations_unikey, tour_id, hotel_ids, ...filters } =
        query;

    const isPackage = ['tours-multi-id', 'tours-activity-id'].includes(name);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = {} as Record<string, any>;
    payload.filters = parseFilters(filters);
    payload.tour_type = tour_type ?? (isPackage ? 'package' : undefined);
    isPackage && (payload.package_tour_id = Number(package_tour_id ?? params.id));
    accommodations_unikey && (payload.accommodations_unikey = accommodations_unikey);
    tour_id && (payload.tour_id = tour_id);
    hotel_ids && (payload.hotel_ids = hotel_ids);

    if (isPackage) {
        payload.status = 'accommodations';
    }

    const response = await http<FetchNavigationResponse>(`tour/navigation`, {
        method: 'POST',
        body: payload,
    });

    return response;
};
