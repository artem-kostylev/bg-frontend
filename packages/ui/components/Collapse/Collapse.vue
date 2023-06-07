<script setup lang="ts">
import { ref } from 'vue';
import { Paper, CollapseTransition, Typography } from '@ui/components';
import { ChevronDownIcon } from '@ui/icons';
import type { CollapseProps } from '@ui/components/Collapse/collapse';

const props = defineProps<CollapseProps>();

const collapsed = ref(props.defaultOpen);
</script>

<template>
    <div>
        <Paper
            as="button"
            @click="collapsed = !collapsed"
            class="text-left px-5 py-4 flex items-center w-full"
        >
            <component :is="startIcon" width="1.3em" height="1.3em" class="mr-2.5" />
            <Typography variant="h3" class="flex-1">{{ title }}</Typography>
            <ChevronDownIcon
                :class="['text-secondary-500 transition-transform', collapsed && 'rotate-180']"
                width="1.3em"
                height="1.3em"
            />
        </Paper>
        <CollapseTransition :show="collapsed" class="pt-5">
            <slot />
        </CollapseTransition>
    </div>
</template>
