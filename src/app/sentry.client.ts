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

export default defineNuxtPlugin(nuxtApp => {
    const { vueApp } = nuxtApp;

    init({
        app: [vueApp],
        dsn: 'https://6345bb08cb01473092532228a004bab1@sentry.bgit.ru/5',
        environment: process.dev ? 'development' : 'production',
        integrations: [
            new BrowserTracing({
                routingInstrumentation: vueRouterInstrumentation(nuxtApp.$router as Router),
            }),
        ],
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
