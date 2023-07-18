<script setup lang="ts">
import { onMounted } from 'vue';
import { useMap } from '@map/composables';
import { useTours } from '@/tours/composables';

const { addChild } = useMap()!;
const { openAdvanced, changeView, view } = useTours()!;

onMounted(async () => {
    const { YMapControls, YMapControlButton } = ymaps3;
    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

    addChild(new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({})));

    const topLeftButtons = new YMapControls({ position: 'top left', orientation: 'vertical' })
        .addChild(new YMapControlButton({ text: 'Развернуть карту', onClick: changeView }))
        .addChild(
            new YMapControlButton({ text: 'Фильтры', onClick: () => (openAdvanced.value = true) })
        );

    addChild(topLeftButtons);

    const topRightButton = new YMapControls({ position: 'top right' }).addChild(
        new YMapControlButton({ text: 'Списком', onClick: () => (view.value = 1) })
    );

    addChild(topRightButton);
});
</script>

<template>
    <template />
</template>
