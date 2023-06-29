<script setup lang="ts">
import { computed } from 'vue';
import type { FetchOrderDetailResponse } from '@/booking/services';
import { Alert } from '@ui/components';
import { HourglassIcon } from '@ui/icons';
import { PercentIcon, PayDeadlineExpiredText, MinPayIsWrongText } from './components';
import { formatCurrency } from '@/app/lib';
import { usePaymentOptions } from '@/booking/composables';
import { useAuthStore } from '@/auth/stores';

type Props = {
    order: FetchOrderDetailResponse;
    status?: 'success' | 'fail';
};

const props = defineProps<Props>();

const order = computed(() => {
    return props.order;
});

const paymentDetail = computed(() => {
    return order.value.payment_detail;
});

const errorType = computed(() => {
    const { prepaymentStatus } = paymentDetail.value;

    if (prepaymentStatus.money === 'notPayed') return;

    return prepaymentStatus.defermentInDaysDeadline === 'after'
        ? 'PayDeadlineExpired'
        : prepaymentStatus.money === 'lessThanMinimal'
        ? 'MinPayIsWrong'
        : undefined;
});

const { user } = useAuthStore();

const successMessage = computed(() => {
    return `Договор и информация по туру направлена на вашу почту — ${user?.email}. Со всей информацией по предстоящему туру можно ознакомиться в разделе Мои поездки в Личном кабинете.`;
});

const alertTitle = computed(() => {
    const { mustPayedToFullCost, payedToFullCost } = paymentDetail.value;
    const { value: error } = errorType;

    return error === 'PayDeadlineExpired' && mustPayedToFullCost
        ? `Истек срок оплаты оставшихся ${mustPayedToFullCost.percent}%`
        : error === 'MinPayIsWrong' && payedToFullCost
        ? `Вы оплатили ${formatCurrency(payedToFullCost.amount, true)} (${
              payedToFullCost.percent
          }% от общей суммы тура)`
        : '';
});

const startIcon = computed(() =>
    errorType.value === 'PayDeadlineExpired' ? HourglassIcon : PercentIcon
);

const { minPayment } = usePaymentOptions({
    order,
});
</script>

<template>
    <Alert
        v-if="status === 'success'"
        variant="success"
        title="Оплата прошла успешно"
        :text="successMessage"
    />
    <Alert
        v-if="errorType"
        variant="error"
        :start-icon="startIcon"
        :icon-props="{ percent: minPayment.percent }"
    >
        <template #title>
            <span class="font-bold text-black">{{ alertTitle }}</span>
        </template>
        <template #text>
            <PayDeadlineExpiredText
                v-if="errorType === 'PayDeadlineExpired' && paymentDetail.mustPayedToFullCost"
                :must-payed-to-full-cost="paymentDetail.mustPayedToFullCost"
                :order-number="order.general.order_number"
            />
            <MinPayIsWrongText
                v-else-if="paymentDetail.mustPayedToMinimal"
                :min-payment="minPayment"
                :must-payed-to-minimal="paymentDetail.mustPayedToMinimal"
                :order-id="order.general.order_id"
            />
        </template>
    </Alert>
</template>
