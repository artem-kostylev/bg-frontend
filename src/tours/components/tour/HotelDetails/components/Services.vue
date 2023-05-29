<script setup lang="ts">
import type { HotelServices } from '@/tours/types';
import { Typography } from '@ui/components';

type Props = {
    services?: HotelServices;
};

defineProps<Props>();
</script>

<template>
    <div v-if="services" class="md:columns-2 lg:columns-3 -mb-5">
        <div
            class="break-inside-avoid-column pb-5"
            v-for="(child, index) in services.children"
            :key="index"
        >
            <div class="flex items-center space-x-2.5 mb-1">
                <Typography variant="h5">{{ child.name }}</Typography>
            </div>
            <div>
                <ul class="list-disc list-inside marker:text-secondary-400">
                    <li v-for="(value, idx) in child.values" :key="`value-${idx}`">
                        {{ value }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
