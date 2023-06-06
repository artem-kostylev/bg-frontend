<script setup lang="ts">
import type { FieldProps } from '@ui/components/Field/field';
import { fieldDefaultProps } from '@ui/components/Field/field';

withDefaults(defineProps<FieldProps>(), fieldDefaultProps);
</script>

<template>
    <div :class="['field', status && `field--${status}`]">
        <label
            v-if="label"
            :class="[
                'field__label block mb-1.5 text-base',
                status === 'error' && 'text-red-600',
                status === 'success' && 'text-green-600',
            ]"
            :for="name"
        >
            <span>{{ label }}</span>
            <span v-if="required" class="text-red-600">&nbsp;*</span>
        </label>
        <slot />
        <span v-if="hint" :class="['field__hint text-slate-500 mt-1.5 text-sm']">{{ hint }}</span>
    </div>
</template>

<style lang="postcss">
.field {
    &__label {
        @apply block mb-1.5 text-base;
    }

    &__hint {
        @apply text-slate-500 mt-1.5 text-sm;
    }

    &--error {
        & .field__label {
            @apply text-red-600;
        }

        & .field__hint,
        & .input__el {
            @apply text-red-600;
        }

        & .input__el {
            @apply border-red-600 focus:border-red-600 focus:ring-red-200 focus:ring-opacity-50;
        }
    }

    &--success {
        & .field__label {
            @apply text-green-600;
        }

        & .field__hint,
        & .input__el {
            @apply text-green-600;
        }

        & .input__el {
            @apply border-green-600 focus:border-green-600 focus:ring-green-600 focus:ring-opacity-15;
        }
    }
}
</style>
