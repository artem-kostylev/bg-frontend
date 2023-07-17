<script setup lang="ts">
import { defineAsyncComponent, computed, watch, ref } from 'vue';
import { FloatingInput, Calendar } from '@ui/components';
import { useMediaQuery } from '@vueuse/core';
import { CalendarIcon } from '@ui/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const Mobile = defineAsyncComponent(() => import('./Mobile.vue'));
const Desktop = defineAsyncComponent(() => import('./Desktop.vue'));

type Props = {
    modelValue?: string[] | string;
    title?: string;
    range?: boolean;
    format?: string;
    clearable?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    title: '',
    format: 'DD.MM',
});

const show = ref(false);

const emit = defineEmits<{
    (event: 'update:modelValue', value?: unknown): void;
}>();

const matches = useMediaQuery('(max-width: 640px)');

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const selected = computed(() => {
    if (props.range) {
        if (!props.modelValue?.length) return;

        return `с ${(props.modelValue as string[])
            .map(item => dayjs(item).format(props.format))
            .join(' по ')}`;
    }

    return props.modelValue && dayjs(props.modelValue as string).format(props.format);
});

watch(value, v => {
    if (!props.range) show.value = false;
    v?.length === 2 && (show.value = false);
});

const dateDisabled = (date: Dayjs) => {
    return date.add(1, 'day') < dayjs(new Date());
};

const update = (value?: unknown) => emit('update:modelValue', value);
</script>

<template>
    <component :is="matches ? Mobile : Desktop" v-model="show" :title="title">
        <template #trigger="{ vbind }">
            <FloatingInput
                v-bind="vbind"
                :model-value="selected"
                @update:model-value="update"
                :end-icon="CalendarIcon"
                :label="title"
                :clearable="clearable"
                readonly
            />
        </template>
        <Calendar
            class="-m-5 sm:m-0"
            v-model="value"
            :range="range"
            value-format="YYYY-MM-DD"
            :date-disabled="dateDisabled"
        />
    </component>
</template>
