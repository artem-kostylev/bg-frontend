<script setup lang="ts">
import { useLazyAsyncData, computed } from "#imports";
import { useQuery } from "@/app/composables";
import type { FetchTourPackageQuery } from "@/tours/services";
import { fetchTourPackage } from "@/tours/services";
import { Page, DetailsHeader } from "@/app/components";
import { Spin, Typography, Grid } from "@ui/components";
import { formatFilters } from "@/app/lib";
import { useRoute } from "vue-router";
import { TourCard } from "@/tours/components";

type Props = {
    id: string | number;
};

const route = useRoute();
const name = computed(() => route.name as string);
const props = defineProps<Props>();
const query = useQuery<FetchTourPackageQuery>();

const { data, pending } = useLazyAsyncData("qweqweq", () =>
    fetchTourPackage(props.id, query.value)
);

const hotelNumber = computed(() => {
    const { accommodations_unikey } = query.value;

    if (!accommodations_unikey) return 1;
    return accommodations_unikey[0].length + 1;
});

const filters = computed(() => {
    return formatFilters(data.value!.filters);
});
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <template v-else-if="data">
            <template v-if="hotelNumber === 1">
                <DetailsHeader :entity="data.package" />
                <div
                    v-if="data.package.description"
                    v-html="data.package.description"
                    class="prose max-w-none"
                />
            </template>
            <Typography variant="h2" as="h2"> Выбор отеля № {{ hotelNumber }}</Typography>
            <Grid cols="3" class="py-5">
                <TourCard
                    v-for="tour in data.tours"
                    :key="tour.hotel.id"
                    :filters="filters"
                    :tour="tour"
                    :variant="name"
                />
            </Grid>
        </template>
    </Page>
</template>
