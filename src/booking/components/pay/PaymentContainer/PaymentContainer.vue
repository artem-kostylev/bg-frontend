<script setup lang="ts">
import { ref, computed } from 'vue';
import { PromoCode, PaymentOptions, PaymentMethods } from '@/booking/components';
import { Grid, Divider, Button, Typography } from '@ui/components';
import type {
    PaymentStatus,
    PaymentOptions as PaymentOptionsType,
    PaymentOption,
} from '@/booking/types';
import { formatCurrency } from '@/app/lib';

type Props = {
    totalPrice: number;
    paidAmount: number;
    paymentStatus: PaymentStatus;
    paymentOptions: PaymentOptionsType;
    btnDisabled?: boolean;
};

const props = defineProps<Props>();

export type Options = {
    key: string;
    percent: number;
    paymentAmount: number;
    label: string;
    important: boolean;
}[];

const paymentOptionsAsc = computed(() => {
    return Object.entries(props.paymentOptions)
        .map(([key, value]: [string, PaymentOption]) => ({ key, ...value }))
        .sort((a, b) => a.percent - b.percent);
});

const minPayment = computed(() => {
    return paymentOptionsAsc.value[0];
});

const options = computed(() => {
    // if order is not paid, return only sorted paymentOptions
    if (props.paymentStatus.prepaymentStatus.money === 'notPayed') {
        return paymentOptionsAsc.value.map(item => ({
            ...item,
            label: 'от стоимости тура',
            important: item.percent < 100 ? true : false,
        }));
    } else {
        // if partially paid, return possible options for payment
        const { prepaymentStatus, mustPayedToMinimal, mustPayedToFullCost } = props.paymentStatus;

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

const prepaymentAmount = ref(0);
const paymentMethod = ref<'url' | 'qr'>('url');

const paymentOptionsRef = ref<HTMLDivElement>();

const pending = ref(false);
const submit = async () => {
    if (pending.value) return;
};
</script>

<template>
    <Grid class="gap-4 md:gap-6" :class="$attrs.class" :style="$attrs.style">
        <PromoCode />
        <Divider dashed />
        <PaymentOptions
            v-model="prepaymentAmount"
            :options="options"
            :payment-deferment-in-days="minPayment.paymentDefermentInDays"
            ref="paymentOptionsRef"
            tabindex="0"
        />
        <Divider dashed />
        <PaymentMethods v-model="paymentMethod" />
        <Divider dashed />
        <div>
            <Typography variant="h3" class="mt-5">
                Стоимость тура - {{ formatCurrency(totalPrice, true) }}
            </Typography>
            <Typography v-if="paidAmount" variant="h3" class="mt-2">
                Ранее оплачено - {{ formatCurrency(paidAmount, true) }}
            </Typography>
            <Typography variant="h2" class="mt-5">
                Сумма к оплате -
                {{ formatCurrency(prepaymentAmount, true) }}
            </Typography>
        </div>
        <div>
            <Button variant="primary" :disabled="btnDisabled" :loading="pending" @click="submit">
                Оплатить
            </Button>
        </div>
    </Grid>
</template>
