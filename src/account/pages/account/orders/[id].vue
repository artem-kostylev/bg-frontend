<script setup lang="ts">
import { computed } from 'vue';
import { definePageMeta, useHead, useLazyAsyncData } from '#imports';
import { useParams, useQuery } from '@/app/composables';
import { Page } from '@/app/components';
import { fetchOrderDetail, fetchPaymentStatus } from '@/booking/services';
import { fetchOrderDocuments } from '@/account/services';
import { Selected } from '@/booking/components';
import { Memo, OrderContainer, OrderAlerts } from '@/account/components';
import { Grid, Spin, Typography } from '@ui/components';

definePageMeta({
    middleware: 'auth',
});

const params = useParams<{ id: number }>();
const query = useQuery<{ status?: 'success' | 'fail' }>();

const { data: order, pending: pendingOrder } = useLazyAsyncData('order-detail', () =>
    fetchOrderDetail(params.value.id)
);

const { data: paymentStatus, pending: pendingPaymentStatus } = useLazyAsyncData('pay-status', () =>
    fetchPaymentStatus(params.value.id)
);

const { pending: pendingOrderDocuments } = useLazyAsyncData('order-documents', () =>
    fetchOrderDocuments(params.value.id)
);

useHead({
    title: () => order.value && `Заказ №${order.value.general.order_number}`,
});

const meta = {
    description: 'Описание страницы Мои поездки',
};

const pending = computed(() => {
    return pendingOrder.value || pendingPaymentStatus.value || pendingOrderDocuments.value;
});
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <Grid gap="5" v-else-if="order && paymentStatus">
            <OrderAlerts :order="order" :status="query.status" />
            <OrderContainer :order="order" :payment-status="paymentStatus" />
            <Selected v-bind="order" default-open />
            <Typography variant="h3"> Памятка путешественника </Typography>
            <Memo />
        </Grid>
    </Page>
</template>
