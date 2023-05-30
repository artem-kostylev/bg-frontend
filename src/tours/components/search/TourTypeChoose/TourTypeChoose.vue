<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Tabs } from '@ui/components';
import { useName } from '@/app/composables';
import { useRoute } from 'nuxt/app';

const router = useRouter();
const route = useRoute();
const name = useName<string>();

const tabs = [
    { value: 'tours-search', label: 'Стандартные' },
    { value: 'tours-multi-search', label: 'Комбинированные' },
    { value: 'tours-activity-search', label: 'Экскурсионные' },
];

const onChoose = (value: string | number) => {
    const { params, query } = route;

    router.push({ name: value.toString(), params, query });
};
</script>

<template>
    <Tabs :model-value="name" @update:model-value="onChoose" :tabs="tabs" />
</template>
