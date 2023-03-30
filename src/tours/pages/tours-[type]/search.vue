<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { Spin, Typography, Grid } from "@ui/components";
import { useQuery, useParams } from "@/app/composables";
import { Page, Empty } from "@/app/components";
import { TourPackageCard } from "@/tours/components";
import type { FetchToursQuery } from "@/tours/services";
import { fetchToursPackage } from "@/tours/services";

const params = useParams<{ type: "activity" | "multi" }>();
const query = useQuery<FetchToursQuery>();

const { data, pending } = useLazyAsyncData(`tours-${params.value.type}`, () =>
    fetchToursPackage(query.value, params.value.type)
);
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
                    :type="params.type"
                />
            </Grid>
            <Empty v-else />
        </template>
    </Page>
</template>
