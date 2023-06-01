<script setup lang="ts">
import type { ReviewComments } from '@/tours/types';
import { SmileFaceIcon, SadFaceIcon, MessageIcon } from '@ui/icons';

type Props = {
    comments: ReviewComments;
};

defineProps<Props>();
</script>

<template>
    <div class="space-y-4">
        <div v-if="comments.liked" class="flex sm:flex-col">
            <span class="font-bold text-[#32A071] hidden sm:inline">Понравилось</span>
            <SmileFaceIcon class="text-[#32A071] flex-shrink-0 mr-3 sm:hidden" />
            <span>{{ comments.liked }}</span>
        </div>

        <div v-if="comments.disliked" class="flex sm:flex-col">
            <span class="font-bold text-[#E8A62C] hidden sm:inline">Не понравилось</span>
            <SadFaceIcon class="text-[#E8A62C] flex-shrink-0 mr-3 sm:hidden" />
            <span>{{ comments.disliked }}</span>
        </div>

        <div v-if="comments.comment" class="flex sm:flex-col">
            <span class="font-bold hidden sm:inline">Комментарий</span>
            <MessageIcon class="flex-shrink-0 mr-3 sm:hidden" />
            <span> {{ comments.comment }}</span>
        </div>
    </div>
</template>
