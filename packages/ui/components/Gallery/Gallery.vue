<script setup lang="ts">
import { onBeforeUnmount, reactive, ref, watch, nextTick } from 'vue';
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@ui/icons';
import { useDebounceFn } from '@vueuse/core';
import { Image } from '@ui/components';

type Props = {
    images: { url: string }[];
};

defineProps<Props>();

const state = reactive({
    hasPrev: false,
    hasNext: false,
});

const show = ref(false);

const galleryRef = ref<HTMLDivElement>();

const open = () => {
    show.value = true;

    nextTick(() => {
        galleryRef.value?.focus();
    });
};
const close = () => (show.value = false);

const slide = (direction: 'prev' | 'next') => {
    if (!galleryRef.value) return;

    let left;
    const { scrollLeft, clientWidth } = galleryRef.value;

    switch (direction) {
        case 'prev':
            left = scrollLeft - clientWidth;
            break;
        case 'next':
        default:
            left = scrollLeft + clientWidth;
            break;
    }

    galleryRef.value.scroll({ left, behavior: 'smooth' });
};

const calculate = () => {
    if (!galleryRef.value) return;

    const { scrollLeft, clientWidth, scrollWidth } = galleryRef.value;

    state.hasPrev = scrollLeft !== 0;
    state.hasNext = scrollLeft + clientWidth !== scrollWidth;
};

const debounceCalculate = useDebounceFn(calculate, 50);

watch(
    show,
    value => {
        if (value) {
            calculate();
            galleryRef.value?.addEventListener('scroll', debounceCalculate);
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    },
    { flush: 'post' }
);

onBeforeUnmount(() => {
    galleryRef.value?.removeEventListener('scroll', debounceCalculate);
    document.body.classList.remove('overflow-hidden');
});
</script>

<template>
    <slot name="trigger" :open="open" />
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 bg-secondary-900/80 z-50">
            <div class="w-full h-full">
                <div
                    ref="galleryRef"
                    class="w-full h-full flex overflow-x-auto scrollbar-hidden snap-x snap-mandatory"
                    tabindex="0"
                >
                    <div
                        v-for="(image, index) in images"
                        :key="index"
                        class="w-full h-full shrink-0 snap-center"
                    >
                        <Image :src="image.url" class="object-contain w-full h-full" />
                    </div>
                </div>
                <div class="absolute top-0 right-0 p-3">
                    <button
                        @click="close"
                        class="text-white p-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full"
                    >
                        <XIcon width="1.4em" height="1.4em" />
                    </button>
                </div>
                <div class="hidden md:block absolute top-1/2 -translate-y-1/2 p-3 left-0">
                    <button
                        v-show="state.hasPrev"
                        @click="slide('prev')"
                        @keyup.left="slide('prev')"
                        class="text-white p-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full"
                    >
                        <ArrowLeftIcon />
                    </button>
                </div>
                <div class="hidden md:block absolute top-1/2 -translate-y-1/2 p-3 right-0">
                    <button
                        v-show="state.hasNext"
                        @click="slide('next')"
                        @keyup.right="slide('next')"
                        class="text-white p-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-full"
                    >
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
