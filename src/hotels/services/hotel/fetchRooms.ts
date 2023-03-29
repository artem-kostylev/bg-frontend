import { http } from "@/app/lib";
import type { Room } from "@/hotels/types";
import type { TourType, FiltersRaw } from "@/tours/types";
import { parseMainFilters } from "@/tours/lib";

type Group = {
    rooms: Room[];
};

type FetchRoomsResponse = {
    groups: Group[];
    has_next: boolean;
    has_movements: boolean;
};

export type FetchRoomsQuery = FiltersRaw & {
    tour_type?: TourType;
    hotel_id?: number[];
    accommodations_unikey?: string[][];
};

export const fetchRooms = (id: number, query: FetchRoomsQuery) => {
    const { tour_type, hotel_id, accommodations_unikey, ...filters } = query;

    const isPackage = tour_type === "package";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = {} as Record<string, any>;
    body.tour_type = tour_type;
    body.accommodations_unikey =
        accommodations_unikey ?? new Array(query.tour_tourists.length).fill([]);
    isPackage && (body.package_tour_id = id);
    isPackage && (body.number_in_order = body.accommodations_unikey[0].length + 1);
    body.filters = parseMainFilters(filters);

    return http<FetchRoomsResponse>(
        `tour/hotel/${isPackage ? hotel_id![hotel_id!.length - 1] : id}/rooms`,
        {
            method: "POST",
            version: 2,
            body,
        }
    );
};
