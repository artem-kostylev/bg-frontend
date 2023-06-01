import { http } from '@/app/lib';
import type { FiltersRaw } from '@/app/types';
import { parseFilters } from '@/app/lib';
import type { Room, TourType } from '@/tours/types';

export type RoomAggregations = {
    duration: number[];
    begin_date: string[];
};

type Group = {
    rooms: Room[];
    aggregations: RoomAggregations;
};

type FetchRoomsResponse = {
    groups: Group[];
    general: {
        qty_movements: number;
        qty_hotels: number;
    };
    has_next: boolean;
    has_movements: boolean;
};

export type FetchRoomsQuery = FiltersRaw & {
    tour_type?: TourType;
    hotel_ids?: number[];
    accommodations_unikey?: string[][];
};

export const fetchRooms = (id: number, query: FetchRoomsQuery) => {
    const { tour_type, hotel_ids, accommodations_unikey, ...filters } = query;

    const isPackage = tour_type === 'package';
    const param = isPackage ? hotel_ids![hotel_ids!.length - 1] : id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = {} as Record<string, any>;
    body.tour_type = tour_type;
    body.accommodations_unikey =
        accommodations_unikey ?? new Array(query.tour_tourists!.length).fill([]);

    isPackage && (body.package_tour_id = id);
    isPackage && (body.number_in_order = body.accommodations_unikey[0].length + 1);

    body.filters = parseFilters(filters);

    return http<FetchRoomsResponse>(`tour/hotel/${param}/rooms`, {
        method: 'POST',
        version: 2,
        body,
    });
};
