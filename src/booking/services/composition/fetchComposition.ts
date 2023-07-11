import { http, parseTourists } from '@/app/lib';
import type {
    Accommodation,
    Movement,
    Insurance,
    Transfer,
    General,
    IncludedActivity,
} from '@/booking/types';
import type { TourType } from '@/tours/types';

export type FetchCompositionResponse = {
    general: General;
    accommodations: Accommodation[];
    movements: Movement[];
    insurances: Insurance[];
    transfers: Transfer[];
    included_activities: IncludedActivity[];
};

export type FetchCompositionQuery = {
    tour_ids: string[];
    tours_hash: string;
    tour_type: TourType;
    has_movements?: 'false';
    tour_tourists?: string[];
    accommodations_unikey: string;
};

type FetchCompositionPayload = FetchCompositionQuery;

const fetchCompositionWithMovements = async (payload: FetchCompositionPayload) => {
    const response = await http<FetchCompositionResponse>('tour/detail', {
        method: 'POST',
        body: {
            tour_ids: payload.tour_ids,
            tours_hash: payload.tours_hash,
            tour_tourists: payload.tour_tourists && parseTourists(payload.tour_tourists),
        },
    });

    return response;
};

const fetchCompositionWithoutMovements = async (payload: FetchCompositionPayload) => {
    let tour_ids: string[][] | undefined;

    /**
     * Так как у нас может пропускаться шаг с выбором билетов
     * поэтому нужно запрашивать параметр tour_id
     */

    if (!payload.tour_ids) {
        const response = await http<{ tour_id: string[][] }>('tour/not_movement', {
            method: 'POST',
            body: {
                accommodations_unikey: payload.accommodations_unikey,
                tour_type: payload.tour_type,
                tour_tourists: payload.tour_tourists && parseTourists(payload.tour_tourists),
            },
        });

        tour_ids = response.tour_id;
    }

    return await http<FetchCompositionResponse>('tour/detail', {
        method: 'POST',
        body: {
            tour_ids: tour_ids ?? payload.tour_ids,
            tour_tourists: payload.tour_tourists && parseTourists(payload.tour_tourists),
        },
    });
};

export const fetchComposition = async (payload: FetchCompositionPayload) => {
    return payload.has_movements === 'false'
        ? await fetchCompositionWithoutMovements(payload)
        : await fetchCompositionWithMovements(payload);
};
