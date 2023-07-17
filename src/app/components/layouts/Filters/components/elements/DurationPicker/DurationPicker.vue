<script setup lang="ts">
import { defineAsyncComponent, computed, watch, ref } from 'vue';
import { FloatingInput, RangeNumber } from '@ui/components';
import { useMediaQuery } from '@vueuse/core';
import { MoonIcon } from '@ui/icons';

const Mobile = defineAsyncComponent(() => import('./Mobile.vue'));
const Desktop = defineAsyncComponent(() => import('./Desktop.vue'));

type Props = {
    modelValue?: number[];
    numberDisabled?: (num: number) => boolean;
};

const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    bordered: true,
    numberDisabled: undefined,
});

const show = ref(false);

const emit = defineEmits<{ (event: 'update:modelValue', value?: number[]): void }>();

const matches = useMediaQuery('(max-width: 640px)');

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const selected = computed(() => {
    if (props.modelValue === undefined) return null;

    if (props.modelValue[0] === props.modelValue[1]) {
        return props.modelValue[0];
    } else {
        return props.modelValue.join(' - ');
    }
});

watch(value, v => v?.length === 2 && (show.value = false));
</script>

<template>
    <component :is="matches ? Mobile : Desktop" title="Ночей" v-model="show">
        <template #trigger="{ vbind }">
            <FloatingInput
                :model-value="selected"
                v-bind="vbind"
                :end-icon="MoonIcon"
                label="Ночей"
                readonly
            />
        </template>
        <RangeNumber
            class="-m-5 sm:m-0"
            v-model="value"
            :start="1"
            :end="28"
            range
            :number-disabled="numberDisabled"
        />
    </component>
</template>
