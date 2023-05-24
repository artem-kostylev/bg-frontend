<script setup lang="ts">
import { computed, type Component } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { Spin } from '@ui/components';

const sizes = {
    xs: 'px-3 py-2 text-sm',
    sm: 'px-3 py-2 text-md',
    md: 'px-3.5 py-[.535rem]',
    lg: 'px-5 py-3',
};

const variants = {
    base: 'bg-white border-slate-300 hover:border-slate-400 shadow-sm',
    secondary: 'border-transparent bg-slate-200 hover:bg-slate-300 text-slate-700',
    primary: 'border-transparent bg-primary-500 hover:bg-primary-500/95 text-white shadow-sm',
};

const justifies = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
};

type Props = {
    type?: 'button' | 'reset' | 'submit';
    variant?: keyof typeof variants;
    justify?: keyof typeof justifies;
    size?: keyof typeof sizes;
    startIcon?: Component;
    endIcon?: Component;
    block?: boolean;
    to?: RouteLocationRaw;
    as?: Object | string | Component;
    loading?: boolean;
    disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'base',
    size: 'md',
    justify: 'center',
    endIcon: undefined,
    startIcon: undefined,
    as: 'button',
    to: undefined,
});

const endIcon = computed(() => {
    return props.loading ? Spin : props.endIcon;
});
</script>

<template>
    <component
        :is="as"
        :type="type"
        :to="to"
        :class="[
            'inline-flex items-center font-medium rounded-xl border transition-colors duration-200 select-none',
            sizes[size],
            variants[variant],
            justifies[justify],
            block && 'w-full',
            disabled && 'pointer-events-none opacity-60',
        ]"
        :disabled="disabled"
    >
        <component
            :is="startIcon"
            width="1.2em"
            height="1.2em"
            :class="['mr-2.5', variant === 'base' && 'text-primary-500']"
        />
        <slot />
        <component
            :is="endIcon"
            width="1.2em"
            height="1.2em"
            :class="['ml-2.5', variant === 'base' && 'text-primary-500']"
        />
    </component>
</template>
