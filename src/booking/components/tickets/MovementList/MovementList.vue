<script setup lang="ts">
import { Grid } from "@ui/components";
import { MovementCard } from "@/booking/components";
import type { Movement } from "@/booking/types";

type Props = {
    movements: Movement[];
    price: number;
};

defineProps<Props>();
</script>

<template>
    <Grid cols="3" gap="5">
        <MovementCard
            v-for="(movement, index) in movements"
            :key="index"
            :movement="movement"
            :price="price"
        />
    </Grid>
</template>
