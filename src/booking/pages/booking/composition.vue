<script setup lang="ts">
import { useHead, useLazyAsyncData, definePageMeta } from "#imports";
import { useQuery } from "@/app/composables";
import { fetchComposition, FetchCompositionQuery } from "@/booking/services";

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

useHead({
    title: "Состав тура",
    meta: [
        {
            name: "description",
            content: "Описание состава тура",
        },
    ],
});
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <div v-else-if="data">{{ data }}</div>
    </div>
</template>
