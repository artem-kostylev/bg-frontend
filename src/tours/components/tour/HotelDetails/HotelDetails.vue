<script setup lang="ts">
import { ref } from "vue";
import type { Hotel } from "@/tours/types";
import { DetailsHeader } from "@/app/components";
import { Card, Tabs } from "@ui/components";

type Props = {
    hotel: Hotel;
};

defineProps<Props>();

const currentTab = ref(1);

const tabs = [
    { label: "Общая информация", value: 1 },
    { label: "Инфраструктура", value: 2 },
    { label: "Питание", value: 3 },
    { label: "Услуги", value: 4 },
    { label: "Контакты", value: 5 },
];
</script>

<template>
    <div>
        <DetailsHeader :entity="hotel" class="mb-8" />
        <Card header-class="!pt-0">
            <template #header>
                <Tabs :tabs="tabs" v-model="currentTab" />
            </template>
            <div class="prose max-w-none" v-html="hotel.general?.description" />
        </Card>
    </div>
</template>
