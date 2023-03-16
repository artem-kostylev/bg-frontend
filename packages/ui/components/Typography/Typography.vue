<script setup lang="ts">
type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props = {
    as?: Heading | "div";
    variant?: Heading | "description";
};

withDefaults(defineProps<Props>(), {
    as: "div",
    color: undefined,
    variant: undefined,
});

const variants = {
    h1: "text-4xl font-semibold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-semibold",
    h5: "text-lg font-semibold",
    h6: "font-semibold",
    description: "text-slate-500",
};
</script>

<template>
    <component :is="as" :class="[variant && variants[variant]]">
        <slot />
    </component>
</template>
