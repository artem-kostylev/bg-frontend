export type TransportCompany = {
    name: string;
    key: string;
};

export type Fare = {
    fare_id: number;
    fare_class: string;
    fare_name: string;
    route_id: string;
    tour_id: string;
    tours_hash: string;
    price: number;
    baggage: { key: string; label: string };
    carryon: { key: string; label: string };
    ticket_refund: { key: string; label: string };
    ticket_exchange: { key: string; label: string };
};

export type TransportHub = {
    id: number;
    name: string;
    code: string;
};

export type Stop = {
    date_end: string;
    date_start: string;
    duration: number;
    time_end: string;
    time_start: string;
    transport_hub: TransportHub;
};

export type Movement = {
    fares: Fare[];
    type: string;
    date_arrival: string;
    date_departure: string;
    direction: string;
    duration: number;
    flight_hash: string;
    is_regular: "regular" | "charter" | "virtual";
    is_route_last: boolean;
    price: number;
    priority_status: string | null;
    qty_fares: string;
    route_id: string;
    time_arrival: string;
    time_departure: string;
    tour_id: string;
    stops: Stop[];
    transport_hub_arrival: TransportHub;
    transport_hub_departure: TransportHub;
    fare: { name: string };
    transport_company: TransportCompany[];
};
