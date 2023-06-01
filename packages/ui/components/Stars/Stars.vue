<script setup lang="ts">
import { StarIcon } from '@ui/icons';
import type { StarsProps } from '@ui/components/Stars/stars';

defineProps<StarsProps>();
</script>

<template>
    <div class="flex -space-x-0.5">
        <StarIcon
            v-for="num in stars"
            :key="num"
            size="1.2rem"
            height="1.2rem"
            class="text-warning-400"
        />
    </div>
</template>
