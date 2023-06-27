import {
    init,
    vueRouterInstrumentation,
    createTracingMixins,
    attachErrorHandler,
    setContext,
    setUser,
    setTag,
    addBreadcrumb,
    captureException,
} from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import { defineNuxtPlugin } from '#imports';
import type { Router } from 'vue-router';
import { useAuthStore } from '@/auth/stores';

export default defineNuxtPlugin(nuxtApp => {
    const { vueApp } = nuxtApp;
    const { user } = useAuthStore();

    if (user) {
        setUser({
            email: user?.email,
            username: user?.last_name + ' ' + user?.first_name,
        });
    }

    !process.dev &&
        init({
            app: [vueApp],
            dsn: 'https://078237f71bdb4d199a6c3884d6594a15@sentry.bgit.ru/2',
            environment: process.dev ? 'development' : 'production',
            integrations: [
                new BrowserTracing({
                    routingInstrumentation: vueRouterInstrumentation(nuxtApp.$router as Router),
                }),
            ],
            allowUrls: ['bgagent1.bgit.ru'],
            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0,
            beforeSend(event, hint) {
                // Check if it is an exception, and if so, log it.
                if (event.exception) {
                    // eslint-disable-next-line
                    console.error(`[Exeption handled by Sentry]: (${hint.originalException})`, {
                        event,
                        hint,
                    });
                }
                // Continue sending to Sentry
                return event;
            },
        });

    vueApp.mixin(
        createTracingMixins({
            trackComponents: true,
            timeout: 2000,
            hooks: ['activate', 'mount', 'update'],
        })
    );
    attachErrorHandler(vueApp, {
        logErrors: false,
        attachProps: true,
        trackComponents: true,
        timeout: 2000,
        hooks: ['activate', 'mount', 'update'],
    });

    return {
        provide: {
            sentrySetContext: setContext,
            sentrySetUser: setUser,
            sentrySetTag: setTag,
            sentryAddBreadcrumb: addBreadcrumb,
            sentryCaptureException: captureException,
        },
    };
});
