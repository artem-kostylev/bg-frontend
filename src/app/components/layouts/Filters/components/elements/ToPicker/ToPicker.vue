<script setup lang="ts">
import { defineAsyncComponent, watch, ref } from 'vue';
import { FloatingInput, Menu, Spin } from '@ui/components';
import { SearchIcon } from '@ui/icons';
import { useMediaQuery, useVModels } from '@vueuse/core';
import { EarthIcon } from '@ui/icons';
import type { MenuOption } from '@ui/components/Menu/menu';

const Mobile = defineAsyncComponent(() => import('./Mobile.vue'));
const Desktop = defineAsyncComponent(() => import('./Desktop.vue'));

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modelValue?: any;
    labelKey?: string;
    valueKey?: string;
    descriptionKey?: string;
    childrenKey?: string;
    options: MenuOption[];
    search: string;
    loading?: boolean;
    loadingSearch?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    labelKey: 'label',
    valueKey: 'value',
    descriptionKey: 'description',
    childrenKey: 'children',
    modelValue: undefined,
    options: () => [],
    bordered: true,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value?: unknown): void;
    (e: 'update:search', value?: string): Promise<void>;
}>();

const show = ref(false);
const inputSearchRef = ref<HTMLInputElement>();

const matches = useMediaQuery('(max-width: 640px)');

const { modelValue, search } = useVModels(props, emit);

watch(modelValue, () => (show.value = false));
watch(show, value => {
    value && setTimeout(() => inputSearchRef.value?.focus(), 200);
});
</script>

<template>
    <component :is="matches ? Mobile : Desktop" title="Куда" v-model="show">
        <template #trigger="{ vbind }">
            <FloatingInput
                :model-value="modelValue?.[labelKey]"
                v-bind="vbind"
                readonly
                :end-icon="EarthIcon"
                label="Куда"
                :loading="loading"
            />
        </template>
        <div class="!sm:w-[350px] -mb-5 sm:mb-0 -mx-5 sm:mx-0">
            <div class="relative">
                <div class="absolute inset-y-0 flex items-center px-5 pointer-events-none">
                    <button class="focus:outline-none -ml-1 text-secondary-500">
                        <SearchIcon width="1rem" height="1rem" />
                    </button>
                </div>
                <input
                    class="focus:outline-none border-b border-t border-secondary-200 w-full pl-12 px-5 py-3.5 placeholder-secondary-500"
                    placeholder="Поиск..."
                    v-model="search"
                    ref="inputSearchRef"
                />
            </div>
            <div class="sm:overflow-y-auto sm:max-h-[410px]">
                <div v-if="loadingSearch" class="flex items-center justify-center py-12">
                    <Spin width="1.9em" height="1.9em" class="text-blue-700" />
                </div>
                <Menu
                    v-else
                    :size="matches ? 'lg' : 'md'"
                    v-model="modelValue"
                    :options="options"
                    :label-key="labelKey"
                    :value-key="valueKey"
                    :description-key="descriptionKey"
                    :children-key="childrenKey"
                    return-object
                >
                    <template #empty>
                        <div class="flex flex-col items-center justify-center py-8">
                            <div>Ничего не найдено</div>
                        </div>
                    </template>
                </Menu>
            </div>
        </div>
    </component>
</template>
