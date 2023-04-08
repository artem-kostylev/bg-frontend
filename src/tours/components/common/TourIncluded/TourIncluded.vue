<script setup lang="ts">
import { IconFilled } from "@ui/components";
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
        <IconFilled v-if="flight_included" :icon="AirplaneIcon" variant="primary" />
        <IconFilled :icon="BuildingsIcon" variant="primary" />
        <IconFilled v-if="transfer_included" :icon="BusIcon" variant="primary" />
        <IconFilled v-if="insurance_included" :icon="ShildIcon" variant="primary" />
        <IconFilled v-if="excursion_included" :icon="MountainIcon" variant="primary" />
        <IconFilled v-if="instant_booking" :icon="LightingIcon" variant="warning" />
    </div>
</template>
