<script setup lang="ts">
import { formatFilters } from '@/app/lib';
import type { RouteLocationRaw } from 'vue-router';
import { SectionCard } from '@/pages/components';
import { Typography } from '@ui/components';
import type { SectionChild, SectionLink } from '@/pages/types';

type Props = {
    child: SectionChild;
};

defineProps<Props>();

const getTo = (link: SectionLink) => {
    const query = formatFilters(link.filters);

    return {
        params: { id: link.id },
        name: `${link.name}`,
        query,
    } as RouteLocationRaw;
};

const sizes = {
    1: 'md:col-span-2 lg:col-span-1',
    2: 'md:col-span-2 lg:col-span-2',
    3: 'md:col-span-2 lg:col-span-3',
};
</script>

<template>
    <SectionCard
        v-if="child.link.filters"
        :image="child.images[0]"
        :alt="child.name"
        :class="child.size && sizes[child.size]"
    >
        <NuxtLink :to="getTo(child.link)">
            <Typography
                variant="h3"
                class="text-white hover:text-white/75 transition-colors duration-200"
            >
                {{ child.name }}
            </Typography>
        </NuxtLink>
        <div class="flex">
            <NuxtLink
                v-for="(item, index) in child.children"
                :key="item.link.id"
                :to="getTo(item.link)"
                class="text-sm text-white/75 hover:text-white transition-colors duration-200"
            >
                <div
                    :class="
                        index !== 0 &&
                        `before:relative before:pr-1 before:content-[','] before:text-white/75`
                    "
                >
                    {{ item.name }}
                </div>
            </NuxtLink>
        </div>
    </SectionCard>
</template>
