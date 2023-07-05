<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed, h } from 'vue';
import type { SelectButtonProps } from './selectButton';
import { defaultSelectButtonProps } from './selectButton';
import { Field, Button } from '@ui/components';
import { ChevronDownIcon } from '@ui/icons';
import type { StringOrNumber } from '@ui/types';

const props = withDefaults(defineProps<SelectButtonProps>(), defaultSelectButtonProps);

const buttonVariant = computed(() => {
    return props.error ? 'danger-outline' : props.success ? 'success-outline' : 'base';
});

const buttonPlaceholderClass = computed(() => {
    return props.error
        ? 'text-danger-500'
        : props.success
        ? 'text-success-600'
        : 'text-secondary-500';
});

const endIcon = (props: Record<string, StringOrNumber>) => {
    return h(ChevronDownIcon, {
        ...props,
        class: ['transition-transform', props.open && 'rotate-180'],
    });
};

const buttonClass = computed(() => {
    return props.error
        ? 'border-danger-700'
        : props.success
        ? 'border-success-700'
        : 'border-secondary-400';
});
</script>

<template>
    <Field
        :name="name"
        :required="required"
        :label="label"
        :hint="hint"
        :error="error"
        :success="success"
    >
        <Button
            :name="name"
            v-bind="$attrs"
            :end-icon="endIcon"
            :class="open && buttonClass"
            :variant="buttonVariant"
            :strong="strong && !!value"
            justify="between"
            :block="block"
            :disabled="disabled"
            :loading="loading"
        >
            <template v-if="value">{{ value }}</template>
            <span v-else :class="buttonPlaceholderClass">{{ placeholder }}</span>
        </Button>
    </Field>
</template>
