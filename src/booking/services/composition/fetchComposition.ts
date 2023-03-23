import { http } from "@/app/lib";
import type { Movement, Insurance, Transfer, General } from "@/booking/types";
import type { TourType } from "@/tours/types";

export type FetchCompositionResponse = {
    general: General;
    movements: Movement[];
    insurances: Insurance[];
    transfers: Transfer[];
};

export type FetchCompositionQuery = {
    ids: string[];
    tours_hash: string;
    tour_type: TourType;
    has_movements?: string;
    accommodations_unikey: string;
};

type FetchCompositionPayload = FetchCompositionQuery;

/**
 * TODO: Так как у нас может пропускаться шаг с выбором билетов
 * поэтому нужно запрашивать параметр tour_id
 */

const fetchCompositionWithMovements = async (payload: FetchCompositionPayload) => {
    return await http<FetchCompositionResponse>("tour/detail", {
        method: "POST",
        body: { ids: payload.ids, tours_hash: payload.tours_hash },
    });
};

// const fetchCompositionWithoutMovements = async (payload: FetchCompositionPayload) => {
//     const accommodations_unikey = Array.isArray(payload.accommodations_unikey)
//         ? [payload.accommodations_unikey]
//         : [[payload.accommodations_unikey]];

//     let ids: string[][] | undefined;

//     if (!payload.ids) {
//         const response = await http<{ tour_id: string[][] }>("tour/not_movement", {
//             method: "POST",
//             body: {
//                 accommodations_unikey,
//                 tour_type: payload.tour_type,
//             },
//         });

//         ids = response.tour_id;
//     }

//     return await http<FetchCompositionResponse>("tour/detail", {
//         method: "POST",
//         body: { ids: ids ?? payload.ids },
//     });
// };

export const fetchComposition = async (payload: FetchCompositionPayload) => {
    // return payload.has_movements === "true"
    //     ? await fetchCompositionWithMovements(payload)
    //     : await fetchCompositionWithoutMovements(payload);

    return await fetchCompositionWithMovements(payload);
};
