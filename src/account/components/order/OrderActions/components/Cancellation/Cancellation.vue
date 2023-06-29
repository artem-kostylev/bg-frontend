<script setup lang="ts">
import { ref } from 'vue';
import { useLazyAsyncData, refreshNuxtData } from '#imports';
import { Button, Alert, Spin } from '@ui/components';
import { CrossInCircleIcon } from '@ui/icons';
import { formatCurrency } from '@/app/lib';
import { fetchOverhead, fetchOrderRefund } from '@/account/services';
import type { SubmitError } from '@/app/types';

type Props = {
    orderId: number;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const { data, pending } = useLazyAsyncData('get-overhead', () => fetchOverhead(props.orderId), {
    server: false,
});

const error = ref<string | null>(null);

const createRefund = async () => {
    if (!data.value) return;

    try {
        pending.value = true;
        error.value = null;

        await fetchOrderRefund({
            orderId: props.orderId,
            amount: data.value.money_returned,
        });

        emit('close');
        refreshNuxtData('order-detail');
    } catch (e) {
        const err = e as SubmitError;
        error.value = err.data.message ? err.data.message : 'Ошибка при аннулировании заказа';
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <div>
        <Alert v-if="error" variant="error" :text="error" class="mb-8" />
        <div v-if="pending" class="flex items-center justify-center">
            <Spin width="2.4em" height="2.4em" color="primary" />
        </div>
        <div v-else-if="data" class="w-full h-full flex flex-col items-center justify-center">
            <CrossInCircleIcon class="text-danger-600 w-13 h-13" />
            <div class="mt-7">
                <span
                    >Вам вернется
                    <span class="font-bold">{{ formatCurrency(data.money_returned, true) }}</span
                    >.
                </span>
                <span v-if="data.actual_cost"
                    >Остаток
                    <span class="font-bold">{{ formatCurrency(data.actual_cost, true) }}</span>
                    будет удержан в качестве штрафа.</span
                >
            </div>
            <div class="mt-8 flex gap-3">
                <Button variant="secondary" @click="emit('close')"> Оставить заказ </Button>
                <Button variant="primary" @click="createRefund"> Аннулировать заказ </Button>
            </div>
        </div>
        <div v-else>
            <Alert variant="error" text="Ошибка при аннулировании заказа" />
        </div>
    </div>
</template>
