import { mergeConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import nuxtConfig from '../nuxt.config';
import type { StorybookConfig } from '@storybook/vue3-vite';

console.log(fileURLToPath(new URL("../packages/ui", import.meta.url)))

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.ts", "../packages/ui/**/*.stories.ts"],
  
  staticDirs: ['../src/app/public'],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  async viteFinal(config) {
    return mergeConfig(config, { resolve: { alias: nuxtConfig.alias } })
  },
};
export default config;