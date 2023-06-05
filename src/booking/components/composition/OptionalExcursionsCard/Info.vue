<script setup lang="ts">
import { ref } from 'vue';
import type { ActivityInfo } from '@/booking/types/';
import { Typography, Tabs, Carousel, CarouselItem, Image } from '@ui/components';
import { XIcon } from '@ui/icons';

const tabs = [
    { label: 'Описание', value: 'description' },
    { label: 'Что включено', value: 'included' },
    { label: 'Что не включено', value: 'not_included' },
    { label: 'Продолжительность', value: 'duration' },
];

const currentTab = ref('description');

type Props = {
    activity: ActivityInfo;
    close(): void;
};

defineProps<Props>();
</script>

<template>
    <div>
        <div class="relative">
            <Carousel v-if="activity.images.length" class="flex w-full rounded-t-xl">
                <CarouselItem class="w-full" v-for="(image, i) in activity.images" :key="i">
                    <Image :src="image.url" class="object-cover w-full h-64 md:h-84" />
                </CarouselItem>
            </Carousel>
            <div
                class="inset-0 absolute bg-gradient-to-b from-transparent via-transparent to-slate-900/90"
            ></div>
            <Typography variant="h3" class="text-white absolute bottom-0 px-5 py-4">
                {{ activity.name }}
            </Typography>
            <div class="absolute top-0 right-0 p-5">
                <button
                    @click="close"
                    class="focus:outline-none bg-slate-900/60 hover:bg-slate-900/70 text-white rounded-full p-2"
                >
                    <XIcon width="1.4em" height="1.4em" />
                </button>
            </div>
        </div>
        <div class="border-b border-slate-200">
            <Tabs :model-value="currentTab" :tabs="tabs" class="px-5" />
            <div class="my-4 px-5">
                <template v-if="currentTab === 'description'">
                    <div v-if="activity.short_description" v-html="activity.short_description" />
                    <div v-if="activity.description" class="mt-2.5" v-html="activity.description" />
                </template>
                <template v-if="currentTab === 'included'">
                    {{ activity.included.join(', ') }}
                </template>
                <template v-if="currentTab === 'not_included'">
                    {{ activity.not_included.join(', ') }}
                </template>
                <template v-if="currentTab === 'duration'">
                    {{ activity.duration }} часов
                </template>
            </div>
        </div>
    </div>
</template>
