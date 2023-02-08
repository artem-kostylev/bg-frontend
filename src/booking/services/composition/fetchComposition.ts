import { http } from "@/app/lib";
import type { Movement, Insurance, Transfer, General } from "@/booking/types";

export type FetchCompositionResponse = {
    general: General;
    movements: Movement[];
    insurances: Insurance[];
    transfers: Transfer[];
};

export type FetchCompositionQuery = {
    ids: string[] | string;
    tours_hash: string;
    tour_type: "hotel";
    has_movements: string;
    accommodations_unikey: string;
};

type FetchCompositionPayload = FetchCompositionQuery;

/**
 * TODO: Так как у нас может пропускаться шаг с выбором билетов
 * поэтому нужно запрашивать параметр tour_id
 */

const fetchCompositionWithMovements = async (payload: FetchCompositionPayload) => {
    const ids = Array.isArray(payload.ids)
        ? payload.ids.map(item => item.split("@"))
        : [payload.ids.split("@")];

    return await http<FetchCompositionResponse>("tour/detail", {
        method: "POST",
        body: { ids, tours_hash: payload.tours_hash },
    });
};

const fetchCompositionWithoutMovements = async (payload: FetchCompositionPayload) => {
    const accommodations_unikey = Array.isArray(payload.accommodations_unikey)
        ? [payload.accommodations_unikey]
        : [[payload.accommodations_unikey]];

    let ids: string[][] | undefined = undefined;

    if (!payload.ids) {
        const response = await http<{ tour_id: string[][] }>("tour/not_movement", {
            method: "POST",
            body: {
                accommodations_unikey,
                tour_type: payload.tour_type,
            },
        });

        ids = response.tour_id;
    }

    return await http<FetchCompositionResponse>("tour/detail", {
        method: "POST",
        body: { ids: ids ?? payload.ids },
    });
};

export const fetchComposition = async (payload: FetchCompositionPayload) => {
    return payload.has_movements
        ? await fetchCompositionWithoutMovements(payload)
        : await fetchCompositionWithMovements(payload);
};
