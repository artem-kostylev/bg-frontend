<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref, useAttrs } from 'vue';
import type { StyleValue } from 'vue';
import { Field } from '../Field';
import type { InputProps } from '@ui/components/Input/input';
import { inputDefaultProps } from '@ui/components/Input/input';

withDefaults(defineProps<InputProps>(), inputDefaultProps);

const inputRef = ref<HTMLInputElement>();

const { class: classes, style: styles, ...inputAttrs } = useAttrs();

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const input = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    emit('update:modelValue', value);
};

defineExpose({ ref: inputRef });
</script>

<template>
    <div :class="['input', `input--${size}`, classes]" :style="(styles as StyleValue)">
        <Field :name="name" :hint="hint" :status="status" :label="label" :required="required">
            <div class="relative">
                <div
                    v-if="startIcon || $slots['start-icon']"
                    :class="['input__start-icon', startIcon && 'pointer-events-none']"
                >
                    <slot name="start-icon">
                        <component
                            :is="startIcon"
                            width="1em"
                            height="1em"
                            class="input__start-icon__el"
                        />
                    </slot>
                </div>
                <div
                    v-if="endIcon || $slots['end-icon']"
                    :class="['input__end-icon', endIcon && 'pointer-events-none']"
                >
                    <slot name="end-icon">
                        <component
                            :is="endIcon"
                            width="1em"
                            height="1em"
                            class="input__end-icon__el"
                        />
                    </slot>
                </div>
                <input
                    :type="type"
                    :value="modelValue"
                    :disabled="disabled"
                    :readonly="readonly"
                    :placeholder="placeholder"
                    :autocomplete="autocomplete"
                    :class="['input__el', justify && 'text-center', clickable && 'cursor-pointer']"
                    @input="input"
                    ref="inputRef"
                    v-bind="inputAttrs"
                />
            </div>
        </Field>
    </div>
</template>

<style lang="postcss">
.input {
    &__el {
        @apply focus:outline-none block w-full appearance-none transition-colors bg-white rounded-xl shadow-sm border border-slate-300 hover:border-slate-400 placeholder-slate-500 py-[.563em] px-[.875em] focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:opacity-60 disabled:pointer-events-none;
    }

    &--xs {
        @apply text-sm;
    }

    &--sm {
        @apply text-md;
    }

    &--md {
        @apply text-base;
    }

    &--lg {
        @apply text-lg;
    }

    &__start-icon {
        @apply absolute inset-y-0 flex items-center pl-[.875em];

        &__el {
            @apply text-slate-500;
        }

        & ~ .input__el {
            @apply pl-[2.313em];
        }
    }

    &__end-icon {
        @apply absolute inset-y-0 right-0 flex items-center pr-[.875em];

        &__el {
            @apply text-slate-500;
        }

        & ~ .input__el {
            @apply pr-[2.313em];
        }
    }
}
</style>
