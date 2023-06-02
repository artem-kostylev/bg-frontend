<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type {
    RangeNumberProps,
    RangeNumberModelValue,
} from '@ui/components/RangeNumber/rangeNumber';
import { defaultRangeNumberProps } from '@ui/components/RangeNumber/rangeNumber';

const props = withDefaults(defineProps<RangeNumberProps>(), defaultRangeNumberProps);

const emit = defineEmits<{ (event: 'update:modelValue', value: RangeNumberModelValue): void }>();

const modelValue = ref(props.modelValue);

watch(modelValue, value => {
    if (!props.range) return emit('update:modelValue', value);

    if ((modelValue.value as number[]).length === 2) emit('update:modelValue', value);
});

const numberClasses = (num: number) => {
    const classes: string[] = [];

    if (props.numberDisabled?.(num)) {
        classes.push('text-secondary-300 line-through');
        return classes.join(' ');
    }

    return classes.join(' ');
};

const rangeClasses = (num: number) => {
    if (!props.range || !modelValue.value) return;

    if (Array.isArray(modelValue.value)) {
        const [first, last] = modelValue.value;

        if (!last) return;

        const classes = [];

        if (first < num && last > num) classes.push('bg-secondary-100 text-secondary-500');
        if (first === num) classes.push('rounded-l-full bg-secondary-100');
        if (last === num) classes.push('rounded-r-full bg-secondary-100');

        return classes.join(' ');
    } else return;
};

const selectedClass = (num: number) => {
    if (props.numberDisabled?.(num)) return;

    if (props.range && Array.isArray(modelValue.value)) {
        const [first, last] = modelValue.value;

        return first === num || last === num
            ? 'bg-primary-500 text-white hover:bg-primary-500 cursor-pointer'
            : 'cursor-pointer hover:bg-secondary-100';
    }

    return modelValue.value === num
        ? 'bg-primary-500 text-white hover:bg-primary-500 cursor-pointer'
        : 'cursor-pointer hover:bg-secondary-100';
};

const select = (num: number) => {
    if (props.numberDisabled?.(num)) return;

    if (!props.range) {
        modelValue.value = num;
        return;
    }

    if (Array.isArray(modelValue.value)) {
        const [first, last] = modelValue.value;

        if (!first || (first && last)) return (modelValue.value = [num]);

        if (num < first) {
            modelValue.value = [num, first];
            return;
        }

        if (first && !last) {
            modelValue.value = [...modelValue.value, num];
        }
    } else return;
};

const arr = computed(() => {
    return [...Array(props.end - props.start + 1)].map((_, i) => props.start + i);
});
</script>

<template>
    <div class="grid grid-cols-7 w-max p-2 select-none">
        <div
            v-for="num in arr"
            :key="num"
            :class="[
                'flex items-center justify-center p-1 my-0.5',
                numberClasses(num),
                rangeClasses(num),
            ]"
        >
            <div
                class="w-9 h-9 flex items-center justify-center rounded-full"
                :class="selectedClass(num)"
                @click="select(num)"
            >
                {{ num }}
            </div>
        </div>
    </div>
</template>
