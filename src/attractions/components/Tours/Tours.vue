<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { fetchRecommendedTours } from '@/attractions/services';
import { Spin } from '@ui/components';
import TourCard from './Card.vue';

type Props = {
    id: number | string;
};

const props = defineProps<Props>();

const { data, pending } = useLazyAsyncData(
    'location-tours',
    () => fetchRecommendedTours(props.id as string),
    {
        server: false,
    }
);
</script>

<template>
    <div v-if="pending" class="flex items-center justify-center">
        <Spin width="2.4em" height="2.4em" color="primary" />
    </div>
    <div v-else-if="data.children.length">
        <h3 class="text-2xl lg:text-3xl mb-4">Туры</h3>
        <TourCard
            v-for="(tour, index) in data.children"
            :key="index"
            :tour="tour"
            class="w-full md:w-1/2 lg:w-1/3 px-2.5 mb-4"
        />
    </div>
</template>
