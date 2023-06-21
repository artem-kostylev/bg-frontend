<script setup lang="ts">
import { computed } from 'vue';
import type { FetchOrderDetailResponse, FetchPaymentStatusResponse } from '@/booking/services';
import type { OrderPaymentOption } from '@/booking/types';
import type { ChartAmounts } from '@/account/types';
import { PaymentChart } from '@/account/components';

type Props = {
    order: FetchOrderDetailResponse;
    paymentStatus: FetchPaymentStatusResponse;
};

const props = defineProps<Props>();

const paymentOptionsAsc = computed(() => {
    return Object.entries(props.order.general.payment_options)
        .map(([key, value]: [string, OrderPaymentOption]) => ({ key, ...value }))
        .sort((a, b) => a.percent - b.percent);
});

const minPayment = computed(() => {
    return paymentOptionsAsc.value[0];
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
    </div>
</template>
