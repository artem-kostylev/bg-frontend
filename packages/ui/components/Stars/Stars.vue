<script setup lang="ts">
import { StarIcon } from '@ui/icons';
import type { StarsProps } from '@ui/components/Stars/stars';

defineProps<StarsProps>();
</script>

<template>
    <div class="flex">
        <StarIcon v-for="num in stars" :key="num" class="text-warning-400" />
    </div>
</template>
