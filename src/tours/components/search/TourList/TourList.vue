<script setup lang="ts">
import { Grid } from "@ui/components";
import { TourCard } from "@/tours/components";
import type { FiltersRaw } from "@/app/types";
import type { Tour } from "@/tours/types";

type Props = {
    name: string;
    tours: Tour[];
    filters: FiltersRaw;
};

defineProps<Props>();
</script>

<template>
    <Grid cols="3" gap="5">
        <TourCard
            v-for="tour in tours"
            :key="tour.hotel.id"
            :tour="tour"
            :filters="filters"
            :variant="name"
            target="_blank"
        />
    </Grid>
</template>
