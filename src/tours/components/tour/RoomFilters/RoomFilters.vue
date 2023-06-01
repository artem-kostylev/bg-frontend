<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker } from '@ui/components';
import { MoonIcon } from '@ui/icons';
import { NumberPicker } from '@ui/components';
import type { RoomAggregations } from '@/tours/services';
import { watchOnce } from '@vueuse/core';

type Props = {
    aggregations: RoomAggregations;
};

const filters = ref<RoomAggregations>({
    duration: [],
    begin_date: [],
});

watchOnce(
    () => props.aggregations,
    value => {
        const begin_date = [value.begin_date[0], value.begin_date[value.begin_date.length - 1]];
        const duration = [value.duration[0], value.duration[value.duration.length - 1]];

        filters.value = { begin_date, duration };
    }
);

const props = defineProps<Props>();
// const emit = defineEmits<{ (e: 'change', value: RoomAggregations): void }>();

const durationRenderLabel = (modelValue: number[] | number | null) => {
    const value = modelValue as number[];

    return `от ${value[0]} до ${value[1]} ночей`;
};

const durationDisabled = (number: number) => {
    return !props.aggregations.duration.includes(number);
};
</script>

<template>
    <div class="flex items-center space-x-2.5">
        <DatePicker v-model="filters.begin_date" range placeholder="Когда" />
        <NumberPicker
            v-model="filters.duration"
            :end-icon="MoonIcon"
            :render-label="durationRenderLabel"
            range
            placeholder="Ночей"
            :number-disabled="durationDisabled"
        />
    </div>
</template>
