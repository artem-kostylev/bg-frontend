import { http } from "@/app/lib";
import type { Movement } from "@/booking/types";

export type FetchVoyageResponse = Movement;

export const fetchVoyage = async (flight_hash: Movement["flight_hash"]) => {
    const response = await http<FetchVoyageResponse>("voyage/detail", {
        method: "POST",
        body: { flight_hash },
    });

    // TODO: возвращать с бэка
    response.transport_hub_departure = response.segments[0].transport_hub_departure;
    response.transport_hub_arrival =
        response.segments[response.segments.length - 1].transport_hub_arrival;

    return response;
};
