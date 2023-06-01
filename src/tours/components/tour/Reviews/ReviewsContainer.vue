<script setup lang="ts">
import { Typography } from '@ui/components';
import { Reviews } from '@/tours/components';

type Props = {
    hotelId: number;
    reviews: number;
};

defineProps<Props>();
</script>

<template>
    <div>
        <Reviews v-if="reviews" :hotel-id="hotelId" />
        <div v-else>
            <Typography variant="h2" as="h2" class="mb-4">Отзывы</Typography>
            <div class="mt-6">У этого отеля пока нет отзывов.</div>
        </div>
    </div>
</template>
