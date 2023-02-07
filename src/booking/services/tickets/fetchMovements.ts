import { http } from "@/app/lib";
import type { Movement } from "@/booking/types";

export type FetchMovementsResponse = {
    movements: Movement[];
};

export type FetchMovementsQuery = {
    tour_type?: string;
    ids?: string[] | string;
    package_tour_id?: string;
    accommodations_unikey: string[] | string;
    tour_from: string;
};

type FetchMovementsPayload = FetchMovementsQuery;

/**
 * TODO: Сложная логика прокидывания ids и accommodations_unikey
 * Если нету ids не отправлять пустой массив (Подправить на бэке)
 * Продумать как сделать проще
 * Понять для чего нужны accommodations_unikey, ids, package_tour_id, tour_type
 * И можно ли сделать как-то проще
 */

export const fetchMovements = (payload: FetchMovementsPayload) => {
    const ids = payload.ids ? (Array.isArray(payload.ids) ? payload.ids : [payload.ids]) : [];

    const accommodations_unikey = Array.isArray(payload.accommodations_unikey)
        ? [payload.accommodations_unikey]
        : [[payload.accommodations_unikey]];

    return http<FetchMovementsResponse>("tour/movements", {
        method: "POST",
        body: {
            ids,
            accommodations_unikey,
            tour_from: payload.tour_from,
            tour_type: payload.tour_type,
            package_tour_id: payload.package_tour_id,
        },
    });
};
