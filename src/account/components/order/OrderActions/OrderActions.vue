<script setup lang="ts">
import type { OrderDetailGeneral } from '@/booking/types';
import { CancellationContainer, Support } from './components';

type Props = {
    general: OrderDetailGeneral;
};

defineProps<Props>();
</script>

<template>
    <div class="flex flex-col gap-3 w-full mt-5 sm:mt-0 sm:ml-3 sm:w-max">
        <div v-if="general.order_can_been_annulled" class="mt-auto flex justify-end">
            <CancellationContainer :order-id="general.order_id" />
        </div>
        <div class="mt-auto flex justify-end">
            <Support :support-id="general.support_id" :order-number="general.order_number" />
        </div>
    </div>
</template>
