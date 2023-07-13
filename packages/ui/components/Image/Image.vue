<script setup lang="ts">
import type { ImageProps } from '@ui/components/Image/image';
import { imageDefaultProps } from '@ui/components/Image/image';

withDefaults(defineProps<ImageProps>(), imageDefaultProps);

const onLoad = (event: Event) => {
    const target = event.target as HTMLImageElement;
    target.classList.add('opacity-100');
};
</script>

<template>
    <img
        :src="src"
        loading="lazy"
        @load="onLoad"
        class="transition-opacity duration-300 opacity-0"
        :alt="alt"
        :width="width"
        :height="height"
    />
</template>
