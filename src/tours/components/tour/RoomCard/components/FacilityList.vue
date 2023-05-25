<script setup lang="ts">
import type { Component } from 'vue';
import type { Facility } from '@/tours/types';
import { IconFilled } from '@ui/components';
import {
    AirConditioningIcon,
    BalconyIcon,
    FreeWifiIcon,
    TerraceIcon,
    KitchenIcon,
} from '@ui/icons';

type Props = {
    facilities: Facility[];
};

defineProps<Props>();

const icons: Record<string, Component> = {
    air_conditioning: AirConditioningIcon,
    balcony: BalconyIcon,
    free_wifi: FreeWifiIcon,
    terrace: TerraceIcon,
    kitchen: KitchenIcon,
};
</script>

<template>
    <div class="flex flex-wrap -mx-2.5 -mb-2.5">
        <div v-for="facility in facilities" :key="facility.key" class="px-2.5 mb-2.5">
            <IconFilled :icon="icons[facility.key]" :label="facility.label" />
        </div>
    </div>
</template>
