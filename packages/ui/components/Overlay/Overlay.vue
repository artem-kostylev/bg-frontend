<script setup lang="ts">
import { Spin } from "@ui/components";

type Props = {
    show: boolean;
    loading?: boolean;
};

defineProps<Props>();
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="ease-linear duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-linear duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="show" class="fixed top-0 left-0 w-screen h-screen bg-slate-900/90 z-40">
                <div v-if="loading" class="flex w-full h-full items-center justify-center">
                    <Spin color="white" />
                </div>
                <slot v-else />
            </div>
        </Transition>
    </Teleport>
</template>
