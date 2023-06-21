<script setup lang="ts">
// import { ref } from 'vue';
// import { Button } from '@ui/components';
// import { CrossInCircleIcon } from '@ui/icons';
import type { OrderDetailGeneral } from '@/booking/types';

type Props = {
    general: OrderDetailGeneral;
};

defineProps<Props>();

// const showCancellation = ref(false);
</script>

<template>
    <div></div>
    <!-- <div class="flex flex-col gap-3 w-full sm:mt-0 sm:ml-3 sm:w-max sm:flex">
        <div v-if="general.order_can_been_annulled" class="mt-auto flex justify-end">
            <Button
                :start-icon="CrossInCircleIcon"
                variant="secondary"
                icon-class="w-5 h-5"
                class="w-full sm:w-max"
                @click="showCancellation = true"
            >
                Аннулировать заказ
            </Button>
        </div>
        <SupportButton
            :support-id="general.support_id"
            :order-number="general?.order_number"
            class="w-full sm:w-max"
        />
    </div> -->
</template>
