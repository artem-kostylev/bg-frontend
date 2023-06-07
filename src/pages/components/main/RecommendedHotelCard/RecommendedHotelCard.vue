<script setup lang="ts">
import { computed } from 'vue';
import { formatFilters } from '@/app/lib';
import type { RouteLocationRaw } from 'vue-router';
import { SectionCard } from '@/pages/components';
import { Typography, Stars } from '@ui/components';
import type { SectionChild } from '@/pages/types';

type Props = {
    child: SectionChild;
};

const props = defineProps<Props>();

const to = computed(() => {
    const query = formatFilters(props.child.link.filters);

    return {
        name: props.child.link.name,
        query,
        params: { id: props.child.link.id },
    } as RouteLocationRaw;
});
</script>

<template>
    <SectionCard v-if="child.link.filters" :to="to" :image="child.images[0]" :alt="child.name">
        <Stars :stars="5" class="mb-1.5" />
        <Typography variant="h3" class="text-white">{{ child.name }}</Typography>
        <Typography class="text-white/75 text-sm">{{ child.description }}</Typography>
    </SectionCard>
</template>
