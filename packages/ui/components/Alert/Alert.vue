<script setup lang="ts">
import { computed } from 'vue';
import { alertVariants, alertDefaultProps } from '@ui/components/Alert/alert';
import type { AlertProps } from '@ui/components/Alert/alert';
import { InfoIcon, CheckIcon, XIcon, QuestionInCircleIcon } from '@ui/icons';

const props = withDefaults(defineProps<AlertProps>(), alertDefaultProps);

const startIcon = computed(() => {
    if (props.startIcon) return props.startIcon;

    switch (props.variant) {
        case 'info':
            return InfoIcon;
        case 'success':
            return CheckIcon;
        case 'warning':
            return InfoIcon;
        case 'error':
            return XIcon;
        default:
            return QuestionInCircleIcon;
    }
});
</script>

<template>
    <div :class="['px-4 py-2.5 flex items-start border rounded-xl', alertVariants[variant]]">
        <component
            :is="startIcon"
            class="mr-3 mt-[3px] flex-shrink-0"
            width="1.4em"
            height="1.4em"
        />
        <div>
            <div v-if="title" class="font-medium mb-1">{{ title }}</div>
            <div v-else-if="$slots.title"><slot name="title" /></div>
            <div v-if="text">{{ text }}</div>
            <div v-else-if="$slots.text"><slot name="text" /></div>
        </div>
    </div>
</template>
