import type { LocationQueryRaw } from 'vue-router';
import type { Filters } from '@/app/types';

export type Navigation = {
    name: string;
    is_current: boolean;
    route: {
        path: string;
        filters: Filters;
        query: LocationQueryRaw;
    };
};
