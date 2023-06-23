<script setup lang="ts">
import { Radio } from '@ui/components';
import { formatCurrency } from '@/app/lib';
import { useVModel } from '@vueuse/core';
import type { PaymentProcedureOptions } from '@/booking/types';

type Props = {
    modelValue: number;
    options: PaymentProcedureOptions;
    paymentDefermentInDays: number;
};

const props = defineProps<Props>();

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();
const amount = useVModel(props, 'modelValue', emit);
</script>

<template>
    <div>
        <div class="text-xl lg:text-2xl">Порядок оплаты</div>
        <div class="flex flex-col space-y-2.5 mt-6">
            <Radio
                v-for="option in options"
                :key="option.key"
                v-model="amount"
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
