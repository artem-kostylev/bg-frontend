<script setup lang="ts">
import { ref, watch } from 'vue';
import { computed, nextTick, onMounted, useLazyAsyncData, useRoute } from '#imports';
import { Button, Field, Spin } from '@ui/components';
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

const inputRef = ref<HTMLInputElement>();

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

        if (selectedOrder.value) {
            form.value.orderId = selectedOrder.value;

            nextTick(() => {
                inputRef.value?.focus();
            });
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
        order_id: Number(form.value.orderId.order_id),
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
    <div>
        <div v-if="showOrderNumber && pending" class="flex items-center justify-center py-10">
            <Spin width="2.4em" height="2.4em" class="text-primary-500" />
        </div>
        <div v-else>
            <div>Номер заказа, по которому будет обращение</div>
            <div class="mt-2 w-full sm:w-[300px]">
                <OrderPicker
                    v-model="v$.orderId.$model"
                    v-model:search="search"
                    :items="orders"
                    label-key="label"
                    value-key="order_id"
                    :loading="!orders.length && pending"
                    :loading-search="!!orders.length && pending"
                    :status="v$.orderId.$errors[0] && 'error'"
                    :hint="v$.orderId.$errors[0]?.$message"
                />
            </div>
            <div class="mt-6">
                <label for="text">Текст обращения</label>
                <div class="mt-2">
                    <Field
                        :hint="v$.text.$errors[0]?.$message"
                        :status="v$.text.$errors[0] ? 'error' : undefined"
                    >
                        <textarea
                            ref="inputRef"
                            v-model="v$.text.$model"
                            id="text"
                            name="text"
                            :class="[
                                'focus:outline-none block w-full appearance-none transition-colors bg-white rounded-xl shadow-sm border border-secondary-300 hover:border-secondary-400 placeholder-secondary-500 py-[.563em] px-[.875em] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:opacity-60 disabled:pointer-events-none',
                                'resize-none min-h-[144px]',
                            ]"
                        />
                    </Field>
                </div>
            </div>
            <Button variant="primary" :loading="sending" @click="onSubmit" class="mt-5 <sm:w-full"
                >Отправить</Button
            >
        </div>
    </div>
</template>
