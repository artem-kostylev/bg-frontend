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
    <div class="flex flex-col">
        <div
            v-for="(appeal, index) in appeals"
            :key="appeal.id"
            class="flex flex-col w-full hover:bg-slate-100 pt-3"
        >
            <NuxtLink
                :to="{
                    name: 'account-support-id',
                    params: { id: appeal.id },
                    query: $route.query,
                }"
                class="flex w-full gap-5"
            >
                <div class="w-1/2 font-bold text-slate-600/60">
                    <div class="py-3">№ Обращения</div>
                    <div class="py-3">Дата обращения</div>
                    <div class="py-3">№ Заказа</div>
                    <div class="py-3">Статус обращения</div>
                </div>
                <div class="w-1/2">
                    <div class="grid grid-row-4 w-full">
                        <div class="py-3">
                            <div class="font-bold text-blue-700 hover:text-blue-600">
                                {{ appeal.id }}
                            </div>
                        </div>
                        <div class="py-3">
                            {{ formatDate(appeal.created_at, 'DD.MM.YYYY') }}
                        </div>
                        <div class="py-3">
                            {{ appeal.order_number }}
                        </div>
                        <div class="py-3">
                            <div
                                :class="[
                                    'py-1 px-2 rounded-[5px] w-max',
                                    appeal.status === 0 && 'bg-slate-600/10 text-slate-700',
                                    appeal.status === 1 && 'bg-green-600/20 text-green-700',
                                ]"
                            >
                                <span class="flex flex-wrap"> {{ STATUSES[appeal.status] }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </NuxtLink>
            <div
                v-if="index + 1 < appeals.length"
                class="mt-3 h-[1px] w-full border-1 border-dashed border-slate-300"
            ></div>
        </div>
    </div>
</template>
