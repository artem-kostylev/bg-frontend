export type Movement = {
    type: string;
    date_arrival: string;
    date_departure: string;
    direction: string;
    duration: number;
    flight_hash: string;
    is_regular: string;
    is_route_last: boolean;
    price: number;
    priority_status: string | null;
    qty_fares: string;
    route_id: string;
    time_arrival: string;
    time_departure: string;
    tour_id: string;
};
