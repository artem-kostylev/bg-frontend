<script setup lang="ts">
import { IconFilled, Tooltip } from "@ui/components";
import {
    AirplaneIcon,
    BuildingsIcon,
    BusIcon,
    ShildIcon,
    MountainIcon,
    LightingIcon,
} from "@ui/icons";

type Props = {
    flight_included?: boolean;
    transfer_included?: boolean;
    insurance_included?: boolean;
    excursion_included?: boolean;
    instant_booking?: boolean;
};

defineProps<Props>();
</script>

<template>
    <div class="flex space-x-3">
        <Tooltip v-if="flight_included" text="Перелет включен">
            <template #trigger="{ vbind }">
                <IconFilled v-bind="vbind" :icon="AirplaneIcon" variant="primary" />
            </template>
        </Tooltip>
        <Tooltip text="Проживание включено">
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
                <IconFilled v-bind="vbind" :icon="ShildIcon" variant="primary" />
            </template>
        </Tooltip>
        <Tooltip v-if="excursion_included" text="Экскурсия включена">
            <template #trigger="{ vbind }">
                <IconFilled v-bind="vbind" :icon="MountainIcon" variant="primary" />
            </template>
        </Tooltip>
        <Tooltip v-if="instant_booking" text="Мгновенное бронирование">
            <template #trigger="{ vbind }">
                <IconFilled v-bind="vbind" :icon="LightingIcon" variant="warning" />
            </template>
        </Tooltip>
    </div>
</template>
