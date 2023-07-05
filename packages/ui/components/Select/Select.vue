<script lang="ts">
export default { inheritAttrs: true };
</script>

<script setup lang="ts">
import { computed, h, ref, watch } from 'vue';
import { Menu, Button, Popover } from '@ui/components';
import type { StringOrNumber, UnknownObject } from '@ui/types';
import { ChevronDownIcon } from '@ui/icons';
import type { SelectProps } from '@ui/components/Select/select';
import { defaultSelectProps } from '@ui/components/Select/select';
import { Field } from '@ui/components';
import isEqual from 'lodash.isequal';

const props = withDefaults(defineProps<SelectProps>(), defaultSelectProps);
const emit = defineEmits<{
    (
        e: 'update:modelValue',
        value?: StringOrNumber | StringOrNumber[] | UnknownObject | UnknownObject[]
    ): void;
}>();

const modelValue = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const open = ref(false);

const selected = computed(() => {
    if (!props.modelValue) return '';

    if (props.multiple) {
        const selected = props.options.filter(item => {
            const result = props.returnObject ? item : item[props.valueKey];
            return (props.modelValue as StringOrNumber[])?.includes(result as StringOrNumber);
        });

        return selected.map(item => item[props.labelKey]).join(', ');
    }

    const selected = props.options.find(item => {
        const result = props.returnObject ? item : item[props.valueKey];
        return props.returnObject ? isEqual(result, props.modelValue) : result === props.modelValue;
    });

    return selected?.[props.labelKey] || '';
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
                    :loading="loading"
                >
                    <template v-if="selected">{{ selected }}</template>
                    <span v-else :class="buttonPlaceholderClass">{{ placeholder }}</span>
                </Button>
            </Field>
        </template>
        <Menu
            v-model="modelValue"
            :options="options"
            :multiple="multiple"
            :label-key="labelKey"
            :value-key="valueKey"
            :children-key="childrenKey"
            :description-key="descriptionKey"
            :return-object="returnObject"
        >
            <template v-if="$slots.empty" #empty>
                <slot name="empty" />
            </template>
        </Menu>
    </Popover>
</template>
