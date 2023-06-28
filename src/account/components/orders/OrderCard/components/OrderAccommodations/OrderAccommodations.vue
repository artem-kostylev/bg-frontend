<script setup lang="ts">
import type { OrderDetailGeneral, Accommodation } from '@/booking/types';
import { OrderAccommodation } from '../';

type Props = {
    general: OrderDetailGeneral;
    accommodations: Accommodation[];
    currentTab: 'active' | 'past';
};

defineProps<Props>();
</script>

<template>
    <div v-for="(accommodation, accommodationIndex) in accommodations" :key="accommodation.id">
        <OrderAccommodation
            :general="general"
            :accommodation="accommodation"
            :accommodation-index="accommodationIndex"
            :accommodations-length="accommodations.length"
            :current-tab="currentTab"
        />
    </div>
</template>
