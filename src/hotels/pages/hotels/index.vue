<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { HotelCard } from "@/hotels/components";
import type { FetchToursQuery } from "@/tours/services";
import { fetchHotels } from "@/hotels/services";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";

const query = useQuery<FetchToursQuery>();

const { data, pending } = useLazyAsyncData("hotels", () => fetchHotels(query.value));
</script>

<template>
    <Page :meta="data?.meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data" class="grid grid-cols-3 gap-5">
            <HotelCard v-for="tour in data.tours" :key="tour.hotel.id" :hotel="tour.hotel" />
        </div>
    </Page>
</template>
