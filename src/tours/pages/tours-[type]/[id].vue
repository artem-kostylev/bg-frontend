<script setup lang="ts">
import { computed } from "vue";
import { definePageMeta } from "#imports";
import { HotelContainer } from "@/hotels/components";
import { useParams, useQuery } from "@/app/composables";
import { ToursPackageContainer } from "@/tours/components";
import type { FetchTourPackageQuery } from "@/tours/services";

definePageMeta({
    validate: ({ params }) => /^\d+$/.test(params.id as string),
});

const params = useParams<{ type: "activity" | "multi"; id: string }>();
const query = useQuery<FetchTourPackageQuery>();

const isShowPackage = computed(() => {
    return (
        (!query.value.hotel_ids && !query.value.accommodations_unikey) ||
        (query.value.accommodations_unikey &&
            query.value.accommodations_unikey[0].length >= query.value.hotel_ids.length)
    );
});
</script>

<template>
    <ToursPackageContainer :type="params.type" v-if="isShowPackage" :id="params.id" />
    <HotelContainer v-else :id="query.hotel_ids[query.hotel_ids.length - 1]" />
</template>
