<script setup lang="ts">
import nouislider from 'nouislider';
import type { API } from 'nouislider';
import { onMounted, onUnmounted, ref } from 'vue';
import type { SliderProps } from './slider';
import { defaultSliderProps } from './slider';

const props = withDefaults(defineProps<SliderProps>(), defaultSliderProps);

const emit = defineEmits<{ (e: 'update:modelValue', value?: number | number[]): void }>();

let slider$: API | null = null;
const slider = ref();

const getValue = () => {
    if (!slider$) return;

    const rawValue = slider$.get();
    return Array.isArray(rawValue)
        ? rawValue.map(v => parseFloat(v.toString()))
        : parseFloat(rawValue.toString());
};

onMounted(() => {
    let value = props.range
        ? props.modelValue === undefined || props.modelValue === null
            ? [props.min, props.max]
            : (props.modelValue as number[]).length
            ? props.modelValue
            : [props.min, props.max]
        : props.min;

    props.tooltip && (nouislider.cssClasses.tooltip += ' slider-tooltip-top');

    slider$ = nouislider.create(slider.value, {
        cssPrefix: 'slider-',
        start: value,
        step: props.step,
        connect: props.range ? true : 'lower',
        range: {
            min: props.min,
            max: props.max,
        },
        format: {
            from: Number,
            to: value => Math.round(value),
        },
        tooltips: props.tooltip && props.modelValue !== null ? true : false,
    });

    slider$.on('set', () => {
        const value = getValue();
        emit('update:modelValue', value);
    });

    /* 
        TODO: fix this, if initial value of modelValue === null, show tooltip only after modelValue was change
        via dragging, tapping and other actions with the slider
    */
    slider$.on('start', () => {
        slider$?.updateOptions(
            {
                tooltips: props.tooltip ? true : false,
            },
            true
        );
    });
});

onUnmounted(() => {
    if (!slider$) return;

    slider$.off('');
    slider$.destroy();
    slider$ = null;
});
</script>

<template>
    <div ref="slider"></div>
</template>
