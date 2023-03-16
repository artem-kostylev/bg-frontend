import { defineStore } from "pinia";
import { ref } from "vue";
import type { AvailableDate } from "@/hotels/types";

export const useRoomsStore = defineStore("rooms", () => {
    const currentGroupIndex = ref(0);
    const selectedDates = ref<AvailableDate[][]>([]);
    const openModal = ref(false);

    const selectDates = (dates: AvailableDate[], isLastGroup: boolean) => {
        selectedDates.value[currentGroupIndex.value] = dates;
        isLastGroup ? (openModal.value = true) : currentGroupIndex.value++;
    };

    return { currentGroupIndex, selectedDates, openModal, selectDates };
});
