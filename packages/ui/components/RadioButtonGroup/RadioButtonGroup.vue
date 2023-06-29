<script setup lang="ts">
import Button from '../Button/Button.vue';
import type { Item, RadioButtonGroupProps } from './radioButtonGroup';

const props = defineProps<RadioButtonGroupProps>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string | number | boolean): void }>();

const select = (item: Item) => {
    emit('update:modelValue', item.value);
};

const selected = (item: Item) => {
    return item.value === props.modelValue;
};
</script>

<template>
    <div>
        <label v-if="label" class="block mb-1.5 text-base" :for="name">
            <span>{{ label }}</span>
            <span v-if="required" class="text-danger-500">&nbsp;*</span>
        </label>
        <div class="inline-flex">
            <Button
                v-for="(item, index) in items"
                :size="size"
                :variant="variant"
                :key="index"
                :strong="false"
                @click="select(item)"
                :class="[
                    'hover:z-10 focus:z-10 [&:not(:last-child)]:rounded-r-none [&:not(:first-child)]:rounded-l-none [&:not(:first-child)]:ml-[-1px]',
                    selected(item) && '!bg-secondary-50 !text-primary-500',
                ]"
            >
                {{ item.label }}
            </Button>
        </div>
        <div v-if="hint" :class="error && 'text-danger-500'">{{ hint }}</div>
    </div>
</template>
