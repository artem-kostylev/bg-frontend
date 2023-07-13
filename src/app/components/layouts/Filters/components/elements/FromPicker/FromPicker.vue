<script setup lang="ts">
import { defineAsyncComponent, computed, watch, ref } from 'vue';
import { FloatingInput, Menu } from '@ui/components';
import { useMediaQuery } from '@vueuse/core';
import { MapMarkerIcon } from '@ui/icons';
import type { MenuOption } from '@ui/components/Menu/menu';

const Mobile = defineAsyncComponent(() => import('./Mobile.vue'));
const Desktop = defineAsyncComponent(() => import('./Desktop.vue'));

type Props = {
    modelValue?: number;
    labelKey?: string;
    valueKey?: string;
    options?: MenuOption[] | null;
    loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    labelKey: 'label',
    valueKey: 'value',
    modelValue: undefined,
    options: () => [],
});

const show = ref(false);

const emit = defineEmits<{ (e: 'update:modelValue', value?: number): void }>();

const matches = useMediaQuery('(max-width: 640px)');

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const selected = computed(() => {
    if (!props.modelValue || !props.options) return;

    const item = props.options.find(item => item[props.valueKey] === props.modelValue);
    return item?.[props.labelKey] as string;
});

watch(value, () => (show.value = false));
</script>

<template>
    <component :is="matches ? Mobile : Desktop" v-model="show" title="Откуда">
        <template #trigger="{ vbind }">
            <FloatingInput
                :model-value="selected"
                v-bind="vbind"
                readonly
                :end-icon="MapMarkerIcon"
                label="Откуда"
                :loading="loading"
            />
        </template>
        <Menu
            class="-mx-5 -mb-5 sm:mx-0 sm:mb-0"
            :size="matches ? 'lg' : 'md'"
            v-model="value"
            :options="options"
            :label-key="labelKey"
            :value-key="valueKey"
        />
    </component>
</template>
