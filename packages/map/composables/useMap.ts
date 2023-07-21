import { createInjectionState } from '@vueuse/shared';
import type { YMap, YMapEntity } from '@yandex/ymaps3-types';

export type MapProviderProps = {
    addChild: (child: YMapEntity<unknown, {}>, index?: number) => YMap;
    removeChild: (child: YMapEntity<unknown, {}>) => YMap;
};

export const [useMapProvide, useMap] = createInjectionState((props: MapProviderProps) => props);
