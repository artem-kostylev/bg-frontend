<script setup lang="ts">
import { Grid } from "@ui/components";
import type { Movement } from "@/booking/types";
import { TicketCard } from "@/booking/components";

type Props = {
    movements: Movement[];
};

defineProps<Props>();
</script>

<template>
    <Grid cols="3" gap="5">
        <TicketCard v-for="(movement, index) in movements" :key="index" :movement="movement" />
    </Grid>
</template>
