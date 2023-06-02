<script setup lang="ts">
import type { Ratings } from '@/tours/types';
import Bar from './Bar.vue';

type Props = {
    ratings: Ratings;
};

defineProps<Props>();

type Criterion = {
    [key in keyof Ratings]: string;
};

const CRITERIA: Criterion = {
    amenities: 'Удобства и услуги',
    staff: 'Персонал',
    cleanliness: 'Чистота',
    location: 'Расположение',
};
</script>

<template>
    <div
        class="flex justify-between flex-wrap gap-4 w-full mt-6 mb-2 sm:mt-0 sm:mb-0 sm:w-[calc(100%-7.5rem)] sm:gap-8"
    >
        <div
            v-for="(rating, key) in ratings"
            :key="key"
            class="w-full min-w-[calc(25%-2.5rem)] sm:w-max sm:ml-2"
        >
            <div class="flex justify-between">
                <div>{{ CRITERIA[key] }}</div>
                <div class="font-bold">{{ rating }}</div>
            </div>
            <div class="w-full min-w-[13rem] mt-2">
                <Bar :value="rating" />
            </div>
        </div>
    </div>
</template>
