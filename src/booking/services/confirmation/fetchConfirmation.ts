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

export const fetchConfirmation = async (payload: FetchConfirmationPayload) => {
    const response = await http<FetchConfirmationResponse>("tour/confirmation", {
        method: "POST",
        body: { ids: payload.ids[0], tours_hash: payload.tours_hash },
    });

    return response;
};
