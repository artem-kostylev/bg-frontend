<script setup lang="ts">
import type { Movement } from "@/booking/types";

type Props = {
    movement: Movement;
};

defineProps<Props>();
</script>

<template>
    <div>{{ movement }}</div>
</template>
