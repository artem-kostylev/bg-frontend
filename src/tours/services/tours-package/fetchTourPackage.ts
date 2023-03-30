import { http } from "@/app/lib";
import { parseMainFilters } from "@/tours/lib";
import type { Meta } from "@/app/types";
import type { FiltersRaw, TourPackage, Filters, Tour } from "@/tours/types";
import { showError } from "#imports";

export type FetchTourPackageResponse = {
    meta: Meta;
    package: TourPackage;
    filters: Filters;
    tours: Tour[];
};

export type FetchTourPackageQuery = FiltersRaw & {
    accommodations_unikey?: string[][];
    hotel_ids: number[];
};

export const fetchTourPackage = async (package_tour_id: string, query: FetchTourPackageQuery) => {
    let { accommodations_unikey } = query;

    accommodations_unikey = accommodations_unikey ?? new Array(query.tour_tourists.length).fill([]);
    const number_in_order = accommodations_unikey[0].length + 1;

    // TODO: Исправить формат на бэке
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>("tour/hotels", {
        method: "POST",
        body: {
            package_tour_id: +package_tour_id,
            accommodations_unikey,
            number_in_order,
            filters: parseMainFilters(query),
        },
        onResponseError: ({ response }) => {
            showError({ statusCode: response.status });
        },
    });

    const { title, description, location, images } = response.meta;

    response.package = { name: title, description, location, images };
    response.meta = { title, description };

    return response as FetchTourPackageResponse;
};
