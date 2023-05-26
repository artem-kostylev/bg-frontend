<script setup lang="ts">
import { ref } from 'vue';
import type { Hotel } from '@/tours/types';
import { DetailsHeader } from '@/app/components';
import { Card, Tabs } from '@ui/components';
import { GeneralInformation, Infrastructure, Food, Services, Contacts } from './components';

type Props = {
    hotel: Hotel;
};

defineProps<Props>();

const components = {
    general: GeneralInformation,
    infrastructure: Infrastructure,
    food: Food,
    services: Services,
    contacts: Contacts,
};

const currentTab = ref<keyof typeof components>('general');

const tabs = [
    { label: 'Общая информация', value: 'general' },
    { label: 'Инфраструктура', value: 'infrastructure' },
    { label: 'Питание', value: 'food' },
    { label: 'Услуги', value: 'services' },
    { label: 'Контакты', value: 'contacts' },
];
</script>

<template>
    <div>
        <DetailsHeader :entity="hotel" class="mb-8" />
        <Card header-class="!pt-0">
            <template #header>
                <Tabs :tabs="tabs" v-model="currentTab" />
            </template>
            <component :is="components[currentTab]" :[currentTab]="hotel[currentTab]" />
        </Card>
    </div>
</template>
