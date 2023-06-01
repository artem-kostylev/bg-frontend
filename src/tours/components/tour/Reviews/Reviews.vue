<script setup lang="ts">
import { ref } from 'vue';
import { useLazyAsyncData } from '#imports';
import { fetchHotelReviews } from '@/tours/services';
import { Spin, Typography } from '@ui/components';
import { useInfinity } from '@/app/composables';
import { HotelReview } from '@/tours/components';

type Props = {
    hotelId: number;
};

const props = defineProps<Props>();

const page = ref(1);

const { data, pending } = useLazyAsyncData('hotel-reviews', () =>
    fetchHotelReviews(props.hotelId, page.value)
);

const { targetRef, loadingMore } = useInfinity(async () => {
    const response = await fetchHotelReviews(props.hotelId, ++page.value);
    data.value!.has_next = response.has_next;
    data.value!.reviews.push(...response.reviews);
});
</script>

<template>
    <div>
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data?.reviews.length">
            <div class="flex justify-between flex-col sm:flex-row">
                <Typography variant="h2" as="h2" class="mb-4">Отзывы ({{ data.total }})</Typography>
                <!-- TODO: -->
                <!-- <Sort v-model="sort" /> -->
            </div>
            <div class="flex flex-col gap-4 mt-8 sm:gap-10 sm:mt-3">
                <HotelReview
                    v-for="(review, index) in data.reviews"
                    :key="review.review_id"
                    :review="review"
                    :show-divider="index + 1 !== data.reviews.length"
                />
                <template v-if="data.has_next">
                    <Spin v-if="loadingMore" color="primary" class="my-12" />
                    <div v-else ref="targetRef"></div>
                </template>
            </div>
        </div>
    </div>
</template>
