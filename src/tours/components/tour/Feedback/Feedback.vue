<script setup lang="ts">
import { Divider } from '@ui/components';
import { ReviewsContainer } from '@/tours/components';

type Props = {
    hotelId: number;
    reviews: number;
};

defineProps<Props>();
</script>

<template>
    <div>
        <Divider class="mt-8" />
        <ReviewsContainer :reviews="reviews" :hotel-id="hotelId" class="mt-8 mb-4 sm:mb-0" />
    </div>
</template>
