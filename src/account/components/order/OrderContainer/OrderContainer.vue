<script setup lang="ts">
import { computed } from 'vue';
import type { FetchOrderDetailResponse, FetchPaymentStatusResponse } from '@/booking/services';
import { OrderDetails, OrderPayment } from '@/account/components';

type Props = {
    order: FetchOrderDetailResponse;
    paymentStatus: FetchPaymentStatusResponse;
};

const props = defineProps<Props>();

const STATUSES_TO_PAY: string[] = [
    'Подбор тура',
    'Рассматривается оператором',
    'Принята на бронирование',
    'Лист ожидания',
    'Подтверждено',
];

// TODO: Перенести на бэк как order_can_been_paid
const paymentIsAvailable = computed(() => {
    return (
        STATUSES_TO_PAY.includes(props.order.general.order_status) &&
        props.paymentStatus.status !== 'fully_paid' &&
        Object.keys(props.order.general.payment_options).length
    );
});
</script>

<template>
    <div class="w-full mb-3">
        <OrderDetails :general="order.general" :status="paymentStatus.status" />
        <OrderPayment v-if="paymentIsAvailable" :order="order" :payment-status="paymentStatus" />
    </div>
</template>
