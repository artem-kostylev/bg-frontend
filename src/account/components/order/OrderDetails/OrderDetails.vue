<script setup lang="ts">
import type { OrderDetailGeneral } from '@/booking/types';
import { OrderInfo, OrderActions } from '@/account/components';

type Props = {
    general: OrderDetailGeneral;
    status: 'fully_paid' | 'partially_paid' | 'not_paid';
};

defineProps<Props>();
</script>

<template>
    <div class="flex mb-8 flex-col sm:flex-row sm:mb-10 sm:justify-between">
        <OrderInfo :general="general" :status="status" />
        <OrderActions :general="general" :align="true" />
    </div>
</template>
