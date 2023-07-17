<script setup lang="ts">
import type { ReviewComments } from '@/tours/types';
import { ToggleElement } from '@/app/components';
import { Comments } from './';

type Props = {
    comments: ReviewComments;
};

defineProps<Props>();
</script>

<template>
    <ToggleElement>
        <Comments :comments="comments" />
    </ToggleElement>
</template>
