<script setup lang="ts">
import { computed } from 'vue';
import { PromoCode, PaymentOptions, PaymentMethods } from '@/booking/components';
import { Grid, Divider } from '@ui/components';
import type {
    PaymentStatus,
    PaymentOptions as PaymentOptionsType,
    PaymentOption,
} from '@/booking/types';

type Props = {
    paymentStatus: PaymentStatus;
    paymentOptions: PaymentOptionsType;
};

const props = defineProps<Props>();

export type Options = {
    key: string;
    percent: number;
    paymentAmount: number;
    paymentDefermentInDays: number;
    label: string;
    important?: boolean;
}[];

const paymentOptionsAsc = computed(() => {
    return Object.entries(props.paymentOptions)
        .map(([key, value]: [string, PaymentOption]) => ({ key, ...value }))
        .sort((a, b) => a.percent - b.percent);
});

const options = computed(() => {
    if (props.paymentStatus.prepaymentStatus.money === 'notPayed') {
        return paymentOptionsAsc.value.map(item => ({
            ...item,
            label: 'от стоимости тура',
            important: item.percent < 100 ? true : false,
        }));
    } else return [];
});

const minPaymentDefermentInDays = computed(() => {
    return paymentOptionsAsc.value[0].paymentDefermentInDays;
});
</script>

<template>
    <Grid class="gap-4 md:gap-6" :class="$attrs.class" :style="$attrs.style">
        <PromoCode />
        <Divider dashed />
        <PaymentOptions :options="options" :payment-deferment-in-days="minPaymentDefermentInDays" />
        <Divider dashed />
        <PaymentMethods />
        <Divider dashed />

        <!-- <div>
            <div class="text-lg lg:text-xl">Стоимость тура - {{}}</div>
            <div v-if="false" class="mt-2 text-lg lg:text-xl">Ранее оплачено - {{}}</div>
            <div class="mt-5">
                <Typography variant="h2"> Сумма к оплате - {{}} </Typography>
            </div>
        </div> -->
        <!-- <Button
            variant="primary"
            :disabled="!paymentStatus && !data"
            :loading="pending"
            @click="submit"
        >
            Оплатить
        </Button> -->
    </Grid>
</template>
