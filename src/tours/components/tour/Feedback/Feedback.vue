<script setup lang="ts">
import { Divider } from '@ui/components';
import { ReviewsContainer, RatingContainer } from '@/tours/components';

type Props = {
    hotelId: number;
    reviews: number;
    rating: number;
};

defineProps<Props>();
</script>

<template>
    <div class="space-y-8">
        <Divider />
        <RatingContainer :hotel-id="hotelId" :rating="rating" />
        <Divider />
        <ReviewsContainer :hotel-id="hotelId" :reviews="reviews" class="mb-4 sm:mb-0" />
    </div>
</template>
