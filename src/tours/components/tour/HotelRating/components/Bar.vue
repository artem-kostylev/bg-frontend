<script setup lang="ts">
import { computed } from 'vue';

type Props = {
    value: number;
};

const props = defineProps<Props>();

const colors = [
    '#ffbe03',
    '#f7c216',
    '#efc529',
    '#e7c93c',
    '#dfcc4f',
    '#d8d062',
    '#d0d475',
    '#c8d788',
    '#c0db9b',
    '#b5dfb4',
];

const lineStyle = computed(() => {
    let g = '';

    colors.forEach((color: string, colorIndex: number) => {
        colorIndex + 1 === Math.round(props.value) && (g += color);
    });

    return {
        background: g,
        width: `${props.value * 10}%`,
        'border-radius': '0.125rem',
    };
});
</script>

<template>
    <div class="w-full h-1 bg-[#eeeeee] rounded-sm">
        <div class="w-full h-full" :style="lineStyle"></div>
    </div>
</template>
