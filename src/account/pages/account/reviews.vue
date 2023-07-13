<script setup lang="ts">
import { ref } from 'vue';
import { useLazyAsyncData, definePageMeta } from '#imports';
import { fetchReviewableHotels, fetchAccountReviews } from '@/account/services';
import { Page } from '@/app/components';
import { Grid, Spin, Typography, Alert } from '@ui/components';
import { ClockIcon } from '@ui/icons';
import { ReviewableHotels, ReviewsContainer } from '@/account/components';

definePageMeta({
    middleware: 'auth',
});

const {
    data: reviewableHotels,
    pending: pendingHotels,
    execute: executeHotels,
} = useLazyAsyncData('reviewable-hotels', () => fetchReviewableHotels());

const page = ref(1);

const {
    data: accountReviews,
    pending: pendingReviews,
    execute: executeReviews,
} = useLazyAsyncData('account-reviews', () => fetchAccountReviews({ page: page.value }));

const meta = {
    title: 'Мои отзывы',
    description: 'Описание страницы Мои отзывы',
};

const success = ref(false);

const addReview = () => {
    success.value = true;
    executeHotels();
    executeReviews();
};
</script>

<template>
    <Page :meta="meta">
        <Spin class="flex-1" v-if="pendingHotels || pendingReviews" color="primary" />
        <Grid gap="5" v-else>
            <Typography variant="h1" as="h1">Мои отзывы</Typography>
            <Alert
                v-if="success"
                variant="info"
                :start-icon="ClockIcon"
                title="Ваш отзыв направлен на проверку"
                text="Ожидайте, пока оператор опубликует ваш отзыв"
                class="mt-5"
            />
            <div>
                <ReviewableHotels :hotels="reviewableHotels" @add-review="addReview" />
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
