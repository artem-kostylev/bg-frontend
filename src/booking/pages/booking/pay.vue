<script setup lang="ts">
import { ref, computed } from 'vue';
import { definePageMeta, useLazyAsyncData } from '#imports';
import { useQuery } from '@/app/composables';
import { Page } from '@/app/components';
import { fetchOrderDetail, fetchPaymentStatus } from '@/booking/services';
import { Selected, PaymentContainer } from '@/booking/components';
import { Grid, Spin, Typography, Alert } from '@ui/components';
import type { PayQuery, Transaction } from '@/booking/types';

definePageMeta({
    middleware: 'auth',
});

const query = useQuery<PayQuery>();

const { data: order, pending: pendingOrder } = useLazyAsyncData('booking-order-detail', () =>
    fetchOrderDetail(query.value.order_id)
);

const { data: paymentStatus } = useLazyAsyncData('booking-pay-status', () =>
    fetchPaymentStatus(query.value.order_id)
);

const meta = {
    title: 'Дополнительные услуги и оплата',
    description: 'Описание страницы дополнительные услуги и оплата',
};

const ticket = ref<number | null>(null);

const transactionStatus = computed(() => {
    const { order_payment_id } = query.value;
    const { items } = paymentStatus.value || {};
    if (!items) return;

    return order_payment_id
        ? items.find((item: Transaction) => item.id === order_payment_id)
        : ticket.value
        ? items.find((item: Transaction) => item.ticket === ticket.value)
        : undefined;
});

const updateTicket = (newTicket: number) => {
    ticket.value = newTicket;
};
</script>

<template>
    <Page :meta="meta">
        <Spin class="flex-1" v-if="pendingOrder" color="primary" />
        <Grid gap="5" v-else-if="order && paymentStatus">
            <Alert
                v-if="query.status === 'fail' && transactionStatus?.status === 'failed'"
                variant="error"
                title="Оплата не прошла"
                text="Попробуйте еще раз"
            />
            <Alert
                v-if="query.status === 'success' && transactionStatus?.status === 'ok'"
                variant="success"
                title="Успешно!"
                text="Оплата прошла успешно"
            />
            <Typography variant="h1" as="h1">Дополнительные услуги и оплата</Typography>
            <Selected v-bind="order" default-open />
            <PaymentContainer
                :query="query"
                :payment-status="paymentStatus"
                :order="order"
                :ticket="ticket"
                @update-ticket="updateTicket"
            />
        </Grid>
    </Page>
</template>
