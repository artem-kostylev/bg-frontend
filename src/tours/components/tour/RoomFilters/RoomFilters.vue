<script setup lang="ts">
import { computed } from 'vue';
import { DatePicker } from '@ui/components';
import { MoonIcon } from '@ui/icons';
import { NumberPicker } from '@ui/components';
import type { RoomAggregations } from '@/tours/services';
import type { Dayjs } from 'dayjs';

type Props = {
    modelValue: RoomAggregations;
    aggregations: RoomAggregations | null;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: RoomAggregations): void }>();

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const durationRenderLabel = (modelValue: number[] | number | null) => {
    const value = modelValue as number[];

    return `от ${value[0]} до ${value[1]} ночей`;
};

const beginDateDisabled = (date: Dayjs) => {
    return !props.aggregations?.begin_date.includes(date.format('YYYY-MM-DD'));
};

const durationDisabled = (number: number) => {
    return !props.aggregations?.duration.includes(number);
};
</script>

<template>
    <div class="flex items-center space-x-2.5">
        <DatePicker
            v-model="value.begin_date"
            range
            placeholder="Когда"
            :date-disabled="beginDateDisabled"
        />
        <NumberPicker
            v-model="value.duration"
            :end-icon="MoonIcon"
            :render-label="durationRenderLabel"
            range
            placeholder="Ночей"
            :number-disabled="durationDisabled"
        />
    </div>
</template>
