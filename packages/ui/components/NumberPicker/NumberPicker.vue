<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Button, Popover, RangeNumber } from '@ui/components';
import type { NumberPickerProps } from '@ui/components/NumberPicker/numberPicker';
import { defaultNumberPickerProps } from '@ui/components/NumberPicker/numberPicker';
import type { RangeNumberModelValue } from '@ui/components/RangeNumber/rangeNumber';

const props = withDefaults(defineProps<NumberPickerProps>(), defaultNumberPickerProps);
const emit = defineEmits<{ (e: 'update:modelValue', value: RangeNumberModelValue): void }>();

const modelValue = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const open = ref(false);

const selected = computed(() => {
    if (!props.range) {
        const value = props.modelValue as number;
        if (!value) return;
        return props.renderLabel ? props.renderLabel(value) : value;
    }

    const value = props.modelValue as number[];
    if (!value.length) return;

    return props.renderLabel ? props.renderLabel(value) : value.join(' - ');
});

watch(modelValue, value => {
    if (props.range) {
        if ((value as number[]).length !== 2) return;
        else open.value = false;
    } else {
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
                :strong="!!selected && strong"
                :class="open && 'border-secondary-400'"
                justify="between"
            >
                <template v-if="selected">{{ selected }}</template>
                <span v-else class="text-secondary-500">{{ placeholder }}</span>
            </Button>
        </template>
        <RangeNumber v-model="modelValue" :range="range" :number-disabled="numberDisabled" />
    </Popover>
</template>
