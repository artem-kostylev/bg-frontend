<script setup lang="ts">
import { computed } from 'vue';
import { TourTypeChoose } from '@/tours/components';
import { useName } from '@/app/composables';
import { Button, Select } from '@ui/components';
import { SlidersIcon } from '@ui/icons';

type Props = {
    modelValue: string;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const name = useName<string>();

const sortOptions = [
    { label: 'Сначала дешевле', value: 'tour.price:asc' },
    { label: 'Сначала дороже', value: 'tour.price:desc' },
    { label: 'Звезды по возрастанию', value: 'accommodation.stars:asc' },
    { label: 'Звезды по убыванию', value: 'accommodation.stars:desc' },
];

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const canChooseTourType = computed(() => {
    return ['tours-search', 'tours-activity-search', 'tours-multi-search'].includes(name.value);
});
</script>

<template>
    <div class="mt-5">
        <div class="flex flex-wrap items-center -mx-2.5 -mb-5 -mt-2">
            <div v-if="canChooseTourType" class="px-2.5 flex-1 mb-5">
                <TourTypeChoose />
            </div>
            <div
                :class="[
                    'px-2.5 flex items-center justify-between space-x-2.5 mb-5',
                    canChooseTourType ? 'md:justify-end flex-1 md:flex-none' : ' flex-1',
                ]"
            >
                <Button :end-icon="SlidersIcon">Фильтры</Button>
                <Select v-model="value" :options="sortOptions" />
            </div>
        </div>
    </div>
</template>
