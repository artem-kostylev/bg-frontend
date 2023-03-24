export type MainFiltersTo = {
    id: number;
    type: "location" | "hotel";
};

export type MainFiltersTourist = {
    adults: number[];
    children: number[];
    pet?: boolean;
};

export type MainFilters = Partial<{
    tour_from: number;
    tour_to: MainFiltersTo;
    tour_duration: number[];
    tour_begin_date: string[];
    tour_tourists: MainFiltersTourist[];
}>;

export type AdvancedFilters = Record<string, string | number | boolean>;

export type Filters = MainFilters & AdvancedFilters;

export type MainFiltersRaw = Omit<MainFilters, "tour_to" | "tour_tourists"> & {
    tour_to: string;
    tour_tourists: string[] | number[];
};

export type AdvancedFiltersRaw = AdvancedFilters;

export type FiltersRaw = MainFiltersRaw & AdvancedFiltersRaw;
