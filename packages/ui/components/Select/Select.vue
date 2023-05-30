<script setup lang="ts">
import { computed, h, ref, watch } from 'vue';
import { Menu, Button, Popover } from '@ui/components';
import type { StringOrNumber } from '@ui/types';
import { ChevronDownIcon } from '@ui/icons';
import type { SelectProps } from '@ui/components/Select/select';
import { defaultSelectProps } from '@ui/components/Select/select';

const props = withDefaults(defineProps<SelectProps>(), defaultSelectProps);
const emit = defineEmits<{ 'update:modelValue': [StringOrNumber | StringOrNumber[]] }>();

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

    const value = props.options.find(option => option.value === modelValue.value);
    return value?.label;
});

const endIcon = computed(
    () => (props: Record<string, StringOrNumber>) =>
        h(ChevronDownIcon, {
            ...props,
            class: ['transition-transform', open.value && 'rotate-180'],
        })
);

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
            <Button
                v-bind="vbind"
                :end-icon="endIcon"
                :class="open && 'border-secondary-400'"
                :strong="strong && !!selected"
            >
                <template v-if="selected">{{ selected }}</template>
                <span v-else class="text-secondary-500">{{ placeholder }}</span>
            </Button>
        </template>
        <Menu v-model="modelValue" :options="options" :multiple="multiple" />
    </Popover>
</template>
