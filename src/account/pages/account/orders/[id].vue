<script setup lang="ts">
import { computed } from 'vue';
import { definePageMeta, useHead, useLazyAsyncData } from '#imports';
import { useParams, useQuery } from '@/app/composables';
import { Page } from '@/app/components';
import { fetchOrderDetail, fetchPaymentStatus } from '@/booking/services';
import { Selected } from '@/booking/components';
import { Memo } from '@/account/components';
import { Grid, Spin, Typography, Alert } from '@ui/components';
import { formatCurrency } from '@/app/lib';

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

const STATUSES = {
    not_paid: 'не оплачено',
    partially_paid: 'недоплачено',
    fully_paid: 'оплачено',
};
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

            <div>
                <div class="flex items-center flex-wrap">
                    <Typography as="h1" variant="h1"
                        >Заказ №{{ order.general.order_number }}&#160;</Typography
                    >
                    <div class="text-2xl tracking-tight">({{ order.general.order_status }})</div>
                </div>
                <div class="mt-4">
                    <div v-if="order.general.total_price" class="text-xl">
                        Стоимость тура –
                        <span class="font-bold">{{
                            formatCurrency(order.general.total_price, true)
                        }}</span>
                        (<span
                            :class="[
                                paymentStatus.status === 'fully_paid'
                                    ? 'text-success-500'
                                    : 'text-danger-500',
                            ]"
                        >
                            {{ STATUSES[paymentStatus.status] }}</span
                        >)
                    </div>
                </div>
            </div>

            <Selected v-bind="order" default-open />
            <div>
                <Typography variant="h3" class="mb-5"> Памятка путешественника </Typography>
                <Memo />
            </div>
        </Grid>
    </Page>
</template>
