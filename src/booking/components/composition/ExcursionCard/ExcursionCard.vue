<script setup lang="ts">
import { Button } from '@ui/components';
import { formatNumber } from '@/app/lib/helpers';
import { useToursStore } from '@/tours/stores/tours';
import type { IncludedActivity } from '@/booking/types';

type Props = {
    activity: IncludedActivity;
    index: number;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'select', value: number): void;
}>();

const store = useToursStore();

const select = (activity: IncludedActivity) => {
    emit('select', props.index);

    store.selectedActivities = activity.all_activities;

    // unselect selected activities in another tour type
    store.selectedActivities.forEach(element => (element.selected = false));

    // empty selected tickets in another tour type
    store.selectedTickets.splice(0, store.selectedTickets.length);
};
</script>

<template>
    <div class="shadow-primary p-5 rounded-lg flex flex-col h-full">
        <div class="flex-1">
            <div class="flex items-center justify-center my-4">
                <div
                    v-for="(icon, i) in [...new Set(activity.icons)]"
                    :key="i"
                    class="flex items-center lm"
                >
                    <img :src="`/icons/composition/${icon}.svg`" loading="lazy" />
                </div>
            </div>
            <div>
                <div>{{ activity.tour_name }}</div>
            </div>
        </div>
        <div class="flex justify-end mt-4">
            <Button variant="primary" size="sm" @click="select(activity)"
                >{{ formatNumber(activity.price) }} ₽</Button
            >
        </div>
    </div>
</template>

<style>
.lm:after {
    content: '+';
    color: #000;
    font-size: 20px;
    font-weight: 500;
    padding: 0 0.5rem;
}

.lm:last-child:after {
    content: '';
    padding: 0;
}
</style>
