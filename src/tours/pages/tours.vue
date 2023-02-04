<script setup lang="ts">
import { useHead, useLazyAsyncData } from "#imports";
import { TourCard } from "@/tours/components";
import { fetchTours } from "@/tours/services";

const { data, pending } = useLazyAsyncData("tours", () => fetchTours());

useHead({
    title: data.value?.meta.title,
    meta: [
        {
            name: "description",
            content: data.value?.meta.description,
        },
    ],
});
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <div v-else-if="data" class="grid grid-cols-3 gap-5">
            <TourCard v-for="tour in data.tours" :key="tour.hotel.id" :tour="tour" />
        </div>
    </div>
</template>
