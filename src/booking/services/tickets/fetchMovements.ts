import { http } from "@/app/lib";
import type { Movement } from "@/booking/types";
import { showError } from "#imports";

export type FetchMovementsResponse = {
    direction: string;
    movements: Movement[];
    price: number;
    general: {
        qty_hotels: number;
        qty_movements: number;
    };
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
        onResponseError: ({ response }) => {
            showError({ statusCode: response.status });
        },
    });

    /**
     * TODO: Возвращать direction и price с бэка
     */
    response.direction = response.movements[0].direction;
    response.price = Math.min(...response.movements.map(movement => movement.price));

    /**
     * TODO: Исправить на бэке
     */
    response.movements.forEach(movement => {
        movement.time_departure = movement.time_departure.slice(0, -3);
        movement.time_arrival = movement.time_arrival.slice(0, -3);
    });

    return response;
};
