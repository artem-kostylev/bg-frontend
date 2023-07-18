<script setup lang="ts">
import type { LngLat, YMapMarker } from '@yandex/ymaps3-types';
import { onBeforeUnmount, onMounted, createApp, useSlots, h } from 'vue';
import { useMap } from '@map/composables';
import { Popover } from '@ui/components';

type Props = {
    coordinates: LngLat;
};

const props = defineProps<Props>();
const slots = useSlots();

const { addChild, removeChild } = useMap()!;
let marker: YMapMarker | undefined;

onMounted(() => {
    const div = document.createElement('div');

    const componentRef = createApp(() => h(Popover, { placement: 'top' }, slots));

    componentRef.mount(div);

    marker = new ymaps3.YMapMarker({ coordinates: props.coordinates }, div);

    addChild(marker);
});

onBeforeUnmount(() => removeChild(marker!));
</script>

<template>
    <template />
</template>
