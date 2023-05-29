<script setup lang="ts">
import { Typography } from '@ui/components';
import type { HotelFood } from '@/tours/types';

type Props = {
    food?: HotelFood;
};

defineProps<Props>();
</script>

<template>
    <div v-if="food" class="space-y-5">
        <div>
            <Typography variant="h5" class="mb-1">Тип питания</Typography>
            <ul class="list-inside list-decimal">
                <li v-for="(type, index) in food.boarding_type" :key="`type-${index}`">
                    {{ type }}
                </li>
            </ul>
        </div>
        <div>
            <Typography variant="h5" class="mb-1">Система питания</Typography>
            <div class="grid grid-cols-3 gap-5">
                <div v-for="(item, index) in food.board" :key="index">
                    <Typography class="mb-1">{{ item.name }}:</Typography>
                    <div>
                        <ul class="list-disc list-inside marker:text-secondary-400">
                            <li>Время: {{ item.time.join(' - ') }}</li>
                            <li>{{ item.type }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <Typography variant="h5" class="mb-1">Рестораны / Бары</Typography>
            <div class="whitespace-pre-wrap">{{ food.restaurants_and_bars }}</div>
        </div>
    </div>
</template>
