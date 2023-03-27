<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";
import { fetchTourMulti } from "@/tours/services";
import type { FetchTourMultiQuery } from "@/tours/services";
import { Spin, Typography, Grid } from "@ui/components";
import { TourCard } from "@/tours/components";
import { LocationList } from "@/app/components";

type Props = {
    id: string;
};

const props = defineProps<Props>();
const query = useQuery<FetchTourMultiQuery>();

const { data, pending } = useLazyAsyncData("tours-multi-id", () =>
    fetchTourMulti(props.id, query.value)
);
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <template v-else-if="data">
            <Typography variant="h1" as="h1">{{ data.package.name }}</Typography>
            <LocationList :location="data.package.location" />
            <div v-if="data.package.description" v-html="data.package.description" />
            <Typography variant="h2" as="h2">Отели</Typography>
            <Grid cols="3" class="py-5">
                <TourCard
                    v-for="tour in data.tours"
                    :key="tour.hotel.id"
                    :filters="data.filters"
                    :tour="tour"
                    variant="multi"
                />
            </Grid>
        </template>
    </Page>
</template>
