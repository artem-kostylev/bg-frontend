<script setup lang="ts">
import Button from '../Button/Button.vue';
import { Field } from '../Field';
import type { Option, RadioButtonGroupProps } from './radioButtonGroup';

const props = defineProps<RadioButtonGroupProps>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string | number | boolean): void }>();

const select = (option: Option) => {
    emit('update:modelValue', option.value);
};

const selected = (option: Option) => {
    return option.value === props.modelValue;
};
</script>

<template>
    <Field :error="error" :hint="hint" :label="label" :name="name" :required="required">
        <div class="inline-flex">
            <Button
                v-for="(option, index) in options"
                :size="size"
                :variant="variant"
                :key="index"
                :strong="strong"
                @click="select(option)"
                :class="[
                    'hover:z-10 focus:z-10 [&:not(:last-child)]:rounded-r-none [&:not(:first-child)]:rounded-l-none [&:not(:first-child)]:ml-[-1px]',
                    selected(option) && '!bg-secondary-50 !text-primary-700',
                ]"
            >
                {{ option.label }}
            </Button>
        </div>
    </Field>
</template>
