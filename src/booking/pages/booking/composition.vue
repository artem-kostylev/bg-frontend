<script setup lang="ts">
import { computed } from "vue";
import { resolveComponent, useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";
import { fetchComposition, type FetchCompositionQuery } from "@/booking/services";
import { Selected } from "@/booking/components";
import { Spin, Typography, Grid, Button } from "@ui/components";
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
            <Typography variant="h1" as="h1">Состав</Typography>
            <Selected v-bind="data" class="my-4 md:my-6" />
            <Button :as="NuxtLink" :to="to" variant="primary" class="w-full md:w-auto">
                Перейти к оформлению
            </Button>
        </div>
    </Page>
</template>
