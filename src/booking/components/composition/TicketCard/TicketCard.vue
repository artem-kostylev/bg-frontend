<script setup lang="ts">
import type { Movement } from "@/booking/types";
import { MovementBox } from "@/booking/components";

type Props = {
    movement: Movement;
};

defineProps<Props>();
</script>

<template>
    <MovementBox :movement="movement" />
</template>
