<script setup lang="ts">
import { BarChartIcon, ReviewIcon } from '@ui/icons';

type Props = {
    rating: string;
    reviews: number;
};

defineProps<Props>();
</script>

<template>
    <div class="px-2.5 text-xs flex justify-end space-x-2.5">
        <div
            class="px-2 py-2 rounded-xl w-max self-center sm:self-start bg-primary-100/20 text-primary-500"
        >
            <div class="flex items-end">
                <BarChartIcon width="13" height="11" />
                <span class="ml-1 leading-3">{{ rating }}</span>
            </div>
        </div>
        <div
            class="px-2 py-2 rounded-xl w-max self-center sm:self-start bg-danger-100 text-secondary-700"
        >
            <div class="flex items-end">
                <ReviewIcon width="13" height="11" />
                <span class="ml-1 leading-3">{{ reviews }}</span>
            </div>
        </div>
    </div>
</template>
