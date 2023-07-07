<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { Spin } from '@ui/components';

type Props = {
    label: string;
    modelValue?: string | number | null;
    readonly: boolean;
    loading?: boolean;
    endIcon: Component;
};

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
});

const endIcon = computed(() => {
    return props.loading ? Spin : props.endIcon;
});
</script>

<template>
    <label class="relative">
        <input
            class="cursor-pointer block border shadow-sm font-medium border-transparent hover:border-secondary-400 transition-colors duration-300 rounded-xl px-3.5 pb-2 pt-7 w-full text-secondary-900 appearance-none focus:border-primary-500 peer"
            placeholder=" "
            :value="modelValue"
            :readonly="readonly"
            v-bind="$attrs"
        />
        <span
            class="cursor-pointer pointer-events-none absolute text-secondary-500 duration-300 transform -translate-y-3.5 scale-[.80] top-5 z-10 origin-[0] left-3.5 peer-focus:text-primary-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[.80] peer-focus:-translate-y-3.5"
        >
            {{ label }}
        </span>
        <div
            v-if="endIcon || $slots['end-icon']"
            class="absolute top-0 bottom-0 right-0 flex items-center justify-center px-3.5 text-primary-500"
        >
            <slot name="end-icon">
                <component :is="endIcon" width="1.2em" height="1.2em" />
            </slot>
        </div>
    </label>
</template>
