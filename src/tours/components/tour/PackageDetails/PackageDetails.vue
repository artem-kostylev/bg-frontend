<script setup lang="ts">
import { DetailsHeader } from '@/app/components';
import { Card, Tabs } from '@ui/components';
import type { TourPackage } from '@/tours/types';

type Props = {
    package: TourPackage;
};

defineProps<Props>();
</script>

<template>
    <div>
        <DetailsHeader :entity="package" />
        <Card v-if="package.description" class="mt-6" header-class="!pt-0">
            <template #header>
                <Tabs :model-value="1" :tabs="[{ label: 'Описание', value: 1 }]" />
            </template>
            <div v-html="package.description" class="prose max-w-none" />
        </Card>
    </div>
</template>
