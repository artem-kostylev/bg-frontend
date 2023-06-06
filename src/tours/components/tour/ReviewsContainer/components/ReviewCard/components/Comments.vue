<script setup lang="ts">
import type { ReviewComments } from '@/tours/types';
import { SmileFaceIcon, SadFaceIcon } from '@ui/icons';

type Props = {
    comments: ReviewComments;
};

defineProps<Props>();
</script>

<template>
    <div class="space-y-4">
        <div v-if="comments.comment">{{ comments.comment }}</div>
        <div v-if="comments.liked" class="flex space-x-2">
            <SmileFaceIcon width="1.2em" height="1.2em" class="text-success-700 shrink-0 mt-1" />
            <span>·</span>
            <span>{{ comments.liked }}</span>
        </div>
        <div v-if="comments.disliked" class="flex space-x-2">
            <SadFaceIcon width="1.2em" height="1.2em" class="text-danger-700 shrink-0 mt-1" />
            <span>·</span>
            <span>{{ comments.disliked }}</span>
        </div>
    </div>
</template>
