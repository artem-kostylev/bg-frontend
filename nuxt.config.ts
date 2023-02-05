import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath } from "url";

export default defineNuxtConfig({
    srcDir: "src",

    extends: ["src/app", "src/tours", "src/hotels", "src/booking", "src/account", "src/page", "src/auth"],

    app: {
        head: {
            htmlAttrs: {
                lang: "ru",
                class: "antialiased text-gray-900",
            },
            viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
        },
    },

    typescript: {
        shim: false,
    },

    alias: {
        "@ui": fileURLToPath(new URL("./packages/ui", import.meta.url)),
    },

    imports: {
        autoImport: false,
    },

    components: false,

    hooks: {
        "pages:extend": pages => {
            pages.push({
                name: "tours-id",
                path: "/tours/:id",
                file: "@/hotels/pages/hotels/[id].vue",
            });
        },
    },

    css: ["~/app/assets/css/tailwind.css"],

    postcss: {
        plugins: {
            "tailwindcss/nesting": {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    sourcemap: false,
});
