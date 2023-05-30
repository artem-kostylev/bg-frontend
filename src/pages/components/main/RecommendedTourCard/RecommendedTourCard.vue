<script setup lang="ts">
import { computed } from 'vue';
import type { SectionChild } from '@/pages/types';
import { Image } from '@ui/components';
import { formatFilters } from '@/app/lib';
import type { RouteLocationRaw } from 'vue-router';

type Props = {
    child: SectionChild;
};

const props = defineProps<Props>();

const to = computed(() => {
    return {
        name: props.child.link.name,
        query: formatFilters(props.child.link.filters),
    };
});
</script>

<template>
    <NuxtLink
        :to="child.direct_link as any as RouteLocationRaw || to as any as RouteLocationRaw"
        class="w-full relative rounded-xl overflow-hidden transition-transform duration-1000 hover:scale-105"
    >
        <div class="h-56 relative rounded-xl overflow-hidden bg-slate-100 hover:scale-125">
            <Image
                :src="child.images[0].url"
                :alt="child.name"
                class="w-full h-full object-cover"
            />
        </div>
        <div
            class="inset-0 absolute bg-gradient-to-b from-transparent via-transparent to-slate-900/90"
        ></div>
        <h3 class="text-white font-bold absolute bottom-0 px-5 py-4 text-stroke">
            {{ child.description }}
        </h3>
    </NuxtLink>
</template>

<style>
.text-stroke {
    text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
}
</style>
