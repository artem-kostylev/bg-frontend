<script setup lang="ts">
import { formatDate } from '@/app/lib';

type Props = {
    appeals: {
        id: number;
        created_at: string;
        order_id: number;
        order_number: number;
        status: number;
    }[];
};

defineProps<Props>();

const STATUSES: Record<string, string> = {
    0: 'Ответ готовится',
    1: 'Ответ готов',
};
</script>

<template>
    <div>
        <div
            class="grid grid-cols-4 items-center w-full border-b border-secondary-200 font-bold text-secondary-600/60 text-center"
        >
            <div class="py-3">№ Обращения</div>
            <div class="py-3">Дата обращения</div>
            <div class="py-3">№ Заказа</div>
            <div class="py-3">Статус обращения</div>
        </div>
        <div v-for="appeal in appeals" :key="appeal.id">
            <NuxtLink
                :to="{
                    name: 'account-support-id',
                    params: { id: appeal.id },
                    query: $route.query,
                }"
            >
                <div class="grid grid-cols-4 items-center w-full hover:bg-primary-100/20">
                    <div class="py-3 font-bold text-center">
                        <div class="font-bold text-primary-500 hover:text-primary-600">
                            {{ appeal.id }}
                        </div>
                    </div>

                    <div class="py-3 text-center">
                        {{ formatDate(appeal.created_at, 'DD.MM.YYYY') }}
                    </div>
                    <div class="py-3 text-center">
                        {{ appeal.order_number }}
                    </div>

                    <div class="py-3 flex justify-center">
                        <div
                            :class="[
                                'py-1 px-2 rounded-[5px] w-max',
                                appeal.status === 0 && 'bg-secondary-600/10 text-secondary-700',
                                appeal.status === 1 && 'bg-success-600/20 text-success-700',
                            ]"
                        >
                            {{ STATUSES[appeal.status] }}
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
