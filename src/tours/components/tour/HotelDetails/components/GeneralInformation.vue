<script setup lang="ts">
import { Divider } from '@ui/components';
import type { HotelGeneral } from '@/tours/types';

type Props = {
    general?: HotelGeneral;
};

defineProps<Props>();
</script>

<template>
    <div class="space-y-5" v-if="general">
        <div class="space-y-1.5">
            <div v-for="(child, index) in general.children" :key="index">
                <span class="font-semibold">{{ child.name }} </span>: {{ child.value }}
            </div>
        </div>
        <template v-if="general.description">
            <Divider dashed />
            <div v-html="general.description"></div>
        </template>
    </div>
</template>
