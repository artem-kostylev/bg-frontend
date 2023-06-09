import type { Filters } from '@/app/types';
import { http } from '@/app/lib';

type BaseChild = {
    icon: string;
    key: string;
    name: string;
};

type RangeSliderChild = BaseChild & {
    max: number;
    min: number;
    quantity: number;
    type: 'range-slider';
};

type CheckboxChild = BaseChild & {
    type: 'checkbox';
};

type RadioButtonChild = BaseChild & {
    type: 'radio-button';
};

export type FetchAdvancedFiltersResponse = {
    children: { name: string; children: (RangeSliderChild | CheckboxChild | RadioButtonChild)[] };
    filters_hidden: string[];
    quantity: number;
};

const names: Record<string, string> = {
    'tours-search': 'tour',
    'hotels-search': 'hotel',
};

export const fetchAdvancedFilters = async (
    name: string,
    filters: Filters,
    filters_hidden?: string[]
) => {
    const response = await http<FetchAdvancedFiltersResponse>(`${names[name]}/get-filters-list`, {
        body: {
            filters,
            filters_hidden,
        },
        method: 'post',
    });

    return response;
};
