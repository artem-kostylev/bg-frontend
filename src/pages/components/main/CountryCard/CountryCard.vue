<script setup lang="ts">
import type { SectionChild } from '@/pages/types';
import { Image } from '@ui/components';

type Props = {
    data: SectionChild;
};

defineProps<Props>();
</script>

<template>
    <div
        :class="[
            data.size === 1 && 'lg:w-[33%]',
            data.size === 2 && 'lg:w-[66%]',
            data.size === 3 && 'lg:w-full',
            'w-full md:w-[49%] relative h-56 rounded-xl overflow-hidden',
        ]"
    >
        <Image
            :src="data.images[0].url"
            :alt="data.name"
            class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div
            class="inset-0 absolute bg-gradient-to-b from-transparent via-transparent to-slate-900/90"
        />
        <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
            <NuxtLink
                :to="
                    data.direct_link || {
                        name: data.link.name,
                        params: { id: data.link.id },
                    }
                "
                class="text-white font-semibold mb-0.5 bg-black/25 px-2 rounded-xl hover:underline"
                >{{ data.name }}</NuxtLink
            >
            <div
                class="text-white text-sm flex flex-wrap justify-center items-center gap-2 bg-black/25 p-2 rounded-xl"
            >
                <div
                    v-for="child in data.children"
                    :key="child.name"
                    class="flex font-bold hover:underline"
                >
                    <NuxtLink
                        :to="
                            child.direct_link || {
                                name: child.link.name,
                                params: { id: child.link.id },
                            }
                        "
                        >{{ child.name }}</NuxtLink
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.location--1 {
    @apply w-full md:w-[49%] lg:w-[33%];
}
.location--2 {
    @apply w-full md:w-[49%] lg:w-[66%];
}
.location--3 {
    @apply w-full md:w-[49%] lg:w-full;
}
</style>
