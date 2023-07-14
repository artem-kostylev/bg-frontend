<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router';
import { Typography, Carousel, CarouselItem } from '@ui/components';
import { AttractionCard } from '@/attractions/components';
import { useQuery } from '@/app/composables';
import type { ShortAttraction } from '@/attractions/types';

type Props = {
    type: 'regions' | 'attractions' | 'activities';
    title: string;
    children: ShortAttraction[];
};

const props = defineProps<Props>();

const query = useQuery();

const getTo = (tour: ShortAttraction) => {
    return {
        name: props.type === 'regions' ? 'locations-id' : `${props.type}-id`,
        params: { id: tour.id },
        query: { ...query.value },
    } as RouteLocationNamedRaw;
};
</script>

<template>
    <div>
        <Typography as="h2" variant="h2" class="mb-5">{{ title }}</Typography>
        <Carousel class="flex gap-2.5" show-actions>
            <CarouselItem
                v-for="(tour, index) in children"
                :key="index"
                :class="[
                    'w-full md:w-1/2 lg:w-1/3 mb-4',
                    (type === 'regions' || type === 'attractions') && 'lg:w-1/5',
                ]"
            >
                <AttractionCard
                    :type="type"
                    :to="getTo(tour)"
                    :image="tour.image"
                    :title="tour.name || tour.title || ''"
                />
            </CarouselItem>
        </Carousel>
    </div>
</template>
