<script setup lang="ts">
import { computed } from "vue";
import { Image } from "@ui/components";

type Props = {
    src?: string;
    width?: string;
    height?: string;
    initials?: string;
    shape?: "rounded" | "square";
};

const props = withDefaults(defineProps<Props>(), {
    src: "",
    width: "",
    height: "",
    initials: "",
    shape: "square",
});

const letters = computed(() => {
    if (!props.initials) return;

    return props.initials
        .split(" ")
        .map(item => item.charAt(0).toUpperCase())
        .splice(0, 2)
        .join("");
});
</script>

<template>
    <div
        :class="[
            'inline-flex items-center justify-center bg-slate-200 overflow-hidden',
            shape === 'rounded' && 'rounded-xl',
            shape === 'square' && 'rounded-full',
        ]"
        :style="{ width, height }"
    >
        <Image v-if="src" :src="src" :alt="letters" class="w-full h-full object-cover" />
        <div v-else class="text-slate-500 font-medium">{{ letters }}</div>
    </div>
</template>
