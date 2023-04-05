import { http } from "@/app/lib";
import type { Document } from "@/account/types";

type FetchTripsResponse = {
    data: Document[];
};

export const fetchTrips = async () => {
    const { data } = await http<FetchTripsResponse>("tourists_documents/list");
    return data;
};
