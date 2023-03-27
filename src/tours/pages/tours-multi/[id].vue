<script setup lang="ts">
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
</script>

<template>
    <HotelContainer v-if="query.hotel_id" :id="query.hotel_id" />
    <ToursMultiContainer v-else :id="params.id" />
</template>
