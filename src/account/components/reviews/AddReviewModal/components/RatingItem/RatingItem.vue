<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { Slider } from '@ui/components';
import { SmileFaceIcon, SadFaceIcon } from '@ui/icons';

type Props = {
    modelValue: number;
    label: string;
    isError?: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();
const rating = useVModel(props, 'modelValue', emit);
</script>

<template>
    <div class="flex flex-wrap items-center gap-2 w-full">
        <div
            class="w-1/4 font-bold text-left basis-full sm:basis-auto mb-5 sm:mb-0"
            :class="isError && 'text-danger-600'"
        >
            {{ label }}
        </div>
        <div class="flex items-center justify-between flex-1 gap-2">
            <SadFaceIcon class="text-danger-600" />
            <Slider
                v-model="rating"
                :min="1"
                :max="10"
                tooltip
                :disabled="!rating"
                class="w-[calc(100%-4.5rem)]"
            />
            <SmileFaceIcon class="text-success-600" />
        </div>
    </div>
</template>
