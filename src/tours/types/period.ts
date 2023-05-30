export type PeriodItem = {
    duration: number;
    price: number;
    tour_id: string[][];
};

export type Period = {
    begin_date: string;
    items: PeriodItem[];
};
