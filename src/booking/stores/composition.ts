import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { AllActivity } from '@/booking/types';

export const useCompositionStore = defineStore('composition', () => {
    const selectedAllActivities = ref<AllActivity[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedTickets = ref<any>({});

    const selectAllActivities = (allActivities: AllActivity[]) => {
        selectedAllActivities.value = allActivities;
    };

    const addTickets = (id: number, items: { id: number; values: Record<string, number> }) => {
        selectedTickets.value[id] = items;
    };

    return { selectedAllActivities, selectedTickets, selectAllActivities, addTickets };
});
