import type { RouteLocationNamedRaw } from 'vue-router';

export type Navigation = {
    name: string;
    is_current: boolean;
    route: RouteLocationNamedRaw;
};
