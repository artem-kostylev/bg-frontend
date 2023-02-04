import type { Meta } from "@/app/types";
import type { Tour } from "@/tours/types";
import { http } from "@/app/lib";

export type FetchToursResponse = {
    meta: Meta;
    tours: Tour[];
};

export const fetchTours = () => {
    return http<FetchToursResponse>("tour/search", { method: "POST" });
};
