<script setup lang="ts">
import { computed } from 'vue';
import type { OrderDetailGeneral, Accommodation } from '@/booking/types';
import { Button } from '@ui/components';
import { BuildingIcon } from '@ui/icons';

type Props = {
    general: OrderDetailGeneral;
    accommodation: Accommodation;
    accommodationIndex: number;
    accommodationsLength: number;
    currentTab: 'active' | 'past';
};

const props = defineProps<Props>();

const dateAgo = computed(() => {
    const maxYear = 2;
    return new Date(new Date().setFullYear(new Date().getFullYear() - maxYear)).setHours(
        0,
        0,
        0,
        0
    );
});

const hasReview = computed(() => {
    return (
        props.currentTab === 'past' &&
        props.general.order_status === 'Подтверждено' &&
        new Date(props.general.date_finish).setHours(0, 0, 0, 0) >= dateAgo.value &&
        !props.accommodation.has_review
    );
});

const addReview = ({
    order_id,
    accommodation,
}: {
    order_id: number;
    accommodation: Accommodation;
}) => {
    console.log(order_id);
    console.log(accommodation);
};
</script>

<template>
    <div class="flex space-x-2" :class="hasReview ? 'items-start' : 'items-center'">
        <div class="rounded-md bg-secondary-200 p-1" :class="hasReview && 'mt-1'">
            <BuildingIcon width="1.2em" height="1.2em" class="shrink-0" />
        </div>

        <div class="flex flex-col">
            <div>
                <span v-if="accommodationsLength > 1"
                    >Отель №{{ accommodationIndex + 1 }}&#160;</span
                >
                <span>{{ accommodation.name }}</span>
            </div>
            <div>
                <Button
                    v-if="hasReview"
                    variant="ghost"
                    @click="addReview({ order_id: general.order_id, accommodation })"
                    >Оставить отзыв</Button
                >
            </div>
        </div>
    </div>
</template>
