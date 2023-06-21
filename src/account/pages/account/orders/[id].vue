<script setup lang="ts">
import { computed } from 'vue';
import { definePageMeta, useHead, useLazyAsyncData } from '#imports';
import { useParams, useQuery } from '@/app/composables';
import { Page } from '@/app/components';
import { fetchOrderDetail, fetchPaymentStatus } from '@/booking/services';
import { Selected } from '@/booking/components';
import { Memo } from '@/account/components';
import { Grid, Spin, Typography, Alert } from '@ui/components';
import { OrderContainer } from '@/account/components';

definePageMeta({
    middleware: 'auth',
});

const params = useParams<{ id: number }>();
const query = useQuery<{ status?: 'success' | 'fail' }>();

const { data: order, pending: pendingOrder } = useLazyAsyncData('order-detail', () =>
    fetchOrderDetail(params.value.id)
);

const { data: paymentStatus } = useLazyAsyncData('pay-status', () =>
    fetchPaymentStatus(params.value.id)
);

useHead({
    title: () => order.value && `Заказ №${order.value.general.order_number}`,
});

const meta = {
    description: 'Описание страницы Мои поездки',
};

const successMessage = computed(() => {
    //${user.value?.email}
    return `Договор и информация по туру направлена на вашу почту — . Со всей информацией по предстоящему туру можно ознакомиться в разделе Мои поездки в Личном кабинете.`;
});
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pendingOrder" color="primary" />
        <Grid gap="5" v-else-if="order && paymentStatus">
            <Alert
                v-if="query.status === 'success'"
                variant="success"
                title="Оплата прошла успешно"
                :text="successMessage"
            />
            <OrderContainer :order="order" :payment-status="paymentStatus" />
            <Selected v-bind="order" default-open />
            <Typography variant="h3"> Памятка путешественника </Typography>
            <Memo />
        </Grid>
    </Page>
</template>
