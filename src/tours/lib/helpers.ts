import type {
    MainFilters,
    FiltersRaw,
    MainFiltersTo,
    MainFiltersTourist,
    Filters,
    MainFiltersRaw,
} from "@/tours/types";

export const parseTo = (to: string) => {
    const [id, type] = to.split("_");

    return { id: +id, type } as MainFiltersTo;
};

export const parseTourists = (tourists: string[] | number[]) => {
    return tourists.map(item =>
        item
            .toString()
            .split(",")
            .reduce(
                (previousValue: MainFiltersTourist, currentValue: string) => {
                    if (currentValue === "pet") {
                        previousValue.pet = true;
                        return previousValue;
                    }

                    const value = +currentValue;

                    value === 36 && previousValue.adults.push(36);
                    value < 18 && previousValue.children.push(value);

                    return previousValue;
                },
                { adults: [], children: [], pet: false }
            )
    );
};

export const parseMainFilters = (filtersRaw: FiltersRaw): MainFilters => {
    const { tour_to, tour_from, tour_begin_date, tour_duration, tour_tourists } = filtersRaw;

    const mainFilters = {} as MainFilters;

    mainFilters.tour_begin_date = tour_begin_date;
    mainFilters.tour_duration = tour_duration;
    mainFilters.tour_from = tour_from;
    tour_to && (mainFilters.tour_to = parseTo(tour_to));
    tour_tourists && (mainFilters.tour_tourists = parseTourists(tour_tourists));

    return mainFilters;
};

export const formattedTo = (to: MainFiltersTo) => {
    return `${to.id}_${to.type}`;
};

export const formatTourists = (tourists: MainFiltersTourist[]) => {
    return tourists.map(item => {
        return Object.values(item)
            .filter(item => (Array.isArray(item) ? item.length : Boolean(item)))
            .map(i => (i === true ? "pet" : i))
            .join(",");
    });
};

export const formatMainFilters = (filters: Filters) => {
    const { tour_to, tour_from, tour_begin_date, tour_duration, tour_tourists } = filters;

    const rawMainFilters = {} as MainFiltersRaw;

    rawMainFilters.tour_begin_date = tour_begin_date;
    rawMainFilters.tour_duration = tour_duration;
    rawMainFilters.tour_from = tour_from;
    tour_to && (rawMainFilters.tour_to = formattedTo(tour_to));
    tour_tourists && (rawMainFilters.tour_tourists = formatTourists(tour_tourists));

    return rawMainFilters;
};
