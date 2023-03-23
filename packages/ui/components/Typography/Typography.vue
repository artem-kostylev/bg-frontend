<script setup lang="ts">
const variants = {
    h1: "text-3xl font-semibold tracking-tight",
    h2: "text-2xl font-semibold tracking-tight",
    h3: "text-xl font-semibold tracking-tight",
    h4: "text-lg font-semibold tracking-tight",
    h5: "font-semibold",
    description: "text-slate-500 text-sm",
};

type Props = {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
    variant?: keyof typeof variants;
};

withDefaults(defineProps<Props>(), {
    as: "div",
    variant: undefined,
});
</script>

<template>
    <component :is="as" :class="[variant && variants[variant]]">
        <slot />
    </component>
</template>
