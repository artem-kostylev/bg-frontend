import type { Meta } from "@/app/types";
import type { Filters, Tour } from "@/tours/types";
import { http } from "@/app/lib";

export type FetchToursResponse = {
    meta: Meta;
    tours: Tour[];
};

export type FetchToursQuery = Filters;

export type FetchToursPayload = FetchToursQuery & { page?: number };

export const fetchTours = (payload: FetchToursPayload) => {
    return http<FetchToursResponse>("tour/search", { method: "POST", body: payload });
};
