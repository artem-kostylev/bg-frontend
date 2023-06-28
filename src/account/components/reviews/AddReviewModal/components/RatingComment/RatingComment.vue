<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import type { ReviewComments } from '@/tours/types';

type Props = {
    modelValue: string;
    type: keyof ReviewComments;
    placeholder: string;
    isError?: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
const comment = useVModel(props, 'modelValue', emit);

const TYPES = {
    comment: 'border-secondary-300',
    liked: 'border-success-600',
    disliked: 'border-[#FFBD00]',
};
</script>

<template>
    <textarea
        v-model="comment"
        :placeholder="placeholder"
        :class="['border border-l-10 rounded-xl resize-none min-h-[6rem] p-2', TYPES[type]]"
    />
</template>
