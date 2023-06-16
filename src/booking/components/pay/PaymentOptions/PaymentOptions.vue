<script setup lang="ts">
import { ref } from 'vue';
import { Radio } from '@ui/components';
import type { Options } from '../PaymentContainer/PaymentContainer.vue';
import { formatCurrency } from '@/app/lib';

type Props = {
    options: Options;
    paymentDefermentInDays: number;
};

defineProps<Props>();

const prepayment = ref(0);
</script>

<template>
    <div>
        <div class="text-xl lg:text-2xl">Порядок оплаты</div>
        <div class="flex flex-col space-y-2.5 mt-6">
            <Radio
                v-for="option in options"
                :key="option.percent"
                v-model="prepayment"
                :value="option.paymentAmount"
            >
                <span class="font-bold">{{ formatCurrency(option.paymentAmount, true) }}</span>
                <span> ({{ option.percent }}% {{ option.label }})</span>
                <span v-if="option.important"> * </span>
            </Radio>
        </div>
        <div v-if="paymentDefermentInDays" class="mt-8">
            * – При изменении статуса заявки на «Подтверждено» Вы должны произвести полную оплату
            турпродукта / туристской услуги, не позднее {{ paymentDefermentInDays }} дней до начала
            тура.
        </div>
    </div>
</template>
