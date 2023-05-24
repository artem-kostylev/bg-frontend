import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { AllActivity } from '@/booking/types';

export const useCompositionStore = defineStore('composition', () => {
    const selectedAllActivities = ref<AllActivity[]>([]);

    const selectAllActivities = (allActivities: AllActivity[]) => {
        selectedAllActivities.value = allActivities;
    };

    return { selectedAllActivities, selectAllActivities };
});
