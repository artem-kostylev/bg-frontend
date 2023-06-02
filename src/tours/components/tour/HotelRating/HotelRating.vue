<script setup lang="ts">
import { computed } from 'vue';
import { Typography } from '@ui/components';
import type { HotelRating } from '@/tours/types';
import { Chip, BarChart } from './components';

type Props = {
    hotelRating: HotelRating;
};

const props = defineProps<Props>();

const ratings = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { average_rating, number_comments, ...onlyRatings } = props.hotelRating;
    return onlyRatings;
});
</script>

<template>
    <div class="flex flex-wrap justify-between items-center">
        <div class="basis-auto sm:basis-full sm:mb-6">
            <Typography variant="h2" as="h2">Рейтинг отеля</Typography>
        </div>
        <Chip :average_rating="hotelRating.average_rating" class="order-1" />
        <BarChart :ratings="ratings" class="basis-full order-2 sm:basis-auto" />
    </div>
</template>
