<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from "#imports";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";
import { fetchComposition, type FetchCompositionQuery } from "@/booking/services";
import { Selected } from "@/booking/components";

definePageMeta({
    validate: route => {
        const {
            has_movements,
            ids,
            accommodations_unikey,
            tours_hash,
            tour_type,
        }: Partial<FetchCompositionQuery> = route.query;

        return tour_type ? (has_movements ? !(ids && tours_hash) : !accommodations_unikey) : false;
    },
});

const query = useQuery<FetchCompositionQuery>();

const { data, pending } = useLazyAsyncData("booking-composition", () =>
    fetchComposition(query.value)
);

const meta = {
    title: "Состав тура",
    description: "Описание состава тура",
};
</script>

<template>
    <Page :meta="meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data">
            <Selected />
            {{ data }}
        </div>
    </Page>
</template>
