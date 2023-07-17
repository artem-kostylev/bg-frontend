<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { TourTypeChoose } from '@/tours/components';
import { useName } from '@/app/composables';
import { Select } from '@ui/components';
import { useNuxtData } from '#imports';
import type { FetchToursResponse } from '@/tours/services';

const { data } = useNuxtData<FetchToursResponse>('tours');

const AdvancedFilters = defineAsyncComponent(() =>
    import('@/tours/components').then(meta => meta.AdvancedFilters)
);

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

const canShowTourType = computed(() => {
    return ['tours-search', 'tours-activity-search', 'tours-multi-search'].includes(name.value);
});

const canShowAdvancedFilters = computed(() => {
    return ['tours-search', 'hotels-search'].includes(name.value);
});
</script>

<template>
    <div class="flex flex-wrap items-center -mx-2.5 -mb-5 -mt-2">
        <div v-if="canShowTourType" class="px-2.5 flex-1 mb-5">
            <TourTypeChoose />
        </div>
        <div
            v-if="data?.tours.length"
            :class="[
                'px-2.5 flex items-center justify-between space-x-2.5 mb-5',
                canShowTourType ? 'md:justify-end flex-1 md:flex-none' : ' flex-1',
            ]"
        >
            <AdvancedFilters v-if="canShowAdvancedFilters" />
            <Select v-model="value" :options="sortOptions" />
        </div>
    </div>
</template>
