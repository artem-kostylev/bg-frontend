import { http } from "@/app/lib";
import type { Movement } from "@/booking/types";

export type FetchMovementResponse = Movement;

export type FetchMovementQuery = {
    ids?: string[];
    tour_type?: string;
    package_tour_id?: string;
    accommodations_unikey: string[];
    tour_from: string;
};

export type FetchMovementPayload = FetchMovementQuery & { flight_hash: Movement["flight_hash"] };

export const fetchMovement = (payload: FetchMovementPayload) => {
    return http<FetchMovementResponse>("tour/movement", {
        method: "POST",
        body: {
            ids: payload.ids,
            accommodations_unikey: payload.accommodations_unikey,
            tour_from: payload.tour_from,
            tour_type: payload.tour_type,
            flight_hash: payload.flight_hash,
            package_tour_id: payload.package_tour_id,
        },
    });
};
