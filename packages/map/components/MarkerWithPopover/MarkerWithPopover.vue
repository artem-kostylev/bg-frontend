<script setup lang="ts">
import type { LngLat, YMapMarker } from '@yandex/ymaps3-types';
import { onBeforeUnmount, onMounted, createVNode, useSlots, ref, watch, render, h } from 'vue';
import { useMap } from '@map/composables';
import { Popover } from '@map/components';

type Props = {
    coordinates: LngLat;
};

const props = defineProps<Props>();
const slots = useSlots();

const { addChild, removeChild } = useMap()!;
let marker: YMapMarker | undefined;

const show = ref(false);

const update = (value: boolean) => {
    show.value = value;
};

watch(show, value => {
    marker?.update({ zIndex: value ? 1000 : 0 });
});

onMounted(() => {
    const div = document.createElement('div');

    const componentRef = createVNode(() =>
        h(
            Popover,
            { placement: 'top', modelValue: show.value, 'onUpdate:modelValue': update },
            slots
        )
    );

    render(componentRef, div);

    marker = new ymaps3.YMapMarker({ coordinates: props.coordinates }, div);

    addChild(marker);
});

onBeforeUnmount(() => removeChild(marker!));
</script>

<template>
    <template />
</template>
