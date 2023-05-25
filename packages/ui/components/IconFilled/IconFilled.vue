<script setup lang="ts">
import type { IconFilledProps } from '@ui/components/IconFilled/iconFilled';
import { iconFilledDefaultProps, iconFilledVariants } from '@ui/components/IconFilled/iconFilled';

withDefaults(defineProps<IconFilledProps>(), iconFilledDefaultProps);
</script>

<template>
    <div class="flex items-center space-x-2">
        <div :class="['p-1.5 rounded-xl border', iconFilledVariants[variant]]">
            <component :is="icon" :width="width" :height="height" />
        </div>
        <span v-if="label">{{ label }}</span>
    </div>
</template>
