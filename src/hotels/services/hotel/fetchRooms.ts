import { http } from "@/app/lib";
import type { Room } from "@/hotels/types";
import type { TourType, FiltersRaw } from "@/tours/types";
import { parseMainFilters } from "@/tours/lib";

type Group = {
    rooms: Room[];
};

type FetchRoomsResponse = {
    groups: Group[];
    has_movements: boolean;
};

export type FetchRoomsQuery = FiltersRaw & {
    tour_type?: TourType;
    hotel_id?: number;
    accommodations_unikey?: string[][];
};

export const fetchRooms = (id: string, query: FetchRoomsQuery) => {
    const { tour_type, hotel_id, accommodations_unikey, ...filters } = query;

    const param = tour_type === "package" ? hotel_id : id;

    return http<FetchRoomsResponse>(`tour/hotel/${param}/rooms`, {
        method: "POST",
        version: 2,
        body: {
            tour_type,
            accommodations_unikey:
                accommodations_unikey ?? new Array(query.tour_tourists.length).fill([]),
            package_tour_id: tour_type === "package" ? id : undefined,
            number_in_order: tour_type === "package" ? 1 : undefined,
            filters: parseMainFilters(filters),
        },
    });
};
