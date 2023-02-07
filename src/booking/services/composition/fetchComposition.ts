import { http } from "@/app/lib";
import type { Movement, Insurance, Transfer, General } from "@/booking/types";

export type FetchCompositionResponse = {
    general: General;
    movements: Movement[];
    insurances: Insurance[];
    transfers: Transfer[];
};

export const fetchComposition = () => {
    return http<FetchCompositionResponse>("tour/detail");
};
