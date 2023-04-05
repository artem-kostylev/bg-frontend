<script setup lang="ts">
import type { Component } from "vue";

type Value = string | number;

type Tab = {
    label: string;
    value: Value;
    startIcon?: Component;
    endIcon?: Component;
    disabled?: boolean;
};

type Props = {
    tabs: Tab[];
    modelValue: Value;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (event: "update:modelValue", value: Value): void }>();

const select = (tab: Tab) => {
    emit("update:modelValue", tab.value);
};

const selected = (tab: Tab) => {
    return props.modelValue === tab.value;
};
</script>

<template>
    <div class="flex items-center space-x-6 font-medium border-b border-slate-200">
        <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="select(tab)"
            :tabindex="selected(tab) ? '-1' : '0'"
            :disabled="tab.disabled"
            :class="[
                'select-none py-3.5 border-b-2 -mb-px flex items-center',
                tab.disabled && 'opacity-60 pointer-events-none',
                selected(tab)
                    ? 'text-primary-500 hover:text-primary-500/95 border-primary-500 cursor-auto'
                    : 'border-transparent',
            ]"
        >
            <component :is="tab.startIcon" class="mr-2.5" />
            {{ tab.label }}
            <component :is="tab.endIcon" class="ml-2.5" />
        </button>
    </div>
</template>
