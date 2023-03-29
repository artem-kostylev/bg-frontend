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
    <ToursMultiContainer
        v-if="
            (!query.hotel_id && !query.accommodations_unikey) ||
            (query.accommodations_unikey &&
                query.accommodations_unikey.length === query.hotel_id.length)
        "
        :id="params.id"
    />
    <HotelContainer v-else :id="query.hotel_id[query.hotel_id.length - 1]" />
</template>
