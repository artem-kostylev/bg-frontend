<script setup lang="ts">
import { watch, onBeforeUnmount } from "vue";

type Props = {
    show: boolean;
    loading?: boolean;
};

const props = defineProps<Props>();

watch(
    () => props.show,
    value => {
        value
            ? document?.body.classList.add("overflow-hidden")
            : document?.body.classList.remove("overflow-hidden");
    }
);

onBeforeUnmount(() => {
    document.body.classList.remove("overflow-hidden");
});
</script>

<template>
    <Transition
        appear
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="show" class="overlay">
            <div v-if="loading" class="flex w-full h-full items-center justify-center">
                loading...
            </div>
            <slot v-else />
        </div>
    </Transition>
</template>

<style lang="postcss">
.overlay {
    @apply fixed top-0 left-0 w-screen h-screen bg-gray-900/90 backdrop-blur-sm backdrop-filter z-40;
}
</style>
