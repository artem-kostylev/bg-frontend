import { http } from '@/app/lib';
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
    ids: string[];
    tours_hash: string;
    tour_type: TourType;
    has_movements?: 'false';
    accommodations_unikey: string;
};

type FetchCompositionPayload = FetchCompositionQuery;

const fetchCompositionWithMovements = async (payload: FetchCompositionPayload) => {
    const response = await http<FetchCompositionResponse>('tour/detail', {
        method: 'POST',
        body: { ids: payload.ids, tours_hash: payload.tours_hash },
    });

    return response;
};

const fetchCompositionWithoutMovements = async (payload: FetchCompositionPayload) => {
    let ids: string[][] | undefined;

    /**
     * Так как у нас может пропускаться шаг с выбором билетов
     * поэтому нужно запрашивать параметр tour_id
     */

    if (!payload.ids) {
        const response = await http<{ tour_id: string[][] }>('tour/not_movement', {
            method: 'POST',
            body: {
                accommodations_unikey: payload.accommodations_unikey,
                tour_type: payload.tour_type,
            },
        });

        ids = response.tour_id;
    }

    return await http<FetchCompositionResponse>('tour/detail', {
        method: 'POST',
        body: { ids: ids ?? payload.ids },
    });
};

export const fetchComposition = async (payload: FetchCompositionPayload) => {
    return payload.has_movements === 'false'
        ? await fetchCompositionWithoutMovements(payload)
        : await fetchCompositionWithMovements(payload);
};
