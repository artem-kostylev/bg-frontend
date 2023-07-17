<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { Button } from '@ui/components';
import type { ButtonVariant, ButtonSize } from '@ui/components';
import { ChevronDownIcon } from '@ui/icons';
import type { StringOrNumber } from '@ui/types';

type Props = {
    btnVariant?: ButtonVariant;
    btnSize?: ButtonSize;
};

withDefaults(defineProps<Props>(), {
    btnVariant: 'base',
    btnSize: 'xs',
});

const showMore = ref(false);
const containerRef = ref<HTMLDivElement>();

const maxHeight = 250;

const childrenHeight = computed(() => {
    let height = 0;
    const childMargin = 16;
    const childElements = containerRef.value?.children;
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
            ref="containerRef"
            :style="{
                'max-height': childrenHeight > maxHeight && !showMore ? `${maxHeight}px` : 'none',
            }"
        >
            <slot></slot>
        </div>
        <Button
            v-if="childrenHeight > maxHeight"
            :variant="btnVariant"
            :size="btnSize"
            :end-icon="endIcon"
            @click="showMore = !showMore"
            class="mt-2.5"
        >
            {{ showMore ? 'Скрыть' : 'Показать все' }}
        </Button>
    </div>
</template>
