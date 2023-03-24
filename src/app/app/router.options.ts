import type { RouterConfig } from "@nuxt/schema";
import { parseQuery, stringifyQuery } from "@querystring";

export default <RouterConfig>{
    parseQuery,
    stringifyQuery,
    routes: routes => [
        {
            name: "index",
            path: "/",
            component: () => import("@/tours/pages/tours/index.vue"),
        },
        {
            name: "tours-id",
            path: "/tours/:id",
            component: () => import("@/hotels/pages/hotels/[id].vue"),
        },
        ...routes,
    ],
};
