<script setup lang="ts">
import { ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { Modal, Grid, Card, Button } from '@ui/components';
import { ReviewHeader } from '@/account/components';
import { RatingCriteria, RatingItem, RatingComment, RatingErrorAlert } from './components';
import type { ReviewableHotel } from '@/account/types';
import type { SubmitError } from '@/app/types';
import { fetchAddReview, type FetchAddReviewPayload } from '@/account/services';
import { required, commentLength } from '@/app/lib';
import { useVuelidate } from '@vuelidate/core';
import { useMessage } from '@ui/composables';

type Props = {
    modelValue: boolean;
    hotel: ReviewableHotel;
};

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'add-review'): void;
}>();
const show = useVModel(props, 'modelValue', emit);

const form = ref({
    amenities: null,
    staff: null,
    cleanliness: null,
    location: null,
    liked: '',
    disliked: '',
    comment: '',
});

const rules = {
    amenities: { required },
    staff: { required },
    cleanliness: { required },
    location: { required },
    liked: { commentLength },
    disliked: { commentLength },
    comment: { commentLength },
};

const v$ = useVuelidate(rules, form);

const RATINGS = {
    amenities: 'Удобства и услуги',
    staff: 'Персонал',
    cleanliness: 'Чистота',
    location: 'Расположение',
};

const COMMENTS = {
    liked: 'Понравилось',
    disliked: 'Не понравилось',
    comment: 'Комментарии',
};

const pending = ref(false);

const message = useMessage();

const submit = async () => {
    if (!(await v$.value.$validate())) {
        message.danger('Заполните обязательные поля');
        return;
    }

    const { hotel_id, order_id } = props.hotel;
    const { amenities, staff, cleanliness, location, ...rest } = form.value;
    if (!(amenities && staff && cleanliness && location)) return;

    const body: FetchAddReviewPayload = {
        hotel_id,
        order_id,
        ratings: {
            amenities,
            staff,
            cleanliness,
            location,
        },
        comments: rest,
    };

    try {
        pending.value = true;
        await fetchAddReview(body);
        emit('add-review');
    } catch (e) {
        const err = e as SubmitError;
        const errorMessage = err.data.message ? err.data.message : 'Ошибка при добавлении отзыва';
        message.danger(errorMessage);
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <Modal v-model="show" size="3xl" title="Добавить отзыв">
        <Grid gap="4">
            <ReviewHeader :hotel="hotel" />
            <RatingCriteria />
            <Card>
                <Grid gap="6" class="mt-3">
                    <RatingItem
                        v-for="(rating, key) in RATINGS"
                        :key="key"
                        v-model="v$[key].$model"
                        :label="rating"
                        :is-error="v$[key].$errors?.length > 0"
                    />
                </Grid>
            </Card>
            <div class="mt-4">Оставьте отзыв</div>
            <Grid gap="2.5" v-for="(comment, key) in COMMENTS" :key="key">
                <RatingErrorAlert
                    v-if="v$[key].$errors?.length"
                    :show="v$[key].$errors?.length > 0"
                    :text="v$[key].$errors[0]?.$message"
                />
                <RatingComment v-model="v$[key].$model" :type="key" :placeholder="comment" />
            </Grid>
            <div>
                <Button
                    variant="primary"
                    :loading="pending"
                    class="w-full sm:w-max"
                    @click="submit"
                >
                    Отправить
                </Button>
            </div>
            <div>* – Для добавления отзыва заполните все разделы</div>
        </Grid>
    </Modal>
</template>
