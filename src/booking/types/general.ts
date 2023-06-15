export type GroupTourist = {
    description: string;
    min: string;
    max: string;
};

export type Group = {
    tour_id: string;
    id: number;
    tourists: GroupTourist[];
};

export type General = {
    date_finish: string;
    date_start: string;
    duration: number;
    from: string;
    qty_tourists: number;
    groups: Group[];
    total_price: number;
};
