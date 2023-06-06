<script setup lang="ts">
import { RatingBadge, ReviewsBadge } from '@/app/components';

type Props = {
    rating: string | number;
    reviews: number;
};

defineProps<Props>();
</script>

<template>
    <div class="text-xs flex justify-end space-x-2.5">
        <RatingBadge :rating="rating" />
        <ReviewsBadge :reviews="reviews" />
    </div>
</template>
