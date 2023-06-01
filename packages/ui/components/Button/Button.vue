<script setup lang="ts">
import { computed } from 'vue';
import { Spin } from '@ui/components';
import {
    buttonJustifies,
    buttonVariants,
    buttonSizes,
    buttonDefaultProps,
} from '@ui/components/Button/button';
import type { ButtonProps } from '@ui/components/Button/button';

const props = withDefaults(defineProps<ButtonProps>(), buttonDefaultProps);

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
            'inline-flex items-center rounded-xl border transition-colors duration-200 select-none',
            buttonSizes[size],
            buttonVariants[variant],
            buttonJustifies[justify],
            block && 'w-full',
            strong && 'font-medium',
            disabled && 'pointer-events-none opacity-60',
        ]"
        :disabled="disabled"
    >
        <component
            :is="startIcon"
            width="1.2em"
            height="1.2em"
            :class="[
                'mr-2.5',
                variant === 'base' && 'text-primary-500 flex-shrink-0',
                variant === 'simplified' && 'mt-0.5 ml-0.5 stroke-1',
            ]"
        />
        <span class="truncate">
            <slot />
        </span>
        <component
            :is="endIcon"
            width="1.2em"
            height="1.2em"
            :class="[
                'ml-2.5',
                variant === 'base' && 'text-primary-500 flex-shrink-0',
                variant === 'simplified' && 'mt-0.5 ml-0.5 stroke-1',
            ]"
        />
    </component>
</template>
