<script setup lang="ts">
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

type Props = {
    src?: string;
    width?: string;
    height?: string;
    alt?: string;
};

const props = withDefaults(defineProps<Props>(), {
    alt: "",
    src: "",
    width: "",
    height: "",
});

const targetRef = ref<HTMLImageElement>();

const { stop } = useIntersectionObserver(
    targetRef,
    ([{ intersectionRatio }]) => {
        if (intersectionRatio === 1 && targetRef.value) {
            stop();

            targetRef.value.src = props.src;
            targetRef.value.onload = () => targetRef.value?.classList.add("opacity-100");
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
