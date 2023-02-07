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
};

type FetchCompositionPayload = FetchCompositionQuery;

export const fetchComposition = (payload: FetchCompositionPayload) => {
    const ids = Array.isArray(payload.ids)
        ? payload.ids.map(item => item.split("@"))
        : [payload.ids.split("@")];

    return http<FetchCompositionResponse>("tour/detail", {
        method: "POST",
        body: { ids, tours_hash: payload.tours_hash },
    });
};
