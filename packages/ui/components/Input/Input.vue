<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Spin, Field } from '@ui/components';
import type { InputProps } from './input';
import { defaultInputProps } from './input';

const props = withDefaults(defineProps<InputProps>(), defaultInputProps);

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const { class: classes, ...attrs } = useAttrs();

const inputPaddingClass = computed(() => {
    const classes = [];

    props.startIcon ? classes.push('pl-10') : classes.push('pl-4');
    props.endIcon ? classes.push('pr-10') : classes.push('pr-4');

    return classes;
});

const onInput = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    emit('update:modelValue', value);
};

const endIcon = computed(() => (props.loading ? Spin : props.endIcon));
</script>

<template>
    <Field :label="label" :required="required" :error="error" :success="success" :hint="hint">
        <div :class="['relative inline-flex w-full', classes]">
            <div
                v-if="startIcon"
                class="absolute inset-y-0 left-0 flex items-center justify-center pl-4"
            >
                <component
                    :is="startIcon"
                    width="1.2em"
                    height="1.2em"
                    class="text-secondary-500"
                />
            </div>
            <input
                v-bind="attrs"
                :value="modelValue"
                :type="type"
                :placeholder="placeholder"
                @input="onInput"
                :disabled="disabled"
                :readonly="readonly"
                :class="[
                    'inline-flex items-center bg-white border px-3.5 py-[.535rem] rounded-xl transition-colors duration-200 w-full',
                    error &&
                        'border-danger-500 hover:border-danger-700 focus:border-danger-700 placeholder-danger-500',
                    success &&
                        'border-success-600 hover:border-success-700 focus:border-success-700 placeholder-success-600',
                    !error &&
                        !success &&
                        'border-secondary-300 hover:border-secondary-400 focus:border-secondary-400 placeholder-secondary-500',
                    disabled && 'pointer-events-none opacity-60',
                    ...inputPaddingClass,
                ]"
            />
            <div
                v-if="endIcon"
                class="absolute inset-y-0 right-0 flex items-center justify-center pr-4"
            >
                <component :is="endIcon" width="1.2em" height="1.2em" class="text-secondary-500" />
            </div>
        </div>
    </Field>
</template>
