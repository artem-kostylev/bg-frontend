<script setup lang="ts">
import { ref } from 'vue';
import { useLazyAsyncData, definePageMeta } from '#imports';
import { fetchReviewableHotels, fetchAccountReviews } from '@/account/services';
import { Page } from '@/app/components';
import { Grid, Spin, Typography } from '@ui/components';
import { ReviewableHotels, ReviewsContainer } from '@/account/components';

definePageMeta({
    middleware: 'auth',
});

const { data: reviewableHotels, pending: pendingHotels } = useLazyAsyncData(
    'reviewable-hotels',
    () => fetchReviewableHotels()
);

const page = ref(1);

const { data: accountReviews, pending: pendingReviews } = useLazyAsyncData('account-reviews', () =>
    fetchAccountReviews({ page: page.value })
);

const meta = {
    title: 'Мои отзывы',
    description: 'Описание страницы Мои отзывы',
};
</script>

<template>
    <Page :meta="meta">
        <Grid gap="5">
            <Typography variant="h1" as="h1">Мои поездки</Typography>
            <Spin v-if="pendingHotels || pendingReviews" />
            <div v-else>
                <ReviewableHotels :hotels="reviewableHotels" />
                <ReviewsContainer
                    v-if="accountReviews?.reviews.length"
                    :page="page"
                    @increment-page="++page"
                    class="mt-10"
                />
            </div>
        </Grid>
    </Page>
</template>
