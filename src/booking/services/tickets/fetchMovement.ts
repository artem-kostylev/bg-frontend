import { http } from "@/app/lib";
import type { Movement } from "@/booking/types";

export type FetchMovementResponse = Movement;

export type FetchMovementQuery = {
    tour_type?: string;
    ids?: string[] | string;
    package_tour_id?: string;
    accommodations_unikey: string[] | string;
    tour_from: string;
};

export type FetchMovementPayload = FetchMovementQuery & { flight_hash: Movement["flight_hash"] };

/**
 * TODO: Те же замечания, что и в tour/movements (fetchMovements)
 */

export const fetchMovement = (payload: FetchMovementPayload) => {
    const ids = payload.ids ? (Array.isArray(payload.ids) ? payload.ids : [payload.ids]) : [];

    const accommodations_unikey = Array.isArray(payload.accommodations_unikey)
        ? [payload.accommodations_unikey]
        : [[payload.accommodations_unikey]];

    return http<FetchMovementResponse>("tour/movement", {
        method: "POST",
        body: {
            ids,
            accommodations_unikey,
            tour_from: payload.tour_from,
            tour_type: payload.tour_type,
            flight_hash: payload.flight_hash,
            package_tour_id: payload.package_tour_id,
        },
    });
};
