<script setup lang="ts">
import type { Tour } from '@/tours/types';
import { formatCurrency } from '@/app/lib';
import { Map, MarkerWithPopover } from '@map';
import { ControlButtons } from './components';
import { TourMapCard } from '@/tours/components';
import type { FiltersRaw } from '@/app/types';

type Props = {
    tours: Tour[];
    filters: FiltersRaw;
    name: string;
    target?: '_blank';
};

defineProps<Props>();
</script>

<template>
    <Map :center="tours[0].hotel.coordinates" :zoom="10">
        <ControlButtons />
        <MarkerWithPopover
            v-for="tour in tours"
            :key="tour.hotel.id"
            :coordinates="tour.hotel.coordinates"
        >
            <template #trigger="{ vbind }">
                <button
                    v-bind="vbind"
                    target="__blank"
                    class="bg-primary-500 hover:bg-primary-600 text-white text-sm whitespace-nowrap px-2 py-1.5 rounded-full transition-colors duration-200 cursor-pointer"
                >
                    {{ formatCurrency(tour.price) }}
                </button>
            </template>
            <TourMapCard :variant="name" :target="target" :filters="filters" :tour="tour" />
        </MarkerWithPopover>
    </Map>
</template>
