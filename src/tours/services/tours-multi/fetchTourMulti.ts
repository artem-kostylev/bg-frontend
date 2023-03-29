import type { Meta } from "@/app/types";
import type { FiltersRaw, TourPackage, Filters, Tour } from "@/tours/types";
import { http } from "@/app/lib";
import { parseMainFilters } from "@/tours/lib";

export type FetchTourMultiResponse = {
    meta: Meta;
    package: TourPackage;
    filters: Filters;
    tours: Tour[];
};

export type FetchTourMultiQuery = FiltersRaw & {
    accommodations_unikey?: string[][];
    hotel_id: number[];
};

export const fetchTourMulti = async (package_tour_id: string, query: FetchTourMultiQuery) => {
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
    });

    const { title, description, location, images } = response.meta;

    response.package = { name: title, description, location, images };
    response.meta = { title, description };

    return response as FetchTourMultiResponse;
};
