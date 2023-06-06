<script setup lang="ts">
import { MinusIcon, PlusIcon } from '@ui/icons';
import type { QuntityPickerProps } from './quantityPicker';
import { defaultQuntityPickerProps } from './quantityPicker';

const props = withDefaults(defineProps<QuntityPickerProps>(), defaultQuntityPickerProps);

const emit = defineEmits<{
    (event: 'update:modelValue', value?: number): void;
    (event: 'increment'): void;
    (event: 'decrement'): void;
}>();

const increment = () => {
    if (props.max !== props.modelValue) {
        emit('update:modelValue', (props.modelValue || 0) + 1);
        emit('increment');
    }
};

const decrement = () => {
    if (props.modelValue && props.min !== props.modelValue) {
        emit('update:modelValue', props.modelValue - 1);
        emit('decrement');
    }
};
</script>

<template>
    <div class="flex items-center space-x-3">
        <button
            class="border border-transparent bg-secondary-200 hover:bg-secondary-300 transition-colors duration-250 h-9 w-9 flex items-center justify-center rounded-full"
            @click="decrement"
        >
            <MinusIcon width="1.2rem" height="1.2rem" class="text-secondary-500" />
        </button>
        <div class="font-medium w-4 text-center">
            {{ modelValue }}
        </div>
        <button
            class="border border-transparent bg-secondary-200 hover:bg-secondary-300 transition-colors duration-250 h-9 w-9 flex items-center justify-center rounded-full"
            @click="increment"
        >
            <PlusIcon width="1.2rem" height="1.2rem" class="text-secondary-500" />
        </button>
    </div>
</template>
