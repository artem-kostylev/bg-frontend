import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'node:url';
import { plugins } from './postcss.config.js';

export default defineNuxtConfig({
    ssr: false,

    srcDir: 'src/app',

    extends: [
        'src/tours',
        'src/pages',
        'src/attractions',
        'src/booking',
        'src/account',
        'src/auth',
    ],

    app: {
        head: {
            htmlAttrs: {
                lang: 'ru',
                class: 'antialiased text-secondary-900',
            },
            viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
            meta: [{ name: 'theme-color', content: '#fff' }],
        },
    },

    typescript: {
        shim: false,
    },

    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@ui': fileURLToPath(new URL('./packages/ui', import.meta.url)),
        '@querystring': fileURLToPath(new URL('./packages/querystring', import.meta.url)),
        '@set-cookie-parser': fileURLToPath(
            new URL('./packages/set-cookie-parser', import.meta.url)
        ),
    },

    imports: {
        autoImport: false,
    },

    components: false,

    css: ['@/app/assets/css/tailwind.css'],

    postcss: { plugins },

    modules: [
        '@pinia/nuxt',
        '@vite-pwa/nuxt',
        '@nuxtjs/critters',
        process.env.NUXT_DEVTOOLS === 'true' && '@nuxt/devtools',
    ],

    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Библио Глобус',
            short_name: 'Библио Глобус',
            theme_color: '#fff',
            icons: [
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable',
                },
            ],
        },
        workbox: {
            navigateFallback: null,
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        },
    },

    runtimeConfig: {
        public: {
            apiBase: '',
            hostname: '',
        },
    },
});
