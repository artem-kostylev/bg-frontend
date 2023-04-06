<script setup lang="ts">
import type { Location } from "@/app/types";

type Props = {
    location: Location[];
    target?: "_blank";
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
            :to="{ name: 'locations-id', params: { id: item.id } }"
            :target="target"
            class="text-sm text-slate-500 hover:text-slate-900"
        >
            <div
                :class="[
                    index !== 0 &&
                        `before:relative before:pr-1 before:content-[','] before:text-slate-500`,
                ]"
            >
                {{ item.name }}
            </div>
        </NuxtLink>
    </div>
</template>
