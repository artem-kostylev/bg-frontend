import type { Meta } from "@/app/types";
import type { FiltersRaw, TourPackage, Filters } from "@/tours/types";
import { http } from "@/app/lib";
import { parseMainFilters } from "@/tours/lib";

export type FetchToursExcursionResponse = {
    meta: Meta;
    packages: TourPackage[];
    filters: Filters;
};

export type FetchToursExcursionQuery = FiltersRaw;

export type FetchToursExcursionPayload = FetchToursExcursionQuery & { page?: number };

export const FetchToursExcursion = (payload: FetchToursExcursionPayload) => {
    const { page, ...filters } = payload;

    return http<FetchToursExcursionResponse>("tour/activity", {
        method: "POST",
        body: {
            filters: parseMainFilters(filters),
            page,
        },
    });
};
