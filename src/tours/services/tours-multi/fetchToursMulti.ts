import type { Meta } from "@/app/types";
import type { FiltersRaw, TourPackage, Filters } from "@/tours/types";
import { http } from "@/app/lib";
import { parseMainFilters } from "@/tours/lib";

export type FetchToursMultiResponse = {
    meta: Meta;
    packages: TourPackage[];
    filters: Filters;
};

export type FetchToursMultiQuery = FiltersRaw;

export type FetchToursMultiPayload = FetchToursMultiQuery & { page?: number };

export const fetchToursMulti = (payload: FetchToursMultiPayload) => {
    const { page, ...filters } = payload;

    return http<FetchToursMultiResponse>("tour/multi", {
        method: "POST",
        body: {
            filters: parseMainFilters(filters),
            page,
        },
    });
};
