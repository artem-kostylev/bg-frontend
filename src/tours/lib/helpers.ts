import type { MainFilters, MainFiltersTo, MainFiltersTourist } from "@/tours/types";

export type RawMainFilters = Omit<MainFilters, "tour_to" | "tour_tourists"> & {
    tour_to: string;
    tour_tourists: string[] | number[];
};

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

export const parseMainFilters = (rawFilters: RawMainFilters): MainFilters => {
    const { tour_to, tour_from, tour_begin_date, tour_duration, tour_tourists } = rawFilters;

    const mainFilters = {} as MainFilters;

    mainFilters.tour_begin_date = tour_begin_date;
    mainFilters.tour_duration = tour_duration;
    mainFilters.tour_from = tour_from;
    tour_to && (mainFilters.tour_to = parseTo(tour_to));
    tour_tourists && (mainFilters.tour_tourists = parseTourists(tour_tourists));

    return mainFilters;
};
