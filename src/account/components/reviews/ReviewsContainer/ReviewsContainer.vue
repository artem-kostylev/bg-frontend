<script setup lang="ts">
import { useNuxtData } from '#imports';
import { Grid, Spin } from '@ui/components';
import { ReviewCard } from '@/account/components';
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

const open = () => {};
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
        <template v-if="accountReviews.has_next">
            <Spin v-if="loadingMore" color="primary" class="my-12" />
            <div v-else ref="targetRef"></div>
        </template>
    </Grid>
</template>
