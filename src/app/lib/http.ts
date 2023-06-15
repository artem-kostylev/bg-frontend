import { useNuxtApp, useRuntimeConfig, useRequestHeaders, useRequestEvent } from '#imports';
import { $fetch, FetchError, type FetchOptions } from 'ofetch';
import { useAuthStore } from '@/auth/stores/auth';
import { parse } from '@set-cookie-parser';

type Options = { version?: number } & FetchOptions<'json'>;

export const http = async <T>(request: RequestInfo, options: Options = {}) => {
    const nuxtApp = useNuxtApp();
    const rc = useRuntimeConfig();

    const authStore = useAuthStore();
    const { accessToken, setAccessToken, setUser } = authStore;

    const { cookie } = useRequestHeaders(['cookie']);

    options.headers = new Headers(options.headers);
    options.headers.set('Accept', 'application/json');

    cookie && options.headers.set('Cookie', cookie);
    accessToken && options.headers.set('Authorization', `Bearer ${accessToken}`);

    options.credentials = 'include';
    options.baseURL = `${rc.public.apiBase}/v${options.version ?? 1}/`;

    try {
        return await $fetch<T>(request, options);
    } catch (error) {
        if (!(error instanceof FetchError)) throw error;

        if (error.status === 401 && accessToken) {
            try {
                const response = await $fetch.raw('user/token/refresh', {
                    ...options,
                    method: 'POST',
                });

                const responseCookie = response.headers.get('set-cookie');

                if (responseCookie) {
                    const event = useRequestEvent(nuxtApp);
                    const { name, value, serializeOptions } = parse(responseCookie);
                    setCookie(event, name, value, serializeOptions);
                    options.headers.set('cookie', responseCookie);
                }

                setAccessToken(response._data.accessToken);
                options.headers.set('Authorization', `Bearer ${accessToken}`);

                return await $fetch<T>(request, options);
            } catch (err) {
                setUser(null);
                setAccessToken(null);

                throw err;
            }
        } else {
            throw error;
        }
    }
};
