import { $fetch, type FetchOptions } from "ofetch";

const BASE_URL = "https://api.bgagent3.bgit.ru";

type Options = { version?: number } & FetchOptions<"json">;

export const http = <T>(request: RequestInfo, options: Options = {}) => {
    options.baseURL = `${BASE_URL}/v${options.version ?? 1}/`;

    options.headers = new Headers(options.headers);
    options.headers.set("Accept", "application/json");

    return $fetch<T>(request, options);
};
