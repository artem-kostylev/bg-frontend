<script setup lang="ts">
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

type Props = {
    src: string;
    width?: string;
    height?: string;
    loading?: "lazy" | "eager";
    alt?: string;
};

const props = withDefaults(defineProps<Props>(), {
    alt: "",
    width: "",
    height: "",
    loading: "lazy",
});

const targetRef = ref<HTMLImageElement>();

const { stop } = useIntersectionObserver(targetRef, ([{ isIntersecting }]) => {
    if (isIntersecting && targetRef.value) {
        targetRef.value.src = props.src;
        targetRef.value.onload = () => targetRef.value?.classList.add("opacity-100");
        stop();
    }
});
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
