<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@ui/components';
import { CalendarIcon, MoonIcon } from '@ui/icons';
import { NumberPicker } from '@ui/components';

const filters = ref({
    tour_begin_date: [],
    tour_duration: [1, 10],
});

const durationRenderLabel = (modelValue: number[] | number | null) => {
    const value = modelValue as number[];

    return `от ${value[0]} до ${value[1]} ночей`;
};
</script>

<template>
    <div class="flex items-center space-x-2.5">
        <Button :end-icon="CalendarIcon">с 16.05 по 23.05</Button>
        <NumberPicker
            v-model="filters.tour_duration"
            :end-icon="MoonIcon"
            :render-label="durationRenderLabel"
            range
        />
    </div>
</template>
