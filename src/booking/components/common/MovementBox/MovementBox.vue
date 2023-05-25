<script setup lang="ts">
import { computed } from 'vue';
import type { Movement } from '@/booking/types';
import { Card, Tooltip } from '@ui/components';
import { SuitcaseIcon, CarrionIcon } from '@ui/icons';
import DetailsModal from './components/DetailsModal.vue';
import Title from './components/Title.vue';
import StopsHorizontal from './components/StopsHorizontal.vue';

const STATUSES = { regular: 'Регулярный', charter: 'Чартерный', virtual: 'Виртуальный' };

type Props = {
    movement: Movement;
};

const props = defineProps<Props>();

const isVirtual = computed(() => {
    return props.movement.is_regular === 'virtual';
});
</script>

<template>
    <Card>
        <template #header>
            <div class="flex items-start justify-between">
                <Title :transport-company="movement.transport_company" :is-virtual="isVirtual" />
                <DetailsModal v-if="!isVirtual" :movement="movement" />
            </div>
            <div
                v-if="movement.priority_status"
                class="absolute right-0 top-0 text-sm bg-warning-100 text-warning-800 rounded-xl rounded-tl-none rounded-br-none py-1 px-2"
            >
                Рекомендуем
            </div>
        </template>
        <div class="space-y-5">
            <p v-if="isVirtual">Время вылета, рейс и аэропорт появятся за 1-5 дней до вылета</p>
            <div v-else class="flex items-start justify-between">
                <ul class="list-disc list-inside marker:text-secondary-400">
                    <li>{{ STATUSES[movement.is_regular] }}</li>
                    <li>{{ movement.fare.name }}</li>
                    <li>{{ movement.stops.length ? 'С пересадками' : 'Прямой' }}</li>
                </ul>
                <div class="flex items-end space-x-1.5">
                    <template v-if="movement.fare.carryon.key === 'is_free'">
                        <Tooltip
                            v-for="(weight, index) in movement.fare.carryon.weights"
                            :key="`carryon-${index}`"
                            :text="`Ручная кладь - ${weight} кг`"
                        >
                            <template #trigger="{ vbind }">
                                <CarrionIcon
                                    v-bind="vbind"
                                    :text="weight"
                                    class="text-secondary-500"
                                />
                            </template>
                        </Tooltip>
                    </template>
                    <template v-if="movement.fare.baggage.key === 'is_free'">
                        <Tooltip
                            v-for="(weight, index) in movement.fare.baggage.weights"
                            :key="`suitcase-${index}`"
                            :text="`Чемодан - ${weight} кг`"
                        >
                            <template #trigger="{ vbind }">
                                <SuitcaseIcon
                                    v-bind="vbind"
                                    :text="weight"
                                    class="text-secondary-500"
                                />
                            </template>
                        </Tooltip>
                    </template>
                </div>
            </div>
            <StopsHorizontal :movement="movement" />
        </div>
        <template v-if="$slots.footer" #footer>
            <slot name="footer" />
        </template>
    </Card>
</template>
