<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useNuxtData } from '#imports';
import { Grid, Spin } from '@ui/components';
import { ReviewCard, ReadReviewModal } from '@/account/components';
import { fetchAccountReviews, type FetchAccountReviewsResponse } from '@/account/services';
import { useInfinity } from '@/app/composables';

type Props = {
    page: number;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'increment-page'): void;
}>();

const { data: accountReviews } = useNuxtData<FetchAccountReviewsResponse>('account-reviews');

const { targetRef, loadingMore } = useInfinity(async () => {
    emit('increment-page');
    const response = await fetchAccountReviews({ page: props.page });
    accountReviews.value!.has_next = response.has_next;
    accountReviews.value!.reviews.push(...response.reviews);
});

const hotelId = ref<number | null>(null);

const hotel = computed(() => {
    if (!accountReviews.value || !hotelId.value) return;
    return accountReviews.value.reviews.find(review => review.hotel_id === hotelId.value);
});

const showModal = ref(false);

const open = (hotel_id: number) => {
    hotelId.value = hotel_id;
    showModal.value = true;
};

watch(showModal, value => {
    if (!value) {
        hotelId.value = null;
    }
});
</script>

<template>
    <Grid v-if="accountReviews" gap="5">
        <div class="text-xl lg:text-2xl">Мои отзывы</div>
        <Grid cols="2" gap="5">
            <ReviewCard
                v-for="review in accountReviews.reviews"
                :key="review.review_id"
                :hotel="review"
                action="read"
                @open="open"
            />
        </Grid>
        <ReadReviewModal
            v-if="hotel?.review_id"
            v-model="showModal"
            :hotel="hotel"
            :review-id="hotel.review_id"
        />
        <template v-if="accountReviews.has_next">
            <Spin v-if="loadingMore" color="primary" class="my-12" />
            <div v-else ref="targetRef"></div>
        </template>
    </Grid>
</template>
