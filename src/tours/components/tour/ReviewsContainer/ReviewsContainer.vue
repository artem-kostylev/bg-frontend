<script setup lang="ts">
import { ref } from 'vue';
import { Typography, Spin } from '@ui/components';
import { computed, useLazyAsyncData } from '#imports';
import { fetchHotelReviews } from '@/tours/services';
import { useInfinity, useParams } from '@/app/composables';
import { Empty } from '@/app/components';
import { ReviewSort, ReviewList } from './components';

type Props = {
    reviews?: number;
};

const props = defineProps<Props>();
const params = useParams<{ id: string }>();

const page = ref(1);
const sort = ref('created_at:desc');

const { data, pending, error } = useLazyAsyncData(
    'hotel-reviews',
    () => fetchHotelReviews(params.value.id, page.value, sort.value),
    { server: false, watch: [sort] }
);

const { targetRef, loadingMore } = useInfinity(async () => {
    const response = await fetchHotelReviews(params.value.id, ++page.value, sort.value);
    data.value!.has_next = response.has_next;
    data.value!.reviews.push(...response.reviews);
});

const title = computed(() => {
    if (!props.reviews) return 'Отзывы';

    return `Отзывы (${props.reviews})`;
});
</script>

<template>
    <div>
        <div class="flex flex-wrap items-center -mx-5 -mb-5">
            <div class="px-5 flex-1 mb-5">
                <Typography variant="h2" as="h2">{{ title }}</Typography>
            </div>
            <div class="px-5 w-full md:w-auto mb-5">
                <ReviewSort v-model="sort" />
            </div>
        </div>
        <Spin v-if="pending" class="py-5 flex-1" color="primary" />
        <Empty
            v-else-if="error"
            title="Что-то пошло не так"
            description="Ошибка получения данных, попробуйте повторить запрос позже"
        />
        <div v-else-if="data" class="py-5">
            <template v-if="data.reviews.length">
                <ReviewList :reviews="data.reviews" />
                <template v-if="data.has_next">
                    <Spin v-if="loadingMore" color="primary" class="my-12 flex-1" />
                    <div v-else ref="targetRef"></div>
                </template>
            </template>
            <Empty v-else title="У этого отеля пока нет отзывов" />
        </div>
    </div>
</template>
