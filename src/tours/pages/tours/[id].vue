<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { definePageMeta } from '#imports';
import { useParams, useQuery } from '@/app/composables';
import {
    HotelContainer,
    PackageWithHotelsContainer,
    PackageWithPeriodsContainer,
} from '@/tours/components';

definePageMeta({
    filters: true,
    navigation: true,
    validate: ({ params }) => /^\d+$/.test(params.id as string),
});

const route = useRoute();
const params = useParams<{ id: string }>();
const query = useQuery<{
    hotel_ids?: number[];
    accommodations_unikey?: string[];
    qty_hotels?: number;
}>();

const isPackage = computed(() => {
    return route.name === 'tours-multi-id' || route.name === 'tours-activity-id';
});

const isShowPackage = computed(() => {
    if (!isPackage.value) return false;

    const { hotel_ids, accommodations_unikey } = query.value;

    return (
        (!hotel_ids && !accommodations_unikey) ||
        (accommodations_unikey && hotel_ids && accommodations_unikey[0].length >= hotel_ids.length)
    );
});

const id = computed(() => {
    if (!isPackage.value) return params.value.id;

    const { hotel_ids } = query.value;

    return hotel_ids && hotel_ids[hotel_ids.length - 1];
});
</script>

<template>
    <template v-if="isShowPackage">
        <PackageWithPeriodsContainer v-if="query.qty_hotels === 0" :id="params.id" />
        <PackageWithHotelsContainer v-else :id="params.id" />
    </template>
    <HotelContainer v-else :id="id!" />
</template>
