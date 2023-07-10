<script setup lang="ts">
import { IconFilled, Tooltip } from '@ui/components';
import {
    AirplaneIcon,
    BuildingsIcon,
    BusIcon,
    ShieldIcon,
    PyramidIcon,
    LightingIcon,
} from '@ui/icons';
import type { TourIncluded } from '@/tours/types';

type Props = TourIncluded;

defineProps<Props>();
</script>

<template>
    <div class="flex space-x-3">
        <Tooltip v-if="flight_included" text="Перелет включен">
            <template #trigger="{ vbind }">
                <IconFilled v-bind="vbind" :icon="AirplaneIcon" variant="primary" />
            </template>
        </Tooltip>
        <Tooltip v-if="accommodation_included" text="Проживание включено">
            <template #trigger="{ vbind }">
                <IconFilled v-bind="vbind" :icon="BuildingsIcon" variant="primary" />
            </template>
        </Tooltip>
        <Tooltip v-if="transfer_included" text="Транспорт включен">
            <template #trigger="{ vbind }">
                <IconFilled v-bind="vbind" :icon="BusIcon" variant="primary" />
            </template>
        </Tooltip>
        <Tooltip v-if="insurance_included" text="Страховка включена">
            <template #trigger="{ vbind }">
                <IconFilled v-bind="vbind" :icon="ShieldIcon" variant="primary" />
            </template>
        </Tooltip>
        <Tooltip v-if="excursion_included" text="Экскурсия включена">
            <template #trigger="{ vbind }">
                <IconFilled v-bind="vbind" :icon="PyramidIcon" variant="primary" />
            </template>
        </Tooltip>
        <Tooltip v-if="instant_booking" text="Мгновенное бронирование">
            <template #trigger="{ vbind }">
                <IconFilled v-bind="vbind" :icon="LightingIcon" variant="warning" />
            </template>
        </Tooltip>
    </div>
</template>
