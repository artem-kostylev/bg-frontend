<script setup lang="ts">
import { computed } from "vue";
import type { Component } from "vue";
import type { RouteLocationRaw } from "vue-router";

type Props = {
    type?: "button" | "reset" | "submit";
    as?: string | Component | Object;
    to?: RouteLocationRaw;
};

const props = withDefaults(defineProps<Props>(), {
    type: "button",
    as: "button",
    to: undefined,
});

const type = computed(() => (props.as === "button" ? props.type : undefined));
</script>

<template>
    <component
        :type="type"
        :is="as"
        :to="to"
        class="inline-flex bg-white border border-slate-300 px-3.5 py-2 rounded-xl shadow-sm"
    >
        <slot />
    </component>
</template>
