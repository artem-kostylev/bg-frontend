import type { Meta } from "@/app/types";
import type { FiltersRaw, TourPackage, Filters } from "@/tours/types";
import { http } from "@/app/lib";
import { parseMainFilters } from "@/tours/lib";
import { showError } from "#imports";

export type FetchToursPackageResponse = {
    meta: Meta;
    packages: TourPackage[];
    filters: Filters;
};

export type FetchToursPackageQuery = FiltersRaw;

export type FetchToursPackagePayload = FetchToursPackageQuery & { page?: number };

export const fetchToursPackage = (
    payload: FetchToursPackagePayload,
    type: "activity" | "multi"
) => {
    const { page, ...filters } = payload;

    return http<FetchToursPackageResponse>(`tour/${type}`, {
        method: "POST",
        body: {
            filters: parseMainFilters(filters),
            page,
        },
        onResponseError: ({ response }) => {
            showError({ statusCode: response.status });
        },
    });
};
