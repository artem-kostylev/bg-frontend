<script setup lang="ts">
import { resolveComponent } from 'vue';
import { Card, Grid, Button } from '@ui/components';
import { SmallArrowIcon } from '@ui/icons';
import type { FetchOrderDetailResponse } from '@/booking/services';
import {
    OrderGeneral,
    OrderMovements,
    OrderAccommodations,
    OrderTransfers,
    OrderInsurance,
    OrderActivity,
} from './components';
import { OrderActions } from '@/account/components';

type Props = {
    order: FetchOrderDetailResponse;
    currentTab: 'active' | 'past';
};

defineProps<Props>();

const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
    <Card>
        <Grid gap="4">
            <OrderGeneral :general="order.general" />
            <OrderMovements :movements="order.movements" />
            <OrderAccommodations
                :general="order.general"
                :accommodations="order.accommodations"
                :current-tab="currentTab"
            />
            <OrderTransfers :transfers="order.transfers" />
            <OrderInsurance :insurances="order.insurances" />
            <OrderActivity :activities="order.activities" />
            <div>
                <Button
                    :as="NuxtLink"
                    :to="{
                        name: 'account-orders-id',
                        params: { id: order.general.order_id },
                        query: $route.query,
                    }"
                    variant="ghost"
                    :end-icon="SmallArrowIcon"
                    icon-class="w-3 transform -rotate-90"
                >
                    Подробнее
                </Button>
            </div>
            <OrderActions :general="order.general" />
        </Grid>
    </Card>
</template>
