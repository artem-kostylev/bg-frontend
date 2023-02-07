import { http } from "@/app/lib";
import type { Movement, Insurance, Transfer, General } from "@/booking/types";

export type FetchConfirmationResponse = {
    general: General;
    movements: Movement[];
    insurances: Insurance[];
    transfers: Transfer[];
};

export type FetchConfirmationQuery = {
    ids: string[] | string;
    tours_hash: string;
};

type FetchConfirmationPayload = FetchConfirmationQuery;

/**
 * TODO: Можно обьединить с endpoint tour/detail
 * так как отличия только в том что мы дополнительно передаем выбранные transfers и activities
 * и соответсвенно они обогощаются данными и возвращаются
 */

export const fetchConfirmation = (payload: FetchConfirmationPayload) => {
    const ids = Array.isArray(payload.ids)
        ? payload.ids.map(item => item.split("@"))
        : [payload.ids.split("@")];

    return http<FetchConfirmationResponse>("tour/confirmation", {
        method: "POST",
        body: { ids, tours_hash: payload.tours_hash },
    });
};
