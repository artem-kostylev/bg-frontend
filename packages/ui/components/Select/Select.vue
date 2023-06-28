<script lang="ts">
export default { inheritAttrs: true };
</script>

<script setup lang="ts">
import { computed, h, ref, watch } from 'vue';
import { Menu, Button, Popover } from '@ui/components';
import type { StringOrNumber } from '@ui/types';
import { ChevronDownIcon } from '@ui/icons';
import type { SelectProps } from '@ui/components/Select/select';
import { defaultSelectProps } from '@ui/components/Select/select';
import { Field } from '@ui/components';

const props = withDefaults(defineProps<SelectProps>(), defaultSelectProps);
const emit = defineEmits<{
    'update:modelValue': [StringOrNumber | StringOrNumber[] | null | undefined];
}>();

const modelValue = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const open = ref(false);

const selected = computed(() => {
    if (props.multiple) {
        const result = props.options
            .filter(option => (modelValue.value as StringOrNumber[]).includes(option.value))
            .map(option => option.label);

        return result.join(', ');
    }

    if (!props.options) return '';

    const value = props.options.find(option => option.value === modelValue.value);
    return value?.label;
});

const endIcon = (props: Record<string, StringOrNumber>) => {
    return h(ChevronDownIcon, {
        ...props,
        class: ['transition-transform', open.value && 'rotate-180'],
    });
};

watch(modelValue, () => {
    if (!props.multiple) return (open.value = false);

    if (props.options.length === (modelValue.value as StringOrNumber[]).length) {
        open.value = false;
    }
});

const buttonVariant = computed(() => {
    return props.error ? 'danger-outline' : props.success ? 'success-outline' : 'base';
});

const buttonClass = computed(() => {
    return props.error
        ? 'border-danger-700'
        : props.success
        ? 'border-success-700'
        : 'border-secondary-400';
});

const buttonPlaceholderClass = computed(() => {
    return props.error
        ? 'text-danger-500'
        : props.success
        ? 'text-success-600'
        : 'text-secondary-500';
});
</script>

<template>
    <Popover v-model="open" :placement="placement">
        <template #trigger="{ vbind }">
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
                    v-bind="{ ...vbind, ...$attrs }"
                    :end-icon="endIcon"
                    :class="open && buttonClass"
                    :variant="buttonVariant"
                    :strong="strong && !!selected"
                    justify="between"
                    :block="block"
                    :disabled="disabled"
                >
                    <template v-if="selected">{{ selected }}</template>
                    <span v-else :class="buttonPlaceholderClass">{{ placeholder }}</span>
                </Button>
            </Field>
        </template>
        <Menu v-model="modelValue" :options="options" :multiple="multiple" />
    </Popover>
</template>
