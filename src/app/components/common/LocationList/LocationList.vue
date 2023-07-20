<script setup lang="ts">
import type { Location } from '@/app/types';

type Props = {
    location: Location[];
    target?: '_blank';
};

withDefaults(defineProps<Props>(), {
    target: undefined,
});
</script>

<template>
    <div class="flex truncate">
        <NuxtLink
            v-for="(item, index) in location"
            :key="item.id"
            :to="{ name: 'locations-id', params: { id: item.id }, query: $route.query }"
            :target="target"
            class="text-sm text-secondary-500 hover:text-secondary-900"
        >
            <div
                :class="[
                    index !== 0 &&
                        `before:relative before:pr-1 before:content-[','] before:text-secondary-500`,
                ]"
            >
                {{ item.name }}
            </div>
        </NuxtLink>
    </div>
</template>
