<script setup lang="ts">
import { computed } from 'vue';
import { useLazyAsyncData, definePageMeta } from '#imports';
import { TourList, TourFilters } from '@/tours/components';
import { fetchTours } from '@/tours/services';
import { Spin, Typography } from '@ui/components';
import type { FiltersRaw } from '@/app/types';
import { formatFilters } from '@/app/lib';
import { useQuery, useName } from '@/app/composables';
import { Empty, Page } from '@/app/components';

definePageMeta({ filters: true });

const name = useName<string>();
const query = useQuery<FiltersRaw>();

const { data, pending } = useLazyAsyncData('tours', () => fetchTours(query.value, name.value));

const filters = computed(() => formatFilters(data.value!.filters));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <template v-else-if="data">
            <Typography variant="h1" as="h1" class="md:mb-2.5">{{ data.meta.title }}</Typography>
            <TourFilters class="mb-8" />
            <TourList
                v-if="data.tours.length"
                :tours="data.tours"
                :name="name"
                :filters="filters"
            />
            <Empty v-else />
        </template>
    </Page>
</template>
