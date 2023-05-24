<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Container, Tabs } from '@ui/components';
import { useName } from '@/app/composables';
import { PalmIcon, BuildingsIcon, AirplaneIcon } from '@ui/icons';

const tabs = [
    { value: 'index', label: 'Туры', startIcon: PalmIcon },
    { value: 'hotels', label: 'Отели', startIcon: BuildingsIcon },
    { value: 'avia', label: 'Авиабилеты', startIcon: AirplaneIcon },
];

const name = useName<string>();
const router = useRouter();

const currentTab = computed(() => {
    if (name.value.startsWith('tours')) return 'index';
    if (name.value.startsWith('hotels')) return 'hotels';
    if (name.value.startsWith('avia')) return 'avia';

    return 'index';
});

const onUpdate = (value: string | number) => {
    router.push({ name: value.toString() });
};
</script>

<template>
    <Container class="w-full pt-8">
        <Tabs :model-value="currentTab" @update:model-value="onUpdate" :tabs="tabs" />
    </Container>
</template>
