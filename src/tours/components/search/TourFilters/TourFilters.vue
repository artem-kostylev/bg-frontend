<script setup lang="ts">
import { computed } from 'vue';
import { TourTypeChoose } from '@/tours/components';
import { useName } from '@/app/composables';
import { Button } from '@ui/components';
import { SlidersIcon, ChevronDownIcon } from '@ui/icons';

const name = useName<string>();

const canChooseTourType = computed(() => {
    return ['tours-search', 'tours-activity-search', 'tours-multi-search'].includes(name.value);
});
</script>

<template>
    <div>
        <div class="flex flex-wrap items-center -mx-2.5 -mb-5">
            <div class="px-2.5 flex-1 mb-5">
                <TourTypeChoose v-if="canChooseTourType" />
            </div>
            <div class="px-2.5 flex items-center space-x-2.5 mb-5">
                <Button :end-icon="SlidersIcon">Фильтры</Button>
                <Button :end-icon="ChevronDownIcon">Сначала дешевле</Button>
            </div>
        </div>
    </div>
</template>
