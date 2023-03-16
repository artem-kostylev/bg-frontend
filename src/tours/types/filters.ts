export type MainFiltersTo = {
    id: number;
    type: "location" | "hotel";
};

export type MainFiltersTourist = {
    adults: number[];
    children: number[];
    pet?: boolean;
};

export type MainFilters = {
    tour_from: number;
    tour_to: MainFiltersTo;
    tour_duration: number[];
    tour_begin_date: string[];
    tour_tourists: MainFiltersTourist[];
};

export type AdvancedFilters = Record<string, string | number | boolean>;

export type Filters = AdvancedFilters & MainFilters;
