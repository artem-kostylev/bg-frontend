import { ref } from 'vue';
import { defineStore } from 'pinia';
// import { parseFilters } from '@/app/lib';
import { useQuery } from '@/app/composables';
// import type { Filters } from '@/app/types';
import type { ActivityTicket, Activity } from '@/booking/types';

export const useToursStore = defineStore('tours', () => {
    const filters = useQuery();

    //const filters = computed(() => parseFilters(query as Filters));

    const selectedActivities = ref<Activity[]>([]);

    const selectedTickets = ref<ActivityTicket[]>([]);

    const currTourIndex = ref<number | null>(null);

    const addTicket = (value: ActivityTicket) => {
        selectedTickets.value.push(value);
    };

    const changeTicket = (index: number, value: ActivityTicket) => {
        Object.assign(selectedTickets.value[index], value);
    };

    const removeTickets = (id: number) => {
        selectedTickets.value = selectedTickets.value.filter(
            (ticket: ActivityTicket) => ticket.activity.id !== id
        );
    };

    const spliceTickets = (startIndex: number, endIndex: number) => {
        selectedTickets.value.splice(startIndex, endIndex);
    };

    return {
        filters,
        selectedActivities,
        selectedTickets,
        currTourIndex,
        addTicket,
        changeTicket,
        removeTickets,
        spliceTickets,
    };
});
