<script setup lang="ts">
const columns = {
    "3": "md:grid-cols-2 lg:grid-cols-3",
};

type Props = {
    cols?: keyof typeof columns;
};

withDefaults(defineProps<Props>(), {
    cols: "3",
});
</script>

<template>
    <div :class="['grid gap-5', columns[cols]]">
        <slot />
    </div>
</template>
