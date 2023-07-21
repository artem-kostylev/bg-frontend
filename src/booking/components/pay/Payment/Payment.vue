<script setup lang="ts">
import { ref, computed } from 'vue';
import { PromoCode, PaymentProcedure, PaymentMethods } from '@/booking/components';
import { Grid, Divider, Button, Typography } from '@ui/components';
import { watchOnce } from '@vueuse/core';
import type { PayQuery } from '@/booking/types';
import { fetchPaymentOrder, type FetchOrderDetailResponse } from '@/booking/services';
import { formatCurrency } from '@/app/lib';
import { useMessage } from '@ui/composables';
import { usePaymentOptions } from '@/booking/composables';

type Props = {
    order: FetchOrderDetailResponse;
    paidAmount: number;
    query: PayQuery;
    btnDisabled?: boolean;
};

const props = defineProps<Props>();

const order = computed(() => {
    return props.order;
});

const { minPayment, paymentOptions } = usePaymentOptions({ order });

const paymentAmount = ref(0);
const paymentProcedureRef = ref<HTMLDivElement>();

// set initial value for paymentAmount
watchOnce(
    () => props.order,
    value => {
        if (!value) return;

        const { payment_options } = props.order.general ?? {};
        if (!payment_options) return;

        paymentAmount.value = paymentOptions.value[0].paymentAmount;

        // selected option from order page
        const selectedPercent = paymentOptions.value.find(
            option => option.key === props.query.selected_option
        );
        selectedPercent && (paymentAmount.value = selectedPercent.paymentAmount);
        setTimeout(() => paymentProcedureRef?.value?.scrollIntoView({ behavior: 'smooth' }), 100);
    },
    { immediate: true }
);

const emit = defineEmits<{
    (
        e: 'update-qr-data',
        value: {
            qr: string;
            ticket: number;
            showQrCode: boolean;
        }
    ): void;
}>();

const paymentMethod = ref<'url' | 'qr'>('url');

const pending = ref(false);

const message = useMessage();

const submit = async () => {
    if (pending.value) return;

    try {
        pending.value = true;

        const response = await fetchPaymentOrder({
            order_id: props.query.order_id,
            amount: paymentAmount.value,
            type: paymentMethod.value,
        });

        if (paymentMethod.value === 'url') {
            window.location.href = response.url;
        } else {
            emit('update-qr-data', {
                qr: response.qr,
                ticket: response.ticket,
                showQrCode: true,
            });
        }
    } catch (error) {
        let errorMessage = 'Unknown Error';
        if (error instanceof Error) errorMessage = error.message;
        message.danger(errorMessage);
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <Grid class="gap-4 md:gap-6" :class="$attrs.class" :style="$attrs.style">
        <PromoCode />
        <div ref="paymentProcedureRef" tabindex="0"><Divider dashed /></div>
        <PaymentProcedure
            v-model="paymentAmount"
            :options="paymentOptions"
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
