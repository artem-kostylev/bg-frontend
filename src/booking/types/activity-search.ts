import type { StringOrNumber } from '@ui/types';

export type ActivitySearchFilter = {
    type: string;
    key: string;
    value: StringOrNumber;
};

export type ActivitySearchTicket = {
    key: string;
    label: string;
    max: number;
    min: number;
    price: number;
};
