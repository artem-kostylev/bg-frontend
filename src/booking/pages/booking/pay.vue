<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { useQuery } from '@/app/composables';
import { Page } from '@/app/components';
import type { FetchOrderDetailQuery } from '@/booking/services';
import { fetchOrderDetail } from '@/booking/services';
import { Selected, PaymentContainer } from '@/booking/components';
import { Grid, Spin, Typography } from '@ui/components';

const query = useQuery<FetchOrderDetailQuery>();

const { data, pending } = useLazyAsyncData('booking-order-detail', () =>
    fetchOrderDetail(query.value.order_id)
);

const meta = {
    title: 'Дополнительные услуги и оплата',
    description: 'Описание страницы дополнительные услуги и оплата',
};
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <Grid gap="5" v-else-if="data">
            <Typography variant="h1" as="h1">Дополнительные услуги и оплата</Typography>
            <Selected v-bind="data" />
            <PaymentContainer
                :payment-options="data.general.payment_options"
                :payment-status="data.payment_status"
            />
        </Grid>
    </Page>
</template>
