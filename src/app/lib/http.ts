import { $fetch, type FetchOptions } from "ofetch";

const BASE_URL = "https://api.bgagent3.bgit.ru";

type Options = { version?: number } & FetchOptions<"json">;

const http = <T>(request: RequestInfo, options: Options = {}) => {
    options.baseURL = `${BASE_URL}/v${options.version ?? 1}/`;
    !options.headers && (options.headers = {});

    const headers = new Headers();
    headers.set("Accept", "application/json");

    options.headers = headers;

    return $fetch<T>(request, options);
};

export default http;
