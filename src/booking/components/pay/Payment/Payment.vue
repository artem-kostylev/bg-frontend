<script setup lang="ts">
import { ref, computed } from 'vue';
import { PromoCode, PaymentProcedure, PaymentMethods } from '@/booking/components';
import { Grid, Divider, Button, Typography } from '@ui/components';
import { watchOnce } from '@vueuse/core';
import type { PayQuery, OrderPaymentOption } from '@/booking/types';
import { type FetchOrderDetailResponse } from '@/booking/services';
import { formatCurrency } from '@/app/lib';

type Props = {
    order: FetchOrderDetailResponse;
    paidAmount: number;
    query: PayQuery;
    btnDisabled?: boolean;
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

const options = computed(() => {
    // if order is not paid, return only sorted paymentOptions
    if (props.order.payment_status.prepaymentStatus.money === 'notPayed') {
        return paymentOptionsAsc.value.map(item => ({
            ...item,
            label: 'от стоимости тура',
            important: item.percent < 100 ? true : false,
        }));
    } else {
        // if partially paid, return possible options for payment
        const { prepaymentStatus, mustPayedToMinimal, mustPayedToFullCost } =
            props.order.payment_status;

        const res = [];

        // pay up to the amount of the minimum prepayment, if it's possible
        if (prepaymentStatus.defermentInDaysDeadline === 'before' && mustPayedToMinimal) {
            res.push({
                key: minPayment.value.key,
                percent: mustPayedToMinimal.percent,
                paymentAmount: mustPayedToMinimal.amount,
                label: 'от суммы минимальной предоплаты',
                important: true,
            });
        }

        // pay up to the amount of total price
        if (mustPayedToFullCost) {
            res.push({
                key: 'full',
                percent: mustPayedToFullCost.percent,
                paymentAmount: mustPayedToFullCost.amount,
                label: 'от стоимости тура',
                important: false,
            });
        }

        return res;
    }
});

const paymentAmount = ref(0);
const paymentProcedureRef = ref<HTMLDivElement>();

// set initial value for paymentAmount
watchOnce(
    () => props.order,
    value => {
        if (!value) return;

        const { payment_options } = props.order.general ?? {};
        if (!payment_options) return;

        paymentAmount.value = options.value[0].paymentAmount;

        // selected option from order page
        const selectedPercent = options.value.find(
            option => option.key === props.query.selected_option
        );
        selectedPercent && (paymentAmount.value = selectedPercent.paymentAmount);
        setTimeout(() => paymentProcedureRef?.value?.scrollIntoView({ behavior: 'smooth' }), 100);
    },
    { immediate: true }
);

const paymentMethod = ref<'url' | 'qr'>('url');

const pending = ref(false);
const submit = async () => {
    if (pending.value) return;
};
</script>

<template>
    <Grid class="gap-4 md:gap-6" :class="$attrs.class" :style="$attrs.style">
        <PromoCode />
        <div ref="paymentProcedureRef" tabindex="0"><Divider dashed /></div>
        <PaymentProcedure
            v-model="paymentAmount"
            :options="options"
            :payment-deferment-in-days="minPayment.paymentDefermentInDays"
        />
        <Divider dashed />
        <PaymentMethods v-model="paymentMethod" />
        <Divider dashed />
        <div>
            <Typography variant="h3" class="mt-5">
                Стоимость тура - {{ formatCurrency(order.general.total_price, true) }}
            </Typography>
            <Typography v-if="paidAmount" variant="h3" class="mt-2">
                Ранее оплачено - {{ formatCurrency(paidAmount, true) }}
            </Typography>
            <Typography variant="h2" class="mt-5">
                Сумма к оплате -
                {{ formatCurrency(paymentAmount, true) }}
            </Typography>
        </div>
        <div>
            <Button variant="primary" :disabled="btnDisabled" :loading="pending" @click="submit">
                Оплатить
            </Button>
        </div>
    </Grid>
</template>
