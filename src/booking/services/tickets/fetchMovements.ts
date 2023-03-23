import { http } from "@/app/lib";
import type { Movement } from "@/booking/types";

export type FetchMovementsResponse = {
    direction: string;
    movements: Movement[];
    price: number;
};

export type FetchMovementsQuery = {
    tour_type?: string;
    ids?: string[];
    package_tour_id?: string;
    accommodations_unikey: string[];
    tour_from: string;
};

type FetchMovementsPayload = FetchMovementsQuery;

export const fetchMovements = async (payload: FetchMovementsPayload) => {
    const response = await http<FetchMovementsResponse>("tour/movements", {
        method: "POST",
        body: {
            ids: payload.ids ?? [],
            accommodations_unikey: payload.accommodations_unikey,
            tour_from: payload.tour_from,
            tour_type: payload.tour_type,
            package_tour_id: payload.package_tour_id,
        },
    });

    /**
     * TODO: Возвращать direction и price с бэка
     */
    response.direction = response.movements[0].direction;
    response.price = Math.min(...response.movements.map(movement => movement.price));

    return response;
};
