<script setup lang="ts">
import { computed } from "vue";
import type { Component } from "vue";
import { Spin } from "../Spin";

type Props = {
    size?: "xs" | "sm" | "md" | "lg";
    variant?: "base" | "primary" | "secondary";
    block?: boolean;
    endIcon?: Component;
    startIcon?: Component;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    justify?: "center" | "between";
    iconClass?: string;
};

const props = withDefaults(defineProps<Props>(), {
    size: "md",
    loading: false,
    variant: "base",
    type: "button",
    justify: "center",
    startIcon: undefined,
    endIcon: undefined,
    block: false,
    disabled: false,
    iconClass: "",
});

const endIcon = computed(() => {
    return props.loading ? Spin : props.endIcon;
});
</script>

<template>
    <button :type="type" :class="['btn', `btn--${variant}`, `btn--${size}`, `btn--${justify}`, block && `btn--block`]">
        <component :is="startIcon" width="1em" height="1em" :class="['btn__start-icon', iconClass]" />
        <span class="truncate">
            <slot />
        </span>
        <component :is="endIcon" width="1em" height="1em" :class="['btn__end-icon', iconClass]" />
    </button>
</template>

<style lang="postcss">
.btn {
    @apply focus:outline-none select-none font-medium transition-colors inline-flex items-center border py-[.563em] px-[.875em] rounded-xl disabled:opacity-60 disabled:pointer-events-none;

    &--center {
        @apply justify-center;
    }

    &--between {
        @apply justify-between;
    }

    &--base {
        @apply bg-white border-slate-300 hover:border-slate-400 focus-visible:border-blue-300 focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-50 shadow-sm;

        & .btn__start-icon,
        & .btn__end-icon {
            @apply text-slate-500;
        }
    }

    &--primary {
        @apply border-transparent bg-blue-600 hover:bg-blue-700 focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-50 shadow-sm text-white;
    }

    &--secondary {
        @apply bg-slate-200 hover:bg-slate-300 border-transparent focus-visible:border-slate-300 focus-visible:ring focus-visible:ring-slate-200 focus-visible:ring-opacity-50;
    }

    &--xs {
        @apply text-sm;
    }

    &--sm {
        @apply text-md;
    }

    &--md {
        @apply text-base;
    }

    &--lg {
        @apply text-lg;
    }

    &__start-icon {
        @apply mr-[.688em];
    }

    &__end-icon {
        @apply ml-[.688em];
    }

    &--block {
        @apply w-full;
    }
}
</style>
