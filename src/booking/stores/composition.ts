import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Activity } from '@/booking/types';

export const useCompositionStore = defineStore('composition', () => {
    const selectedAllActivities = ref<Activity[]>([]);

    const selectAllActivities = (allActivities: Activity[]) => {
        selectedAllActivities.value = allActivities;
    };

    return { selectedAllActivities, selectAllActivities };
});
