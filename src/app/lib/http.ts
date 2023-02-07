import { $fetch, type FetchOptions } from "ofetch";

const BASE_URL = "https://api.bgagent3.bgit.ru";

type Options = { version?: number } & FetchOptions<"json">;

export const http = <T>(request: RequestInfo, options: Options = {}) => {
    options.baseURL = `${BASE_URL}/v${options.version ?? 1}/`;

    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");

    options.headers = headers;

    return $fetch<T>(request, options);
};
