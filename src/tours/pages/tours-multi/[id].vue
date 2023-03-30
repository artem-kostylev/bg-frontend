<script setup lang="ts">
import { computed } from "vue";
import { definePageMeta } from "#imports";
import { HotelContainer } from "@/hotels/components";
import { useParams, useQuery } from "@/app/composables";
import { ToursMultiContainer } from "@/tours/components";
import type { FetchTourMultiQuery } from "@/tours/services";

definePageMeta({
    validate: ({ params }) => /^\d+$/.test(params.id as string),
});

const params = useParams<{ id: string }>();
const query = useQuery<FetchTourMultiQuery>();

const isShowPackage = computed(() => {
    return (
        (!query.value.hotel_ids && !query.value.accommodations_unikey) ||
        (query.value.accommodations_unikey &&
            query.value.accommodations_unikey.length >= query.value.hotel_ids.length)
    );
});
</script>

<template>
    <ToursMultiContainer v-if="isShowPackage" :id="params.id" />
    <HotelContainer v-else :id="query.hotel_ids[query.hotel_ids.length - 1]" />
</template>
