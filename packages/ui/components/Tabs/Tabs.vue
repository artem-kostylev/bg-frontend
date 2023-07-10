<script setup lang="ts">
import type { TabsProps, Tab, TabValue } from '@ui/components/Tabs/tabs';

const props = defineProps<TabsProps>();
const emit = defineEmits<{ (event: 'update:modelValue', value: TabValue): void }>();

const select = (tab: Tab) => {
    emit('update:modelValue', tab.value);
};

const selected = (tab: Tab) => {
    return props.modelValue === tab.value;
};
</script>

<template>
    <div
        class="flex items-center space-x-6 font-medium border-b border-secondary-200 overflow-y-hidden overflow-x-auto scrollbar-hidden"
    >
        <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="select(tab)"
            :disabled="tab.disabled"
            :class="[
                'select-none py-4 border-b-2 flex items-center whitespace-nowrap',
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
