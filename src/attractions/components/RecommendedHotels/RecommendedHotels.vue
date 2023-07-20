<script setup lang="ts">
import { Typography } from '@ui/components';
import type { Filters } from '@/app/types';
import { TourList } from '@/tours/components';
import type { Tour } from '@/tours/types';

type Props = {
    title: string;
    filters: Filters;
    hotels: Tour[];
};

defineProps<Props>();
</script>

<template>
    <div>
        <Typography as="h2" variant="h2" class="mb-5">{{ title }}</Typography>
        <TourList :filters="filters" name="hotels-search" :tours="hotels" />
    </div>
</template>
