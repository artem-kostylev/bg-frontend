<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Container, Tabs } from '@ui/components';
import { useName } from '@/app/composables';
import { PalmIcon, BuildingsIcon, AirplaneIcon, PyramidIcon, BoatIcon, TrainIcon } from '@ui/icons';
import { Content } from './components';

const tabs = [
    { value: 'index', label: 'Туры', startIcon: PalmIcon },
    { value: 'hotels', label: 'Отели', startIcon: BuildingsIcon },
    { value: 'avia', label: 'Авиабилеты', startIcon: AirplaneIcon },
    { value: 'train', label: 'Ж/Д Билеты', startIcon: TrainIcon },
    { value: 'cruises', label: 'Круизы', startIcon: BoatIcon },
    { value: 'tours-activity', label: 'Экскурсии', startIcon: PyramidIcon },
];

const name = useName<string>();
const router = useRouter();

const currentTab = computed(() => {
    if (name.value.startsWith('tours')) return 'index';
    if (name.value.startsWith('hotels')) return 'hotels';
    if (name.value.startsWith('avia')) return 'avia';
    if (name.value.startsWith('train')) return 'train';
    if (name.value.startsWith('cruises')) return 'cruises';

    return 'index';
});

const onUpdate = (value: string | number) => {
    router.push({ name: value.toString() });
};
</script>

<template>
    <Container class="w-full mt-2 lg:mt-5">
        <Tabs
            :model-value="currentTab"
            @update:model-value="onUpdate"
            :tabs="tabs"
            class="mb-2.5"
        />
        <div class="bg-gradient-to-r from-primary-50/25 to-danger-50 p-1.5 rounded-2xl">
            <Content />
        </div>
    </Container>
</template>
