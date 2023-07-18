import type { Ref } from 'vue';
import { createInjectionState } from '@vueuse/shared';

export type ToursProviderProps = {
    changeView(): void;
    view: Ref<number>;
    openAdvanced: Ref<boolean>;
};

export const [useToursProvide, useTours] = createInjectionState(
    (props: ToursProviderProps) => props
);
