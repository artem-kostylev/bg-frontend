<script setup lang="ts">
import type { PaperProps } from '@ui/components/Paper/paper';
import { paperDefaultProps } from '@ui/components/Paper/paper';

withDefaults(defineProps<PaperProps>(), paperDefaultProps);
</script>

<template>
    <component :is="as" class="shadow-primary rounded-xl bg-white">
        <slot />
    </component>
</template>
