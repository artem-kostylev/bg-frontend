import type { Meta } from "@/app/types";
import type { FiltersRaw, Tour, Filters } from "@/tours/types";
import { http } from "@/app/lib";
import { parseMainFilters } from "../../lib/helpers";

export type FetchToursResponse = {
    meta: Meta;
    tours: Tour[];
    filters: Filters;
};

export type FetchToursQuery = FiltersRaw;

export type FetchToursPayload = FetchToursQuery & { page?: number };

export const fetchTours = (payload: FetchToursPayload) => {
    const { page, ...filters } = payload;

    return http<FetchToursResponse>("tour/search", {
        method: "POST",
        body: {
            filters: parseMainFilters(filters),
            page,
        },
    });
};
