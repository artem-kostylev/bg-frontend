<script setup lang="ts">
type Props = {
    percent: number;
};

defineProps<Props>();
</script>

<template>
    <span class="text-xl">&lt;{{ percent }}%</span>
</template>
