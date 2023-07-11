<script setup lang="ts">
import type { Component } from 'vue';

type Props = {
    label: string;
    icon?: Component;
    classes?: string;
};

defineProps<Props>();
</script>

<template>
    <div class="absolute top-0 right-0">
        <div
            :class="[
                'text-white px-2.5 py-1.5 text-sm rounded-bl-xl space-x-2 flex items-center',
                classes,
            ]"
        >
            <component v-if="icon" :is="icon" width="1.2em" height="1.2em" />
            <div>{{ label }}</div>
        </div>
    </div>
</template>
