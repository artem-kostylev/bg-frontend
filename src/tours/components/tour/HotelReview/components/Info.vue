<script setup lang="ts">
import { BarChartIcon } from '@ui/icons';
import type { ReviewCreator } from '@/tours/types';
import { formatDate } from '@/app/lib';

type Props = {
    average_rating: string;
    user: ReviewCreator;
    created_at: string;
};

defineProps<Props>();
</script>

<template>
    <div class="flex w-32 shrink-0 gap-4 sm:flex-col sm:gap-2">
        <div
            class="px-2 py-2 rounded-xl bg-secondary-100 text-secondary-700 w-max self-center sm:self-start"
        >
            <div class="flex items-end">
                <BarChartIcon />
                <span class="ml-1 leading-3">{{ average_rating }}</span>
            </div>
        </div>
        <div class="flex gap-2 items-center sm:block sm:gap-0 sm:items-start">
            <div class="font-bold text-secondary-500">{{ user.name }}</div>
            <div class="text-secondary-500">
                {{ formatDate(created_at) }}
            </div>
        </div>
    </div>
</template>
