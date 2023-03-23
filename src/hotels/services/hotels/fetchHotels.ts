import type { Meta } from "@/app/types";
import type { FiltersRaw, Tour, Filters } from "@/tours/types";
import { http } from "@/app/lib";
import { parseMainFilters } from "@/tours/lib";

export type FetchHotelsResponse = {
    meta: Meta;
    filters: Filters;
    tours: Tour[];
};

export type FetchHotelsQuery = FiltersRaw;

export type FetchHotelsPayload = FetchHotelsQuery & { page?: number };

export const fetchHotels = (payload: FetchHotelsPayload) => {
    const { page, ...filters } = payload;

    return http<FetchHotelsResponse>("hotel/search", {
        method: "POST",
        body: {
            filters: parseMainFilters(filters),
            page,
        },
    });
};
