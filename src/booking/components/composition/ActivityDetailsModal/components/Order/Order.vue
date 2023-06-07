<script setup lang="ts">
import { ref } from 'vue';
import { useLazyAsyncData } from '#imports';
import { QuantityPicker, Typography, Button, Spin } from '@ui/components';
import { formatCurrency } from '@/app/lib';
import type { ActivityDetail } from '@/booking/types';
import { fetchActivitySearch } from '@/booking/services';
import { OrderFitlers } from './components';

type Props = {
    activity: ActivityDetail;
    dates: string[];
};

const props = defineProps<Props>();

const filters = ref({
    time: '',
    date: '',
    option: '',
});

const { data, pending } = useLazyAsyncData(
    'activity-search',
    () => fetchActivitySearch({ id: props.activity.id, dates: props.dates }),
    { server: false }
);
</script>

<template>
    <div class="space-y-5">
        <Typography variant="h3">Заказ экскурсии</Typography>
        <Spin v-if="pending" color="primary" />
        <template v-else>
            <OrderFitlers v-model="filters" />
            <div class="space-y-2.5 bg-secondary-100 p-5 rounded-xl">
                {{ filters }}
                {{ data }}
                <div class="flex items-center justify-between space-x-5">
                    <div>
                        <Typography>Взрослый (от 12 до 99)</Typography>
                        <Typography variant="h5">{{ formatCurrency(1700) }}</Typography>
                    </div>
                    <QuantityPicker />
                </div>
                <div class="flex items-center justify-between space-x-5">
                    <div>
                        <Typography>Ребенок (от 4 до 11)</Typography>
                        <Typography variant="h5">{{ formatCurrency(1700) }}</Typography>
                    </div>
                    <QuantityPicker />
                </div>
            </div>
            <Button variant="primary" block>Добавить</Button>
        </template>
    </div>
</template>
