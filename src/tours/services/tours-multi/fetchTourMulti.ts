import type { Meta } from "@/app/types";
import type { FiltersRaw, TourPackage, Filters, Tour } from "@/tours/types";
import { http } from "@/app/lib";
import { parseMainFilters } from "@/tours/lib";

export type FetchTourMultiResponse = {
    meta: Meta;
    package: Pick<TourPackage, "name" | "location"> & { description: string };
    filters: Filters;
    tours: Tour[];
};

export type FetchTourMultiQuery = FiltersRaw & { hotel_id: number };

export const fetchTourMulti = async (package_tour_id: string, query: FetchTourMultiQuery) => {
    const accommodations_unikey = new Array(query.tour_tourists.length).fill([]);

    // TODO: Исправить формат на бэке
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>("tour/hotels", {
        method: "POST",
        body: {
            package_tour_id,
            accommodations_unikey,
            number_in_order: 1,
            filters: parseMainFilters(query),
        },
    });

    const { title, description, location } = response.meta;

    response.package = { name: title, description, location };
    response.meta = { title, description };

    return response as FetchTourMultiResponse;
};