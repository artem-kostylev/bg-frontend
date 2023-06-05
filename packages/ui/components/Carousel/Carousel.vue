<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { ChevronLeftIcon, ChevronRightIcon } from '@ui/icons';
import type { CarouselProps } from '@ui/components/Carousel/carousel';

defineProps<CarouselProps>();

const hasPrev = ref(false);
const hasNext = ref(false);
const carouselRef = ref<HTMLDivElement | null>(null);

const slide = (direction: 'prev' | 'next') => {
    if (!carouselRef.value) return;

    let left;
    const { scrollLeft, clientWidth } = carouselRef.value;

    switch (direction) {
        case 'prev':
            left = scrollLeft - clientWidth;
            break;
        case 'next':
        default:
            left = scrollLeft + clientWidth;
            break;
    }

    carouselRef.value.scroll({ left, behavior: 'smooth' });
};

const calculate = () => {
    if (!carouselRef.value) return;

    const { scrollLeft, clientWidth, scrollWidth } = carouselRef.value;

    hasPrev.value = scrollLeft !== 0;
    hasNext.value = scrollLeft + clientWidth !== scrollWidth;
};

const debounceCalculate = useDebounceFn(calculate, 50);

onMounted(() => {
    calculate();
    carouselRef.value?.addEventListener('scroll', debounceCalculate);
});

onBeforeUnmount(() => {
    carouselRef.value?.removeEventListener('scroll', debounceCalculate);
});
</script>

<template>
    <div class="relative group">
        <div
            ref="carouselRef"
            v-bind="$attrs"
            class="overflow-x-auto overflow-y-hidden scrollbar-hidden snap-x snap-mandatory scroll-smooth w-full"
        >
            <slot />
        </div>
        <div
            v-if="hasPrev"
            class="hidden lg:flex absolute top-0 bottom-0 px-4 items-center justify-center group-hover:opacity-100 transition-opacity duration-250 left-0"
            :class="[!showActions && 'opacity-0']"
        >
            <button
                :class="['p-2 bg-white shadow rounded-full', centerButtons && 'mb-32 lg:mb-22']"
                @click="slide('prev')"
            >
                <ChevronLeftIcon width="1.2em" height="1.2em" />
            </button>
        </div>
        <div
            v-if="hasNext"
            class="hidden lg:flex absolute top-0 bottom-0 px-4 items-center justify-center group-hover:opacity-100 transition-opacity duration-250 right-0"
            :class="[!showActions && 'opacity-0']"
        >
            <button
                :class="['p-2 bg-white shadow rounded-full', centerButtons && 'mb-32 lg:mb-22']"
                @click="slide('next')"
            >
                <ChevronRightIcon width="1.2em" height="1.2em" />
            </button>
        </div>
    </div>
</template>
