import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { AllActivity } from '@/booking/types';

export const useCompositionStore = defineStore('composition', () => {
    const selectedAllActivities = ref<AllActivity[]>([]);
    const selectedTickets = ref<Record<string, Record<string, string | number>>>({});

    const selectAllActivities = (allActivities: AllActivity[]) => {
        selectedAllActivities.value = allActivities;
    };

    const addTickets = (id: number, items: Record<string, string | number>) => {
        selectedTickets.value[id] = items;
    };

    const removeTickets = (id: number) => {
        delete selectedTickets.value[id];
    };

    return {
        selectedAllActivities,
        selectedTickets,
        selectAllActivities,
        addTickets,
        removeTickets,
    };
});
