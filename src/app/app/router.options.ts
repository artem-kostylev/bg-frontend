import type { RouterConfig } from "@nuxt/schema";
import { parseQuery, stringifyQuery } from "@querystring";

export default <RouterConfig>{
    parseQuery,
    stringifyQuery,
};
