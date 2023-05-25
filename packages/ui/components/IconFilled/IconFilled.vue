<script setup lang="ts">
import type { Component } from 'vue';

const variants = {
    base: 'border-slate-300 bg-white',
    primary: 'border-transparent bg-primary-300/20 text-primary-500',
    warning: 'border-transparent bg-orange-100 text-orange-700',
};

type Props = {
    label?: string;
    icon: Component;
    variant?: keyof typeof variants;
    width?: string;
    height?: string;
};

withDefaults(defineProps<Props>(), {
    label: '',
    variant: 'base',
    width: '1.2em',
    height: '1.2em',
});
</script>

<template>
    <div class="flex items-center space-x-2">
        <div :class="['p-1.5 rounded-xl border', variants[variant]]">
            <component :is="icon" :width="width" :height="height" />
        </div>
        <span v-if="label">{{ label }}</span>
    </div>
</template>
