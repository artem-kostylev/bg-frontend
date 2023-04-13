<script setup lang="ts">
import { ref } from "vue";
import type { Component } from "vue";
import { Paper, CollapseTransition, Typography } from "@ui/components";
import { ChevronDownIcon } from "@ui/icons";

type Props = {
    title: string;
    startIcon?: Component;
    defaultOpen?: boolean;
};

const props = defineProps<Props>();

const collapsed = ref(props.defaultOpen);
</script>

<template>
    <Paper>
        <button @click="collapsed = !collapsed" class="text-left px-5 py-4 flex items-center">
            <component :is="startIcon" width="1.3em" height="1.3em" class="mr-2.5" />
            <Typography variant="h3" class="flex-1">{{ title }}</Typography>
            <ChevronDownIcon
                :class="['text-slate-500 transition-transform', collapsed && 'rotate-180']"
                width="1.3em"
                height="1.3em"
            />
        </button>
        <CollapseTransition :show="collapsed" class="border-t border-slate-200 p-5">
            <slot />
        </CollapseTransition>
    </Paper>
</template>
