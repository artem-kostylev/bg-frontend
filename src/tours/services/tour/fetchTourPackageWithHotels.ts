import { showError } from '#imports';
import { http } from '@/app/lib';
import { parseFilters } from '@/app/lib';
import type { Meta } from '@/app/types';
import type { TourPackage, Tour } from '@/tours/types';
import type { FiltersRaw, Filters } from '@/app/types';
import omit from 'lodash.omit';

export type FetchTourPackageWithHotelsResponse = {
    meta: Meta;
    package: TourPackage;
    filters: Filters;
    tours: Tour[];
};

export type FetchTourPackageWithHotelsQuery = FiltersRaw & {
    accommodations_unikey?: string[][];
    hotel_ids: number[];
};

export const fetchTourPackageWithHotels = async (
    package_tour_id: string | number,
    query: FetchTourPackageWithHotelsQuery
) => {
    const filters = omit(query, ['accommodations_unikey', 'hotel_ids', 'tour_type']);

    const uniKey = query.accommodations_unikey ?? new Array(query.tour_tourists!.length).fill([]);
    const number_in_order = uniKey[0].length + 1;

    // TODO: Исправить формат на бэке
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>('tour/hotels', {
        method: 'POST',
        body: {
            package_tour_id: +package_tour_id,
            accommodations_unikey: uniKey,
            number_in_order,
            filters: parseFilters(filters),
        },
        onResponseError: ({ response }) => {
            showError({ statusCode: response.status });
        },
    });

    // TODO: Не присылать с бэка
    response.filters['component.tour.package_id'] = undefined;
    response.filters['tour.is_multi_living'] = undefined;

    const { title, description, location, images } = response.meta;

    response.package = { name: title, description, location, images };
    response.meta = { title, description };

    return response as FetchTourPackageWithHotelsResponse;
};
