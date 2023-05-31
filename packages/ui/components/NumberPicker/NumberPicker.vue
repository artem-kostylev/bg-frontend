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

const show = ref(false);
const rangeNumberRef = ref<InstanceType<typeof RangeNumber>>();

const selected = computed(() => {
    if (!props.range) {
        return props.renderLabel ? props.renderLabel(props.modelValue) : props.modelValue;
    }

    const value = props.modelValue as number[];

    return props.renderLabel ? props.renderLabel(value) : value.join(' - ');
});

watch(modelValue, value => {
    if (props.range) {
        if ((value as number[]).length !== 2) return;
        else show.value = false;
    } else {
        show.value = false;
    }
});
</script>

<template>
    <Popover v-model="show" :placement="placement">
        <template #trigger="{ vbind }">
            <Button v-bind="vbind" :end-icon="endIcon" :strong="strong">
                {{ selected }}
            </Button>
        </template>
        <RangeNumber
            ref="rangeNumberRef"
            v-model="modelValue"
            :range="range"
            :number-disabled="numberDisabled"
        />
    </Popover>
</template>
