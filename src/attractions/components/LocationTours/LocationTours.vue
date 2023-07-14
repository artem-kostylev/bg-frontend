<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router';
import { Typography, Carousel, CarouselItem } from '@ui/components';
import { LocationCard } from '@/attractions/components';
import { formatFilters } from '@/app/lib';
import type { Filters } from '@/app/types';
import type { LocationTours } from '@/attractions/types';

type Props = {
    children: LocationTours[];
};

defineProps<Props>();

const getTo = (filters: Filters) => {
    const query = formatFilters(filters);

    return {
        name: 'tours-search',
        query,
    } as RouteLocationNamedRaw;
};
</script>

<template>
    <div>
        <Typography as="h2" variant="h2" class="mb-5">Туры</Typography>
        <Carousel class="flex gap-2.5" show-actions>
            <CarouselItem
                v-for="(tour, index) in children"
                :key="index"
                class="w-full md:w-1/2 lg:w-1/3 mb-4"
            >
                <LocationCard
                    :to="getTo(tour.preset_filters)"
                    :image="tour.image[0]"
                    :title="tour.preset_name"
                />
            </CarouselItem>
        </Carousel>
    </div>
</template>
