<script setup lang="ts">
import type { ProgressBarProps } from './progressBar';
import { defaultProgressBarProps, progressBarColors } from './progressBar';

withDefaults(defineProps<ProgressBarProps>(), defaultProgressBarProps);
</script>

<template>
    <div class="w-full bg-secondary-200 rounded-full h-1">
        <div
            :class="['h-1 rounded-full', progressBarColors[color]]"
            :style="`width: ${percentage}%`"
        ></div>
    </div>
</template>
