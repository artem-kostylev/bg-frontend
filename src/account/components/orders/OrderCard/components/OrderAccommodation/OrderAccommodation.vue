<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { Button } from '@ui/components';
import { BuildingIcon } from '@ui/icons';
import type { OrderDetailGeneral, Accommodation } from '@/booking/types';
import type { ReviewableHotel } from '@/account/types';
import { AddReviewModal } from '@/account/components';
import { useMessage } from '@ui/composables';

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

const showModal = ref(false);
const selectedHotel = ref<ReviewableHotel | null>(null);

const open = (accommodation: Accommodation) => {
    showModal.value = true;

    // TODO: Поменять на бэкенде date_from на date_start и date_to на date_finish (чтобы везде был одинаковый формат)
    selectedHotel.value = {
        order_id: props.general.order_id,
        hotel_id: accommodation.id,
        name: accommodation.name,
        date_from: accommodation.date_start,
        date_to: accommodation.date_finish,
        duration: accommodation.duration,
        location: accommodation.location,
    };
};

watch(showModal, value => {
    if (!value) {
        selectedHotel.value = null;
    }
});

const message = useMessage();

const addReview = () => {
    message.success('Ваш отзыв направлен на проверку');
    showModal.value = false;
    selectedHotel.value = null;
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
                <Button v-if="hasReview" variant="ghost" @click="open(accommodation)"
                    >Оставить отзыв</Button
                >
            </div>
        </div>

        <AddReviewModal
            v-if="selectedHotel"
            v-model="showModal"
            :hotel="selectedHotel"
            @add-review="addReview"
        />
    </div>
</template>
