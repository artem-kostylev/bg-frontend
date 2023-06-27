<script setup lang="ts">
import type { Component } from 'vue';
import { IconFilled } from '@ui/components';

type Props = {
    icon: Component;
    label: string;
};

defineProps<Props>();
</script>

<template>
    <IconFilled
        :icon="icon"
        :label="label"
        width="1.1em"
        height="1.1em"
        padding="p-1"
        rounded="rounded-md"
        variant="secondary"
    />
</template>
