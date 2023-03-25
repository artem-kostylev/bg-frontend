<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { Spin, Typography, Grid } from "@ui/components";
import { useQuery } from "@/app/composables";
import { Page, Empty } from "@/app/components";
import { TourPackageCard } from "@/tours/components";
import type { FetchToursQuery } from "@/tours/services";
import { fetchToursMulti } from "@/tours/services";

const query = useQuery<FetchToursQuery>();

const { data, pending } = useLazyAsyncData("tours-multi", () => fetchToursMulti(query.value));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <template v-else-if="data">
            <Typography variant="h1" as="h1" class="mb-5">{{ data.meta.title }}</Typography>
            <Grid v-if="data.packages.length" cols="3">
                <TourPackageCard
                    :filters="data.filters"
                    v-for="tour in data.packages"
                    :key="tour.id"
                    :tour="tour"
                />
            </Grid>
            <Empty v-else />
        </template>
    </Page>
</template>
