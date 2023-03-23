<script setup lang="ts">
import { computed } from "vue";

type Props = {
    src: string;
    width?: string;
    height?: string;
    loading?: "lazy" | "eager";
    alt?: string;
};

const props = withDefaults(defineProps<Props>(), {
    width: "",
    height: "",
    loading: "lazy",
    alt: undefined,
});

const src = computed(() => {
    return props.src.startsWith("image")
        ? `https://static.stage.bgit.ru/public/${props.src}`
        : props.src;
});
</script>

<template>
    <img :src="src" :loading="loading" :alt="alt" :width="width" :height="height" />
</template>
