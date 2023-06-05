<script setup lang="ts">
import type { Review } from '@/tours/types';
import { ReviewCard } from '../ReviewCard';
import { Divider } from '@ui/components';

type Props = {
    reviews: Review[];
};

defineProps<Props>();
</script>

<template>
    <div class="grid gap-5">
        <template v-for="(review, index) in reviews" :key="review.review_id">
            <Divider v-if="index !== 0" dashed />
            <ReviewCard :review="review" />
        </template>
    </div>
</template>
