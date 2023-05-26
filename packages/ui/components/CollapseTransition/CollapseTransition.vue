<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { CollapseTransitionProps } from '@ui/components/CollapseTransition/collapseTransition';

defineProps<CollapseTransitionProps>();

// TODO: FIX This
// Проблема если мы в тело добавляем overflow hidden то shadow обрезается у элеметов

// const enter = (element: HTMLElement, done: () => void) => {
//     const initialHeight = element.style.height;
//     const height = getComputedStyle(element).height;

//     const animation = element.animate([{ height: 0 }, { height }], {
//         duration: 250,
//         easing: "ease-in-out",
//     });

//     element.style.height = initialHeight || height;

//     animation.onfinish = done;
// };

// const leave = (element: HTMLElement, done: () => void) => {
//     const initialHeight = element.style.height;
//     const height = getComputedStyle(element).height;

//     const animation = element.animate([{ height }, { height: 0 }], {
//         duration: 250,
//         easing: "ease-in-out",
//     });

//     element.style.height = initialHeight;

//     animation.onfinish = done;
// };
</script>

<template>
    <!-- <Transition :css="false" @enter="enter" @leave="leave">
        <div v-if="show">
            <div v-bind="$attrs">
                <slot />
            </div>
        </div>
    </Transition> -->
    <div v-if="show">
        <div v-bind="$attrs">
            <slot />
        </div>
    </div>
</template>
