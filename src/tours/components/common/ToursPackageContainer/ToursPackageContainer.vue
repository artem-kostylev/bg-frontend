<script setup lang="ts">
import { computed } from "vue";
import { useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { Page, LocationList } from "@/app/components";
import { fetchTourPackage } from "@/tours/services";
import type { FetchTourPackageQuery } from "@/tours/services";
import { Spin, Typography, Grid, Image } from "@ui/components";
import { TourCard } from "@/tours/components";

type Props = {
    id: string;
    type: "activity" | "multi";
};

const props = defineProps<Props>();
const query = useQuery<FetchTourPackageQuery & { accommodations_unikey?: string[][] }>();

const { data, pending } = useLazyAsyncData(`tours-${props.type}-id`, () =>
    fetchTourPackage(props.id, query.value)
);

const hotelNumber = computed(() => {
    if (!query.value.accommodations_unikey) return 1;
    return query.value.accommodations_unikey[0].length + 1;
});
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <template v-else-if="data">
            <template v-if="hotelNumber === 1">
                <Typography variant="h1" as="h1">{{ data.package.name }}</Typography>
                <Image
                    v-if="data.package.images[0]"
                    :src="data.package.images[0].url"
                    :alt="data.package.name"
                    class="w-full h-[30rem] object-cover"
                />
                <LocationList :location="data.package.location" />
                <div
                    v-if="data.package.description"
                    v-html="data.package.description"
                    class="prose max-w-none"
                />
            </template>
            <Typography variant="h2" as="h2"> Выбор отеля № {{ hotelNumber }} </Typography>
            <Grid cols="3" class="py-5">
                <TourCard
                    v-for="tour in data.tours"
                    :key="tour.hotel.id"
                    :filters="data.filters"
                    :tour="tour"
                    :type="type"
                />
            </Grid>
        </template>
    </Page>
</template>
