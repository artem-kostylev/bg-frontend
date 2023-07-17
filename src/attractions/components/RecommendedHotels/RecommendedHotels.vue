<script setup lang="ts">
import { computed } from 'vue';
import { Typography } from '@ui/components';
import type { Filters } from '@/app/types';
import { TourList } from '@/tours/components';
import { formatFilters } from '@/app/lib';
import type { Tour } from '@/tours/types';

type Props = {
    title: string;
    filters: Filters;
    hotels: Tour[];
};

const props = defineProps<Props>();

const formattedfilters = computed(() => formatFilters(props.filters));
</script>

<template>
    <div>
        <Typography as="h2" variant="h2" class="mb-5">{{ title }}</Typography>
        <TourList :filters="formattedfilters" name="hotels-search" :tours="hotels" />
    </div>
</template>
