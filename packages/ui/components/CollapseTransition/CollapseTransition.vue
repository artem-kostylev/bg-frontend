<script setup lang="ts">
type Props = {
    show: boolean;
};

defineProps<Props>();

// TODO: Исправить transtion

// const enter = (element: HTMLElement, done: () => void) => {
//     const initialHeight = element.style.height;
//     const { height } = getComputedStyle(element);

//     const animation = element.animate([{ height: 0 }, { height }], {
//         duration: 250,
//         easing: "ease-in-out",
//     });

//     element.style.height = initialHeight && initialHeight !== "0px" ? initialHeight : height;

//     animation.addEventListener("finish", () => done());
// };

// const leave = (element: HTMLElement, done: () => void) => {
//     const initialHeight = element.style.height;
//     const { height } = getComputedStyle(element);

//     const animation = element.animate([{ height }, { height: 0 }], {
//         duration: 250,
//         easing: "ease-in-out",
//     });

//     element.style.height = initialHeight;

//     animation.addEventListener("finish", () => done());
// };
</script>

<template>
    <!-- <Transition :css="false" @enter="enter" @leave="leave"> -->
    <Transition :css="false">
        <div v-if="show" class="overflow-hidden">
            <slot />
        </div>
    </Transition>
</template>
