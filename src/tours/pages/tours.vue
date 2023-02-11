<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { TourCard } from "@/tours/components";
import type { FetchToursQuery } from "@/tours/services";
import { fetchTours } from "@/tours/services";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";

const query = useQuery<FetchToursQuery>();

const { data, pending } = useLazyAsyncData("tours", () => fetchTours(query.value));
</script>

<template>
    <Page :meta="data?.meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data" class="grid grid-cols-3 gap-5">
            <TourCard v-for="tour in data.tours" :key="tour.hotel.id" :tour="tour" />
        </div>
    </Page>
</template>
