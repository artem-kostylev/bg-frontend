<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, computed, watch } from 'vue';
import { ArrowLeftIcon, ArrowRightIcon } from '@ui/icons';
import { Typography } from '@ui/components';
import type { CalendarProps } from '@ui/components/Calendar/calendar';
import { defaultCalendarProps } from '@ui/components/Calendar/calendar';

const props = withDefaults(defineProps<CalendarProps>(), defaultCalendarProps);
const emit = defineEmits<{ (e: 'update:modelValue', value: string | string[] | null): void }>();

const now = dayjs().valueOf();

const modelValue = ref<string | string[] | null>(null);
const currentMonth = ref<string | null>(null);

// TODO: fix this

watch(
    () => props.modelValue,
    value => {
        modelValue.value = value;

        if (props.range && value) {
            if (!(value as string[]).length) {
                currentMonth.value = dayjs(now).startOf('month').format(props.valueFormat);
            } else {
                currentMonth.value = dayjs(value[1]).startOf('month').format(props.valueFormat);
            }
        } else {
            if (!(value as string)) {
                currentMonth.value = dayjs(now).startOf('month').format(props.valueFormat);
            } else {
                currentMonth.value = dayjs(props.modelValue as string)
                    .startOf('month')
                    .format(props.valueFormat);
            }
        }
    },
    { immediate: true }
);

const days = computed(() => {
    const start = dayjs(currentMonth.value).startOf('week');
    const end = dayjs(currentMonth.value).endOf('month').endOf('week');

    const diff = end.diff(start, 'days');
    const num = 42 - diff;

    const dayArray = [];

    for (let i = 0; i < diff + num; i++) {
        dayArray.push(dayjs(start).add(i, 'day').valueOf());
    }

    return dayArray;
});

const dayClasses = (day: number) => {
    const classes = [];

    if (props.dateDisabled && props.dateDisabled(dayjs(day))) {
        classes.push('text-secondary-300 line-through');
        return classes.join(' ');
    }

    dayjs(day).isSame(now, 'day') && classes.push('text-primary-500');
    !dayjs(day).isSame(currentMonth.value, 'month') && classes.push('text-secondary-500');

    return classes.join(' ');
};

const rangeClasses = (day: number) => {
    if (!props.range) return;

    const [firstDay, lastDay] = modelValue.value as string[];
    if (!lastDay) return;

    if (!dayjs(day).isSame(currentMonth.value, 'month')) return;

    const classes = [];

    if (dayjs(firstDay).isBefore(day) && dayjs(lastDay).isAfter(day)) {
        classes.push('bg-secondary-100 text-secondary-500');
    }
    if (dayjs(firstDay).isSame(day, 'day')) {
        classes.push('rounded-l-full bg-secondary-100');
    }
    if (dayjs(lastDay).isSame(day, 'day')) {
        classes.push('rounded-r-full bg-secondary-100');
    }

    return classes.join(' ');
};

const selectedClass = (day: number) => {
    if (props.dateDisabled && props.dateDisabled(dayjs(day))) return;

    if (props.range) {
        if (!dayjs(day).isSame(currentMonth.value, 'month')) {
            return 'hover:bg-secondary-100 cursor-pointer';
        }

        const [firstDay, lastDay] = modelValue.value as string[];

        return (firstDay && dayjs(firstDay).isSame(day, 'day')) ||
            (lastDay && dayjs(lastDay).isSame(day, 'day'))
            ? 'bg-primary-500 text-white hover:bg-primary-500 cursor-pointer'
            : 'hover:bg-secondary-100 cursor-pointer';
    }

    if (!modelValue.value) return 'hover:bg-secondary-100 cursor-pointer';

    return dayjs(modelValue.value as string).isSame(day, 'day') &&
        dayjs(currentMonth.value).isSame(day, 'month')
        ? 'bg-primary-500 text-white hover:bg-primary-500 cursor-pointer'
        : 'hover:bg-secondary-100 cursor-pointer';
};

const select = (value: number) => {
    if (props.dateDisabled && props.dateDisabled(dayjs(value))) return;

    const day = dayjs(value).format(props.valueFormat);

    if (!props.range) return (modelValue.value = day);

    const [first, last] = modelValue.value as string[];

    if (!first || (first && last)) return (modelValue.value = [day]);

    if (dayjs(value).isBefore(first)) return (modelValue.value = [day, first]);

    if (first && !last) modelValue.value = [first, day];
};

const nextMonth = () => {
    currentMonth.value = dayjs(currentMonth.value).add(1, 'month').format(props.valueFormat);
};

const prevMonth = () => {
    currentMonth.value = dayjs(currentMonth.value).subtract(1, 'month').format(props.valueFormat);
};

const hasPrev = computed(() => {
    return !dayjs(currentMonth.value).isSame(now, 'month');
});

const hasNext = computed(() => {
    return !dayjs(currentMonth.value).isSame(dayjs(now).add(6, 'month'), 'month');
});

watch(modelValue, value => {
    if (!props.range) return emit('update:modelValue', value);
    if ((value as string[]).length === 2) emit('update:modelValue', value);
});
</script>

<template>
    <div class="w-max px-2 pt-3 pb-1 select-none">
        <div class="flex items-center justify-between mb-2.5">
            <button
                :class="[
                    'cursor-pointer rounded-full p-1 bg-white hover:bg-secondary-100 flex items-center justify-center w-9 h-9 text-primary-500',
                    !hasPrev && 'invisible',
                ]"
                @click="prevMonth"
                :disabled="!hasPrev"
            >
                <ArrowLeftIcon width="1.3rem" height="1.3rem" />
            </button>
            <Typography variant="h5" class="capitalize">
                {{ dayjs(currentMonth).format('MMM YYYY') }}
            </Typography>
            <button
                :class="[
                    'cursor-pointer rounded-full p-1 bg-white hover:bg-secondary-100 flex items-center justify-center w-9 h-9 text-primary-500',
                    !hasNext && 'invisible',
                ]"
                @click="nextMonth"
                :disabled="!hasNext"
            >
                <ArrowRightIcon width="1.3rem" height="1.3rem" />
            </button>
        </div>
        <div class="grid grid-cols-7">
            <span class="flex items-center justify-center text-secondary-500">Пн</span>
            <span class="flex items-center justify-center text-secondary-500">Вт</span>
            <span class="flex items-center justify-center text-secondary-500">Ср</span>
            <span class="flex items-center justify-center text-secondary-500">Чт</span>
            <span class="flex items-center justify-center text-secondary-500">Пт</span>
            <span class="flex items-center justify-center text-secondary-500">Сб</span>
            <span class="flex items-center justify-center text-secondary-500">Вс</span>
        </div>
        <div class="grid grid-cols-7">
            <div
                v-for="day in days"
                :key="day"
                :class="[
                    'flex items-center justify-center p-1 my-0.5',
                    dayClasses(day),
                    rangeClasses(day),
                ]"
            >
                <div
                    :class="[
                        'w-9 h-9 flex items-center justify-center rounded-full',
                        selectedClass(day),
                    ]"
                    @click="select(day)"
                >
                    {{ dayjs(day).format('D') }}
                </div>
            </div>
        </div>
    </div>
</template>
