import type { PiniaPluginContext, Pinia } from 'pinia';
import { defineNuxtPlugin } from '#imports';
import cloneDeep from 'lodash.clonedeep';

const resetStore = ({ store }: PiniaPluginContext) => {
    const initialState = cloneDeep(store.$state);
    store.$reset = () => store.$patch(cloneDeep(initialState));
};

export default defineNuxtPlugin(nuxtApp => {
    (nuxtApp.$pinia as Pinia).use(resetStore);
});
