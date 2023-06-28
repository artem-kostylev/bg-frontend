<script setup lang="ts">
import { Card, Image, Button } from '@ui/components';
import { CommentIcon, ReadCommentIcon } from '@ui/icons';
import { ReviewStatus } from './components';
import { ReviewHeader } from '@/account/components';
import type { ReviewableHotel } from '@/account/types';
import type { Review } from '@/tours/types';

type Props = {
    hotel: ReviewableHotel | Review;
    action: 'add' | 'read';
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'open', value: number): void;
}>();

const open = () => {
    emit('open', props.hotel.hotel_id);
};
</script>

<template>
    <Card cover-class="h-[20rem] bg-secondary-100" body-class="flex flex-col justify-end">
        <template #cover>
            <div class="relative h-full">
                <Image
                    v-if="hotel.images?.length"
                    :src="hotel.images[0].url"
                    :alt="hotel.name"
                    class="w-full h-full object-cover"
                />
                <ReviewStatus v-if="hotel.status" :status="hotel.status" />
            </div>
        </template>
        <template #header>
            <ReviewHeader :hotel="hotel" />
        </template>
        <div class="flex justify-end mt-auto">
            <Button
                variant="secondary"
                :start-icon="action === 'add' ? CommentIcon : ReadCommentIcon"
                class="w-full sm:w-max"
                @click="open"
            >
                {{ action === 'add' ? 'Добавить отзыв' : 'Читать отзыв' }}
            </Button>
        </div>
    </Card>
</template>
