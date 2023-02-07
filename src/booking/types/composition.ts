export type General = {
    date_finish: string;
    date_start: string;
    duration: number;
    from: string;
    qty_tourists: number;
};

export type Transfer = {
    capacity: number;
    date: string;
    description: string;
    from: string;
    has_additional: boolean;
    id: number;
    name: string;
    route: string;
    to: string;
    type: string;
    vehicle: string;
};

export type Insurance = {
    id: number;
    name: string;
    description: string;
};

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
