<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ReviewComments } from '@/tours/types';
import { Button } from '@ui/components';
import { Comments } from './';
import { ChevronRightIcon } from '@ui/icons';

type Props = {
    comments: ReviewComments;
};

defineProps<Props>();

const showMore = ref(false);
const commentsRef = ref<HTMLDivElement>();

const maxHeight = 274;

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
            v-if="childrenHeight > maxHeight && !showMore"
            variant="simplified"
            :end-icon="ChevronRightIcon"
            icon-class="w-5 h-5"
            class="mt-4"
            @click="showMore = true"
            >Полный текст</Button
        >
    </div>
</template>
