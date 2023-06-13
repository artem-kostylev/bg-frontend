export type ActivitySearchFilters = {
    date: string;
    time: string;
    option: string;
};

export type ActivitySearchFilter = {
    type: string;
    key: keyof ActivitySearchFilters;
    value: string;
    options: { label: string; value: string | number }[];
    allowed: string[];
};

export type ActivitySearchTicket = {
    key: string;
    label: string;
    max: number;
    min: number;
    price: number;
};
