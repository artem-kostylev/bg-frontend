/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-strongly-recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': 'warn',
        'vue/multi-word-component-names': 'off',
        'vue/prop-name-casing': 'off',
        'vue/no-dupe-keys': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
    },
};
