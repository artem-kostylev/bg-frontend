<script setup lang="ts">
import { Modal, Typography, Button, Divider } from '@ui/components';
import { ChevronDownIcon } from '@ui/icons';
import { computed, ref } from 'vue';
import { formatCurrency } from '@/app/lib';
import { ChangePriceIcon } from '@ui/icons';

type Props = {
    modelValue: string;
    newPrice: number | null;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const refuse = ref(false);

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const close = () => {
    value.value = '';
};
</script>

<template>
    <Modal :model-value="value === 'newprice'" @update:model-value="close" size="sm">
        <div class="text-center">
            <div class="flex justify-center mb-5">
                <ChangePriceIcon class="text-red-600" width="2.7em" height="2.7em" />
            </div>
            <Typography variant="h3" class="mb-2">Стоимость тура изменилась</Typography>
            <Typography v-if="newPrice">
                Новая стоимость тура:
                <span class="font-semibold">{{ formatCurrency(newPrice, true) }}</span>
            </Typography>
        </div>
        <div class="flex space-x-2.5 p-5">
            <Button block :end-icon="ChevronDownIcon" @click="refuse = !refuse">Отказаться</Button>
            <Button variant="primary" block @click="value = 'pay'">Перейти к оплате</Button>
        </div>
        <div class="px-5" v-if="refuse">
            <Divider class="mb-5" dashed />
            <div class="mb-5">Получить по e-mail уведомление об изменении цены на этот тур</div>
            <div class="flex items-center justify-center mb-5 space-x-2.5">
                <Button @click="close">Нет</Button>
                <Button variant="primary" @click="close" class="w-15">Да</Button>
            </div>
        </div>
    </Modal>
</template>
