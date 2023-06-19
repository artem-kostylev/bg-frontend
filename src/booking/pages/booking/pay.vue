<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useLazyAsyncData, useRouter } from '#imports';
import { useIntervalFn, watchOnce } from '@vueuse/core';
import { useQuery } from '@/app/composables';
import { Page } from '@/app/components';
import { fetchOrderDetail, fetchPaymentStatus } from '@/booking/services';
import { Selected, PaymentContainer } from '@/booking/components';
import { Grid, Spin, Typography, Alert } from '@ui/components';
import type { PayQuery, Transaction } from '@/booking/types';
// import { useMessage } from '@ui/composables';

const query = useQuery<PayQuery>();

const { data: order, pending: pendingOrder } = useLazyAsyncData('booking-order-detail', () =>
    fetchOrderDetail(query.value.order_id)
);

const {
    data: paymentStatus,
    pending: pendingStatus,
    execute,
} = useLazyAsyncData('pay-status', () => fetchPaymentStatus(query.value.order_id));

const meta = {
    title: 'Дополнительные услуги и оплата',
    description: 'Описание страницы дополнительные услуги и оплата',
};

const paidAmount = computed(() => {
    return paymentStatus.value?.total || 0;
});

const ticket = ref();

const transactionStatus = computed(() => {
    const { order_payment_id } = query.value;
    const { items } = paymentStatus.value || {};

    return (
        items &&
        (order_payment_id
            ? items.find((item: Transaction) => item.id === Number(order_payment_id))
            : ticket.value && items.find((item: Transaction) => item.ticket === ticket.value))
    );
});

const showQrCode = ref(false);

const router = useRouter();
// const message = useMessage();

type PaymentStatusError = {
    errors: { order_id?: string[] };
    message: string;
};

const { pause, resume } = useIntervalFn(
    async () => {
        try {
            pause();

            const response = await fetchPaymentStatus(query.value.order_id);
            paymentStatus.value = response;

            const data = response.items.find((t: Transaction) => t.ticket === ticket.value);

            if (data?.status === 'ok') {
                router.push({
                    name: 'account-orders-id',
                    params: { id: query.value.order_id },
                    query: { status: 'success' },
                });

                showQrCode.value = false;

                return;
            }

            if (data?.status === 'failed') {
                showQrCode.value = false;
            }

            resume();
        } catch (e) {
            const err = e as PaymentStatusError;
            console.log(err.message);
            // message.danger(err.message);
            showQrCode.value = false;
        }
    },
    3000,
    { immediate: false }
);

watch(showQrCode, value => (value ? resume() : pause()));

// TODO: Перенести на бэк как order_can_been_paid
const STATUSES_TO_PAY: string[] = [
    'Подбор тура',
    'Рассматривается оператором',
    'Принята на бронирование',
    'Лист ожидания',
    'Подтверждено',
];

const paymentIsAvailable = computed(() => {
    return (
        order.value &&
        STATUSES_TO_PAY.includes(order.value.general.order_status) &&
        paymentStatus.value?.status !== 'fully_paid'
    );
});

watchOnce(
    paymentStatus,
    async value => {
        if (!value) return;

        const hasItemWithStatusCreated = value.items.some(
            (item: Transaction) => item.status === 'created'
        );

        if (hasItemWithStatusCreated) {
            try {
                // await cancelPayment(query.value.order_id);
                execute();
            } catch (e) {
                const err = e as PaymentStatusError;
                console.log(err.message);
                // message.danger(err.message);
            }
        }

        // redirect if the order can't be paid
        if (!paymentIsAvailable.value) {
            router.push({
                name: 'account-orders-id',
                params: { id: query.value.order_id },
                query: { status: 'success' },
            });
        }
    },
    { immediate: true }
);
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pendingOrder || pendingStatus" color="primary" />
        <Grid gap="5" v-else-if="order">
            <Alert
                v-if="query.status === 'fail' && transactionStatus.status === 'failed'"
                variant="error"
                title="Оплата не прошла"
                text="Попробуйте еще раз"
            />
            <Alert
                v-if="query.status === 'success' && transactionStatus.status === 'ok'"
                variant="success"
                title="Успешно!"
                text="Оплата прошла успешно"
            />
            <Typography variant="h1" as="h1">Дополнительные услуги и оплата</Typography>
            <Selected v-bind="order" />
            <PaymentContainer
                :total-price="order.general.total_price"
                :paid-amount="paidAmount"
                :payment-options="order.general.payment_options"
                :payment-status="order.payment_status"
                :btn-disabled="!order"
            />
        </Grid>
    </Page>
</template>
