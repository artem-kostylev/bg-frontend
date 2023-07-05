<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Menu, Popover } from '@ui/components';
import type { StringOrNumber, UnknownObject } from '@ui/types';
import type { SelectProps } from '@ui/components/Select/select';
import { defaultSelectProps } from '@ui/components/Select/select';
import { SelectButton } from '@ui/components';
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

watch(modelValue, () => {
    if (!props.multiple) return (open.value = false);

    if (props.options.length === (modelValue.value as StringOrNumber[]).length) {
        open.value = false;
    }
});
</script>

<template>
    <Popover v-model="open" :placement="placement">
        <template #trigger="{ vbind }">
            <SelectButton
                :name="name"
                :required="required"
                :label="label"
                :hint="hint"
                :error="error"
                :success="success"
                :value="selected"
                :placeholder="placeholder"
                :open="open"
                v-bind="vbind"
            />
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
