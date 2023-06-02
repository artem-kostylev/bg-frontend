<script setup lang="ts">
import { Rating, HotelRating } from '@/tours/components';
import type { HotelRating as HotelRatingType } from '@/tours/types';

type Props = {
    hotelId: number;
    rating: number;
};

defineProps<Props>();

const emptyRating: HotelRatingType = {
    cleanliness: 0,
    staff: 0,
    location: 0,
    amenities: 0,
    average_rating: '0',
    number_comments: 0,
};
</script>

<template>
    <div>
        <Rating v-if="rating" :hotel-id="hotelId" />
        <div v-else>
            <HotelRating :hotel-rating="emptyRating" />
        </div>
    </div>
</template>
