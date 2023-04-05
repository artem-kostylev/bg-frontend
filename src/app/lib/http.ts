import { useRuntimeConfig } from "#imports";
import { $fetch, type FetchOptions } from "ofetch";

type Options = { version?: number } & FetchOptions<"json">;

export const http = <T>(request: RequestInfo, options: Options = {}) => {
    const rc = useRuntimeConfig();

    options.baseURL = `${rc.public.apiBase}/v${options.version ?? 1}/`;

    options.headers = new Headers(options.headers);
    options.headers.set("Accept", "application/json");

    return $fetch<T>(request, options);
};
