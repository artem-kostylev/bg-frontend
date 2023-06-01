<script setup lang="ts">
import { Divider } from '@ui/components';
import type { Review } from '@/tours/types';
import { Info, Content } from './components';

type Props = {
    review: Review;
    showDivider: boolean;
};

defineProps<Props>();
</script>

<template>
    <div>
        <div class="flex justify-between gap-4 flex-col sm:gap-10 sm:flex-row">
            <Info
                :average_rating="review.average_rating"
                :user="review.user"
                :created_at="review.created_at"
            />
            <Content :comments="review.comments" />
        </div>
        <Divider v-if="showDivider" dashed />
    </div>
</template>
