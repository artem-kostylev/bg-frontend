import { http } from "@/app/lib";
import type { Movement, Insurance, Transfer, General } from "@/booking/types";

export type FetchCompositionResponse = {
    general: General;
    movements: Movement[];
    insurances: Insurance[];
    transfers: Transfer[];
};

export type FetchCompositionParams = {
    ids: string[] | string;
    tours_hash: string;
};

export const fetchComposition = (body: FetchCompositionParams) => {
    const ids = Array.isArray(body.ids)
        ? body.ids.map(item => item.split("@"))
        : [body.ids.split("@")];

    return http<FetchCompositionResponse>("tour/detail", {
        method: "POST",
        body: { ids, tours_hash: body.tours_hash },
    });
};
