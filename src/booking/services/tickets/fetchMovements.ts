import { http, parseTo, parseTourists } from "@/app/lib";
import type { Movement } from "@/booking/types";
import { showError } from "#imports";
import type { Meta, Filters } from "@/app/types";

export type FetchMovementsResponse = {
    direction: string;
    movements: Movement[];
    price: number | null;
    meta: Meta;
    general: {
        qty_hotels: number;
        qty_movements: number;
    };
};

export type FetchMovementsQuery = {
    tour_type?: string;
    ids?: string[];
    package_tour_id?: string;
    accommodations_unikey?: string[];
    tour_from: string;
    tour_to?: string;
    tour_begin_date?: string;
    tour_tourists?: string[];
};

type FetchMovementsPayload = FetchMovementsQuery;

type FetchMovementsBody = Omit<FetchMovementsQuery, "tour_tourists" | "tour_to"> &
    Pick<Filters, "tour_tourists"> & { tour_to?: number | string };

export const fetchMovements = async (
    payload: FetchMovementsPayload,
    name: "booking-tickets" | "avia-search"
) => {
    const body: FetchMovementsBody = {
        ids: payload.ids ?? [],
        accommodations_unikey: payload.accommodations_unikey,
        tour_from: payload.tour_from,
        tour_type: name === "avia-search" ? "avia" : payload.tour_type,
        package_tour_id: payload.package_tour_id,
        tour_begin_date: payload.tour_begin_date?.[0],
    };

    if (name === "avia-search") {
        body.tour_to = payload.tour_to && parseTo(payload.tour_to).id;
        body.tour_tourists = payload.tour_tourists && parseTourists(payload.tour_tourists);
    }

    const response = await http<FetchMovementsResponse>("tour/movements", {
        method: "POST",
        body,
        onResponseError: ({ response }) => {
            showError({ statusCode: response.status });
        },
    });

    return response;
};
