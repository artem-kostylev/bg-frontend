<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from "#imports";
import { useParams, useQuery } from "@/app/composables";
import { LocationList, Page, ProgressBar } from "@/app/components";
import { fetchTourMulti } from "@/tours/services";
import type { FetchTourMultiQuery } from "@/tours/services";
import { Typography, Grid, Spin } from "@ui/components";
import { TourCard } from "@/tours/components";

definePageMeta({
    validate: ({ params }) => /^\d+$/.test(params.id as string),
});

const params = useParams<{ id: string }>();
const query = useQuery<FetchTourMultiQuery>();

const { data, pending } = useLazyAsyncData("tours-multi-id", () =>
    fetchTourMulti(params.value.id, query.value)
);
</script>

<template>
    <div>
        <ProgressBar />
        <Page :meta="data?.meta">
            <Spin v-if="pending" color="primary" />
            <template v-else-if="data">
                <Typography variant="h1" as="h1">{{ data.package.name }}</Typography>
                <LocationList :location="data.package.location" />
                <div v-html="data.package.description"></div>
                <Typography variant="h2" as="h2">Отель №1</Typography>
                <Grid cols="3" class="py-5">
                    <TourCard
                        v-for="tour in data.tours"
                        :key="tour.hotel.id"
                        :filters="data.filters"
                        :tour="tour"
                        type="multi"
                    />
                </Grid>
            </template>
        </Page>
    </div>
</template>
