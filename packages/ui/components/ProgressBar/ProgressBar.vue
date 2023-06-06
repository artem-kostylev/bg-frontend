<script setup lang="ts">
import type { ProgressBarProps } from './progressBar';
import { defaultProgressBarProps } from './progressBar';

withDefaults(defineProps<ProgressBarProps>(), defaultProgressBarProps);
</script>

<template>
    <div class="w-full bg-secondary-200 rounded-full h-1">
        <div class="bg-primary-500 h-1 rounded-full" :style="`width: ${percentage}%`"></div>
    </div>
</template>
