<script setup lang="ts">
import { Paper } from '@ui/components';
import type { CardProps } from '@ui/components/Card/card';
import { cardDefaultProps } from '@ui/components/Card/card';

withDefaults(defineProps<CardProps>(), cardDefaultProps);
</script>

<template>
    <Paper class="flex flex-col">
        <div v-if="$slots.cover" :class="['relative overflow-hidden rounded-t-xl', coverClass]">
            <slot name="cover" />
        </div>
        <div v-if="$slots.header" :class="['relative p-5 flex flex-col', headerClass]">
            <slot name="header" />
        </div>
        <div
            :class="[
                'relative flex-1 px-5',
                bodyClass,
                !$slots.header && 'pt-5',
                !$slots.footer && 'pb-5',
            ]"
        >
            <slot />
        </div>
        <div v-if="$slots.footer" :class="['relative p-5 flex flex-col', footerClass]">
            <slot name="footer" />
        </div>
    </Paper>
</template>
