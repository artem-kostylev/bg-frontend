<script setup lang="ts">
import type { Tour } from "@/tours/types";

type Props = {
    tour: Tour;
};

defineProps<Props>();
</script>

<template>
    <div>{{ tour }}</div>
</template>
