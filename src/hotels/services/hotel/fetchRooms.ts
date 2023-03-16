import { http } from "@/app/lib";
import type { Room } from "@/hotels/types";
import type { TourType } from "@/tours/types";
import type { RawMainFilters } from "@/tours/lib";
import { parseMainFilters } from "@/tours/lib";

type Group = {
    rooms: Room[];
};

type FetchRoomsResponse = {
    groups: Group[];
    has_movements: boolean;
};

export type FetchRoomsQuery = RawMainFilters & { tour_type: TourType };

export const fetchRooms = (id: string, query: FetchRoomsQuery) => {
    const { tour_type, ...filters } = query;

    const accommodations_unikey = new Array(query.tour_tourists.length).fill([]);

    return http<FetchRoomsResponse>(`tour/hotel/${id}/rooms`, {
        method: "POST",
        version: 2,
        body: {
            tour_type,
            accommodations_unikey,
            filters: parseMainFilters(filters),
        },
    });
};
