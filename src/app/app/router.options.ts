import type { RouterConfig } from '@nuxt/schema';
import { parseQuery, stringifyQuery } from '@querystring';

export default <RouterConfig>{
    parseQuery,
    stringifyQuery,
    scrollBehavior: (_, __, savedPosition) => savedPosition || { top: 0 },
    routes: routes => [
        ...routes,
        {
            name: 'hotels-search',
            path: '/hotels/search',
            meta: { filters: true, navigation: true },
            component: () => import('@/tours/pages/tours/search.vue'),
        },
        {
            name: 'tours-multi-search',
            path: '/tours-multi/search',
            meta: { filters: true, navigation: true },
            component: () => import('@/tours/pages/tours/search.vue'),
        },
        {
            name: 'tours-activity-search',
            path: '/tours-activity/search',
            meta: { filters: true, navigation: true },
            component: () => import('@/tours/pages/tours/search.vue'),
        },
        {
            path: '/tours',
            redirect: { name: 'index' },
        },
        {
            name: 'hotels',
            path: '/hotels',
            meta: { filters: true },
            component: () => import('@/pages/pages/index.vue'),
        },
        {
            name: 'hotels-id',
            path: '/hotels/:id',
            meta: { filters: true, navigation: true },
            component: () => import('@/tours/pages/tours/[id].vue'),
        },
        {
            name: 'tours-multi-id',
            path: '/tours-multi/:id',
            meta: { filters: true, navigation: true },
            component: () => import('@/tours/pages/tours/[id].vue'),
        },
        {
            name: 'tours-activity-id',
            path: '/tours-activity/:id',
            meta: { filters: true, navigation: true },
            component: () => import('@/tours/pages/tours/[id].vue'),
        },
        {
            name: 'attractions-id',
            path: '/attractions/:id',
            meta: { filters: true },
            component: () => import('@/attractions/pages/attractions/[id].vue'),
        },
        {
            name: 'locations-id',
            path: '/locations/:id',
            meta: { filters: true },
            component: () => import('@/attractions/pages/attractions/[id].vue'),
        },
        {
            name: 'activities-id',
            path: '/activities/:id',
            meta: { filters: true },
            component: () => import('@/attractions/pages/attractions/[id].vue'),
        },
        {
            name: 'avia',
            path: '/avia',
            meta: { filters: true },
            component: () => import('@/pages/pages/index.vue'),
        },
        {
            name: 'avia-search',
            path: '/avia/search',
            meta: { filters: true, navigation: true },
            component: () => import('@/booking/pages/booking/tickets.vue'),
        },
    ],
};
