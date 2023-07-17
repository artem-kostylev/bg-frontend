<script setup lang="ts">
import { computed } from 'vue';
import { Grid } from '@ui/components';
import { TourCard } from '@/tours/components';
import type { FiltersRaw } from '@/app/types';
import type { Tour } from '@/tours/types';

type Props = {
    name: string;
    tours: Tour[];
    filters: FiltersRaw;
    view?: number;
};

const props = defineProps<Props>();

const columns = computed(() => {
    if (props.view === 2) return '1';

    return '3';
});
</script>

<template>
    <Grid :cols="columns" gap="5">
        <TourCard
            v-for="tour in tours"
            :key="tour.hotel.id"
            :tour="tour"
            :filters="filters"
            :variant="name"
            target="_blank"
        />
    </Grid>
</template>
