<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import type { ImageProps } from '@ui/components/Image/image';
import { imageDefaultProps } from '@ui/components/Image/image';

const props = withDefaults(defineProps<ImageProps>(), imageDefaultProps);

const targetRef = ref<HTMLImageElement>();

const { stop } = useIntersectionObserver(
    targetRef,
    ([{ intersectionRatio }]) => {
        if (intersectionRatio === 1 && targetRef.value) {
            stop();

            targetRef.value.src = props.src;
            targetRef.value.onload = () => targetRef.value?.classList.add('opacity-100');
        }
    },
    { threshold: 1.0 }
);
</script>

<template>
    <img
        ref="targetRef"
        class="transition-opacity duration-300 opacity-0"
        :alt="alt"
        :width="width"
        :height="height"
    />
</template>
