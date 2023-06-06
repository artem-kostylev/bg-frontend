<script setup lang="ts">
import { QuantityPicker, Typography, Select, DatePicker, Button, Spin } from '@ui/components';
import { formatCurrency } from '@/app/lib';
import type { ActivityDetail } from '@/booking/types';
import { fetchActivitySearch } from '@/booking/services';
import { useLazyAsyncData } from '#imports';

type Props = {
    activity: ActivityDetail;
};

const props = defineProps<Props>();

const { pending } = useLazyAsyncData(
    'activity-search',
    () => fetchActivitySearch({ id: props.activity.id }),
    { server: false }
);
</script>

<template>
    <div class="space-y-5">
        <Typography variant="h3">Заказ экскурсии</Typography>
        <Spin v-if="pending" color="primary" />
        <template v-else>
            <div class="flex flex-wrap -mx-1.5">
                <div class="px-1.5">
                    <DatePicker :model-value="'2022-05-23'" :format="'DD.MM.YYYY'" />
                </div>
                <div class="px-1.5">
                    <Select :model-value="1" :options="[{ label: '6:00', value: 1 }]" />
                </div>
                <div class="px-1.5">
                    <Select
                        :model-value="1"
                        :options="[{ label: 'Английский - Брощюра', value: 1 }]"
                    />
                </div>
            </div>
            <div class="space-y-2.5 bg-secondary-100 p-5 rounded-xl">
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
