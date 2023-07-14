<script setup lang="ts">
import { ToggleElement } from '@/app/components';

type Props = {
    description: string;
};

defineProps<Props>();
</script>

<template>
    <ToggleElement btn-variant="ghost" btn-size="md">
        <div v-html="description" />
    </ToggleElement>
</template>
