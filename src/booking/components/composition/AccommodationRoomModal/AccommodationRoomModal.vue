<script setup lang="ts">
import { ref } from 'vue';
import type { AccommodationRoom } from '@/booking/types';
import { Modal, Checkbox, Button } from '@ui/components';
import { fetchWishes } from '@/booking/services';
// import { useMessage } from '@ui/composables';

import { useVModel } from '@vueuse/core';
type Props = {
    accommodationRoom: AccommodationRoom;
    modelValue: boolean;
};

const props = defineProps<Props>();

const selectedItems = ref(props.accommodationRoom.wishes || []);

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
const show = useVModel(props, 'modelValue', emit);

const items = [
    {
        label: 'День рождения',
        value: 'birthday',
    },
    {
        label: 'Молодожены',
        value: 'newlyweds',
    },
    {
        label: 'Первый этаж',
        value: 'ground_floor',
    },
    {
        label: 'Детская кроватка',
        value: 'baby_cot',
    },
    {
        label: 'Верхний этаж',
        value: 'top_floor',
    },
    {
        label: 'Две кровати',
        value: '2_beds',
    },
    {
        label: 'Большая кровать',
        value: 'large_bed',
    },
];

const pending = ref(false);
// const message = useMessage();

const submit = async () => {
    try {
        pending.value = true;

        await fetchWishes({
            order_accommodation_id: props.accommodationRoom.order_accommodation_id,
            wishes: selectedItems.value,
        });

        show.value = false;

        // TODO Исправить мутацию пропсов
        // eslint-disable-next-line vue/no-mutating-props
        props.accommodationRoom.wishes = selectedItems.value;

        // message.success('Пожелания успешно отправлены!');
    } catch (error) {
        let errorMessage = 'Unknown Error';
        if (error instanceof Error) errorMessage = error.message;
        // eslint-disable-next-line
        console.log(errorMessage);
        // message.danger(errorMessage);
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <Modal v-model="show" title="Дополнительные пожелания">
        <div>
            <div class="flex flex-wrap -mx-2.5 -mb-2.5">
                <div class="w-1/2 px-2.5 mb-2.5" v-for="item in items" :key="item.value">
                    <Checkbox v-model="selectedItems" :value="item.value" multiple>
                        {{ item.label }}
                    </Checkbox>
                </div>
            </div>
            <div class="mt-5">
                <div class="flex justify-center items-center">
                    <Button variant="primary" :loading="pending" @click="submit">
                        Отправить
                    </Button>
                </div>
                <div class="mt-5 mb-2.5">* - Предоставление данных услуг на усмотрение отеля.</div>
                <div>
                    Редактирвоание пожеланий в отель доступно только для заявки в статусе "Подбор
                    тура". После нажатия на кнопку "Оформить тур" пожелания можно высказать,
                    отправив комментарий в отдел бронирования.
                </div>
            </div>
        </div>
    </Modal>
</template>
