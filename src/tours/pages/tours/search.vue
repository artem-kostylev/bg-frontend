<script setup lang="ts">
import { computed } from "vue";
import { useLazyAsyncData } from "#imports";
import { TourCard } from "@/tours/components";
import { fetchTours } from "@/tours/services";
import { useQuery } from "@/app/composables";
import { Empty, Page } from "@/app/components";
import { Spin, Typography, Grid } from "@ui/components";
import type { FiltersRaw } from "@/app/types";
import { useRoute } from "vue-router";
import { formatFilters } from "@/app/lib";

const route = useRoute();
const query = useQuery<FiltersRaw>();

const name = computed(() => route.name as string);

const { data, pending } = useLazyAsyncData("tours", () => fetchTours(query.value, name.value));

const filters = computed(() => {
    return formatFilters(data.value!.filters);
});
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <template v-else-if="data">
            <Typography variant="h1" as="h1" class="mb-5">{{ data.meta.title }}</Typography>
            <Grid v-if="data.tours.length" cols="3">
                <TourCard
                    v-for="tour in data.tours"
                    :key="tour.hotel.id"
                    :tour="tour"
                    :filters="filters"
                    :variant="name"
                    target="_blank"
                />
            </Grid>
            <Empty v-else />
        </template>
    </Page>
</template>
