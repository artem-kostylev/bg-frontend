<script setup lang="ts">
import { gridDefaultProps, gridColumns, gridGaps } from '@ui/components/Grid/grid';
import type { GridProps } from '@ui/components/Grid/grid';

withDefaults(defineProps<GridProps>(), gridDefaultProps);
</script>

<template>
    <div :class="['grid', cols && gridColumns[cols], gap && gridGaps[gap]]">
        <slot />
    </div>
</template>
