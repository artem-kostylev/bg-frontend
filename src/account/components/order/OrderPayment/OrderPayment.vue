<script setup lang="ts">
import { computed } from 'vue';
import type { FetchOrderDetailResponse, FetchPaymentStatusResponse } from '@/booking/services';
import type { ChartAmounts } from '@/account/types';
import { PaymentChart, PaymentStatus } from '@/account/components';
import { usePaymentOptions } from '@/booking/composables';

type Props = {
    order: FetchOrderDetailResponse;
    paymentStatus: FetchPaymentStatusResponse;
};

const props = defineProps<Props>();

const order = computed(() => {
    return props.order;
});

const { paymentOptionsAsc, minPayment, paymentOptions } = usePaymentOptions({
    order,
    includedPaid: true,
});

const paymentChartAmounts = computed(() => {
    const chart: ChartAmounts = {
        minPrice: {
            amount: minPayment.value.paymentAmount,
            percent: minPayment.value.percent,
        },
        totalPrice: {
            amount: props.order.general.total_price,
            percent: 100,
        },
    };

    const { payedToFullCost } = props.order.payment_detail;
    payedToFullCost && (chart.paid = payedToFullCost);

    return chart;
});
</script>

<template>
    <div>
        <div v-if="paymentStatus.status !== 'not_paid'" class="w-full mb-16">
            <PaymentChart
                :amounts="paymentChartAmounts"
                :payment-options-length="paymentOptionsAsc.length"
            />
        </div>
        <div v-if="paymentStatus.status !== 'fully_paid'">
            <PaymentStatus
                :options="paymentOptions"
                :payment-deferment-in-days="minPayment.paymentDefermentInDays"
                :status="paymentStatus.status"
            />
        </div>
    </div>
</template>
