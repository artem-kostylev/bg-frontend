<script setup lang="ts">
import { ref, watch } from 'vue';
import { Grid, Alert } from '@ui/components';
import { SearchIcon } from '@ui/icons';
import type { ReviewableHotel } from '@/account/types';
import { ReviewCard, AddReviewModal } from '@/account/components';

type Props = {
    hotels: ReviewableHotel[] | null;
};

defineProps<Props>();

const hotelId = ref<number | null>(null);

const open = (hotel_id: number) => {
    hotelId.value = hotel_id;
    showModal.value = true;
};

const showModal = ref(false);

const close = () => {
    showModal.value = false;
    hotelId.value = null;
};

watch(showModal, value => {
    if (!value) {
        hotelId.value = null;
    }
});

// TODO: Добавить блок "рекомендуемые туры"
</script>

<template>
    <Grid gap="5">
        <div class="text-xl lg:text-2xl">Добавьте новый отзыв</div>
        <div v-if="hotels?.length">
            <Grid cols="2" gap="5">
                <ReviewCard
                    v-for="hotel in hotels"
                    :key="hotel.hotel_id"
                    :hotel="hotel"
                    action="add"
                    @open="open"
                />
            </Grid>
            <AddReviewModal v-if="hotelId" v-model="showModal" :hotel-id="hotelId" @close="close" />
        </div>
        <div v-else>
            <Alert
                variant="info"
                title="У вас пока нет отелей, к которым можно оставить отзыв"
                text="Выберите место для первого путешествия с нами. По завершении вашей поездки, мы будем благодарны, если вы поделитесь своими впечатлениями об отеле."
                :start-icon="SearchIcon"
            />
        </div>
    </Grid>
</template>
