<script setup lang="ts">
import type { Tour } from '@/tours/types';
import { formatCurrency } from '@/app/lib';
import { Map, MarkerWithPopover } from '@map';
import { SectionCard } from '@/pages/components';
import { Typography, Stars } from '@ui/components';
import { ControlButtons } from './components';

type Props = {
    tours: Tour[];
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
                <NuxtLink
                    v-bind="vbind"
                    class="bg-primary-500 hover:bg-primary-600 text-white text-sm whitespace-nowrap px-2 py-1.5 rounded-full transition-colors duration-200 cursor-pointer"
                >
                    {{ formatCurrency(tour.price) }}
                </NuxtLink>
            </template>
            <SectionCard :image="tour.hotel.images[0]" :alt="tour.hotel.name" class="w-[330px]">
                <Stars :stars="5" class="mb-1.5" />
                <Typography variant="h3" class="text-white">{{ tour.hotel.name }}</Typography>
            </SectionCard>
        </MarkerWithPopover>
    </Map>
</template>
