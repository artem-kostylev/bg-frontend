<script setup lang="ts">
import { BarChartIcon } from '@ui/icons';

type Props = {
    average_rating: string;
};

defineProps<Props>();
</script>

<template>
    <div>
        <div
            class="bg-secondary-100 text-secondary-700 w-max px-2 py-2 rounded-2xl sm:mr-10 sm:px-3 sm:py-3 sm:font-bold"
        >
            <div class="flex items-end">
                <BarChartIcon class="sm:w-[1.3em] sm:h-[1.1em]" />
                <span class="ml-1 leading-3 sm:ml-2 sm:leading-4">{{ average_rating }}</span>
            </div>
        </div>
    </div>
</template>
