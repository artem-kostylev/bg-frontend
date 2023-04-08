import type { RouterConfig } from "@nuxt/schema";
import { parseQuery, stringifyQuery } from "@querystring";

export default <RouterConfig>{
    parseQuery,
    stringifyQuery,
    scrollBehavior: (_, __, savedPosition) => {
        return savedPosition || { top: 0 };
    },
    routes: routes => [
        ...routes,
        {
            name: "hotels-search",
            path: "/hotels/search",
            component: () => import("@/tours/pages/tours/search.vue"),
        },
        {
            name: "tours-multi-search",
            path: "/tours-multi/search",
            component: () => import("@/tours/pages/tours/search.vue"),
        },
        {
            name: "tours-activity-search",
            path: "/tours-activity/search",
            component: () => import("@/tours/pages/tours/search.vue"),
        },
        {
            path: "/tours",
            redirect: { name: "index" },
        },
        {
            name: "hotels",
            path: "/hotels",
            component: () => import("@/pages/pages/index.vue"),
        },
        {
            name: "hotels-id",
            path: "/hotels/:id",
            component: () => import("@/tours/pages/tours/[id].vue"),
        },
        {
            name: "tours-multi-id",
            path: "/tours-multi/:id",
            component: () => import("@/tours/pages/tours/[id].vue"),
        },
        {
            name: "tours-activity-id",
            path: "/tours-activity/:id",
            component: () => import("@/tours/pages/tours/[id].vue"),
        },
        {
            name: "locations-id",
            path: "/locations/:id",
            component: () => import("@/attractions/pages/attractions/[id].vue"),
        },
        {
            name: "activities-id",
            path: "/activities/:id",
            component: () => import("@/attractions/pages/attractions/[id].vue"),
        },
    ],
};
