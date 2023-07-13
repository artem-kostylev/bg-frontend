<script setup lang="ts">
import { computed } from 'vue';
import { useLazyAsyncData } from '#imports';
import { useParams, useQuery } from '@/app/composables';
import {
    fetchLocationTours,
    fetchShortAttraction,
    fetchRecommendedHotels,
} from '@/attractions/services';
import { Spin } from '@ui/components';
import { LocationCarousel, LocationTours, RecommendedHotels } from '@/attractions/components';
import type { FiltersRaw } from '@/app/types';

const params = useParams<{ id: number }>();

const { data: tours, pending: toursPending } = useLazyAsyncData('location-tours', () =>
    fetchLocationTours(params.value.id)
);

const { data: regions, pending: regionsPending } = useLazyAsyncData('location-regions', () =>
    fetchShortAttraction(params.value.id, 'populars')
);

const query = useQuery<FiltersRaw>();

const { data: hotels, pending: hotelsPending } = useLazyAsyncData(
    'location-recommended-hotels',
    () => fetchRecommendedHotels(query.value)
);

const { data: activities, pending: activitiesPending } = useLazyAsyncData(
    'location-activities',
    () => fetchShortAttraction(params.value.id, 'activities')
);

const { data: attractions, pending: attractionsPending } = useLazyAsyncData(
    'location-attractions',
    () => fetchShortAttraction(params.value.id, 'attractions')
);

const pending = computed(
    () =>
        toursPending.value ||
        regionsPending.value ||
        hotelsPending.value ||
        attractionsPending.value ||
        activitiesPending.value
);
</script>

<template>
    <Spin v-if="pending" color="primary" class="flex-1" />
    <template v-else>
        <LocationTours v-if="tours?.children.length" :children="tours.children" />
        <LocationCarousel
            v-if="regions?.length"
            type="regions"
            title="Регионы"
            :children="regions"
        />
        <RecommendedHotels
            v-if="hotels?.children.length"
            :filters="hotels.filters"
            :hotels="hotels.children"
        />
        <LocationCarousel
            v-if="activities?.length"
            type="activities"
            title="События и экскурсии"
            :children="activities"
        />
        <LocationCarousel
            v-if="attractions?.length"
            type="attractions"
            title="Достопримечательности"
            :children="attractions"
        />
    </template>
</template>
