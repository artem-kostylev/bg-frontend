<script setup lang="ts">
import { computed } from "vue";
import { Typography, Grid } from "@ui/components";
import type { TourPackage, Tour, Filters } from "@/tours/types";
import { TourCard } from "@/tours/components";
import { LocationList } from "@/app/components";

type Props = {
    pkg: TourPackage;
    tours: Tour[];
    filters: Filters;
    type: "multi" | "excursion";
};

const props = defineProps<Props>();

const isExcursion = computed(() => props.type === "excursion");
</script>

<template>
    <Typography variant="h1" as="h1">{{ pkg.name }}</Typography>
    <LocationList :location="pkg.location" />
    <div v-if="pkg.description" v-html="pkg.description"></div>
    <Typography variant="h2" as="h2">
        {{ isExcursion ? "Отели" : "Отели для 1 группы" }}
    </Typography>
    <Grid cols="3" class="py-5">
        <TourCard
            v-for="tour in tours"
            :key="tour.hotel.id"
            :filters="filters"
            :tour="tour"
            :type="type"
        />
    </Grid>
</template>
