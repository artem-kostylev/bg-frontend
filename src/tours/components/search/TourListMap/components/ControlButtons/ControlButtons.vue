<script setup lang="ts">
import { onMounted } from 'vue';
import { useMap } from '@map/composables';

const { addChild } = useMap()!;

onMounted(async () => {
    const { YMapControls, YMapControlButton } = ymaps3;
    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

    addChild(new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({})));

    const topLeftButtons = new YMapControls({ position: 'top left', orientation: 'vertical' })
        .addChild(new YMapControlButton({ text: 'Развернуть карту' }))
        .addChild(new YMapControlButton({ text: 'Фильтры' }));

    addChild(topLeftButtons);

    const topRightButton = new YMapControls({ position: 'top right' }).addChild(
        new YMapControlButton({ text: 'Списком' })
    );

    addChild(topRightButton);
});
</script>

<template>
    <template />
</template>
