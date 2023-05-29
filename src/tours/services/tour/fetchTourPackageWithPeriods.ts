import { showError } from '#imports';
import { http } from '@/app/lib';
import { parseFilters } from '@/app/lib';
import type { Meta } from '@/app/types';
import type { TourPackage, Period } from '@/tours/types';
import type { FiltersRaw, Filters } from '@/app/types';
import { omit } from 'lodash-es';

export type FetchTourPackageWithPeriodsResponse = {
    meta: Meta;
    package: TourPackage;
    filters: Filters;
    dates: Period[];
};

export type FetchTourPackageWithPeriodsQuery = FiltersRaw & {
    accommodations_unikey?: string[][];
    hotel_ids: number[];
    qty_hotels?: number;
};

export const fetchTourPackageWithPeriods = async (
    package_tour_id: string | number,
    query: FetchTourPackageWithPeriodsQuery
) => {
    const filters = omit(query, ['accommodations_unikey', 'hotel_ids', 'tour_type', 'qty_hotels']);

    // TODO: Исправить формат на бэке
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>('tour/period', {
        method: 'POST',
        body: {
            package_tour_id: +package_tour_id,
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

    return response as FetchTourPackageWithPeriodsResponse;
};
