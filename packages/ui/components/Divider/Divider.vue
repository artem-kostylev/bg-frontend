<script setup lang="ts">
import type { DividerProps } from '@ui/components/Divider/divider';

defineProps<DividerProps>();
</script>

<template>
    <div :class="['w-full h-0 border-t border-secondary-200', dashed && 'border-dashed']"></div>
</template>
