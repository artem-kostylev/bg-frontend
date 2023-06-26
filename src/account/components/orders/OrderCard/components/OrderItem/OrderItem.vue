<script setup lang="ts">
import type { Component } from 'vue';

type Props = {
    icon: Component;
    label: string;
};

defineProps<Props>();
</script>

<template>
    <div class="flex space-x-2 items-center">
        <div class="rounded-md bg-secondary-200 p-1">
            <component :is="icon" width="1.2em" height="1.2em" class="shrink-0" />
        </div>
        <div>{{ label }}</div>
    </div>
</template>
