<script setup lang="ts">
import dayjs from 'dayjs';
import { CalendarIcon } from '@ui/icons';
import { computed, ref, watch } from 'vue';
import { Button, Calendar, Popover } from '@ui/components';
import type { DatePickerProps } from '@ui/components/DatePicker/datePicker';
import { defaultDatePickerProps } from '@ui/components/DatePicker/datePicker';

const props = withDefaults(defineProps<DatePickerProps>(), defaultDatePickerProps);
const emit = defineEmits<{ (e: 'update:modelValue', value: string | string[] | null): void }>();

const modelValue = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const open = ref(false);

const selected = computed(() => {
    if (props.range) {
        if (!props.modelValue?.length) return;

        return `с ${(props.modelValue as string[])
            .map(item => dayjs(item).format(props.format))
            .join(' по ')}`;
    }

    return props.modelValue && dayjs(props.modelValue as string).format(props.format);
});

watch(modelValue, value => {
    if (props.range) {
        if ((value as string[]).length !== 2) return;
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
                :end-icon="CalendarIcon"
                :strong="!!selected && strong"
                :class="open && 'border-secondary-400'"
                justify="between"
            >
                <template v-if="selected">{{ selected }}</template>
                <span v-else class="text-secondary-500">{{ placeholder }}</span>
            </Button>
        </template>
        <Calendar
            v-model="modelValue"
            :range="range"
            :date-disabled="dateDisabled"
            :value-format="valueFormat"
        />
    </Popover>
</template>
