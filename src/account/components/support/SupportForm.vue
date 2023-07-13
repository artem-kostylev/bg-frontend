<script setup lang="ts">
import { ref, watch } from 'vue';
import { computed, onMounted, useLazyAsyncData, useRoute } from '#imports';
import { Button, Card, Grid, Spin, Textarea } from '@ui/components';
import { getOrdersForSupport, addAppeal } from '@/account/services';
import { required } from '@/app/lib';
import { useVuelidate } from '@vuelidate/core';
import { useDebounceFn } from '@vueuse/core';
import OrderPicker from '../support/OrderPicker';
import type { SupportOrder } from '@/account/types';
import { formatDate } from '@/app/lib';

const search = ref('');

const route = useRoute();

const {
    data: orders,
    pending,
    refresh,
} = useLazyAsyncData('orders-for-support', () => getOrdersForSupport(search.value), {
    default: () => [],
});

const searchDebounce = useDebounceFn(() => {
    refresh();
}, 500);

const showOrderNumber = ref(false);

watch(search, (value, prevValue) => {
    showOrderNumber.value = false;

    if (value.length >= 1 || prevValue.length >= 1) {
        searchDebounce();
    }
});

const form = ref<{ orderId: SupportOrder | null; text: string }>({
    orderId: null,
    text: '',
});

const rules = {
    orderId: { required },
    text: { required },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const v$ = useVuelidate<any>(rules, form);

const selectedOrder = computed(() => {
    return orders.value?.find(
        (order: SupportOrder) => order.order_number === Number(route.query.order_number)
    );
});

const transformOrders = async () => {
    if (!orders.value?.length) return;

    if (route.query.order_number && showOrderNumber.value) {
        if (!selectedOrder.value) {
            const selectedNumber = await getOrdersForSupport(route.query.order_number.toString());
            orders.value = selectedNumber.concat(orders.value);
        }
    }

    orders.value.forEach(order => {
        order.label = order.order_number + ' от ' + formatDate(order.created_at, 'DD.MM.YYYY');
    });
};

watch(orders, async () => await transformOrders(), { immediate: true });

const emit = defineEmits<{
    (
        e: 'added',
        value: {
            appeal_id: number;
            appeal_created_at: number;
            order_id: number;
            order_number: number | null;
        }
    ): void;
    (e: 'error', value: string): void;
}>();

onMounted(() => {
    route.query.order_number && (showOrderNumber.value = true);
});

const sending = ref(false);

const onSubmit = async () => {
    if (sending.value) return;

    if (!(await v$.value.$validate())) return;
    if (!form.value.orderId) return;

    const body = {
        order_id: Number(form.value.orderId.order_id || form.value.orderId),
        text: form.value.text,
    };

    try {
        const response = await addAppeal(body);
        emit('added', {
            appeal_id: response.support_id,
            appeal_created_at: Date.now(),
            order_id: form.value.orderId?.order_id,
            order_number: form.value.orderId?.order_number,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.status === 422) {
            emit('error', err.data.message);
        } else {
            emit('error', 'Неизвестная ошибка');
        }
    } finally {
        sending.value = false;
    }
};
</script>

<template>
    <Card>
        <Spin v-if="showOrderNumber && pending" width="2.4em" height="2.4em" color="primary" />
        <Grid gap="2.5" v-else>
            <OrderPicker
                v-model="v$.orderId.$model"
                v-model:search="search"
                label="Номер заказа, по которому будет обращение"
                :options="orders"
                label-key="label"
                value-key="order_id"
                block
                :loading="!orders.length && pending"
                :loading-search="!!orders.length && pending"
                :error="v$.orderId.$errors[0]?.$message"
                class="sm:max-w-[400px]"
                required
            />
            <Textarea
                v-model="v$.text.$model"
                :rows="5"
                label="Текст обращения"
                :error="v$.text.$errors[0]?.$message"
                required
            />
            <div>
                <Button
                    variant="primary"
                    :loading="sending"
                    @click="onSubmit"
                    class="mt-2.5 w-full sm:w-max"
                    >Отправить</Button
                >
            </div>
        </Grid>
    </Card>
</template>
