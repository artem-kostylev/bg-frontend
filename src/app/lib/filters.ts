import type { FiltersRaw, MainFiltersTo, MainFiltersTourist, Filters } from '@/app/types';

export const parseTo = (to: string) => {
    const [id, type] = to.split('_');

    return { id: +id, type } as MainFiltersTo;
};

export const parseTourists = (tourists: string[] | number[]) => {
    return tourists.map(item =>
        item
            .toString()
            .split(',')
            .reduce(
                (previousValue: MainFiltersTourist, currentValue: string) => {
                    if (currentValue === 'pet') {
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

export const parseFilters = (filtersRaw: FiltersRaw): Filters => {
    const filters = { ...filtersRaw } as Filters;

    filtersRaw.tour_to && (filters.tour_to = parseTo(filtersRaw.tour_to));
    filtersRaw.tour_tourists && (filters.tour_tourists = parseTourists(filtersRaw.tour_tourists));

    return filters;
};

export const formatTo = (to: MainFiltersTo) => {
    return `${to.id}_${to.type}`;
};

export const formatTourists = (tourists: MainFiltersTourist[]) => {
    return tourists.map(item => {
        const result = [];

        item.pet && result.push('pet');
        item.adults.length && result.push(...item.adults);
        item.children.length && result.push(...item.children);

        return result.join(',');
    });
};

export const formatFilters = (filters: Filters) => {
    const filtersRaw = { ...filters } as FiltersRaw;

    filters.tour_to && (filtersRaw.tour_to = formatTo(filters.tour_to));
    filters.tour_tourists && (filtersRaw.tour_tourists = formatTourists(filters.tour_tourists));

    return filtersRaw;
};
