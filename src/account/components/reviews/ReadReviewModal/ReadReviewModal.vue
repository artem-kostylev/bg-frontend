<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { useLazyAsyncData } from '#imports';
import { Modal, Spin, Grid, Image } from '@ui/components';
import { BarChartIcon } from '@ui/icons';
import type { Review } from '@/tours/types';
import { ReviewHeader } from '@/account/components';
import { fetchAccountReview } from '@/account/services';

type Props = {
    modelValue: boolean;
    hotel: Review;
    reviewId: number;
};

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
}>();
const show = useVModel(props, 'modelValue', emit);

const { data: review, pending } = useLazyAsyncData('account-review', () =>
    fetchAccountReview(props.reviewId)
);
</script>

<template>
    <Modal v-model="show" size="3xl" title="Отзыв">
        <div v-if="pending" class="flex items-center justify-center">
            <Spin width="2.4em" height="2.4em" color="primary" />
        </div>
        <Grid v-else-if="review" gap="4">
            <ReviewHeader v-if="hotel" :hotel="hotel" />
            <Image
                v-if="hotel?.images?.length"
                :src="hotel.images[0].url"
                :alt="hotel.name"
                class="w-full h-full object-cover"
            />
            <div class="flex items-center gap-2">
                <span class="font-bold">Моя оценка</span>
                <div
                    class="px-2 py-2 rounded-xl bg-secondary-200 text-secondary-700 w-max self-center sm:self-start"
                >
                    <div class="flex items-end">
                        <BarChartIcon />
                        <span class="ml-1 leading-3">{{ review.average_rating }}</span>
                    </div>
                </div>
            </div>
            <div v-if="review.comments.liked">
                <div class="font-bold text-success-600">Понравилось</div>
                {{ review.comments.liked }}
            </div>
            <div v-if="review.comments.disliked">
                <div class="font-bold text-[#FFBD00]">Не понравилось</div>
                {{ review.comments.disliked }}
            </div>
            <div v-if="review.comments.liked">
                <div class="font-bold text-secondary-600">Комментарий</div>
                {{ review.comments.liked }}
            </div>
        </Grid>
    </Modal>
</template>
