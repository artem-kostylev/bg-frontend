<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import type { LngLat, YMap, YMapEntity } from '@yandex/ymaps3-types';
import { useScriptTag } from '@vueuse/core';
import { useMapProvide } from '@map/composables';
import { useRuntimeConfig } from '#imports';
import { Spin } from '@ui/components';

const rc = useRuntimeConfig();

type Props = {
    center: LngLat;
    zoom: number;
};

const props = defineProps<Props>();

const isReady = ref(false);
const mapRef = ref<HTMLElement>();
let map: YMap | undefined;

const addChild = (child: YMapEntity<unknown, {}>, index?: number) => {
    return map!.addChild(child, index);
};

const removeChild = (child: YMapEntity<unknown, {}>) => {
    return map!.removeChild(child);
};

useScriptTag(
    `https://api-maps.yandex.ru/3.0/?apikey=${rc.public.mapKey}&lang=ru_RU`,
    async () => {
        await ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

        map = new YMap(mapRef.value!, { location: { center: props.center, zoom: props.zoom } });

        map.addChild(new YMapDefaultSchemeLayer({}));
        map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));

        isReady.value = true;
    },
    { async: true }
);

useMapProvide({ addChild, removeChild });

onBeforeUnmount(() => {
    if (map) {
        map.destroy();
        map = undefined;
    }
});
</script>

<template>
    <div ref="mapRef" class="bg-secondary-100 flex items-center justify-center">
        <slot v-if="isReady" />
        <Spin v-else color="primary" />
    </div>
</template>
