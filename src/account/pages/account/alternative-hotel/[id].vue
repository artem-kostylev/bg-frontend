<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from '#imports';
import { Page } from '@/app/components';
import { Spin } from '@ui/components';
import { HotelDetails } from '@/tours/components';
import { useParams } from '@/app/composables';
import { fetchHotel } from '@/tours/services';
import { AlternativeRooms } from '@/account/components';

definePageMeta({
    middleware: 'auth',
});

const params = useParams<{ id: number }>();

const { data, pending } = useLazyAsyncData('alternative-hotel-info', () =>
    fetchHotel(params.value.id)
);
</script>

<template>
    <Page :meta="data?.meta">
        <Spin class="flex-1" v-if="pending" color="primary" />
        <HotelDetails v-else-if="data" :hotel="data.hotel" class="mb-5 md:mb-8" />
        <AlternativeRooms />
    </Page>
</template>
