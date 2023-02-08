/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./packages/**/*.{vue,ts}", "./src/**/*.{vue,ts}", "./nuxt.config.{js,ts}"],
    theme: {
        extend: {
            fontSize: {
                md: [".938rem", "1.375rem"],
            },
        },
    },
    plugins: [],
};
