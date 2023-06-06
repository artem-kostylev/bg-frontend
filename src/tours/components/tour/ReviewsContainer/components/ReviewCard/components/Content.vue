<script setup lang="ts">
import { ref, computed, h } from 'vue';
import type { ReviewComments } from '@/tours/types';
import { Button } from '@ui/components';
import { Comments } from './';
import { ChevronDownIcon } from '@ui/icons';
import type { StringOrNumber } from '@ui/types';

type Props = {
    comments: ReviewComments;
};

defineProps<Props>();

const showMore = ref(false);
const commentsRef = ref<HTMLDivElement>();

const maxHeight = 250;

const childrenHeight = computed(() => {
    let height = 0;
    const childMargin = 16;
    const childElements = commentsRef.value?.children;
    if (childElements?.length) {
        for (let i = 0; i < childElements?.length; i++) {
            height += (childElements[i] as HTMLDivElement).offsetHeight;
            i + 1 !== childElements?.length && (height += childMargin);
        }
    }
    return height;
});

const endIcon = (props: Record<string, StringOrNumber>) => {
    return h(ChevronDownIcon, {
        ...props,
        class: ['transition-transform', showMore.value && 'rotate-180'],
    });
};
</script>

<template>
    <div class="w-full">
        <div
            class="overflow-hidden overflow-ellipsis"
            ref="commentsRef"
            :style="{
                'max-height': childrenHeight > maxHeight && !showMore ? `${maxHeight}px` : 'none',
            }"
        >
            <Comments :comments="comments" />
        </div>
        <Button
            v-if="childrenHeight > maxHeight"
            size="xs"
            :end-icon="endIcon"
            @click="showMore = !showMore"
            class="mt-2.5"
        >
            {{ showMore ? 'Скрыть' : 'Показать все' }}
        </Button>
    </div>
</template>
