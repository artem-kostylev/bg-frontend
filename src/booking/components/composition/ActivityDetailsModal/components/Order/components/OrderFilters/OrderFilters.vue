<script setup lang="ts">
import { ref, watch } from 'vue';
import { Select, DatePicker } from '@ui/components';
import type { ActivitySearchFilter, ActivitySearchFilters } from '@/booking/types';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import cloneDeep from 'lodash.clonedeep';

type Props = {
    modelValue: ActivitySearchFilters;
    filters: ActivitySearchFilter[];
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: ActivitySearchFilters): void }>();

const value = ref(cloneDeep(props.modelValue));

const disabledDates = (dates: string[]) => {
    return (date: Dayjs) => {
        return !dates.includes(dayjs(date).format('YYYY-MM-DD'));
    };
};

watch(value, v => emit('update:modelValue', v), { deep: true });
</script>

<template>
    <div class="flex flex-wrap -mx-1.5 -mb-3">
        <div class="px-1.5 mb-3" v-for="filter in filters" :key="filter.key">
            <DatePicker
                v-if="filter.type === 'date'"
                :date-disabled="disabledDates(filter.allowed)"
                v-model="value[filter.key]"
                :format="'DD.MM.YYYY'"
                placeholder="дд.мм.гггг"
            />
            <Select
                v-if="filter.type === 'time'"
                v-model="value[filter.key]"
                :options="filter.options"
            />
            <Select
                v-if="filter.type === 'select'"
                v-model="value[filter.key]"
                :options="filter.options"
            />
        </div>
    </div>
</template>
