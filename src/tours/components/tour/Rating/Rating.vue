<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { Spin } from '@ui/components';
import { fetchHotelRating } from '@/tours/services';
import { HotelRating } from '@/tours/components';

type Props = {
    hotelId: number;
};

const props = defineProps<Props>();

const { data, pending } = useLazyAsyncData('hotel-rating', () => fetchHotelRating(props.hotelId));
</script>

<template>
    <div>
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data">
            <HotelRating :hotel-rating="data" />
        </div>
    </div>
</template>
