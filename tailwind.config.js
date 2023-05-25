/* eslint-env node */
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./packages/**/*.{vue,ts}', './src/**/*.{vue,ts}', './nuxt.config.{js,ts}'],
    theme: {
        extend: {
            fontSize: {
                md: ['.938rem', '1.375rem'],
            },
            boxShadow: {
                primary: 'rgba(17, 24, 39, .15) 0 0 10px 0',
            },
        },
        colors: {
            white: colors.white,
            black: colors.black,
            current: colors.current,
            inherit: colors.inherit,
            transparent: colors.transparent,
            primary: {
                50: '#A6C1E9',
                100: '#96B6E5',
                200: '#759FDC',
                300: '#5489D4',
                400: '#3472CC',
                500: '#2B60AC',
                600: '#20477F',
                700: '#152E52',
                800: '#091525',
                900: '#000000',
            },
            secondary: colors.slate,
            success: colors.green,
            danger: colors.red,
            warning: colors.orange,
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        plugin(({ addUtilities }) => {
            addUtilities({
                '.scrollbar-hidden': {
                    ' -ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    ' -webkit-overflow-scrolling': 'touch',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
                '.safe-area': {
                    'padding-top': 'env(safe-area-inset-top)',
                    'padding-bottom': 'env(safe-area-inset-bottom)',
                },
            });
        }),
    ],
};
