import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath } from "node:url";
import { plugins } from "./postcss.config.js";

export default defineNuxtConfig({
    srcDir: "src/app",

    extends: ["src/tours", "src/hotels", "src/booking", "src/account", "src/pages", "src/auth"],

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
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@ui": fileURLToPath(new URL("./packages/ui", import.meta.url)),
        "@querystring": fileURLToPath(new URL("./packages/querystring", import.meta.url)),
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

    css: ["@/app/assets/css/tailwind.css"],

    postcss: { plugins },

    modules: ["@pinia/nuxt"],
});
