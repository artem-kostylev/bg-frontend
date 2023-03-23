import { http } from "@/app/lib";

export type Section = {
    name: string;
    type: string;
    children: Record<string, unknown>[];
};

export type FetchHomeResponse = Section[];

export const fetchHome = () => {
    return http<FetchHomeResponse>("page-structure/active");
};
