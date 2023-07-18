import { showError } from '#imports';
import { http } from '@/app/lib';
import type { Meta } from '@/app/types';
import type { Filters, FiltersRaw } from '@/app/types';
import { parseFilters } from '@/app/lib';
import type { Tour } from '@/tours/types';
import { parseSort } from '@/tours/lib';

export type FetchToursResponse = {
    meta: Meta;
    filters: Filters;
    filter_alternatives: Filters;
    tours: Tour[];
    alternatives: Tour[];
    has_next: boolean;
};

export type FetchToursPayload = FiltersRaw;

const path: Record<string, string> = {
    'tours-multi-search': 'tour/multi',
    'tours-activity-search': 'tour/activity',
    'tours-search': 'tour/search',
    'hotels-search': 'hotel/search',
};

export const fetchTours = async (
    filters: FetchToursPayload,
    name: string,
    page: number,
    sortRaw: string
) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>(path[name], {
        method: 'POST',
        body: {
            filters: parseFilters(filters),
            page,
            sort: parseSort(sortRaw),
        },
        onResponseError: ({ response }) => {
            showError({ statusCode: response.status });
        },
    });

    if (response.packages) {
        // TODO: Исправить это на бэке, привести к единому формату
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.tours = response.packages.map((item: any) => ({
            excursion_included: item.excursion_included,
            flight_included: item.flight_included,
            instant_booking: item.instant_booking,
            insurance_included: item.insurance_included,
            transfer_included: item.transfer_included,
            price: item.price,
            qty_hotels: item.qty_hotels,
            hotel: {
                id: item.id,
                images: item.images,
                location: item.location,
                name: item.name,
            },
        }));

        delete response.packages;
    }

    //@MOCK
    const coordinates = [
        [37.958362, 55.755934],
        [37.658362, 55.555934],
        [37.756372, 55.654944],
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.tours = response.tours.map((item: any, index: number) => ({
        ...item,
        hotel: {
            ...item.hotel,
            coordinates: coordinates[index],
        },
    }));

    return response as FetchToursResponse;
};
