<script setup lang="ts">
import { ReviewIcon } from '@ui/icons';

type Props = {
    reviews?: number;
};

withDefaults(defineProps<Props>(), {
    reviews: 0,
});
</script>

<template>
    <div class="px-2 py-2 text-sm rounded-xl bg-danger-300/30 text-danger-600">
        <div class="flex items-end">
            <ReviewIcon width="13" height="11" />
            <span class="ml-1 leading-3">{{ reviews }}</span>
        </div>
    </div>
</template>
