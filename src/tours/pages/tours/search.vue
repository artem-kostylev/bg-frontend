<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { TourCard } from "@/tours/components";
import type { FetchToursQuery } from "@/tours/services";
import { fetchTours } from "@/tours/services";
import { useQuery } from "@/app/composables";
import { Empty, Page } from "@/app/components";
import { Spin, Typography, Grid } from "@ui/components";

const query = useQuery<FetchToursQuery>();

const { data, pending } = useLazyAsyncData("tours", () => fetchTours(query.value));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <template v-else-if="data">
            <Typography variant="h1" as="h1" class="mb-5">{{ data.meta.title }}</Typography>
            <Grid v-if="data.tours.length" cols="3">
                <TourCard
                    :filters="data.filters"
                    v-for="tour in data.tours"
                    :key="tour.hotel.id"
                    :tour="tour"
                />
            </Grid>
            <Empty v-else />
        </template>
    </Page>
</template>
