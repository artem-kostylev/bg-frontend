<script setup lang="ts">
import type { HTMLAttributes } from "vue";

type Props = {
    bodyClass?: HTMLAttributes["class"];
    headerClass?: HTMLAttributes["class"];
    footerClass?: HTMLAttributes["class"];
};

withDefaults(defineProps<Props>(), {
    bodyClass: "",
    headerClass: "",
    footerClass: "",
});
</script>

<template>
    <div class="shadow-primary rounded-xl bg-white flex flex-col">
        <div v-if="$slots.cover" class="overflow-hidden rounded-t-xl">
            <slot name="cover" />
        </div>
        <div v-if="$slots.header" :class="['relative p-5 flex flex-col', headerClass]">
            <slot name="header" />
        </div>
        <div :class="['relative flex-1', bodyClass, $slots.header ? 'px-5 pb-5' : 'p-5']">
            <slot />
        </div>
        <div v-if="$slots.footer" :class="['relative p-5 flex', footerClass]">
            <slot name="footer" />
        </div>
    </div>
</template>
