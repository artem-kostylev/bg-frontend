<script setup lang="ts">
const columns = {
    "4": "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "2": "md:grid-cols-2",
};

const gaps = {
    "5": "gap-5",
    "2.5": "gap-2.5",
    "8": "gap-8",
};

type Props = {
    cols?: keyof typeof columns;
    gap?: keyof typeof gaps;
};

withDefaults(defineProps<Props>(), {
    cols: undefined,
    gap: undefined,
});
</script>

<template>
    <div :class="['grid', cols && columns[cols], gap && gaps[gap]]">
        <slot />
    </div>
</template>
