<script setup lang="ts">
import { clearNuxtData, onBeforeUnmount, useLazyAsyncData } from '#imports';
import { fetchHotelRating } from '@/tours/services';
import { useParams } from '@/app/composables';
import { Typography, Spin, ProgressBar, Grid, Divider } from '@ui/components';
import type { Ratings } from '@/tours/types';
import { RatingBadge } from '@/app/components';

type Props = {
    rating?: string | number;
};

defineProps<Props>();
const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData('hotel-rating', () => fetchHotelRating(params.value.id));

type Criterion = {
    [key in keyof Ratings]: string;
};

const criteria: Criterion = {
    cleanliness: 'Чистота',
    staff: 'Персонал',
    amenities: 'Удобства и услуги',
    location: 'Расположение',
};

onBeforeUnmount(() => clearNuxtData('hotel-rating'));
</script>

<template>
    <div>
        <div class="flex items-center space-x-2.5 mb-5">
            <Typography variant="h2" as="h2">Рейтинг</Typography>
            <RatingBadge :rating="rating" />
        </div>
        <Spin v-if="pending" class="py-5 flex-1" color="primary" />
        <Grid cols="4" gap="5">
            <div v-for="(value, key) in criteria" :key="key">
                <div class="flex items-center justify-between mb-2.5">
                    <Typography>{{ value }}</Typography>
                    <Typography variant="h5">{{ (data?.[key] ?? 0).toFixed(1) }}</Typography>
                </div>
                <ProgressBar
                    :percentage="(data?.[key] ?? 0) * 10"
                    :color="(data?.[key] ?? 0) < 7 ? 'danger' : 'primary'"
                />
            </div>
        </Grid>
        <Divider class="mt-5 md:mt-8" />
    </div>
</template>
