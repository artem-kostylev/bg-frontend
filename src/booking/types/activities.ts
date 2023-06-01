export type Activity = {
    id: number;
    status: 'include' | 'additionally';
    type: 'excursion' | 'multi_day_excursion';
    price_type: 'per_person' | 'unit';
    price: number;
    date: string[];
    duration: number;
    name: string;
    description: string;
    image: {
        url: string;
    };
    selected?: boolean;
};

export type IncludedActivity = {
    price: number;
    icons: string[];
    tour_id: string[];
    tour_name: string;
    all_activities: Activity[];
    tour_description: string;
};

export type ActivityInfo = {
    id: number;
    name: string;
    short_description: string;
    description: string;
    included: string[];
    not_included: string[];
    duration: number | number[];
    images: {
        url: string;
    }[];
};

export type Tickets = {
    [k: string]: number;
};

export type Ticket = {
    price_type: keyof Tickets;
    qty: number;
};

export type TicketInfo = {
    label: string;
    key: string;
    price: number;
    min: number;
    max: number;
};

export interface ActivityTicket {
    id: number;
    activity: ActivityInfo;
    price: number;
    prices: {
        [k: string]: {
            price: number;
            qty: number;
        };
    };
    ticket: Ticket[];
}
