<script setup lang="ts">
import { BarChartIcon } from '@ui/icons';
import { computed } from 'vue';

type Props = {
    rating?: number | string;
};

const props = defineProps<Props>();

const rating = computed(() => {
    if (props.rating === '0' || !props.rating) return '0.0';

    return props.rating;
});
</script>

<template>
    <div class="px-2 py-2 text-sm rounded-xl bg-[#eaf0fa] text-primary-500">
        <div class="flex items-end">
            <BarChartIcon width="13" height="11" />
            <span class="ml-1 leading-3">{{ rating }}</span>
        </div>
    </div>
</template>
