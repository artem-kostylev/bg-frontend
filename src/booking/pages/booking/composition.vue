<script setup lang="ts">
import { computed } from "vue";
import { resolveComponent, useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";
import { fetchComposition, type FetchCompositionQuery } from "@/booking/services";
import { InsuranceList, TransferList, Selected } from "@/booking/components";
import { Spin, Typography, Grid, Button, Divider } from "@ui/components";
import type { RouteLocationNamedRaw } from "vue-router";

const query = useQuery<FetchCompositionQuery>();

const { data, pending } = useLazyAsyncData("booking-composition", () =>
    fetchComposition(query.value)
);

const meta = {
    title: "Состав",
    description: "Описание состава",
};

const NuxtLink = resolveComponent("NuxtLink");

const to = computed(() => {
    const to: RouteLocationNamedRaw = { query: { ...query.value } };

    to.name = "booking-confirmation";

    return to;
});
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data">
            <Grid gap="8">
                <Typography variant="h1" as="h1">Состав</Typography>
                <Selected v-bind="data" />
                <Divider dashed />
                <TransferList v-if="data.transfers?.length" :transfers="data.transfers" />
                <InsuranceList v-if="data.insurances?.length" :insurances="data.insurances" />
                <Divider dashed />
                <div>
                    <Button :as="NuxtLink" :to="to" variant="primary">
                        Перейти к оформлению
                    </Button>
                </div>
            </Grid>
        </div>
    </Page>
</template>
