<script setup lang="ts">
import type { Review } from '@/tours/types';
import { Info, Content } from './components';

type Props = {
    review: Review;
};

defineProps<Props>();
</script>

<template>
    <div class="flex flex-wrap -mx-5 -mb-5">
        <div class="w-full md:w-1/6 px-5 mb-5">
            <Info
                :average_rating="review.average_rating"
                :user="review.user"
                :created_at="review.created_at"
            />
        </div>
        <div class="w-full md:w-5/6 px-5 mb-5">
            <div class="flex space-x-5">
                <Content :comments="review.comments" />
            </div>
        </div>
    </div>
</template>
